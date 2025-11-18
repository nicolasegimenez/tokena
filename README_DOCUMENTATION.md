# TOKENA Project - Documentation Index

## Quick Start

Welcome to the **TOKENA** project documentation! This document serves as an index to all technical documentation.

---

## 📚 Documentation Files

### 1. **TECHNICAL_DOCUMENTATION.md** (Main Reference)
Complete technical guide covering:
- Project overview and features
- Technology stack details
- Project structure and organization
- Setup and installation instructions
- Build and deployment process
- API routes and endpoints
- Development guidelines
- Performance optimizations

**Best for**: Getting started, understanding architecture, setup instructions

---

### 2. **ARCHITECTURE.md** (Design & Patterns)
In-depth architectural documentation:
- Overall system architecture
- Design patterns used
- Data flow and state management
- Component hierarchy
- Service layer design
- Scalability considerations
- Performance optimization strategies

**Best for**: Understanding design decisions, planning features, team discussions

---

### 3. **SHADCN_COMPONENTS.md** (UI Components)
Complete reference for shadcn/ui:
- Installed components catalog
- Component usage examples
- Styling with Tailwind CSS
- Dark mode implementation
- Best practices for component usage
- Troubleshooting common issues

**Best for**: Building UI, component selection, implementation examples

---

### 4. **BUN_SETUP.md** (Package Management)
Comprehensive Bun guide:
- What is Bun and why we use it
- Installation instructions
- Package management commands
- Build process details
- TypeScript and Vite configuration
- Performance metrics
- Troubleshooting
- CI/CD integration

**Best for**: Setting up environment, managing dependencies, build optimization

---

## 🚀 Quick Commands

### Development
```bash
# Install dependencies
bun install

# Start development server (http://localhost:5173)
bun run dev

# Check code quality
bun run lint

# Fix linting issues
bun run lint -- --fix
```

### Production
```bash
# Build for production
bun run build

# Preview production build
bun run preview
```

---

## 🏗️ Project Structure Overview

```
tokena/
├── src/
│   ├── app/                    # Page components
│   ├── components/             # React components
│   │   └── ui/                # shadcn/ui components
│   ├── lib/                    # Utilities and contexts
│   ├── hooks/                  # Custom React hooks
│   ├── App.tsx                 # Root component
│   └── main.tsx                # Entry point
├── dist/                       # Build output (generated)
├── public/                     # Static assets
├── node_modules/               # Dependencies (generated)
├── TECHNICAL_DOCUMENTATION.md  # 📖 Read first
├── ARCHITECTURE.md             # 🏗️ System design
├── SHADCN_COMPONENTS.md        # 🎨 UI components
├── BUN_SETUP.md               # ⚙️ Build & packages
├── tsconfig.json               # TypeScript config
├── vite.config.ts             # Vite config
├── tailwind.config.ts         # Tailwind config
├── package.json                # Dependencies
├── bun.lockb                   # Dependency lock
└── README.md                   # Project README
```

---

## 🛠️ Technology Stack

| Category | Technology | Version |
|----------|-----------|---------|
| **Language** | TypeScript | ~5.9.3 |
| **Framework** | React | 19.1.1 |
| **Build Tool** | Vite | 7.1.7 |
| **Package Manager** | Bun | 1.0+ |
| **CSS Framework** | Tailwind CSS | 4.1.14 |
| **UI Components** | shadcn/ui | 3.5.0 |
| **Routing** | React Router | 6.0 |
| **Icons** | Lucide React | 0.553.0 |
| **Charts** | Recharts | 2.15.4 |
| **Animations** | Motion | 12.23.24 |
| **Tables** | TanStack | 8.21.3 |
| **Drag & Drop** | dnd-kit | 6.3.1+ |
| **Web3** | Wagmi & Viem | 2.19.0+ |

---

## 📖 Reading Guide

### For New Developers
1. Read this file (README_DOCUMENTATION.md)
2. Read **TECHNICAL_DOCUMENTATION.md** - Project Overview
3. Read **BUN_SETUP.md** - Setup environment
4. Check **ARCHITECTURE.md** - Understand design
5. Reference **SHADCN_COMPONENTS.md** - Build UI

### For Architects/Tech Leads
1. Read **ARCHITECTURE.md** - System design
2. Review **TECHNICAL_DOCUMENTATION.md** - Tech stack
3. Check **SHADCN_COMPONENTS.md** - Component library
4. Review **BUN_SETUP.md** - Build pipeline

