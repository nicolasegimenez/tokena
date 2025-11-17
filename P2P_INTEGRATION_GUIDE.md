# P2P Trading Page Enhancement - Integration Guide

## Overview

This guide explains how to integrate the new enhanced P2P trading components into your existing Investoken platform. The new components provide advanced features like seller ratings, favorites, comparison tools, order history tracking, and comprehensive trading statistics.

## New Components Created

### 1. **EnhancedListingCard.tsx**
Enhanced version of the listing card with:
- Seller trust indicators (rating, review count, verification badge)
- Favorite/wishlist toggle
- Comparison checkbox
- Availability progress indicator
- Better visual hierarchy

**Props:**
```typescript
interface EnhancedListingCardProps {
  listing: EnhancedListing;
  onBuyClick: (listing: EnhancedListing) => void;
  onFavoriteClick?: (listing: EnhancedListing) => void;
  onCompareClick?: (listing: EnhancedListing) => void;
  isFavorited?: boolean;
  isComparing?: boolean;
  categoryIcon: React.ComponentType<any>;
}
```

**File Location:** `src/components/EnhancedListingCard.tsx`

---

### 2. **AdvancedFilters.tsx**
Comprehensive filter component with:
- Full-text search with debounce
- Price range slider
- Multi-select categories
- Payment method filters
- Minimum seller rating filter
- Availability status filter
- Save/load filter presets
- Active filter counter

**Props:**
```typescript
interface AdvancedFiltersProps {
  onFilterChange: (filters: FilterState) => void;
  onReset?: () => void;
  categories: { id: string; label: string }[];
  paymentMethods: string[];
  isCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
}
```

**File Location:** `src/components/AdvancedFilters.tsx`

---

### 3. **FavoritesAndComparison.tsx**
Dual-panel component for:
- Viewing and managing favorites
- Side-by-side comparison table
- Price analysis summary
- Quick actions (buy, compare)

**Props:**
```typescript
interface FavoritesAndComparisonProps {
  favorites: FavoriteListing[];
  comparisons: ComparisonListing[];
  onRemoveFavorite: (id: string) => void;
  onRemoveComparison: (id: string) => void;
  onAddToCart?: (listing: FavoriteListing | ComparisonListing) => void;
}
```

**File Location:** `src/components/FavoritesAndComparison.tsx`

---

### 4. **OrderHistory.tsx**
Comprehensive transaction tracking with:
- Filterable order list (buy/sell/all)
- Expandable order details
- Transaction stats dashboard
- Invoice download support
- Order status tracking

**Props:**
```typescript
interface OrderHistoryProps {
  transactions: Transaction[];
}
```

**File Location:** `src/components/OrderHistory.tsx`

---

### 5. **TradingStatsDashboard.tsx**
Analytics dashboard featuring:
- Key metrics cards (invested, earned, success rate)
- Performance progress bars
- Portfolio distribution breakdown
- Seller metrics summary
- Recent activity timeline

**Props:**
```typescript
interface TradingStatsDashboardProps {
  stats: DashboardStats;
}
```

**File Location:** `src/components/TradingStatsDashboard.tsx`

---

## Integration Steps

### Step 1: Update the Trade Page Component

Replace the existing `ListingCard` in your trade page with `EnhancedListingCard`. Here's how:

```typescript
// OLD
import { ListingCard } from '@/components/...';

// NEW
import { EnhancedListingCard } from '@/components/EnhancedListingCard';
import { AdvancedFilters } from '@/components/AdvancedFilters';
import { FavoritesAndComparison } from '@/components/FavoritesAndComparison';
```

### Step 2: Update Component Usage in Trade Page

Replace the old filter section:

