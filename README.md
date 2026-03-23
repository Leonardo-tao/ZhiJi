# ZhiJi (知己) 🤖✨

[![GitHub Repo](https://img.shields.io/badge/GitHub-ZhiJi-blue.svg?logo=github)](https://github.com/Leonardo-tao/ZhiJi)
[![Website](https://img.shields.io/badge/Website-zhiji.codercat.top-green.svg)](https://zhiji.codercat.top)

*其他语言版本: 简体中文, [English](README.md).*

ZhiJi（知己）是一个功能强大的开源 AI 聊天机器人项目，基于 Next.js App Router 和 Vercel AI SDK 构建。它不仅提供多模型支持的统一聊天界面，还具备强大的 Artifacts（工件）生成能力，是您在模拟面试和简历优化等方面的智能助手！

## 🔗 相关链接
- **在线体验**: [zhiji.codercat.top](https://zhiji.codercat.top)
- **GitHub 仓库**: [Leonardo-tao/ZhiJi](https://github.com/Leonardo-tao/ZhiJi)

## 🌟 核心功能

- 💬 **多模态 AI 交互**：支持富文本、图像理解和文件上传分析。
- 🎨 **Artifacts（工件）系统**：在聊天界面中直接动态生成、预览和编辑代码、文本文档、电子表格和图像。
- 🤖 **专属智能体（Agents）**：内置专门用于“模拟面试（Mock Interviews）”和“简历优化（Resume Optimization）”的智能体。
- 🌐 **多模型无缝接入**：通过 Vercel AI SDK 轻松集成 DeepSeek、xAI、OpenAI 等多种大语言模型。
- 🔒 **安全认证系统**：由 Auth.js (NextAuth v5) 驱动的安全登录、注册系统，并支持便捷的游客模式。
- 💾 **数据持久化**：使用 Neon Postgres 和 Drizzle ORM 安全存储聊天记录、用户数据和文档内容。
- 💅 **优雅的 UI/UX**：采用 Tailwind CSS、shadcn/ui 和 Framer Motion 打造丝滑流畅的响应式界面，完美适配移动端。
- ⚡ **实时流式响应**：基于 Server-Sent Events (SSE) 和 React Server Components (RSCs) 提供低延迟的打字机输出体验。

## 📸 界面预览

<img src="public/preview/preview-chat.png" alt="ZhiJi 预览" />

## 🛠️ 技术栈

- **核心框架**: [Next.js](https://nextjs.org/) (App Router, Server Actions)
- **AI 框架**: [Vercel AI SDK](https://sdk.vercel.ai/docs)
- **数据库**: [PostgreSQL](https://postgresql.org/) (Neon) & [Drizzle ORM](https://orm.drizzle.team/)
- **身份验证**: [Auth.js](https://authjs.dev/)
- **前端样式**: [Tailwind CSS](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
- **文件存储**: [Vercel Blob](https://vercel.com/docs/storage/vercel-blob)
- **编辑器组件**: CodeMirror & ProseMirror

## 🚀 快速开始

### 环境要求
- Node.js (v18+)
- pnpm
- PostgreSQL 数据库 (如 Neon)

### 本地运行

1. **克隆项目到本地**
   ```bash
   git clone https://github.com/Leonardo-tao/ZhiJi.git
   cd ZhiJi
   ```

2. **安装依赖**
   ```bash
   pnpm install
   ```

3. **配置环境变量**
   复制示例环境变量文件并填入您的配置：
   ```bash
   cp .env.example .env.local
   ```
   *注意：您需要配置数据库 URL、Auth Secret 以及 AI 供应商的 API Key。*

4. **初始化数据库**
   ```bash
   pnpm db:migrate
   ```

5. **启动开发服务器**
   ```bash
   pnpm dev
   ```
   现在，您的应用应该已经运行在 [http://localhost:3000](http://localhost:3000)。

## 📄 开源协议

本项目开源，遵循 MIT 协议。
