# TOKENA - Quick Commands Reference

## Essential Commands

### Project Setup

```bash
# Install dependencies
bun install

# Install specific package
bun add package-name

# Remove package
bun remove package-name
```

### Development

```bash
# Start dev server (http://localhost:5173)
bun run dev

# With custom port
bun run dev -- --port 3000

# With hot reload
bun run dev -- --host
```

### Building

```bash
# Build for production
bun run build

# Build with source maps (for debugging)
bun run build -- --sourcemap

# Preview production build
bun run preview

# Preview on custom port
bun run preview -- --port 4000
```

### Code Quality

```bash
# Run linter
bun run lint

# Fix linting issues automatically
bun run lint -- --fix

# Check for TypeScript errors
bun run build  # First step of build runs tsc
```

### Dependencies

```bash
# List installed dependencies
bun list

# Show dependency tree
bun list --depth 2

# Check for outdated packages
bun outdated

# Update all packages
bun update

# Update specific package
bun update package-name

# Check for security vulnerabilities
bun audit

# Clear Bun cache
bun pm cache clear
```

---

## Development Workflow

### Starting Fresh
```bash
# 1. Clone and setup
git clone <repo>
cd tokena

# 2. Install dependencies
bun install

# 3. Start dev server
bun run dev

# 4. Open http://localhost:5173
```

### Making Changes
```bash
# 1. Make code changes
# 2. Dev server automatically reloads (HMR)

# 3. Check for errors
bun run lint

# 4. Fix errors
bun run lint -- --fix
```

### Before Committing
```bash
# 1. Run full linter
bun run lint

# 2. Build to check for errors
bun run build

# 3. Preview production build
bun run preview

# 4. Commit changes
git add .
git commit -m "feat: description"
git push
```

---

## Common Tasks

### Add New Component from shadcn
```bash
# Add Button component
bun run shadcn add button

# Add multiple components
bun run shadcn add card input select
```

### Add New Dependency
```bash
# Production dependency
bun add lodash

# Dev dependency
bun add -d @types/lodash

# Specific version
bun add axios@1.4.0
```

### Fix Build Issues
```bash
# Clear cache and rebuild
rm -rf node_modules dist
bun install
bun run build

# Or just
rm bun.lockb
bun install
bun run build
```

### Debug Build
```bash
# Build with verbose output
bun run build --verbose

# Build with source maps
bun run build -- --sourcemap

# Analyze bundle
bun run build
# Check dist/ folder size
```

---

## Git Workflow

### Creating a Feature Branch
```bash
git checkout main
git pull origin main
git checkout -b feature/component-name

# Make changes
bun run dev

# Test and lint
bun run lint -- --fix
bun run build

# Commit and push
git add .
git commit -m "feat: add new component"
git push origin feature/component-name

# Create pull request
```

### Syncing with Main
```bash
git fetch origin
git rebase origin/main
```

### Resolving Conflicts
```bash
# After merge conflict markers appear
# 1. Edit conflicting files
# 2. Resolve conflicts
# 3. Run tests to verify
bun run lint
bun run build

# 4. Complete merge
git add .
git commit -m "resolve merge conflicts"
```

---

## Troubleshooting Commands

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5173
kill -9 <PID>

# Or just use different port
bun run dev -- --port 3000
```

### Clear Everything and Reinstall
```bash
# Complete fresh install
rm -rf node_modules dist bun.lockb
bun install
bun run build
```

### TypeScript Cache Issues
```bash
# Rebuild TypeScript
bun run build

# Or clean build
rm -rf dist
bun run build
```

### Check TypeScript Errors
```bash
# Run type checker
tsc --noEmit

# Or build which includes type checking
bun run build
```

### Memory Issues
```bash
# Increase Node memory (if needed)
bun --max-old-space-size=4096 run build

# Or just use Bun (faster and less memory)
bun run build
```

---

## Useful Flags

### Bun Commands
```bash
bun add -d         # Add as dev dependency
bun add -p         # Add as peer dependency
bun remove -d      # Remove dev dependency
bun list --depth N # Show dependency tree depth
```

### Dev Server
```bash
bun run dev --port 3000      # Custom port
bun run dev --host           # Listen on all IPs
bun run dev --open           # Auto open browser
bun run dev --force          # Force clear cache
```

### Build
```bash
bun run build --minify       # Minify output
bun run build --sourcemap    # Include source maps
bun run build --analyze      # Analyze bundle (if configured)
```

---

## Checking Installation

```bash
# Check Bun version
bun --version