```typescript
// OLD CODE (REMOVE)
<SectionCard
  title={t('filters')}
  description="Refina tu búsqueda"
>
  {/* Old filters */}
</SectionCard>

// NEW CODE (REPLACE WITH)
<AdvancedFilters
  onFilterChange={handleAdvancedFilterChange}
  onReset={handleResetFilters}
  categories={[
    { id: 'real-estate', label: 'Bienes Raíces' },
    { id: 'energy', label: 'Energía' },
    { id: 'venture-capital', label: 'Capital de Riesgo' },
    { id: 'crypto', label: 'Cripto' },
    { id: 'collectibles', label: 'Coleccionables' },
  ]}
  paymentMethods={['Transferencia bancaria', 'MercadoPago', 'USDT', 'BTC', 'ETH']}
  isCollapsed={filterCollapsed}
  onCollapsedChange={setFilterCollapsed}
/>
```

### Step 3: Update Listing Card Rendering

Replace listing card rendering:

```typescript
// OLD CODE
{filteredListings.map((listing) => (
  <ListingCard key={listing.id} listing={listing} onBuyClick={handleBuyClick} />
))}

// NEW CODE
{filteredListings.map((listing) => (
  <EnhancedListingCard
    key={listing.id}
    listing={{
      ...listing,
      seller: {
        name: listing.seller,
        rating: 4.5, // Get from API
        reviewCount: 127, // Get from API
        isVerified: true, // Get from API
        responseTime: '2 horas', // Get from API
        totalSales: 1200, // Get from API
      },
      isBestPrice: isPriceLowest(listing),
      availabilityPercent: (listing.quantity / 500) * 100,
    }}
    onBuyClick={handleBuyClick}
    onFavoriteClick={handleToggleFavorite}
    onCompareClick={handleToggleComparison}
    isFavorited={isFavorited(listing.id)}
    isComparing={isComparing(listing.id)}
    categoryIcon={categoryIcons[listing.category]}
  />
))}
```

### Step 4: Add State Management for New Features

Add these states to your trade page component:

```typescript
// Favorites
const [favorites, setFavorites] = useState<FavoriteListing[]>([]);

// Comparisons
const [comparisons, setComparisons] = useState<ComparisonListing[]>([]);

// Order History
const [transactions, setTransactions] = useState<Transaction[]>([]);

// Advanced Filters
const [advancedFilters, setAdvancedFilters] = useState<FilterState>({
  searchTerm: '',
  priceRange: [0, 1000],
  categories: [],
  paymentMethods: [],
  minRating: 0,
  availability: [],
  minSales: 0,
});

// Handlers
const handleToggleFavorite = (listing: EnhancedListing) => {
  if (favorites.some(f => f.id === listing.id)) {
    setFavorites(favorites.filter(f => f.id !== listing.id));
  } else {
    setFavorites([...favorites, {
      id: listing.id,
      projectName: listing.projectName,
      tokenSymbol: listing.tokenSymbol,
      pricePerToken: listing.pricePerToken,
      image: listing.image,
      category: listing.category,
      seller: listing.seller.name,
      addedDate: new Date(),
    }]);
  }
};

const handleToggleComparison = (listing: EnhancedListing) => {
  if (comparisons.some(c => c.id === listing.id)) {
    setComparisons(comparisons.filter(c => c.id !== listing.id));
  } else if (comparisons.length < 4) { // Limit to 4 items
    setComparisons([...comparisons, {
      id: listing.id,
      projectName: listing.projectName,
      tokenSymbol: listing.tokenSymbol,
      pricePerToken: listing.pricePerToken,
      quantity: listing.quantity,
      category: listing.category,
      seller: listing.seller.name,
      paymentMethods: listing.paymentMethods,
      totalDuration: listing.totalDuration,
    }]);
  }
};

const handleAdvancedFilterChange = (filters: FilterState) => {
  setAdvancedFilters(filters);
  // Apply filters to listings
  const filtered = applyAdvancedFilters(marketProjects, filters);
  setFilteredListings(filtered);
};
```

### Step 5: Add New Tabs for Additional Features

Update your tabs section:

