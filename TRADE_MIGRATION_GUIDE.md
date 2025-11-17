# Guía de Migración - Trade Page Refactorizada

## 📋 Introducción

Este documento ayuda a los desarrolladores a entender la nueva estructura de la página de trade y cómo trabajar con ella.

## 🏗️ Nueva Arquitectura

### Antes (Monolito)
```
src/app/trade/page.tsx (800+ líneas)
  ├── Estados (20+ uses)
  ├── Funciones manejadores (10+)
  ├── Componentes internos (5)
  └── Lógica de filtrado (compleja)
```

### Después (Modular)
```
src/app/trade/page.tsx (250 líneas - componedor)
├── src/hooks/useTradePage.ts (lógica completa)
├── src/components/TradeHeader.tsx
├── src/components/TradeFilters.tsx
├── src/components/SellTokenForm.tsx
├── src/components/EnhancedListingCard.tsx
├── src/components/AdvancedFilters.tsx
├── src/components/FavoritesAndComparison.tsx
├── src/components/OrderHistory.tsx
├── src/components/TradingStatsDashboard.tsx
└── src/lib/trade-constants.ts
```

## 🔧 Usando el Hook `useTradePage`

### Importar el Hook

```typescript
import { useTradePage, type Listing } from '@/hooks/useTradePage';

export function MiComponente() {
  const { ... } = useTradePage();
  // Tu código aquí
}
```

### Desestructuración Completa

```typescript
const {
  // Tab & UI State
  activeTab,
  setActiveTab,
  filterCollapsed,
  setFilterCollapsed,
  showHeader,
  showMobileFilters,
  setShowMobileFilters,

  // Filters
  advancedFilters,
  handleAdvancedFilterChange,
  handleResetFilters,
  filteredListings,

  // Favorites & Comparisons
  favorites,
  comparisons,
  handleToggleFavorite,
  handleToggleComparison,
  handleRemoveFavorite,
  handleRemoveComparison,

  // Trading Data
  transactions,
  setTransactions,

  // Sell Form
  selectedTokenToSell,
  setSelectedTokenToSell,
  sellQuantity,
  setSellQuantity,
  sellPrice,
  setSellPrice,
  handleSellSubmit,

  // Dialog
  isTradeDialogOpen,
  setIsTradeDialogOpen,
  selectedListing,
  setSelectedListing,
  handleBuyClick,
} = useTradePage();
```

## 📦 Constantes Centralizadas

### Archivo: `src/lib/trade-constants.ts`

```typescript
import {
  categoryIcons,
  getPaymentMethodVariant,
  myTokens,
  CATEGORIES,
  PAYMENT_METHODS,
  SORT_OPTIONS,
} from '@/lib/trade-constants';

// categoryIcons: Record<string, IconComponent>
// Mapea categorías a componentes de iconos
const icon = categoryIcons['Real Estate']; // Building2

// getPaymentMethodVariant: (method: string) => BadgeVariant
// Retorna variante visual para cada método de pago
const variant = getPaymentMethodVariant('USDT'); // 'outline'

// myTokens: Token[]
// Array con los tokens del usuario (mock)
myTokens.forEach(token => {
  console.log(token.projectName, token.availableToSell);
});

// CATEGORIES: { id: string, label: string }[]
// Lista de categorías disponibles
CATEGORIES.map(cat => `${cat.id}: ${cat.label}`);

// PAYMENT_METHODS: string[]
// Métodos de pago soportados
PAYMENT_METHODS.forEach(method => console.log(method));

// SORT_OPTIONS: { value: string, label: string }[]
// Opciones de ordenamiento
SORT_OPTIONS.map(opt => opt.value);
```

## 🧩 Componentes Principales

### 1. TradeHeader

```typescript
import { TradeHeader } from '@/components/TradeHeader';

<TradeHeader
  showHeader={showHeader}
  filteredListingsCount={filteredListings.length}
/>
```

**Props:**
- `showHeader: boolean` - Controla visibilidad
- `filteredListingsCount: number` - Número de listados

### 2. TradeFilters

```typescript
import { TradeFilters } from '@/components/TradeFilters';

<TradeFilters
  searchTerm={advancedFilters.searchTerm}
  onSearchChange={(value) => {...}}
  selectedCategory={advancedFilters.categories[0] || 'all'}
  onCategoryChange={(value) => {...}}
  sortBy="price-asc"
  onSortChange={(value) => {...}}
  onReset={handleResetFilters}
  showMobileFilters={showMobileFilters}
  onToggleMobileFilters={setShowMobileFilters}
/>
```

### 3. SellTokenForm

```typescript
import { SellTokenForm } from '@/components/SellTokenForm';

<SellTokenForm
  selectedToken={selectedTokenToSell}
  onTokenChange={setSelectedTokenToSell}
  quantity={sellQuantity}
  onQuantityChange={setSellQuantity}
  price={sellPrice}
  onPriceChange={setSellPrice}
  onSubmit={handleSellSubmit}
  onClear={() => {...}}
/>
```

