# TOKENA - shadcn/ui Components Reference

## Overview

This project uses **shadcn/ui** (version 3.5.0) as the primary UI component library. shadcn/ui is a collection of unstyled, customizable, and reusable React components built on top of **Radix UI** and styled with **Tailwind CSS**.

---

## Installation & Setup

### Initial Setup (Already Done)
```bash
# shadcn/ui CLI was used to initialize components
npx shadcn-ui@latest init

# Add specific components
npx shadcn-ui@latest add [component-name]
```

### Using Components in Project
```typescript
// Import from @/components/ui/
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
```

---

## Installed Components

### 1. **Button**
**Path**: `src/components/ui/button.tsx`

**Use Cases**: Actions, form submission, navigation
```typescript
import { Button } from '@/components/ui/button'

// Primary
<Button>Click me</Button>

// Variants
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Delete</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon">🔍</Button>

// Disabled
<Button disabled>Disabled</Button>

// With icons
<Button>
  <ArrowUpRight className="mr-2 h-4 w-4" />
  Invest
</Button>
```

### 2. **Card**
**Path**: `src/components/ui/card.tsx`

**Use Cases**: Content containers, project cards, summary boxes
```typescript
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

<Card>
  <CardHeader>
    <CardTitle>Project Title</CardTitle>
    <CardDescription>Project description goes here</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
</Card>

// With custom styling
<Card className="border-2 hover:border-emerald-200">
  {/* Content */}
</Card>
```

### 3. **Input**
**Path**: `src/components/ui/input.tsx`

**Use Cases**: Text input, search, form fields
```typescript
import { Input } from '@/components/ui/input'

<Input
  type="text"
  placeholder="Enter amount"
  value={amount}
  onChange={(e) => setAmount(e.target.value)}
/>

// Input types
<Input type="email" placeholder="Email" />
<Input type="password" placeholder="Password" />
<Input type="number" min="100" max="100000" />
<Input type="text" disabled />
```

### 4. **Label**
**Path**: `src/components/ui/label.tsx`

**Use Cases**: Form labels with accessibility
```typescript
import { Label } from '@/components/ui/label'

<div>
  <Label htmlFor="email">Email Address</Label>
  <Input id="email" type="email" />
</div>
```

### 5. **Select**
**Path**: `src/components/ui/select.tsx`

**Use Cases**: Dropdown selections, filtering
```typescript
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select a project" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="project1">Project 1</SelectItem>
    <SelectItem value="project2">Project 2</SelectItem>
  </SelectContent>
</Select>
```

### 6. **Checkbox**
**Path**: `src/components/ui/checkbox.tsx`

**Use Cases**: Toggles, agreement checkboxes, filters
```typescript
import { Checkbox } from '@/components/ui/checkbox'

<div className="flex items-center space-x-2">
  <Checkbox id="agree" />
  <label htmlFor="agree">I agree to terms</label>
</div>
```

### 7. **Avatar**
**Path**: `src/components/ui/avatar.tsx`

**Use Cases**: User profiles, team members, author images
```typescript
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

<Avatar>
  <AvatarImage src="https://example.com/avatar.jpg" alt="User" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

### 8. **Badge**
**Path**: `src/components/ui/badge.tsx`

**Use Cases**: Status labels, tags, categories
```typescript
import { Badge } from '@/components/ui/badge'

// Variants
<Badge>Default</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>

// Examples
<Badge className="bg-emerald-500">Active</Badge>
<Badge className="bg-blue-500">Pending</Badge>
```

### 9. **Dialog**
**Path**: `src/components/ui/dialog.tsx`

**Use Cases**: Modals, confirmations, forms
```typescript
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Confirm Action</DialogTitle>
      <DialogDescription>
        Are you sure you want to proceed?
      </DialogDescription>
    </DialogHeader>
    {/* Content */}
  </DialogContent>
</Dialog>
```

### 10. **Tabs**
**Path**: `src/components/ui/tabs.tsx`

**Use Cases**: Tabbed content, navigation
```typescript
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

