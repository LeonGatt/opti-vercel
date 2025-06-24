<div align="center">
  <h1>🚀 OptiTrack Web</h1>
  <p>A high-performance, modern web application template built with Next.js and Payload CMS</p>

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Payload CMS](https://img.shields.io/badge/Payload_CMS-2B2F3A?style=flat&logo=payloadcms&logoColor=white)](https://payloadcms.com/)
[![Storybook](https://img.shields.io/badge/Storybook-FF4785?style=flat&logo=storybook&logoColor=white)](https://storybook.js.org/)
[![Playwright](https://img.shields.io/badge/Playwright-45ba4b?style=flat&logo=playwright&logoColor=white)](https://playwright.dev/)

</div>

## 🚀 Quick Start

Get started with the project locally in just a few steps:

### Prerequisites

- Node.js 20+ and pnpm
- Docker and Docker Compose (for local database)

### Installation

1. **Install dependencies**

```bash
pnpm install
```

2. **Set up environment variables**

Copy the example environment file and update the values:

```bash
cp .env.example .env
```

3. **Start the development environment**

```bash
pnpm dev
```

The application will be available at:

- Frontend: http://localhost:3000
- Admin Panel: http://localhost:3000/admin
- Storybook: http://localhost:6006

## 🛠 Development

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run linter
- `pnpm test` - Run unit tests
- `pnpm test:e2e` - Run end-to-end tests
- `pnpm storybook` - Start Storybook
- `pnpm build-storybook` - Build Storybook

## 🧪 Testing

### Unit Tests

```bash
pnpm test
```

### E2E Tests

```bash
# Run tests in headless mode
pnpm test:e2e

# Run tests in UI mode
pnpm test:e2e:headed

# Debug tests
pnpm test:e2e:debug
```