### For UI/Frontend Developers
1. Read **SHADCN_COMPONENTS.md** - Component usage
2. Review **TECHNICAL_DOCUMENTATION.md** - Project structure
3. Check **ARCHITECTURE.md** - Design patterns
4. Reference **BUN_SETUP.md** - Build commands

### For DevOps/CI-CD
1. Read **BUN_SETUP.md** - Build process
2. Review **TECHNICAL_DOCUMENTATION.md** - Deployment
3. Check **ARCHITECTURE.md** - Scalability

---

## 🎯 Key Features

### Investment Platform
- Token-based investment system
- Real-time ROI calculations
- Portfolio management
- Multi-currency support

### Trading
- Token marketplace
- Buy/Sell functionality
- Transaction history
- Price tracking

### Analytics
- Performance dashboards
- Investment analytics
- Portfolio reports
- Chart visualizations

### Community
- Philanthropic donations
- Auction participation
- Project creation
- Multi-language support (ES/EN)

---

## 🔧 Environment Setup

### Prerequisites
- **Bun** 1.0+
- **Node.js** 18+ (if not using Bun runtime)
- **Git** for version control

### Installation Steps
```bash
# 1. Clone repository
git clone <repository-url>
cd tokena

# 2. Install dependencies with Bun
bun install

# 3. Start development server
bun run dev

# 4. Open in browser
# Navigate to http://localhost:5173
```

### Environment Variables (if needed)
Create `.env` file:
```
VITE_API_URL=http://localhost:3000
VITE_WEB3_RPC_URL=https://mainnet.infura.io/v3/YOUR_KEY
```

---

## 📱 Responsive Design

The application is built mobile-first using Tailwind CSS:

```
- Mobile: 320px - 639px (default)
- Tablet: 640px - 1023px (md: prefix)
- Desktop: 1024px+ (lg: prefix)
```

### Dark Mode
- Automatic detection of system preference
- Manual toggle available
- Persisted in localStorage
- All components support dark mode

---

## 🔒 Code Quality

### TypeScript
- Strict mode enabled
- Full type safety
- No `any` types

### ESLint
- React best practices
- Hook rules
- Import sorting

### Formatting
- Prettier configured
- Consistent code style
- Auto-format on save (VS Code)

### Testing (Future)
- Unit tests with Vitest
- Component tests with React Testing Library
- E2E tests with Cypress

---

## 📊 Performance Targets

### Lighthouse Metrics
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

### Bundle Size
- **Initial JS**: ~150KB (gzipped)
- **CSS**: ~30KB (gzipped)
- **Total**: ~180KB (gzipped)

### Build Speed
- **Development**: ~2-3 seconds
- **Production**: ~5-10 seconds

---

## 🌐 Browser Support

- **Chrome/Edge**: Latest 2 versions
- **Firefox**: Latest 2 versions
- **Safari**: Latest 2 versions
- **Mobile**: iOS Safari 12+, Chrome Android latest

---

## 📝 Code Conventions

### File Naming
- **Components**: PascalCase (HomePage.tsx)
- **Hooks**: camelCase with 'use' (useProjects.ts)
- **Utilities**: camelCase (formatPrice.ts)
- **Constants**: UPPER_SNAKE_CASE (API_ENDPOINTS.ts)

### Component Structure
```typescript
// 1. Imports
import React from 'react'
import { Button } from '@/components/ui/button'

// 2. Types/Interfaces
interface ComponentProps {
  title: string
  onClose?: () => void
}

// 3. Component
const Component: React.FC<ComponentProps> = ({ title, onClose }) => {
  // 4. Hooks
  const [state, setState] = React.useState(false)

  // 5. Effects
  React.useEffect(() => {
    // ...
  }, [])

  // 6. Handlers
  const handleClick = () => {
    // ...
  }

  // 7. Render
  return (
    <div>
      {title}
      <Button onClick={handleClick}>Click</Button>
    </div>
  )
}

// 8. Export
export default Component
```

---

## 🚨 Common Gotchas

### 1. Import Paths
✅ Use `@/` alias:
```typescript
import { Button } from '@/components/ui/button'
```

❌ Avoid relative paths:
```typescript
import { Button } from '../../../components/ui/button'
```

### 2. Component Imports
✅ Import named exports:
```typescript
import { Card, CardContent } from '@/components/ui/card'
```

❌ Avoid importing entire module:
```typescript
import * as Card from '@/components/ui/card'
```

### 3. CSS Classes
✅ Use Tailwind utilities:
```typescript
<div className="p-4 bg-white rounded-lg">
```