# Check Node version (if using Node runtime)
node --version

# Check npm version (if using npm)
npm --version

# Check installed packages
bun list

# Check Bun location
which bun
```

---

## Performance Commands

### Build Performance
```bash
# Measure build time
time bun run build

# Build in production mode
bun run build

# Check bundle size
bun run build
# Then check dist/ folder
```

### Development Performance
```bash
# Start dev with verbose logging
bun run dev --verbose

# Check what's slow
# Use React DevTools in browser
# Check Network tab for slow requests
# Check Console for errors
```

---

## Documentation & Help

```bash
# View available npm scripts
bun run --list

# Bun help
bun --help

# Bun documentation
bun docs

# Check specific package
bun info package-name

# View Bun version
bun --version

# View TypeScript version
bun run tsc --version
```

---

## Environment Variables

### Using .env file
```bash
# Create .env file in project root
# Add variables:
VITE_API_URL=http://localhost:3000
VITE_WEB3_RPC_URL=https://...

# Use in code:
import.meta.env.VITE_API_URL

# Or in .env.local for local-only variables
# Or in .env.production for production
```

### Check Environment
```bash
# Check current environment
echo $NODE_ENV  # or %NODE_ENV% on Windows

# Set environment
NODE_ENV=production bun run build
```

---

## Lock File Management

### Working with bun.lockb
```bash
# Update lock file
bun install

# Regenerate lock file
rm bun.lockb
bun install

# Check if dependencies match lock file
bun install --frozen-lockfile

# Update specific package
bun update package-name
```

---

## Code Quality Shortcuts

### Quick Quality Check
```bash
# Check everything before committing
bun run lint && bun run build && echo "All good!"

# Or with auto-fix
bun run lint -- --fix && bun run build
```

### Format Code (if Prettier configured)
```bash
# Format all files
bun prettier --write "src/**/*.{ts,tsx,css,md}"

# Format specific file
bun prettier --write "src/App.tsx"
```

---

## Advanced Commands

### Working with Git Hooks
```bash
# Install husky (if configured)
bun install

# Pre-commit hook runs linter automatically
```

### Running Tests (when configured)
```bash
# Run Vitest
bun test

# Run with coverage
bun test --coverage

# Run in watch mode
bun test --watch
```

### TypeScript Watch Mode
```bash
# Watch TypeScript compilation
tsc --watch

# Or through vite
bun run dev  # Already in watch mode
```

---

## Cheat Sheet

| Task | Command |
|------|---------|
| Start dev | `bun run dev` |
| Build prod | `bun run build` |
| Check quality | `bun run lint` |
| Install deps | `bun install` |
| Add package | `bun add package-name` |
| Remove package | `bun remove package-name` |
| Fix lint errors | `bun run lint -- --fix` |
| Preview build | `bun run preview` |
| Update deps | `bun update` |
| Check outdated | `bun outdated` |
| Security audit | `bun audit` |
| List deps | `bun list` |
| Clear cache | `bun pm cache clear` |

---

## Command Aliases (Optional)

Add to `.bashrc`, `.zshrc`, or similar:

```bash
# Development
alias dev="bun run dev"
alias build="bun run build"
alias lint="bun run lint"
alias preview="bun run preview"

# Package management
alias bi="bun install"
alias ba="bun add"
alias br="bun remove"
alias bu="bun update"

# Git
alias gs="git status"
alias ga="git add ."
alias gc="git commit -m"
alias gp="git push"
alias gd="git diff"
```

Usage:
```bash
dev          # Runs: bun run dev
build        # Runs: bun run build
lint         # Runs: bun run lint
ba lodash    # Runs: bun add lodash
```

---

## Documentation Files Reference

| File | Purpose |
|------|---------|
| README_DOCUMENTATION.md | Start here - Navigation guide |
| TECHNICAL_DOCUMENTATION.md | Full technical reference |
| ARCHITECTURE.md | System design and patterns |
| SHADCN_COMPONENTS.md | UI components guide |
| BUN_SETUP.md | Build and packages guide |
| CLEANUP_SUMMARY.md | Code cleanup report |
| QUICK_COMMANDS.md | This file - Command reference |

---

## Quick Links

- [Bun Documentation](https://bun.sh)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Vite](https://vitejs.dev)
- [TypeScript](https://www.typescriptlang.org)

---

**Last Updated**: 2025-01-18
**Project**: TOKENA
**Status**: Ready for Development

For detailed information, see the main documentation files.
