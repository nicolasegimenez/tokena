/**
 * EXAMPLE: Enhanced Trade Page Implementation
 *
 * This file demonstrates how to integrate all the new P2P components
 * into your existing trade page. Use this as a reference for updating
 * your actual trade/page.tsx file.
 *
 * NOTE: This is a REFERENCE FILE - do not use directly in production.
 * Copy the patterns and adapt them to your existing code structure.
 *
 * @ts-nocheck - This is an example file with intentional unused code patterns
 */

import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { useLanguage } from '@/lib/language';
import { marketProjects } from '@/lib/market-data';

// New components
import { EnhancedListingCard } from './EnhancedListingCard';
import { AdvancedFilters } from './AdvancedFilters';
import { FavoritesAndComparison } from './FavoritesAndComparison';
import { OrderHistory } from './OrderHistory';
import { TradingStatsDashboard } from './TradingStatsDashboard';

// Existing components
import { P2PTradeDialog } from './P2PTradeDialog';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';

// Icons
import { Filter, Search } from 'lucide-react';

interface FilterState {
  searchTerm: string;
  priceRange: [number, number];
  categories: string[];
  paymentMethods: string[];
  minRating: number;
  availability: string[];
  minSales: number;
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

/**
 * EXAMPLE: Enhanced Trade Page Component
 *
 * This demonstrates the recommended structure and state management
 * for integrating all new P2P features.
 */
export default function EnhancedTradePageExample() {
  const { t } = useLanguage();

  // ============== STATE MANAGEMENT ==============

  // Tab & UI State
  const [activeTab, setActiveTab] = useState<'buy' | 'sell' | 'favorites' | 'history'>('buy');
  const [filterCollapsed, setFilterCollapsed] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);

  // Filter & Search State
  const [advancedFilters, setAdvancedFilters] = useState<FilterState>({
    searchTerm: '',
    priceRange: [0, 1000],
    categories: [],
    paymentMethods: [],
    minRating: 0,
    availability: [],
    minSales: 0,
  });

  // Favorites State
  const [favorites, setFavorites] = useState<FavoriteListing[]>([]);

  // Comparison State
  const [comparisons, setComparisons] = useState<ComparisonListing[]>([]);

  // Trading Data State
  const [transactions, setTransactions] = useState<Transaction[]>([
    // Example transaction
    {
      id: 'tx-1',
      type: 'buy',
      projectName: 'Green Energy Solar Farm',
      tokenSymbol: 'GESF',
      quantity: 10,
      pricePerToken: 25.50,
      totalAmount: 255,
      seller: 'EcoInvest Corp',
      paymentMethod: 'Transferencia bancaria',
      status: 'completed',
      date: new Date('2024-01-15'),
      completionDate: new Date('2024-01-16'),
      invoiceUrl: '#',
    },
  ]);

  // Sell Form State
  const [selectedTokenToSell, setSelectedTokenToSell] = useState('');
  const [sellQuantity, setSellQuantity] = useState('');
  const [sellPrice, setSellPrice] = useState('');

