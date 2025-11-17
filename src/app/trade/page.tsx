'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from 'lucide-react';

// Custom Components
import { P2PTradeDialog } from '@/components/P2PTradeDialog';
import { EnhancedListingCard } from '@/components/EnhancedListingCard';
import { FavoritesAndComparison } from '@/components/FavoritesAndComparison';
import { OrderHistory } from '@/components/OrderHistory';
import { TradingStatsDashboard } from '@/components/TradingStatsDashboard';
import { TradeHeader } from '@/components/TradeHeader';
import { TradeFilters } from '@/components/TradeFilters';
import { SellTokenForm } from '@/components/SellTokenForm';

// Hooks
import { useTradePage, type Listing } from '@/hooks/useTradePage';

// Constants
import { categoryIcons } from '@/lib/trade-constants';

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

export default function TradePage() {
  const {
    // Tab & UI State
    activeTab,
    setActiveTab,
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
    handleBuyClick,
  } = useTradePage();

  // Calculate dashboard stats from transactions
  const calculateStats = (): DashboardStats => {
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
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Trade Dialog */}
      <P2PTradeDialog
        isOpen={isTradeDialogOpen}
        onOpenChange={setIsTradeDialogOpen}
        listing={selectedListing}
      />

      {/* Header */}
      <TradeHeader
        showHeader={showHeader}
        filteredListingsCount={filteredListings.length}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <TradeFilters
            searchTerm={advancedFilters.searchTerm}
            onSearchChange={(value) =>
              handleAdvancedFilterChange({ ...advancedFilters, searchTerm: value })
            }
            selectedCategory={advancedFilters.categories[0] || 'all'}
            onCategoryChange={(value) =>
              handleAdvancedFilterChange({
                ...advancedFilters,
                categories: value === 'all' ? [] : [value],
              })
            }
            sortBy="price-asc"
            onSortChange={() => {}}
            onReset={handleResetFilters}
            showMobileFilters={showMobileFilters}
            onToggleMobileFilters={setShowMobileFilters}
          />

          {/* Main Content */}
          <main className="lg:col-span-3">
            <Tabs
              value={activeTab}
              onValueChange={(val: any) => setActiveTab(val)}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-4 mb-8 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                <TabsTrigger
                  value="buy"
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-sm rounded-md transition-all"
                >
                  Comprar
                </TabsTrigger>
                <TabsTrigger
                  value="sell"
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-sm rounded-md transition-all"
                >
                  Vender
                </TabsTrigger>
                <TabsTrigger
                  value="favorites"
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-sm rounded-md transition-all"
                >
                  Favoritos ({favorites.length})
                </TabsTrigger>
                <TabsTrigger
                  value="history"
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-sm rounded-md transition-all"
                >
                  Historial
                </TabsTrigger>
              </TabsList>

              {/* BUY TAB */}
              <TabsContent value="buy" className="space-y-6">
                {filteredListings.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {(filteredListings as Listing[]).map((listing) => {
                      const handleBuyClickWrapper = () => handleBuyClick(listing);
                      const handleToggleFavoriteWrapper = () => handleToggleFavorite(listing);
                      const handleToggleComparisonWrapper = () => handleToggleComparison(listing);

                      return (
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
                          onBuyClick={handleBuyClickWrapper}
                          onFavoriteClick={handleToggleFavoriteWrapper}
                          onCompareClick={handleToggleComparisonWrapper}
                          isFavorited={favorites.some(f => f.id === listing.id)}
                          isComparing={comparisons.some(c => c.id === listing.id)}
                          categoryIcon={categoryIcons[listing.category]}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <Card className="border-2 border-dashed">
                    <CardContent className="p-12 text-center">
                      <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                        No se encontraron resultados
                      </h3>
                      <p className="text-muted-foreground">
                        Ajusta tus filtros para ver más listados
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* SELL TAB */}
              <TabsContent value="sell">
                <SellTokenForm
                  selectedToken={selectedTokenToSell}
                  onTokenChange={setSelectedTokenToSell}
                  quantity={sellQuantity}
                  onQuantityChange={setSellQuantity}
                  price={sellPrice}
                  onPriceChange={setSellPrice}
                  onSubmit={handleSellSubmit}
                  onClear={() => {
                    setSelectedTokenToSell('');
                    setSellQuantity('');
                    setSellPrice('');
                  }}
                />
              </TabsContent>

              {/* FAVORITES TAB */}
              <TabsContent value="favorites">
                <FavoritesAndComparison
                  favorites={favorites}
                  comparisons={comparisons}
                  onRemoveFavorite={handleRemoveFavorite}
                  onRemoveComparison={handleRemoveComparison}
                  onAddToCart={(item) => {
                    // Find the full listing from filteredListings
                    const fullListing = filteredListings.find(l => l.id === item.id);
                    if (fullListing) {
                      handleBuyClick(fullListing);
                    }
                  }}
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