<Tabs defaultValue="simulator">
  <TabsList>
    <TabsTrigger value="simulator">Simulator</TabsTrigger>
    <TabsTrigger value="projections">Projections</TabsTrigger>
  </TabsList>
  <TabsContent value="simulator">
    {/* Simulator content */}
  </TabsContent>
  <TabsContent value="projections">
    {/* Projections content */}
  </TabsContent>
</Tabs>
```

### 11. **Table**
**Path**: `src/components/ui/table.tsx`

**Use Cases**: Data tables, investment lists, transaction history
```typescript
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Asset</TableHead>
      <TableHead>Value</TableHead>
      <TableHead>Change</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Token A</TableCell>
      <TableCell>$1,000</TableCell>
      <TableCell>+5%</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### 12. **Separator**
**Path**: `src/components/ui/separator.tsx`

**Use Cases**: Visual dividers, section breaks
```typescript
import { Separator } from '@/components/ui/separator'

<div>
  <div>Section 1</div>
  <Separator />
  <div>Section 2</div>
</div>
```

### 13. **Scroll Area**
**Path**: `src/components/ui/scroll-area.tsx`

**Use Cases**: Scrollable content areas, long lists
```typescript
import { ScrollArea } from '@/components/ui/scroll-area'

<ScrollArea className="h-72 w-48 rounded-md border p-4">
  {/* Long content */}
</ScrollArea>
```

### 14. **Toggle**
**Path**: `src/components/ui/toggle.tsx`

**Use Cases**: Button toggles, theme switching
```typescript
import { Toggle } from '@/components/ui/toggle'

<Toggle>
  <Bold className="h-4 w-4" />
</Toggle>

// Variants
<Toggle variant="outline">Outline</Toggle>
```

### 15. **Toggle Group**
**Path**: `src/components/ui/toggle-group.tsx`

**Use Cases**: Option selection, view switching
```typescript
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

<ToggleGroup type="single">
  <ToggleGroupItem value="list">List</ToggleGroupItem>
  <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
</ToggleGroup>
```

### 16. **Dropdown Menu**
**Path**: `src/components/ui/dropdown-menu.tsx`

**Use Cases**: Context menus, user actions
```typescript
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost">Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Edit</DropdownMenuItem>
    <DropdownMenuItem>Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### 17. **Tooltip**
**Path**: `src/components/ui/tooltip.tsx`

**Use Cases**: Helper text, explanations
```typescript
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button>Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Helpful information</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

### 18. **Navigation Menu**
**Path**: `src/components/ui/navigation-menu.tsx`

**Use Cases**: Main navigation, menu bar
```typescript
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu'

<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Products</NavigationMenuTrigger>
      <NavigationMenuContent>
        {/* Menu content */}
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

### 19. **Menubar**
**Path**: `src/components/ui/menubar.tsx`

**Use Cases**: Application menu bar
```typescript
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar'

<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>New</MenubarItem>
      <MenubarItem>Open</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>
```

### 20. **Switch**
**Path**: `src/components/ui/switch.tsx`

**Use Cases**: Toggle settings, boolean inputs
```typescript
import { Switch } from '@/components/ui/switch'

<div className="flex items-center space-x-2">
  <Switch id="notifications" />
  <label htmlFor="notifications">Enable notifications</label>
</div>
```

### 21. **Skeleton**
**Path**: `src/components/ui/skeleton.tsx`

**Use Cases**: Loading placeholders, skeleton screens
```typescript
import { Skeleton } from '@/components/ui/skeleton'

<div>
  <Skeleton className="h-12 w-12 rounded-full" />
  <Skeleton className="h-4 w-3/4 mt-2" />
</div>
```

---

## Custom Components Built with shadcn/ui

### ProjectHeroSection
**Path**: `src/components/ProjectHeroSection.tsx`

**Description**: Hero section with image carousel for projects
**Dependencies**: Embla Carousel, Motion
**Features**:
- Image gallery with carousel
- Project title and description
- Responsive design

### InvestmentSimulator
**Path**: `src/components/InvestmentSimulator.tsx`

**Description**: Interactive investment calculator
**Features**:
- Adjustable investment amount slider
- ROI calculation
- Scenario analysis (Conservative/Expected/Optimistic)
- Real-time calculations

### CarouselApp
**Path**: `src/components/CarouselApp.tsx`

**Description**: Custom carousel component
**Dependencies**: Embla Carousel, Motion

### MarketPlaceApp
**Path**: `src/components/MarketPlaceApp.tsx`

**Description**: Token marketplace component
**Features**:
- Token list with filtering
- Search functionality
- Sorting options
- Responsive grid layout

---

## Styling with Tailwind + shadcn/ui

### Color Palette
```
Primary Colors:
- Emerald (Green): from-emerald-50 to emerald-950
- Teal: from-teal-50 to teal-950
- Blue: blue-50 to blue-600
- Red: red-50 to red-600