### 4. EnhancedListingCard

```typescript
import { EnhancedListingCard } from '@/components/EnhancedListingCard';

<EnhancedListingCard
  listing={{
    ...listing,
    seller: {
      name: listing.seller,
      rating: 4.5,
      reviewCount: 127,
      isVerified: true,
      responseTime: '2 horas',
      totalSales: 1200,
    },
    isBestPrice: true,
    availabilityPercent: 75,
  }}
  onBuyClick={handleBuyClick}
  onFavoriteClick={handleToggleFavorite}
  onCompareClick={handleToggleComparison}
  isFavorited={favorites.some(f => f.id === listing.id)}
  isComparing={comparisons.some(c => c.id === listing.id)}
  categoryIcon={categoryIcons[listing.category]}
/>
```

## 🔄 Estados del Hook

### Entender el Flujo de Datos

```typescript
// 1. Usuario escribe en búsqueda
onSearchChange(value)
  → setAdvancedFilters({ ...advancedFilters, searchTerm: value })
  → se recalcula filteredListings (useMemo)

// 2. Usuario selecciona categoría
onCategoryChange(value)
  → setAdvancedFilters({ ...advancedFilters, categories: [value] })
  → se recalcula filteredListings

// 3. Usuario agrega a favoritos
handleToggleFavorite(listing)
  → se agrega/quita de setFavorites
  → se actualiza isFavorited en EnhancedListingCard

// 4. Usuario hace clic en comprar
handleBuyClick(listing)
  → setSelectedListing(listing)
  → setIsTradeDialogOpen(true)
  → P2PTradeDialog se abre
```

## 📊 Tipos Exportados

### Listing
```typescript
interface Listing {
  id: string;
  projectName: string;
  tokenSymbol: string;
  quantity: number;
  pricePerToken: number;
  seller: string; // nombre del vendedor
  image: string;
  category: string;
  marketUrl: string;
  paymentMethods: string[];
  totalDuration: string;
}
```

### FilterState
```typescript
interface FilterState {
  searchTerm: string;
  priceRange: [number, number];
  categories: string[];
  paymentMethods: string[];
  minRating: number;
  availability: string[];
  minSales: number;
}
```

### FavoriteListing
```typescript
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
```

### Transaction
```typescript
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
```

## 💡 Casos de Uso Comunes

### 1. Obtener Listados Filtrados

```typescript
const { filteredListings } = useTradePage();

filteredListings.forEach(listing => {
  console.log(listing.projectName);
});
```

### 2. Actualizar Filtros

```typescript
const { advancedFilters, handleAdvancedFilterChange } = useTradePage();

// Cambiar solo un campo
handleAdvancedFilterChange({
  ...advancedFilters,
  searchTerm: 'Solar',
});
```

### 3. Agregar a Favoritos

```typescript
const { handleToggleFavorite } = useTradePage();

const listing = filteredListings[0];
handleToggleFavorite(listing);
```

### 4. Comparar Listados

```typescript
const { comparisons, handleToggleComparison } = useTradePage();

// Máximo 4 comparaciones
if (comparisons.length < 4) {
  handleToggleComparison(listing);
}
```

### 5. Crear Oferta de Venta

```typescript
const {
  selectedTokenToSell,
  setSellPrice,
  setSellQuantity,
  handleSellSubmit,
} = useTradePage();

// Después de que usuario completa el formulario
handleSellSubmit(event);
```

## 🧪 Testing

### Mock del Hook

```typescript
import { useTradePage } from '@/hooks/useTradePage';

jest.mock('@/hooks/useTradePage', () => ({
  useTradePage: () => ({
    activeTab: 'buy',
    setActiveTab: jest.fn(),
    filteredListings: mockListings,
    handleBuyClick: jest.fn(),
    // ... otros props
  }),
}));

describe('TradePage', () => {
  it('should render filtered listings', () => {
    render(<TradePage />);
    expect(screen.getByText('Solar Farm')).toBeInTheDocument();
  });
});
```

## 🚀 Mejoras Futuras

```typescript
// Plan de mejoras organizadas por dificultad

// Fácil
- [ ] Guardar favoritos en localStorage
- [ ] Persistir último tab activo
- [ ] Recordar filtros anterior búsqueda

// Medio
- [ ] Conectar con API de transacciones
- [ ] Filtros guardados por usuario
- [ ] Sistema de notificaciones

// Difícil
- [ ] WebSocket para precios en tiempo real
- [ ] AI-powered recomendaciones
- [ ] Dashboard con analytics
```

## 📞 Soporte

Si necesitas ayuda:

1. **Revisar estructura**: Ver `REFACTOR_SUMMARY.md`
2. **Usar ejemplos**: Ver casos de uso arriba
3. **Inspeccionar tipos**: Ver tipos en `useTradePage.ts`
4. **Revisar componentes**: Leer props en componentes específicos

---

**Última actualización:** 2024
**Versión:** 1.0
**Estado:** Estable ✅