```typescript
<Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
  <TabsList className="grid w-full grid-cols-4 mb-8">
    <TabsTrigger value="buy">Comprar Tokens</TabsTrigger>
    <TabsTrigger value="sell">Vender Mis Tokens</TabsTrigger>
    <TabsTrigger value="favorites">Favoritos ({favorites.length})</TabsTrigger>
    <TabsTrigger value="history">Historial</TabsTrigger>
  </TabsList>

  <TabsContent value="buy">{/* Existing buy content */}</TabsContent>

  <TabsContent value="sell">{/* Existing sell content */}</TabsContent>

  <TabsContent value="favorites">
    <FavoritesAndComparison
      favorites={favorites}
      comparisons={comparisons}
      onRemoveFavorite={(id) => setFavorites(favorites.filter(f => f.id !== id))}
      onRemoveComparison={(id) => setComparisons(comparisons.filter(c => c.id !== id))}
      onAddToCart={handleBuyClick}
    />
  </TabsContent>

  <TabsContent value="history">
    <TradingStatsDashboard stats={calculateStats()} />
    <OrderHistory transactions={transactions} />
  </TabsContent>
</Tabs>
```

## Data Types to Implement

### Enhanced Listing Type

```typescript
interface EnhancedListing {
  id: string;
  projectName: string;
  tokenSymbol: string;
  quantity: number;
  pricePerToken: number;
  seller: SellerInfo;
  image: string;
  category: string;
  marketUrl: string;
  paymentMethods: string[];
  totalDuration: string;
  isBestPrice?: boolean;
  availabilityPercent?: number;
  priceHistory?: { date: string; price: number }[];
}

interface SellerInfo {
  name: string;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  responseTime: string;
  totalSales: number;
}

interface FavoriteListing {
  id: string;
  projectName: string;
  tokenSymbol: string;
  pricePerToken: number;
  image: string;
  category: string;
  seller: string;
  addedDate: Date;
}

interface ComparisonListing {
  id: string;
  projectName: string;
  tokenSymbol: string;
  pricePerToken: number;
  quantity: number;
  category: string;
  seller: string;
  paymentMethods: string[];
  totalDuration: string;
}

interface Transaction {
  id: string;
  type: 'buy' | 'sell';
  projectName: string;
  tokenSymbol: string;
  quantity: number;
  pricePerToken: number;
  totalAmount: number;
  seller?: string;
  buyer?: string;
  paymentMethod: string;
  status: 'pending' | 'completed' | 'cancelled' | 'processing';
  date: Date;
  completionDate?: Date;
  invoiceUrl?: string;
}

interface DashboardStats {
  totalInvested: number;
  totalEarned: number;
  activeOrders: number;
  completedOrders: number;
  averageOrderValue: number;
  successRate: number;
  recentActivity: Array<{
    id: string;
    type: 'buy' | 'sell';
    amount: number;
    date: Date;
    projectName: string;
  }>;
  portfolioDistribution: Array<{
    category: string;
    value: number;
    percentage: number;
  }>;
  averageResponseTime?: string;
  trustScore?: number;
}
```

## API Integration Points

These components are ready for API integration:

### 1. **Seller Information**
- Current: Mock data in listing
- Integration: Fetch from `/api/sellers/{sellerId}`

### 2. **Favorites Storage**
- Current: Local state
- Integration: Save to `/api/user/favorites` using `useCache` hook

### 3. **Filter Presets**
- Current: Local state (savedFilters)
- Integration: Persist to `/api/user/filter-presets`

### 4. **Order History**
- Current: Mock data
- Integration: Fetch from `/api/user/transactions`

### 5. **Transaction Status**
- Current: Static
- Integration: Use `useOfflineDetection` hook for real-time updates

## Customization Examples

### 1. Change Theme Colors
All components use Tailwind CSS classes with emerald/teal theme. Replace:
```typescript
// In each component
'from-emerald-600 to-teal-600'  // Primary
'bg-emerald-50'                  // Light background
'text-emerald-400'               // Text color
```

### 2. Add Custom Validation
```typescript
// In AdvancedFilters
const validateFilters = (filters: FilterState) => {
  if (filters.priceRange[0] > filters.priceRange[1]) {
    showError('Invalid price range');
    return false;
  }
  return true;
};
```

