# Deployment Guide

## Prerequisites

1. **Node.js** (v18 or higher)
2. **npm** or **yarn**
3. **Vercel CLI** (for deployment)
4. **WalletConnect Project ID** (from https://cloud.walletconnect.com/)

## Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Richardds236/holo-vault-analyzer.git
   cd holo-vault-analyzer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` and add your configuration:
   ```env
   VITE_WALLET_CONNECT_PROJECT_ID=your_project_id_here
   VITE_CONTRACT_ADDRESS=0x... # Deployed contract address
   VITE_FHE_NETWORK_RPC=https://rpc.fhenix.xyz
   VITE_ENVIRONMENT=development
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## Smart Contract Deployment

### Prerequisites for Contract Deployment

1. **Hardhat** or **Foundry** for contract compilation
2. **FHE Network** access and configuration
3. **Private key** for deployment account

### Deployment Steps

1. **Install Hardhat dependencies**
   ```bash
   npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
   npm install @fhenixprotocol/solidity
   ```

2. **Create Hardhat configuration**
   ```javascript
   // hardhat.config.js
   require("@nomicfoundation/hardhat-toolbox");
   
   module.exports = {
     solidity: "0.8.24",
     networks: {
       fhenix: {
         url: "https://rpc.fhenix.xyz",
         accounts: [process.env.PRIVATE_KEY],
       },
     },
   };
   ```

3. **Deploy the contract**
   ```bash
   npx hardhat run scripts/deploy.js --network fhenix
   ```

4. **Update contract address**
   - Copy the deployed contract address
   - Update `VITE_CONTRACT_ADDRESS` in your environment variables

## Vercel Deployment

### Method 1: Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

### Method 2: GitHub Integration

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Deploy to Vercel"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure environment variables in Vercel dashboard

3. **Set Environment Variables in Vercel**
   - `VITE_WALLET_CONNECT_PROJECT_ID`
   - `VITE_CONTRACT_ADDRESS`
   - `VITE_FHE_NETWORK_RPC`
   - `VITE_ENVIRONMENT=production`

### Method 3: Direct Upload

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Upload dist folder to Vercel**
   - Drag and drop the `dist` folder to Vercel dashboard
   - Or use Vercel CLI: `vercel dist`

## Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_WALLET_CONNECT_PROJECT_ID` | WalletConnect project ID | `abc123...` |
| `VITE_CONTRACT_ADDRESS` | Deployed contract address | `0x1234...` |
| `VITE_FHE_NETWORK_RPC` | FHE network RPC URL | `https://rpc.fhenix.xyz` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_ENVIRONMENT` | Environment type | `development` |

## Post-Deployment

1. **Verify deployment**
   - Check that the site loads correctly
   - Test wallet connection
   - Verify contract interactions

2. **Update documentation**
   - Update README with live URL
   - Document any custom configurations

3. **Monitor performance**
   - Check Vercel analytics
   - Monitor contract interactions
   - Set up error tracking if needed

## Troubleshooting

### Common Issues

1. **Build failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Check for TypeScript errors

2. **Wallet connection issues**
   - Verify WalletConnect project ID
   - Check network configuration
   - Ensure contract address is correct

3. **Contract interaction failures**
   - Verify contract is deployed
   - Check network connectivity
   - Verify user has sufficient permissions

### Support

For issues and questions:
- Check the [GitHub Issues](https://github.com/Richardds236/holo-vault-analyzer/issues)
- Review the [FHE Documentation](https://docs.fhenix.xyz)
- Contact the development team

## Security Considerations

1. **Environment Variables**
   - Never commit private keys to version control
   - Use Vercel's environment variable system
   - Rotate keys regularly

2. **Contract Security**
   - Audit smart contracts before deployment
   - Use multi-signature wallets for contract ownership
   - Implement proper access controls

3. **Frontend Security**
   - Validate all user inputs
   - Use HTTPS in production
   - Implement proper error handling
