// Contract ABI for HoloVaultAnalyzer
export const HoloVaultAnalyzer = [
  {
    "inputs": [
      {"internalType": "address", "name": "_verifier", "type": "address"}
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "totalTVL", "type": "uint256"},
      {"indexed": false, "internalType": "uint256", "name": "totalVolume", "type": "uint256"},
      {"indexed": false, "internalType": "uint256", "name": "averageAPR", "type": "uint256"}
    ],
    "name": "AnalyticsUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "poolId", "type": "uint256"},
      {"indexed": true, "internalType": "address", "name": "poolAddress", "type": "address"},
      {"indexed": false, "internalType": "string", "name": "name", "type": "string"}
    ],
    "name": "PoolCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "poolId", "type": "uint256"},
      {"indexed": false, "internalType": "uint256", "name": "tvl", "type": "uint256"},
      {"indexed": false, "internalType": "uint256", "name": "volume", "type": "uint256"},
      {"indexed": false, "internalType": "uint256", "name": "apr", "type": "uint256"}
    ],
    "name": "PoolUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "address", "name": "provider", "type": "address"},
      {"indexed": false, "internalType": "bool", "name": "authorized", "type": "bool"}
    ],
    "name": "ProviderAuthorized",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "address", "name": "user", "type": "address"},
      {"indexed": false, "internalType": "uint256", "name": "reputation", "type": "uint256"}
    ],
    "name": "ReputationUpdated",
    "type": "event"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "poolId", "type": "uint256"},
      {"internalType": "bytes", "name": "liquidityAmount", "type": "bytes"},
      {"internalType": "bytes", "name": "sharePercentage", "type": "bytes"},
      {"internalType": "bytes", "name": "inputProof", "type": "bytes"}
    ],
    "name": "addUserPosition",
    "outputs": [
      {"internalType": "uint256", "name": "", "type": "uint256"}
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "string", "name": "_name", "type": "string"},
      {"internalType": "string", "name": "_tokenPair", "type": "string"},
      {"internalType": "address", "name": "_poolAddress", "type": "address"},
      {"internalType": "bytes", "name": "initialTVL", "type": "bytes"},
      {"internalType": "bytes", "name": "inputProof", "type": "bytes"}
    ],
    "name": "createPool",
    "outputs": [
      {"internalType": "uint256", "name": "", "type": "uint256"}
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getGlobalAnalytics",
    "outputs": [
      {"internalType": "uint8", "name": "totalTVL", "type": "uint8"},
      {"internalType": "uint8", "name": "totalVolume24h", "type": "uint8"},
      {"internalType": "uint8", "name": "averageAPR", "type": "uint8"},
      {"internalType": "uint8", "name": "activePools", "type": "uint8"},
      {"internalType": "uint8", "name": "totalUsers", "type": "uint8"},
      {"internalType": "uint256", "name": "lastCalculated", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "poolId", "type": "uint256"}
    ],
    "name": "getPoolInfo",
    "outputs": [
      {"internalType": "string", "name": "name", "type": "string"},
      {"internalType": "string", "name": "tokenPair", "type": "string"},
      {"internalType": "address", "name": "poolAddress", "type": "address"},
      {"internalType": "uint8", "name": "tvl", "type": "uint8"},
      {"internalType": "uint8", "name": "volume24h", "type": "uint8"},
      {"internalType": "uint8", "name": "apr", "type": "uint8"},
      {"internalType": "uint8", "name": "providerCount", "type": "uint8"},
      {"internalType": "bool", "name": "isActive", "type": "bool"},
      {"internalType": "bool", "name": "isEncrypted", "type": "bool"},
      {"internalType": "uint256", "name": "lastUpdated", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "user", "type": "address"},
      {"internalType": "uint256", "name": "positionId", "type": "uint256"}
    ],
    "name": "getUserPosition",
    "outputs": [
      {"internalType": "uint8", "name": "liquidityAmount", "type": "uint8"},
      {"internalType": "uint8", "name": "sharePercentage", "type": "uint8"},
      {"internalType": "uint8", "name": "rewardsEarned", "type": "uint8"},
      {"internalType": "bool", "name": "isActive", "type": "bool"},
      {"internalType": "uint256", "name": "timestamp", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "user", "type": "address"}
    ],
    "name": "getUserReputation",
    "outputs": [
      {"internalType": "uint8", "name": "", "type": "uint8"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {"internalType": "address", "name": "", "type": "address"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "poolId", "type": "uint256"}
    ],
    "name": "pausePool",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "provider", "type": "address"},
      {"internalType": "bool", "name": "authorized", "type": "bool"}
    ],
    "name": "setAuthorizedProvider",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "newOwner", "type": "address"}
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "poolId", "type": "uint256"}
    ],
    "name": "unpausePool",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "user", "type": "address"},
      {"internalType": "bytes", "name": "reputation", "type": "bytes"}
    ],
    "name": "updateUserReputation",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "poolId", "type": "uint256"},
      {"internalType": "bytes", "name": "newTVL", "type": "bytes"},
      {"internalType": "bytes", "name": "newVolume", "type": "bytes"},
      {"internalType": "bytes", "name": "newAPR", "type": "bytes"},
      {"internalType": "bytes", "name": "inputProof", "type": "bytes"}
    ],
    "name": "updatePoolData",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "verifier",
    "outputs": [
      {"internalType": "address", "name": "", "type": "address"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;