Neutral Colors:
- Slate: slate-50 to slate-950
- Gray: gray-50 to gray-950
```

### Common Pattern: Gradient Cards
```typescript
<Card className="border-2 bg-gradient-to-br from-emerald-50 to-teal-50
  dark:from-emerald-950/20 dark:to-teal-950/20 border-emerald-200
  dark:border-emerald-800 hover:border-emerald-200">
  {/* Content */}
</Card>
```

### Responsive Classes
```typescript
// Mobile-first approach
<div className="p-4 md:p-6 lg:p-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* Content */}
</div>
```

### Dark Mode
```typescript
// Automatically handled by ThemeProvider
<div className="bg-white dark:bg-slate-900 text-black dark:text-white">
  {/* Content */}
</div>
```

---

## Adding New Components

### Using shadcn CLI
```bash
# Add a new component from shadcn registry
bun run shadcn add component-name

# Example
bun run shadcn add drawer
```

### Component List Available
Visit https://ui.shadcn.com for full list of available components

---

## Best Practices

### 1. Use Semantic Components
```typescript
// ✅ Good - Uses semantic HTML
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>

// ❌ Avoid - Generic divs
<div className="card">
  <div className="card-header">Title</div>
</div>
```

### 2. Leverage Component Composition
```typescript
// ✅ Good - Composable
<Card>
  <CardHeader>Header</CardHeader>
  <CardContent>Content</CardContent>
</Card>

// ❌ Avoid - Overloading props
<CustomCard header="Header" content="Content" footer="Footer" ... />
```

### 3. Use Variants Appropriately
```typescript
// ✅ Good - Clear intent
<Button variant="destructive">Delete</Button>
<Badge className="bg-red-500">Error</Badge>

// ❌ Avoid - Unclear styling
<Button style={{ backgroundColor: 'red' }}>Delete</Button>
```

### 4. Consistent Spacing
```typescript
// ✅ Good - Consistent spacing
<div className="space-y-4">
  <Card />
  <Card />
  <Card />
</div>

// ❌ Avoid - Inconsistent margins
<div>
  <Card style={{ marginBottom: '20px' }} />
  <Card style={{ marginBottom: '10px' }} />
</div>
```

### 5. Accessibility
```typescript
// ✅ Good - Accessible
<label htmlFor="email">Email</label>
<Input id="email" type="email" aria-label="Email address" />

// ❌ Avoid - Not accessible
<Input type="email" />
```

---

## Performance Tips

1. **Import Only What You Need**
```typescript
// ✅ Good - Specific import
import { Button } from '@/components/ui/button'

// ❌ Avoid - Importing everything
import * as UI from '@/components/ui'
```

2. **Use Lazy Loading for Heavy Components**
```typescript
const InvestmentSimulator = lazy(() => import('@/components/InvestmentSimulator'))
```

3. **Memoize Complex Components**
```typescript
const Card = React.memo(CardComponent)
```

---

## Troubleshooting

### Styles Not Applying
1. Check if Tailwind CSS is properly configured
2. Ensure component is imported from `@/components/ui/`
3. Clear cache: `rm -rf node_modules/.vite`
4. Rebuild: `bun run build --clean`

### Component Not Found
```bash
# Add missing component
bun run shadcn add component-name
```

### Dark Mode Not Working
- Check `ThemeProvider` is wrapping app
- Ensure `next-themes` is properly configured
- Check `tailwind.config.ts` has dark mode enabled

---

## Resources

- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Radix UI Primitives](https://www.radix-ui.com)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Component Examples](https://ui.shadcn.com/docs/installation)

---

**Last Updated**: 2025-01-18