❌ Avoid inline styles:
```typescript
<div style={{ padding: '16px', background: 'white' }}>
```

---

## 📚 Learning Resources

### React
- [React Documentation](https://react.dev)
- [React Router Guide](https://reactrouter.com)
- [React Hooks API](https://react.dev/reference/react)

### TypeScript
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)

### Tailwind CSS
- [Tailwind Documentation](https://tailwindcss.com/docs)
- [Tailwind UI Components](https://tailwindui.com)

### shadcn/ui
- [shadcn/ui Docs](https://ui.shadcn.com)
- [Component Examples](https://ui.shadcn.com/docs/installation)

### Bun
- [Bun Official Docs](https://bun.sh/docs)
- [Bun API Reference](https://bun.sh/docs/api)

---

## 🐛 Troubleshooting

### Dependencies Issue
```bash
# Clear Bun cache
bun pm cache clear

# Remove lock file and reinstall
rm bun.lockb
bun install
```

### Build Fails
```bash
# Check TypeScript errors
bun run build

# Clear Vite cache
rm -rf dist node_modules/.vite
bun run build
```

### Port Conflict
```bash
# Run on different port
bun run dev -- --port 3000
```

### TypeScript Errors
```bash
# Rebuild TypeScript
bun run build

# Check tsconfig.json paths
# Ensure @/ points to src/
```

---

## 💡 Tips & Tricks

### Development
```bash
# Run dev with specific port
bun run dev -- --port 3000

# Build with source maps (for debugging)
bun run build --sourcemap

# Preview with different port
bun run preview -- --port 4000
```

### Performance
```bash
# Analyze bundle size
bun run build
# Check dist/ folder size

# Run in production mode locally
bun run preview
```

### Debugging
- Use React DevTools extension
- Use Redux DevTools (if using Redux)
- Check browser DevTools Console
- Use TypeScript strict mode

---

## 👥 Team & Support

### Questions?
1. Check relevant documentation file above
2. Search GitHub issues
3. Check TypeScript strict mode errors
4. Consult team lead

### Contributing
- Follow code conventions above
- Keep commit messages clear
- Write tests when adding features
- Update documentation

---

## 📋 Cleanup Summary

### Removed Files (Garbage)
```
✓ src/components/hero-shader.tsx (duplicate)
✓ src/components/app-sidebar.tsx (unused)
✓ src/components/nav-documents.tsx (unused)
✓ src/components/nav-main.tsx (unused)
✓ src/components/nav-secondary.tsx (unused)
✓ src/components/nav-user.tsx (unused)
✓ src/app/invest/project7/ (orphan folder)
```

### Result
- Cleaner codebase
- Removed 7 unused files
- Eliminated redundant components
- Better code maintainability

---

## 📅 Documentation Versions

| Document | Version | Last Updated |
|----------|---------|--------------|
| README_DOCUMENTATION.md | 1.0 | 2025-01-18 |
| TECHNICAL_DOCUMENTATION.md | 1.0 | 2025-01-18 |
| ARCHITECTURE.md | 1.0 | 2025-01-18 |
| SHADCN_COMPONENTS.md | 1.0 | 2025-01-18 |
| BUN_SETUP.md | 1.0 | 2025-01-18 |

---

## 🎓 Getting Started Path

```
START HERE
    ↓
Read README_DOCUMENTATION.md (this file)
    ↓
Run: bun install && bun run dev
    ↓
Read TECHNICAL_DOCUMENTATION.md
    ↓
Read ARCHITECTURE.md
    ↓
Reference SHADCN_COMPONENTS.md for UI
    ↓
Reference BUN_SETUP.md for build commands
    ↓
HAPPY CODING! 🎉
```

---

## 📞 Quick Help

### "How do I start the project?"
→ See [Quick Start](#-quick-start) section

### "What's the project structure?"
→ Read TECHNICAL_DOCUMENTATION.md - Project Structure

### "How do I add a component?"
→ Read SHADCN_COMPONENTS.md - Adding New Components

### "How do I build for production?"
→ Read BUN_SETUP.md - Production Build

### "How does the app handle state?"
→ Read ARCHITECTURE.md - State Management Strategy

### "What are the design patterns?"
→ Read ARCHITECTURE.md - Design Patterns

---

**Happy Coding! 🚀**

For any questions, refer to the appropriate documentation file or consult your team lead.

---

**Project**: TOKENA - Tokenized Investment Platform
**Type**: React SPA with TypeScript
**Build Tool**: Bun + Vite
**UI Library**: shadcn/ui + Tailwind CSS
**Status**: Active Development
