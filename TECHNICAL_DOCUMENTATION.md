# TOKENA - Technical Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Key Components](#key-components)
6. [Setup & Installation](#setup--installation)
7. [Build & Deployment](#build--deployment)
8. [API Routes](#api-routes)
9. [Development Guidelines](#development-guidelines)
10. [Performance Optimizations](#performance-optimizations)

---

## Project Overview

**Tokena** is a modern web application for tokenized asset investment, trading, and portfolio management. The platform enables users to invest in various projects, trade tokens, manage portfolios, participate in auctions, and engage in philanthropic initiatives.

### Key Features
- **Token Investment**: Invest in tokenized assets with real-time ROI calculations
- **Trading**: Buy and sell tokens on an integrated marketplace
- **Portfolio Management**: Track investments with detailed analytics and performance metrics
- **Auction System**: Participate in token auctions
- **Philanthropic Donations**: Support causes through donation mechanisms
- **Multi-language Support**: Full support for Spanish and English
- **Dark Mode**: Theme switching for user comfort
- **Real-time Analytics**: Dashboard with charts and performance visualizations

---

## Architecture

### Design Pattern: MVC + Component-Based

The application follows a **component-based architecture** with React, utilizing:

```
┌─────────────────────────────────────────┐
│        React Router (Routing Layer)      │
├─────────────────────────────────────────┤
│     Page Components & Smart Components   │
├─────────────────────────────────────────┤
│        UI Components (shadcn/ui)         │
├─────────────────────────────────────────┤
│     Services, Hooks & Context (State)    │
├─────────────────────────────────────────┤
│     Utilities, Helpers & Libraries       │
└─────────────────────────────────────────┘
```

### State Management

- **Context API**: Used for global state (Authentication, Language, Theme)
- **Local State**: React hooks (useState) for component-level state
- **URL Parameters**: React Router for page-level state persistence

### Authentication Layer

- Custom `AuthProvider` context for managing user authentication state
- Login and registration pages with form validation
- Protected routes (to be implemented with route guards)

---

## Technology Stack

### Frontend Framework & Build Tools
| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 19.1.1 | UI Framework |
| **TypeScript** | ~5.9.3 | Static typing and type safety |
| **Vite** | 7.1.7 | Build tool and dev server |
| **Bun** | Latest | Package manager & runtime |
| **Tailwind CSS** | 4.1.14 | Utility-first CSS framework |

### UI Component Library
| Library | Version | Purpose |
|---------|---------|---------|
| **shadcn/ui** | 3.5.0 | Pre-built, customizable React components |
| **Radix UI** | Latest | Unstyled, accessible UI primitives |
| **Lucide React** | 0.553.0 | Icon library |

### Routing & Navigation
| Library | Version | Purpose |
|---------|---------|---------|
| **React Router DOM** | 6 | Client-side routing |

### Data Visualization & Charts
| Library | Version | Purpose |
|---------|---------|---------|
| **Recharts** | 2.15.4 | React chart library |
| **TanStack React Table** | 8.21.3 | Headless table component |

### Animations & Motion
| Library | Version | Purpose |
|---------|---------|---------|
| **Motion** | 12.23.24 | Animation library for React |
| **Embla Carousel** | 8.6.0 | Carousel/slider component |

### Drag & Drop
| Library | Version | Purpose |
|---------|---------|---------|
| **dnd-kit** | 6.3.1+ | Modern drag-and-drop toolkit |

### Web3 (Blockchain Integration - Reserved)
| Library | Version | Purpose |
|---------|---------|---------|
| **Wagmi** | 2.19.0 | React hooks for Ethereum |
| **Viem** | 2.38.4 | Ethereum utility library |

### Utilities & Helpers
| Library | Version | Purpose |
|---------|---------|---------|
| **Zod** | 4.1.12 | Schema validation |
| **clsx** | 2.1.1 | Conditional CSS classes |
| **tailwind-merge** | 3.3.1 | Tailwind CSS conflict resolution |
| **next-themes** | 0.4.6 | Theme management |
| **sonner** | 2.0.7 | Toast notifications |
| **Vaul** | 1.1.2 | Drawer component |

### Special Effects
| Library | Version | Purpose |
|---------|---------|---------|
| **@paper-design/shaders-react** | 0.0.63 | WebGL shader effects |

---

## Project Structure

```
tokena/
├── src/
│   ├── app/                          # Page components (Next.js style routing)
│   │   ├── landing/                  # Landing page
│   │   ├── dashboard/                # Dashboard page
│   │   ├── analytics/                # Analytics page
│   │   ├── reports/                  # Reports page
│   │   ├── portfolio/                # Portfolio management page
│   │   ├── market/                   # Marketplace page
│   │   ├── invest/                   # Investment pages
│   │   │   ├── project1/
│   │   │   ├── project2/
│   │   │   ├── project3/
│   │   │   ├── project4/
│   │   │   ├── project5/
│   │   │   └── project6/
│   │   ├── trade/                    # Trading page
│   │   ├── auctions/                 # Auctions page
│   │   ├── filantropy/               # Philanthropic donations page
│   │   ├── investments/              # User investments page
│   │   ├── registrarse/              # Registration page
│   │   └── create/                   # Project creation page
│   │
│   ├── components/                   # Reusable React components
│   │   ├── ui/                       # shadcn/ui components
│   │   │   ├── card.tsx
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── table.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── navbar.tsx
│   │   │   ├── hero-shader.tsx       # WebGL shader effects
│   │   │   ├── hero-parallax.tsx     # Parallax scrolling
│   │   │   └── [other components]
│   │   │
│   │   ├── Layout.tsx                # Main layout wrapper
│   │   ├── MarketPlaceApp.tsx        # Marketplace component
│   │   ├── Profile.tsx               # User profile component
│   │   ├── TokenManagement.tsx       # Token management
│   │   ├── ProjectDetail.tsx         # Project detail view
│   │   ├── InvestmentSimulator.tsx   # Investment calculator
│   │   ├── ProjectHeroSection.tsx    # Hero section for projects
│   │   ├── HomePage.tsx              # Home page
│   │   ├── CarouselApp.tsx           # Carousel component
│   │   ├── login-form.tsx            # Login form
│   │   └── [other components]
│   │
│   ├── lib/                          # Libraries and utilities
│   │   ├── auth.tsx                  # Authentication context
│   │   ├── language.tsx              # Language/i18n context
│   │   ├── hooks/                    # Custom React hooks
│   │   │   └── useProjects.ts        # Projects data hook
│   │   ├── utils.ts                  # Utility functions
│   │   └── constants.ts              # Application constants
│   │
│   ├── hooks/                        # Global hooks
│   │   └── use-mobile.ts             # Mobile detection hook
│   │
│   ├── App.tsx                       # Main App component with routing
│   ├── main.tsx                      # React DOM entry point
│   └── App.css                       # Global styles
│
├── public/                           # Static assets
├── index.html                        # HTML entry point
├── vite.config.ts                    # Vite configuration
├── tsconfig.json                     # TypeScript configuration
├── tailwind.config.ts                # Tailwind CSS configuration
├── eslint.config.js                  # ESLint configuration
├── package.json                      # Dependencies and scripts
├── bun.lockb                         # Bun lock file
└── README.md                         # Project README
```

---

## Key Components

### Layout Component (`src/components/Layout.tsx`)
- **Purpose**: Main layout wrapper for all pages
- **Features**: Header, navigation, footer
- **Props**: Children components

### MarketPlaceApp (`src/components/MarketPlaceApp.tsx`)
- **Purpose**: Main marketplace for browsing and managing tokens
- **Features**: Token list, filtering, search, sorting
- **State**: Local state for filters and current page

### ProjectDetail (`src/components/ProjectDetail.tsx`)
- **Purpose**: Display detailed information about a specific project
- **Features**: Project description, team info, compliance documents, funding progress
- **Props**: Project data, language setting

### InvestmentSimulator (`src/components/InvestmentSimulator.tsx`)
- **Purpose**: Interactive calculator for investment ROI
- **Features**: Adjustable investment amount, ROI calculation, scenario analysis
- **State**: Investment parameters, calculated results

### ProjectHeroSection (`src/components/ProjectHeroSection.tsx`)
- **Purpose**: Hero section with image carousel
- **Features**: Image gallery, project title, description
- **Dependencies**: Embla Carousel, Motion

### HomePage (`src/components/HomePage.tsx`)
- **Purpose**: Landing/home page
- **Features**: Feature showcase, call-to-action, marketing content
- **State**: Theme and language state

### Profile (`src/components/Profile.tsx`)
- **Purpose**: User profile and settings
- **Features**: User information, avatar, preferences
- **Context**: Authentication context

### TokenManagement (`src/components/TokenManagement.tsx`)
- **Purpose**: Manage user tokens
- **Features**: Token list, transfer, burn operations
- **State**: Token inventory

---

## Setup & Installation

### Prerequisites
- **Node.js** 18+ or **Bun** installed
- **Git** for version control
- **npm** or **bun** package manager

### Installation Steps

#### Using Bun (Recommended)
```bash
# Clone the repository
git clone <repository-url>
cd tokena

# Install dependencies using Bun
bun install

# Start development server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview
```

#### Using npm
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Variables
Create a `.env` file in the root directory (if needed for future features):
```
VITE_API_URL=http://localhost:3000
VITE_WEB3_RPC_URL=https://mainnet.infura.io/v3/YOUR_KEY
```

---

## Build & Deployment

### Development Build
```bash
bun run dev
```
- Runs Vite dev server on `http://localhost:5173`
- Hot module replacement (HMR) enabled
- Source maps for debugging

### Production Build
```bash
bun run build
```
- Compiles TypeScript with `tsc -b`
- Bundles with Vite
- Optimizes for production
- Output: `dist/` directory

### Linting
```bash
bun run lint
```
- Runs ESLint to check code quality
- Enforces React best practices
- Checks TypeScript types

### Preview Build
```bash
bun run preview
```
- Serves production build locally
- Useful for testing before deployment

### Deployment Checklist
- [ ] Run `bun run lint` - fix all warnings
- [ ] Run `bun run build` - ensure build succeeds
- [ ] Run `bun run preview` - test production build
- [ ] Check bundle size in `dist/`
- [ ] Test all routes and features
- [ ] Update environment variables
- [ ] Deploy to hosting platform

---

## API Routes

### Current Routes (Client-side)

| Route | Page Component | Purpose |
|-------|---|---------|
| `/` | HomePage | Home page and landing |
| `/landing` | LandingPage | Marketing landing page |
| `/login` | LoginForm | User authentication |
| `/registrarse` | RegisterPage | User registration |
| `/profile` | Profile | User profile management |
| `/market` | MarketPlaceApp | Token marketplace |
| `/token` | TokenManagement | Token management |
| `/dashboard` | DashboardPage | Analytics dashboard |
| `/analytics` | AnalyticsPage | Advanced analytics |
| `/reports` | ReportsPage | Reports generation |
| `/portfolio` | PortfolioPage | Portfolio overview |
| `/invest/project[1-6]` | InvestProject[1-6]Page | Project investment pages |
| `/create` | CreateProjectPage | Project creation |
| `/trade` | TradePage | Token trading |
| `/auctions` | AuctionsPage | Token auctions |
| `/filantropy` | PhilanthropyPage | Philanthropic donations |
| `/investments` | InvestmentsPage | User investments |

### Future API Endpoints (To be implemented)
```
POST   /api/auth/login
POST   /api/auth/register
POST   /api/auth/logout
GET    /api/user/profile
PUT    /api/user/profile
GET    /api/tokens
GET    /api/tokens/:id
POST   /api/tokens/:id/buy
POST   /api/tokens/:id/sell
GET    /api/portfolio
GET    /api/projects
POST   /api/projects
GET    /api/projects/:id
PUT    /api/projects/:id
```

---

## Development Guidelines

### Code Style

#### TypeScript
- Strict mode enabled in `tsconfig.json`
- Use explicit type annotations for function parameters and return types
- Avoid using `any` type

```typescript
// ✅ Good
interface User {
  id: string;
  name: string;
  email: string;
}

const getUser = (id: string): User | null => {
  // implementation
};

// ❌ Avoid
const getUser = (id: any): any => {
  // implementation
};
```

#### React Components
- Use functional components with hooks
- Use TypeScript for prop interfaces

```typescript
// ✅ Good
interface CardProps {
  title: string;
  description?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ title, description, onClick }) => {
  return (
    <div onClick={onClick}>
      <h3>{title}</h3>
      {description && <p>{description}</p>}
    </div>
  );
};
```

#### Tailwind CSS
- Use utility classes for styling
- Follow mobile-first approach
- Use responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`

```jsx
// ✅ Good
<div className="p-4 md:p-6 lg:p-8 bg-emerald-600 hover:bg-emerald-700 rounded-lg">
  Content
</div>

// ❌ Avoid
<div style={{ padding: '16px' }}>
  Content
</div>
```

### Component Organization

1. **Page Components** (`src/app/`) - Full page components, handle routing
2. **Smart Components** (`src/components/`) - Container components with logic
3. **UI Components** (`src/components/ui/`) - Presentational components (shadcn/ui)
4. **Hooks** (`src/hooks/`, `src/lib/hooks/`) - Custom React hooks
5. **Utilities** (`src/lib/`) - Helper functions and constants

### File Naming Conventions

- **Components**: PascalCase (e.g., `HomePage.tsx`, `UserProfile.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useProjects.ts`)
- **Utils**: camelCase (e.g., `formatPrice.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS.ts`)
- **Types/Interfaces**: PascalCase (e.g., `User.ts`, `ProjectData.ts`)

### Commit Message Format

```
type(scope): subject

body

footer
```

**Types**: `feat`, `fix`, `refactor`, `docs`, `style`, `test`, `chore`

Example:
```
feat(investments): add investment simulator component

Added interactive ROI calculator with scenario analysis.
Supports multiple currency formats and localization.

Closes #123
```

### Testing Guidelines (Future)

- Unit tests for utilities and hooks using Vitest
- Component tests using React Testing Library
- E2E tests using Cypress or Playwright
- Aim for >80% code coverage

---

## Performance Optimizations

### Code Splitting

All pages are lazy-loaded using React's `lazy()` function:

```typescript
const MarketPlaceApp = lazy(() => import("@/components/MarketPlaceApp"))
```

Benefits:
- Smaller initial bundle
- Faster First Contentful Paint (FCP)
- Improved Core Web Vitals

### Image Optimization

- Use responsive images with `srcset`
- Lazy load images with `loading="lazy"`
- Optimize image sizes for different breakpoints

### Component Memoization

Use `React.memo()` for expensive components:

```typescript
const ExpensiveComponent = React.memo(({ data }: Props) => {
  return <div>{/* render */}</div>;
});
```

### CSS Optimization

- Tailwind CSS purges unused styles in production
- Utility-first approach minimizes CSS size
- Custom CSS kept to minimum in `App.css`

### Bundle Analysis

Check bundle size:
```bash
bun run build
# Check dist/ directory size
```

### Lighthouse Performance Targets

- **Largest Contentful Paint (LCP)**: < 2.5s
- **First Input Delay (FID)**: < 100ms
- **Cumulative Layout Shift (CLS)**: < 0.1

---

## Context Providers

### AuthProvider
```typescript
// Location: src/lib/auth.tsx
// Manages: User authentication state, login/logout
// Usage: <AuthProvider><App /></AuthProvider>
```

### LanguageProvider
```typescript
// Location: src/lib/language.tsx
// Manages: Language selection (ES/EN)
// Hook: useLanguage()
```

### ThemeProvider
```typescript
// Location: src/components/theme-provider.tsx
// Manages: Dark/Light theme
// Based on: next-themes
```

---

## Internationalization (i18n)

### Language Support
- **Spanish (ES)** - Default language
- **English (EN)** - Secondary language

### Implementation
- Uses `LanguageProvider` context
- Translation strings stored in components
- Hook: `useLanguage()` provides `t()` function

### Adding Translations

```typescript
const { t } = useLanguage();

// In render:
<h1>{t('key_name')}</h1>
```

---

## Browser Support

- **Chrome/Edge**: Latest 2 versions
- **Firefox**: Latest 2 versions
- **Safari**: Latest 2 versions
- **Mobile**: iOS Safari 12+, Chrome Android latest

---

## Troubleshooting

### Common Issues

#### Port 5173 already in use
```bash
bun run dev -- --port 3000
```

#### Build fails with TypeScript errors
```bash
# Clear cache and rebuild
bun run build --clean
```

#### Tailwind styles not applying
- Ensure `tailwind.config.ts` includes correct content paths
- Check Tailwind CSS version compatibility
- Clear cache: `bun run build --clean`

#### Hot Module Replacement (HMR) not working
- Check firewall settings
- Try: `bun run dev -- --host`

---

## Resources

- [React Documentation](https://react.dev)
- [React Router Documentation](https://reactrouter.com)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Radix UI Documentation](https://www.radix-ui.com)
- [Vite Documentation](https://vitejs.dev)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [Bun Documentation](https://bun.sh)

---

## Contact & Support

For questions, issues, or contributions, please refer to the project repository or contact the development team.

---

**Last Updated**: 2025-01-18
**Project Version**: 0.0.0
**Documentation Version**: 1.0
