# Vercel Deployment Guide

## 解决环境变量错误

如果遇到错误：`Environment Variable "VITE_WALLET_CONNECT_PROJECT_ID" references Secret "wallet_connect_project_id", which does not exist.`

这是因为 `vercel.json` 中引用了不存在的Secrets。我们已经修复了这个问题。

## 正确的部署步骤

### 方法一：通过Vercel Dashboard部署

1. **访问Vercel**
   - 打开 [https://vercel.com/](https://vercel.com/)
   - 使用GitHub账户登录

2. **导入项目**
   - 点击 "New Project"
   - 选择 "Import Git Repository"
   - 找到 `Richardds236/holo-vault-analyzer`
   - 点击 "Import"

3. **配置项目**
   - Project Name: `holo-vault-analyzer`
   - Framework Preset: `Vite` (自动检测)
   - Root Directory: `./`
   - Build Command: `npm run build` (自动检测)
   - Output Directory: `dist` (自动检测)

4. **设置环境变量**
   在 "Environment Variables" 部分添加：

   | Name | Value | Environment |
   |------|-------|-------------|
   | `VITE_WALLET_CONNECT_PROJECT_ID` | `e08e99d213c331aa0fd00f625de06e66` | Production, Preview, Development |
   | `VITE_CONTRACT_ADDRESS` | `0x0000000000000000000000000000000000000000` | Production, Preview, Development |
   | `VITE_FHE_NETWORK_RPC` | `https://rpc.fhenix.xyz` | Production, Preview, Development |
   | `VITE_ENVIRONMENT` | `production` | Production, Preview, Development |

5. **部署**
   - 点击 "Deploy" 按钮
   - 等待构建完成

### 方法二：使用Vercel CLI

1. **安装CLI**
   ```bash
   npm i -g vercel
   ```

2. **登录**
   ```bash
   vercel login
   ```

3. **部署**
   ```bash
   cd /path/to/holo-vault-analyzer
   vercel
   ```

4. **设置环境变量**
   ```bash
   vercel env add VITE_WALLET_CONNECT_PROJECT_ID
   # 输入: e08e99d213c331aa0fd00f625de06e66
   
   vercel env add VITE_CONTRACT_ADDRESS
   # 输入: 0x0000000000000000000000000000000000000000
   
   vercel env add VITE_FHE_NETWORK_RPC
   # 输入: https://rpc.fhenix.xyz
   
   vercel env add VITE_ENVIRONMENT
   # 输入: production
   ```

5. **部署到生产环境**
   ```bash
   vercel --prod
   ```

## 部署后验证

1. **访问应用**
   - 主域名：`https://your-project-name.vercel.app`
   - 检查页面是否正常加载

2. **测试功能**
   - 钱包连接功能
   - 池子详情页面（点击View按钮）
   - 响应式设计
   - FHE加密数据展示

3. **检查控制台**
   - 打开浏览器开发者工具
   - 查看是否有错误信息
   - 确认环境变量正确加载

## 常见问题解决

### 1. 环境变量未生效
- 确保在Vercel Dashboard中正确设置了所有环境变量
- 重新部署项目
- 检查变量名称是否正确（必须以 `VITE_` 开头）

### 2. 构建失败
- 检查 `package.json` 中的依赖
- 确保所有必要的包都已安装
- 查看构建日志中的具体错误

### 3. 钱包连接问题
- 确认 `VITE_WALLET_CONNECT_PROJECT_ID` 正确设置
- 检查WalletConnect项目配置
- 确认网络配置正确

### 4. 合约交互问题
- 确认 `VITE_CONTRACT_ADDRESS` 设置正确
- 检查合约是否已部署
- 确认网络RPC URL正确

## 自定义域名（可选）

1. **添加域名**
   - 在Vercel Dashboard中进入项目设置
   - 点击 "Domains"
   - 添加你的自定义域名

2. **配置DNS**
   - 将域名CNAME记录指向Vercel提供的地址
   - 等待DNS传播完成

## 监控和分析

部署完成后，你可以在Vercel Dashboard中：

- 查看部署历史
- 监控性能指标
- 查看访问统计
- 设置自定义分析

## 自动部署

每次推送到GitHub main分支时，Vercel会自动：

- 检测代码变更
- 重新构建项目
- 部署到生产环境
- 发送部署通知

## 回滚部署

如果需要回滚到之前的版本：

1. 在Vercel Dashboard中进入 "Deployments"
2. 找到要回滚的版本
3. 点击 "Promote to Production"

## 支持

如果遇到问题：

1. 查看Vercel文档：https://vercel.com/docs
2. 检查项目构建日志
3. 联系Vercel支持团队