  // Dialog State
  const [isTradeDialogOpen, setIsTradeDialogOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState<any>(null);

  // ============== EFFECTS ==============

  // Scroll behavior for hiding header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY.current || currentScrollY < 100) {
        setShowHeader(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 300) {
        setShowHeader(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ============== HANDLERS ==============

  /**
   * Apply advanced filters to listings
   * This function combines all filter criteria and returns matching listings
   */
  const applyAdvancedFilters = useCallback((listings: any[], filters: FilterState) => {
    return listings.filter(listing => {
      // Search term filter
      if (filters.searchTerm) {
        const term = filters.searchTerm.toLowerCase();
        const matches =
          listing.projectName.toLowerCase().includes(term) ||
          listing.tokenSymbol.toLowerCase().includes(term);
        if (!matches) return false;
      }

      // Price range filter
      if (listing.pricePerToken < filters.priceRange[0] ||
          listing.pricePerToken > filters.priceRange[1]) {
        return false;
      }

      // Category filter
      if (filters.categories.length > 0) {
        const categoryId = listing.category.toLowerCase().replace(' ', '-');
        if (!filters.categories.includes(categoryId)) return false;
      }

      // Payment methods filter
      if (filters.paymentMethods.length > 0) {
        const hasPaymentMethod = filters.paymentMethods.some(method =>
          listing.paymentMethods.includes(method)
        );
        if (!hasPaymentMethod) return false;
      }

      // Minimum rating filter (mock - would need seller data)
      if (filters.minRating > 0) {
        // Get seller rating from listing.seller object
        // if (listing.seller.rating < filters.minRating) return false;
      }

      return true;
    });
  }, []);

  /**
   * Memoized filtered listings
   * Only recalculates when filters change
   */
  const filteredListings = useMemo(() => {
    return applyAdvancedFilters(marketProjects, advancedFilters);
  }, [advancedFilters, applyAdvancedFilters]);

  /**
   * Handle filter changes from AdvancedFilters component
   */
  const handleAdvancedFilterChange = useCallback((newFilters: FilterState) => {
    setAdvancedFilters(newFilters);
  }, []);

  /**
   * Reset all filters to defaults
   */
  const handleResetFilters = useCallback(() => {
    setAdvancedFilters({
      searchTerm: '',
      priceRange: [0, 1000],
      categories: [],
      paymentMethods: [],
      minRating: 0,
      availability: [],
      minSales: 0,
    });
  }, []);

  /**
   * Toggle favorite status for a listing
   */
  const handleToggleFavorite = useCallback((listing: any) => {
    const exists = favorites.some(f => f.id === listing.id);

    if (exists) {
      setFavorites(favorites.filter(f => f.id !== listing.id));
    } else {
      setFavorites([...favorites, {
        id: listing.id,
        projectName: listing.projectName,
        tokenSymbol: listing.tokenSymbol,
        pricePerToken: listing.pricePerToken,
        image: listing.image,
        category: listing.category,
        seller: listing.seller,
        addedDate: new Date(),
      }]);
    }
  }, [favorites]);

  /**
   * Toggle comparison status for a listing
   */
  const handleToggleComparison = useCallback((listing: any) => {
    const exists = comparisons.some(c => c.id === listing.id);

    if (exists) {
      setComparisons(comparisons.filter(c => c.id !== listing.id));
    } else if (comparisons.length < 4) { // Limit to 4 items for comparison
      setComparisons([...comparisons, {
        id: listing.id,
        projectName: listing.projectName,
        tokenSymbol: listing.tokenSymbol,
        pricePerToken: listing.pricePerToken,
        quantity: listing.quantity,
        category: listing.category,
        seller: listing.seller,
        paymentMethods: listing.paymentMethods,
        totalDuration: listing.totalDuration,
      }]);
    }
  }, [comparisons]);

  /**
   * Handle buy button click
   */
  const handleBuyClick = useCallback((listing: any) => {
    setSelectedListing(listing);
    setIsTradeDialogOpen(true);
  }, []);

  /**
   * Handle sell form submission
   */
  const handleSellSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement sell logic
    alert('Oferta de venta creada exitosamente');
    setSelectedTokenToSell('');
    setSellQuantity('');
    setSellPrice('');
  };

  /**
   * Calculate dashboard stats from transactions
   */
  const calculateStats = useCallback((): DashboardStats => {
    const completed = transactions.filter(t => t.status === 'completed');
    const bought = completed.filter(t => t.type === 'buy');
    const sold = completed.filter(t => t.type === 'sell');
    const pending = transactions.filter(t => t.status === 'pending');

    const totalInvested = bought.reduce((sum, t) => sum + t.totalAmount, 0);
    const totalEarned = sold.reduce((sum, t) => sum + t.totalAmount, 0);
    const averageOrder = transactions.length > 0
      ? transactions.reduce((sum, t) => sum + t.totalAmount, 0) / transactions.length
      : 0;

    return {
      totalInvested,
      totalEarned,
      activeOrders: pending.length,
      completedOrders: completed.length,
      averageOrderValue: averageOrder,
      successRate: transactions.length > 0
        ? Math.round((completed.length / transactions.length) * 100)
        : 0,
      recentActivity: transactions.slice(0, 5).map(t => ({
        id: t.id,
        type: t.type,
        amount: t.totalAmount,
        date: t.date,
        projectName: t.projectName,
      })),
      portfolioDistribution: [
        { category: 'Real Estate', value: 1500, percentage: 40 },
        { category: 'Energía', value: 900, percentage: 24 },
        { category: 'Cripto', value: 600, percentage: 16 },
        { category: 'Otros', value: 450, percentage: 20 },
      ],
      averageResponseTime: '2 horas',
      trustScore: 85,
    };
  }, [transactions]);

  // ============== RENDER ==============

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Trade Dialog */}
      <P2PTradeDialog
        isOpen={isTradeDialogOpen}
        onOpenChange={setIsTradeDialogOpen}
        listing={selectedListing}
      />

      {/* Header */}
      <div className={`border-b bg-gradient-to-r from-white/80 to-white/50 dark:from-slate-900/80 dark:to-slate-800/50 backdrop-blur-xl sticky top-0 z-40 transition-all duration-300 ease-in-out transform shadow-sm ${
        showHeader ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
      }`}>
        <div className="container mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Mercado P2P Mejorado
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Intercambia tokens con confianza y seguridad
              </p>
            </div>
            <Badge className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2 text-sm">
              {filteredListings.length} Listados
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Filters */}
          <aside className="lg:col-span-1">
            <div className="lg:hidden mb-4">
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2 border-2"
                onClick={() => setFilterCollapsed(!filterCollapsed)}
              >
                <Filter className="h-4 w-4" />
                {filterCollapsed ? 'Mostrar Filtros' : 'Ocultar Filtros'}
              </Button>
            </div>