### 3. Implement Search Debounce
```typescript
import { useCallback, useRef } from 'react';

const useDebounce = (callback: Function, delay: number) => {
  const timeoutRef = useRef<NodeJS.Timeout>();

  return useCallback((...args: any[]) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => callback(...args), delay);
  }, [callback, delay]);
};
```

## Performance Optimization

### 1. Lazy Loading Images
```typescript
const [imageLoaded, setImageLoaded] = useState(false);

<img
  onLoad={() => setImageLoaded(true)}
  className={cn(!imageLoaded && 'opacity-0')}
/>
```

### 2. Memoization
```typescript
import { useMemo } from 'react';

const filteredListings = useMemo(
  () => applyFilters(listings, advancedFilters),
  [listings, advancedFilters]
);
```

### 3. Pagination
```typescript
const PAGE_SIZE = 12;
const currentPage = Math.ceil(listings.length / PAGE_SIZE);

const paginatedListings = listings.slice(
  (currentPage - 1) * PAGE_SIZE,
  currentPage * PAGE_SIZE
);
```

## Testing Checklist

- [ ] Listing cards render with seller information
- [ ] Favorites can be added/removed
- [ ] Comparison shows correct price differences
- [ ] Filters persist when applied
- [ ] Search is case-insensitive
- [ ] Order history displays correctly
- [ ] Stats dashboard calculates properly
- [ ] Responsive on mobile/tablet/desktop
- [ ] Dark mode works for all components
- [ ] Animations perform smoothly

## Deployment Notes

1. **Dependencies**: All new components use existing dependencies
   - `framer-motion` (already installed)
   - `lucide-react` (already installed)
   - `@radix-ui/*` components (already installed)

2. **No Breaking Changes**: New components are additions, not replacements
   - Keep your existing trade page working alongside new features
   - Gradually migrate to new components

3. **Database Updates**: When connecting to API:
   - Add seller rating table
   - Add favorites table with user_id, listing_id
   - Add transaction history table
   - Update listing table with seller_id foreign key

## Support & Maintenance

For updates or issues:
1. Check component prop interfaces for required data
2. Ensure API endpoints return correct data structure
3. Use browser DevTools to inspect component state
4. Refer to TypeScript types for data validation

---

## Quick Reference: Component Usage

```typescript
// Import all new components
import { EnhancedListingCard } from '@/components/EnhancedListingCard';
import { AdvancedFilters } from '@/components/AdvancedFilters';
import { FavoritesAndComparison } from '@/components/FavoritesAndComparison';
import { OrderHistory } from '@/components/OrderHistory';
import { TradingStatsDashboard } from '@/components/TradingStatsDashboard';

// Use in your page
export default function EnhancedTradePage() {
  const [favorites, setFavorites] = useState([]);
  const [comparisons, setComparisons] = useState([]);
  const [transactions, setTransactions] = useState([]);

  return (
    <>
      <AdvancedFilters
        onFilterChange={handleFilterChange}
        categories={categoriesList}
        paymentMethods={paymentMethodsList}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map(listing => (
          <EnhancedListingCard
            key={listing.id}
            listing={listing}
            onBuyClick={handleBuy}
            onFavoriteClick={handleFavorite}
            onCompareClick={handleCompare}
            isFavorited={favorites.some(f => f.id === listing.id)}
            isComparing={comparisons.some(c => c.id === listing.id)}
            categoryIcon={getCategoryIcon(listing.category)}
          />
        ))}
      </div>

      <FavoritesAndComparison
        favorites={favorites}
        comparisons={comparisons}
        onRemoveFavorite={removeFavorite}
        onRemoveComparison={removeComparison}
      />

      <OrderHistory transactions={transactions} />

      <TradingStatsDashboard stats={dashboardStats} />
    </>
  );
}
```

---

**Last Updated:** 2024
**Version:** 1.0
