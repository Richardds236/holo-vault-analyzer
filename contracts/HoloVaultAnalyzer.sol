// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract HoloVaultAnalyzer is SepoliaConfig {
    using FHE for *;
    
    // Pool data structure with FHE encryption
    struct PoolData {
        euint32 poolId;
        euint32 totalValueLocked; // TVL in wei
        euint32 volume24h; // 24h volume in wei
        euint32 apr; // APR in basis points (10000 = 100%)
        euint32 liquidityProviderCount;
        ebool isActive;
        ebool isEncrypted;
        string name;
        string tokenPair;
        address poolAddress;
        uint256 lastUpdated;
    }
    
    // User position data
    struct UserPosition {
        euint32 positionId;
        euint32 liquidityAmount;
        euint32 sharePercentage;
        euint32 rewardsEarned;
        ebool isActive;
        address user;
        uint256 timestamp;
    }
    
    // Analytics data
    struct AnalyticsData {
        euint32 totalTVL;
        euint32 totalVolume24h;
        euint32 averageAPR;
        euint32 activePools;
        euint32 totalUsers;
        uint256 lastCalculated;
    }
    
    // State variables
    mapping(uint256 => PoolData) public pools;
    mapping(address => mapping(uint256 => UserPosition)) public userPositions;
    mapping(address => euint32) public userReputation;
    mapping(address => ebool) public authorizedProviders;
    
    AnalyticsData public globalAnalytics;
    
    uint256 public poolCounter;
    uint256 public positionCounter;
    
    address public owner;
    address public verifier;
    
    // Events
    event PoolCreated(uint256 indexed poolId, address indexed poolAddress, string name);
    event PoolUpdated(uint256 indexed poolId, uint32 tvl, uint32 volume, uint32 apr);
    event PositionAdded(uint256 indexed positionId, address indexed user, uint256 indexed poolId);
    event AnalyticsUpdated(uint32 totalTVL, uint32 totalVolume, uint32 averageAPR);
    event ProviderAuthorized(address indexed provider, bool authorized);
    event ReputationUpdated(address indexed user, uint32 reputation);
    
    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    modifier onlyAuthorizedProvider() {
        require(FHE.decrypt(authorizedProviders[msg.sender]), "Not an authorized provider");
        _;
    }
    
    modifier onlyVerifier() {
        require(msg.sender == verifier, "Only verifier can call this function");
        _;
    }
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
        
        // Initialize global analytics
        globalAnalytics = AnalyticsData({
            totalTVL: FHE.asEuint32(0),
            totalVolume24h: FHE.asEuint32(0),
            averageAPR: FHE.asEuint32(0),
            activePools: FHE.asEuint32(0),
            totalUsers: FHE.asEuint32(0),
            lastCalculated: block.timestamp
        });
    }
    
    // Create a new liquidity pool
    function createPool(
        string memory _name,
        string memory _tokenPair,
        address _poolAddress,
        externalEuint32 initialTVL,
        bytes calldata inputProof
    ) public onlyAuthorizedProvider returns (uint256) {
        require(bytes(_name).length > 0, "Pool name cannot be empty");
        require(_poolAddress != address(0), "Invalid pool address");
        
        uint256 poolId = poolCounter++;
        euint32 internalTVL = FHE.fromExternal(initialTVL, inputProof);
        
        pools[poolId] = PoolData({
            poolId: FHE.asEuint32(poolId),
            totalValueLocked: internalTVL,
            volume24h: FHE.asEuint32(0),
            apr: FHE.asEuint32(0),
            liquidityProviderCount: FHE.asEuint32(0),
            isActive: FHE.asEbool(true),
            isEncrypted: FHE.asEbool(true),
            name: _name,
            tokenPair: _tokenPair,
            poolAddress: _poolAddress,
            lastUpdated: block.timestamp
        });
        
        // Update global analytics
        globalAnalytics.totalTVL = FHE.add(globalAnalytics.totalTVL, internalTVL);
        globalAnalytics.activePools = FHE.add(globalAnalytics.activePools, FHE.asEuint32(1));
        
        emit PoolCreated(poolId, _poolAddress, _name);
        return poolId;
    }
    
    // Update pool data (only authorized providers)
    function updatePoolData(
        uint256 poolId,
        externalEuint32 newTVL,
        externalEuint32 newVolume,
        externalEuint32 newAPR,
        bytes calldata inputProof
    ) public onlyAuthorizedProvider {
        require(pools[poolId].poolAddress != address(0), "Pool does not exist");
        
        euint32 internalTVL = FHE.fromExternal(newTVL, inputProof);
        euint32 internalVolume = FHE.fromExternal(newVolume, inputProof);
        euint32 internalAPR = FHE.fromExternal(newAPR, inputProof);
        
        // Update pool data
        pools[poolId].totalValueLocked = internalTVL;
        pools[poolId].volume24h = internalVolume;
        pools[poolId].apr = internalAPR;
        pools[poolId].lastUpdated = block.timestamp;
        
        emit PoolUpdated(poolId, 0, 0, 0); // Values will be decrypted off-chain
        
        // Recalculate global analytics
        _updateGlobalAnalytics();
    }
    
    // Add user position to a pool
    function addUserPosition(
        uint256 poolId,
        externalEuint32 liquidityAmount,
        externalEuint32 sharePercentage,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(pools[poolId].poolAddress != address(0), "Pool does not exist");
        require(FHE.decrypt(pools[poolId].isActive), "Pool is not active");
        
        uint256 positionId = positionCounter++;
        euint32 internalLiquidity = FHE.fromExternal(liquidityAmount, inputProof);
        euint32 internalShare = FHE.fromExternal(sharePercentage, inputProof);
        
        userPositions[msg.sender][positionId] = UserPosition({
            positionId: FHE.asEuint32(positionId),
            liquidityAmount: internalLiquidity,
            sharePercentage: internalShare,
            rewardsEarned: FHE.asEuint32(0),
            isActive: FHE.asEbool(true),
            user: msg.sender,
            timestamp: block.timestamp
        });
        
        // Update pool liquidity provider count
        pools[poolId].liquidityProviderCount = FHE.add(
            pools[poolId].liquidityProviderCount, 
            FHE.asEuint32(1)
        );
        
        emit PositionAdded(positionId, msg.sender, poolId);
        return positionId;
    }
    
    // Update user rewards
    function updateUserRewards(
        uint256 positionId,
        externalEuint32 newRewards,
        bytes calldata inputProof
    ) public onlyAuthorizedProvider {
        require(userPositions[msg.sender][positionId].user != address(0), "Position does not exist");
        
        euint32 internalRewards = FHE.fromExternal(newRewards, inputProof);
        userPositions[msg.sender][positionId].rewardsEarned = internalRewards;
    }
    
    // Authorize/unauthorize data providers
    function setAuthorizedProvider(address provider, bool authorized) public onlyOwner {
        authorizedProviders[provider] = FHE.asEbool(authorized);
        emit ProviderAuthorized(provider, authorized);
    }
    
    // Update user reputation (only verifier)
    function updateUserReputation(address user, euint32 reputation) public onlyVerifier {
        require(user != address(0), "Invalid user address");
        userReputation[user] = reputation;
        emit ReputationUpdated(user, 0); // Will be decrypted off-chain
    }
    
    // Internal function to update global analytics
    function _updateGlobalAnalytics() internal {
        // This would typically involve complex calculations across all pools
        // For now, we'll update the timestamp
        globalAnalytics.lastCalculated = block.timestamp;
        
        emit AnalyticsUpdated(0, 0, 0); // Values will be decrypted off-chain
    }
    
    // Get pool information (returns encrypted data)
    function getPoolInfo(uint256 poolId) public view returns (
        string memory name,
        string memory tokenPair,
        address poolAddress,
        uint8 tvl,
        uint8 volume24h,
        uint8 apr,
        uint8 providerCount,
        bool isActive,
        bool isEncrypted,
        uint256 lastUpdated
    ) {
        PoolData storage pool = pools[poolId];
        return (
            pool.name,
            pool.tokenPair,
            pool.poolAddress,
            0, // FHE.decrypt(pool.totalValueLocked) - decrypted off-chain
            0, // FHE.decrypt(pool.volume24h) - decrypted off-chain
            0, // FHE.decrypt(pool.apr) - decrypted off-chain
            0, // FHE.decrypt(pool.liquidityProviderCount) - decrypted off-chain
            FHE.decrypt(pool.isActive),
            FHE.decrypt(pool.isEncrypted),
            pool.lastUpdated
        );
    }
    
    // Get user position information
    function getUserPosition(address user, uint256 positionId) public view returns (
        uint8 liquidityAmount,
        uint8 sharePercentage,
        uint8 rewardsEarned,
        bool isActive,
        uint256 timestamp
    ) {
        UserPosition storage position = userPositions[user][positionId];
        return (
            0, // FHE.decrypt(position.liquidityAmount) - decrypted off-chain
            0, // FHE.decrypt(position.sharePercentage) - decrypted off-chain
            0, // FHE.decrypt(position.rewardsEarned) - decrypted off-chain
            FHE.decrypt(position.isActive),
            position.timestamp
        );
    }
    
    // Get global analytics
    function getGlobalAnalytics() public view returns (
        uint8 totalTVL,
        uint8 totalVolume24h,
        uint8 averageAPR,
        uint8 activePools,
        uint8 totalUsers,
        uint256 lastCalculated
    ) {
        return (
            0, // FHE.decrypt(globalAnalytics.totalTVL) - decrypted off-chain
            0, // FHE.decrypt(globalAnalytics.totalVolume24h) - decrypted off-chain
            0, // FHE.decrypt(globalAnalytics.averageAPR) - decrypted off-chain
            0, // FHE.decrypt(globalAnalytics.activePools) - decrypted off-chain
            0, // FHE.decrypt(globalAnalytics.totalUsers) - decrypted off-chain
            globalAnalytics.lastCalculated
        );
    }
    
    // Get user reputation
    function getUserReputation(address user) public view returns (uint8) {
        return 0; // FHE.decrypt(userReputation[user]) - decrypted off-chain
    }
    
    // Emergency functions
    function pausePool(uint256 poolId) public onlyOwner {
        pools[poolId].isActive = FHE.asEbool(false);
    }
    
    function unpausePool(uint256 poolId) public onlyOwner {
        pools[poolId].isActive = FHE.asEbool(true);
    }
    
    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "New owner cannot be zero address");
        owner = newOwner;
    }
}