            {!filterCollapsed && (
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
                isCollapsed={false}
              />
            )}
          </aside>

          {/* Main Content - Tabs */}
          <main className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={(val: any) => setActiveTab(val)}>
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="buy">Comprar</TabsTrigger>
                <TabsTrigger value="sell">Vender</TabsTrigger>
                <TabsTrigger value="favorites">Favoritos ({favorites.length})</TabsTrigger>
                <TabsTrigger value="history">Historial</TabsTrigger>
              </TabsList>

              {/* BUY TAB */}
              <TabsContent value="buy" className="space-y-6">
                {filteredListings.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredListings.map((listing) => (
                      <EnhancedListingCard
                        key={listing.id}
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
                          isBestPrice: Math.random() > 0.8,
                          availabilityPercent: (listing.quantity / 500) * 100,
                        }}
                        onBuyClick={handleBuyClick}
                        onFavoriteClick={handleToggleFavorite}
                        onCompareClick={handleToggleComparison}
                        isFavorited={favorites.some(f => f.id === listing.id)}
                        isComparing={comparisons.some(c => c.id === listing.id)}
                        categoryIcon={require('lucide-react').Building2} // Use actual icon
                      />
                    ))}
                  </div>
                ) : (
                  <Card className="border-2 border-dashed">
                    <CardContent className="p-12 text-center">
                      <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                      <h3 className="text-xl font-semibold mb-2">No se encontraron resultados</h3>
                      <p className="text-muted-foreground">Ajusta tus filtros para ver más listados</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* SELL TAB */}
              <TabsContent value="sell">
                {/* Your existing sell form here */}
                <Card>
                  <CardContent className="p-6">
                    <p>Aquí va tu formulario de venta existente</p>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* FAVORITES TAB */}
              <TabsContent value="favorites">
                <FavoritesAndComparison
                  favorites={favorites}
                  comparisons={comparisons}
                  onRemoveFavorite={(id) => setFavorites(favorites.filter(f => f.id !== id))}
                  onRemoveComparison={(id) => setComparisons(comparisons.filter(c => c.id !== id))}
                  onAddToCart={handleBuyClick}
                />
              </TabsContent>

              {/* HISTORY TAB */}
              <TabsContent value="history" className="space-y-6">
                <TradingStatsDashboard stats={calculateStats()} />
                <OrderHistory transactions={transactions} />
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  );
}

/**
 * NOTES FOR IMPLEMENTATION:
 *
 * 1. Replace mock data with real API calls
 * 2. Add proper error handling and loading states
 * 3. Implement proper typing with interfaces
 * 4. Add validation for user inputs
 * 5. Integrate with your authentication system
 * 6. Add analytics tracking for user actions
 * 7. Implement proper accessibility features
 * 8. Add unit tests for each component
 * 9. Performance optimization with useMemo/useCallback
 * 10. Internationalization with useLanguage hook
 */
