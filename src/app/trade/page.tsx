import { useState, useMemo, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Card, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Tag, Building2, DollarSign, Filter, TrendingUp, Coins, Trees, Beef, CircleDot, Music } from 'lucide-react';
import { useLanguage } from '@/lib/language';
import { marketProjects } from '@/lib/market-data';
import { Badge } from '@/components/ui/badge';
import { P2PTradeDialog } from '@/components/P2PTradeDialog';
import { SectionCard } from '@/components/SectionCard';
import { cn } from "@/lib/utils";

const myTokens = [
  { id: 't1', projectName: 'Eco-Friendly Housing', tokenSymbol: 'ECOH', quantity: 200, availableToSell: 150, image: 'https://res.cloudinary.com/dhacybdxf/image/upload/v1762299810/edificio_qhi0ri.png' },
  { id: 't2', projectName: 'Tech Startup Fund', tokenSymbol: 'TSF', quantity: 100, availableToSell: 100, image: 'https://res.cloudinary.com/dhacybdxf/image/upload/v1762299809/ethereum_vs8k4y.png' },
];

// Icon mapping for categories
const categoryIcons: Record<string, any> = {
  'Real Estate': Building2,
  'Crypto': Coins,
  'Agricultura': Trees,
  'Agriculture': Trees,
  'Ganadería': Beef,
  'Livestock': Beef,
  'Deportes': CircleDot,
  'Sports': CircleDot,
  'Entretenimiento': Music,
  'Entertainment': Music,
  'Startup': Building2,
  'Energy': TrendingUp,
  'Venture Capital': Coins,
  'Collectibles': Tag,
  'real-estate': Building2,
  'energy': TrendingUp,
  'venture-capital': Coins,
  'crypto': Coins,
  'collectibles': Tag,
};

interface Listing {
  id: string;
  projectName: string;
  tokenSymbol: string;
  quantity: number;
  pricePerToken: number;
  seller: string;
  image: string;
  category: string;
  marketUrl: string;
  paymentMethods: string[];
  totalDuration: string;
}

const getPaymentMethodVariant = (method: string): "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "info" => {
  switch (method.toLowerCase()) {
    case 'transferencia bancaria':
      return 'success';
    case 'mercadopago':
      return 'info';
    case 'usdt':
      return 'warning';
    case 'btc':
        return 'warning';
    case 'eth':
        return 'info';
    default:
      return 'default';
  }
};

// --- Componente de Tarjeta de Listado Premium ---
function ListingCard({ listing, onBuyClick }: { listing: Listing, onBuyClick: (listing: Listing) => void }) {
  const { t } = useLanguage();
  const Icon = categoryIcons[listing.category] || Building2;

  return (
    <Card className={cn(
      "group overflow-hidden transition-all duration-300",
      "hover:shadow-2xl hover:-translate-y-2 border-2",
      "flex flex-col h-full",
      "border-slate-200 dark:border-slate-700 hover:border-emerald-400 dark:hover:border-emerald-600"
    )}>
      {/* Image with Premium Overlay */}
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
        <img
          src={listing.image}
          alt={listing.projectName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Category Badge */}
        <div className="absolute top-4 right-4">
          <Badge className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg">
            <Icon className="w-3 h-3 mr-1" />
            {listing.category}
          </Badge>
        </div>

        {/* Seller Info */}
        <div className="absolute bottom-4 left-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-lg px-3 py-2">
          <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">{listing.seller}</p>
        </div>
      </div>

      <CardContent className="p-5 flex-grow flex flex-col gap-4">
        {/* Title & Symbol */}
        <div>
          <CardTitle className="text-base font-bold line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            {listing.projectName}
          </CardTitle>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline" className="bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800">
              {listing.tokenSymbol}
            </Badge>
            <span className="text-xs text-muted-foreground">{listing.quantity} tokens</span>
          </div>
        </div>

        {/* Price Highlight */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 rounded-lg p-4 border border-emerald-200/50 dark:border-emerald-800/50">
          <p className="text-xs text-muted-foreground font-medium mb-1">Precio por Token</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">${listing.pricePerToken}</span>
            <span className="text-xs text-muted-foreground">USD</span>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3 border border-slate-200 dark:border-slate-700">
            <p className="text-xs text-muted-foreground font-medium">Disponibles</p>
            <p className="text-lg font-bold text-slate-900 dark:text-white">{listing.quantity}</p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3 border border-slate-200 dark:border-slate-700">
            <p className="text-xs text-muted-foreground font-medium">Duración</p>
            <p className="text-lg font-bold text-slate-900 dark:text-white">{listing.totalDuration}</p>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">Métodos de pago</p>
          <div className="flex flex-wrap gap-2">
            {listing.paymentMethods.map(method => (
              <Badge key={method} variant={getPaymentMethodVariant(method)} className="text-xs font-medium">
                {method}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>

      {/* Actions */}
      <CardFooter className="p-4 pt-0 mt-auto gap-2 grid grid-cols-2">
        <Button
          className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold shadow-md hover:shadow-lg transition-all"
          onClick={() => onBuyClick(listing)}
        >
          {t('buy_now')}
        </Button>
        <Button asChild variant="outline" className="w-full border-emerald-300 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/30">
          <Link to={listing.marketUrl}>{t('more_info')}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

// --- Componente Principal de la Página de Trade ---
export default function TradePage() {
  const { t } = useLanguage();
  const location = useLocation();
  const [selectedTokenToSell, setSelectedTokenToSell] = useState('');
  const [sellQuantity, setSellQuantity] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const [activeTab, setActiveTab] = useState('buy');

  // State for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('price-asc');

  // State for P2P Dialog
  const [isTradeDialogOpen, setIsTradeDialogOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  // Scroll detection states
  const [showHeader, setShowHeader] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const lastScrollY = useRef(0);

  // Smart scroll behavior for mobile
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY.current || currentScrollY < 100) {
        setShowHeader(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 300) {
        setShowHeader(false);
        setShowMobileFilters(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Effect para manejar navegación desde investments page
  useEffect(() => {
    if (location.state?.tab === 'sell') {
      setActiveTab('sell');
      if (location.state?.tokenSymbol) {
        setSelectedTokenToSell(location.state.tokenSymbol);
      }
    }
  }, [location]);

  const filteredListings = useMemo(() => {
    let listings = marketProjects.filter(listing => {
      const searchTermMatch = listing.projectName.toLowerCase().includes(searchTerm.toLowerCase());
      const categoryMatch = selectedCategory === 'all' || listing.category.toLowerCase().replace(' ', '-') === selectedCategory;
      return searchTermMatch && categoryMatch;
    });

    // Sorting logic
    listings.sort((a, b) => {
      switch (sortBy) {
        case 'price-desc':
          return b.pricePerToken - a.pricePerToken;
        case 'newest':
          // Assuming higher ID is newer. In a real app, you'd use a timestamp.
          return parseInt(b.id) - parseInt(a.id);
        case 'price-asc':
        default:
          return a.pricePerToken - b.pricePerToken;
      }
    });

    return listings;
  }, [searchTerm, selectedCategory, sortBy]);


  const handleSellSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ action: 'sell', token: selectedTokenToSell, quantity: sellQuantity, price: sellPrice });
    alert(t('sell_offer_created'));
    setSelectedTokenToSell('');
    setSellQuantity('');
    setSellPrice('');
  };

  const handleBuyClick = (listing: Listing) => {
    setSelectedListing(listing);
    setIsTradeDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <P2PTradeDialog
        isOpen={isTradeDialogOpen}
        onOpenChange={setIsTradeDialogOpen}
        listing={selectedListing}
      />

      {/* Premium Header */}
      <div className={`border-b bg-gradient-to-r from-white/80 to-white/50 dark:from-slate-900/80 dark:to-slate-800/50 backdrop-blur-xl sticky top-0 z-40 transition-all duration-300 ease-in-out transform shadow-sm ${
        showHeader ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
      }`}>
        <div className="container mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                {t('p2p_market')}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">{t('trade_security_tokens')}</p>
            </div>
            <Badge className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2 text-sm">
              {filteredListings.length} {filteredListings.length === 1 ? 'Listado' : 'Listados'}
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* --- Sidebar de Filtros Premium --- */}
          <aside className="lg:col-span-1">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-4">
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2 border-2 hover:border-emerald-400 dark:hover:border-emerald-600"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
              >
                <Filter className="h-4 w-4" />
                {showMobileFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
              </Button>
            </div>

            {/* Active Filters Display */}
            {(selectedCategory !== "all" || sortBy !== "price-asc") && (
              <div className="flex flex-wrap gap-2 items-center mb-4 lg:hidden">
                {selectedCategory !== "all" && (
                  <Badge variant="secondary" className="text-xs">
                    {selectedCategory}
                  </Badge>
                )}
                {sortBy !== "price-asc" && (
                  <Badge variant="secondary" className="text-xs">
                    {sortBy === "price-desc" ? "Precio ↓" : "Más nuevo"}
                  </Badge>
                )}
              </div>
            )}

            {/* Filter Card - Premium Styling */}
            <SectionCard
              title={t('filters')}
              description="Refina tu búsqueda"
              collapsible={false}
              className={`transition-all duration-300 overflow-hidden ${
                showMobileFilters ? 'max-h-full opacity-100' : 'lg:max-h-full lg:opacity-100 max-h-0 opacity-0 lg:pointer-events-auto pointer-events-none'
              }`}
            >
              <div className="space-y-5">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                  <Input
                    placeholder={t('search_by_name')}
                    className="pl-10 border-2 focus-visible:border-emerald-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="grid gap-3">
                  <Label className="font-semibold">{t('category')}</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="border-2 h-10">
                      <SelectValue placeholder={t('all_categories')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t('all_categories')}</SelectItem>
                      <SelectItem value="real-estate">{t('real_estate')}</SelectItem>
                      <SelectItem value="energy">{t('energy')}</SelectItem>
                      <SelectItem value="venture-capital">{t('venture_capital')}</SelectItem>
                      <SelectItem value="crypto">{t('crypto')}</SelectItem>
                      <SelectItem value="collectibles">{t('collectibles')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-3">
                  <Label className="font-semibold">{t('sort_by')}</Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="border-2 h-10">
                      <SelectValue placeholder={t('price_asc')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="price-asc">{t('price_asc')}</SelectItem>
                      <SelectItem value="price-desc">{t('price_desc')}</SelectItem>
                      <SelectItem value="newest">{t('newest')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setSortBy('price-asc');
                    setShowMobileFilters(false);
                  }}
                  variant="outline"
                  className="w-full border-2"
                >
                  {t('clear_filters')}
                </Button>
              </div>
            </SectionCard>
          </aside>

          {/* --- Contenido Principal (Tabs) --- */}
          <main className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                <TabsTrigger value="buy" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-sm rounded-md transition-all">
                  {t('buy_tokens')}
                </TabsTrigger>
                <TabsTrigger value="sell" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-sm rounded-md transition-all">
                  {t('sell_my_tokens')}
                </TabsTrigger>
              </TabsList>

              {/* --- Tab de Comprar --- */}
              <TabsContent value="buy">
                {filteredListings.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredListings.map((listing) => (
                      <ListingCard key={listing.id} listing={listing} onBuyClick={handleBuyClick} />
                    ))}
                  </div>
                ) : (
                  <Card className="border-2 border-dashed">
                    <CardContent className="p-12 text-center">
                      <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">No se encontraron resultados</h3>
                      <p className="text-muted-foreground">Intenta ajustar tus filtros de búsqueda</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* --- Tab de Vender --- */}
              <TabsContent value="sell">
                <SectionCard
                  title={t('create_sell_offer')}
                  description={t('publish_your_tokens')}
                  highlight
                >
                  <form onSubmit={handleSellSubmit} className="space-y-6">
                    <div className="space-y-3">
                      <Label htmlFor="tokenToSell" className="text-base font-semibold">{t('token_to_sell')}</Label>
                      <Select onValueChange={setSelectedTokenToSell} value={selectedTokenToSell}>
                        <SelectTrigger id="tokenToSell" className="h-11 border-2">
                          <SelectValue placeholder={t('select_from_portfolio')} />
                        </SelectTrigger>
                        <SelectContent>
                          {myTokens.map(token => (
                            <SelectItem key={token.id} value={token.tokenSymbol}>
                              <div className="flex items-center gap-3">
                                <img src={token.image} className="w-6 h-6 object-cover rounded"/>
                                <div className="text-sm">
                                  <p className="font-medium">{token.projectName}</p>
                                  <p className="text-xs text-muted-foreground">{token.availableToSell} {t('available_to_sell')}</p>
                                </div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Summary Card */}
                    {selectedTokenToSell && (
                      <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 border-emerald-200 dark:border-emerald-800/50">
                        <CardContent className="pt-6">
                          <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-100 mb-4">Resumen de la oferta</p>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs text-emerald-700 dark:text-emerald-300 font-medium">Total a recibir</p>
                              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                                ${(parseInt(sellQuantity) * parseFloat(sellPrice) || 0).toFixed(2)}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-emerald-700 dark:text-emerald-300 font-medium">Disponibles</p>
                              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                                {myTokens.find(t => t.tokenSymbol === selectedTokenToSell)?.availableToSell || 0}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Label htmlFor="sellQuantity" className="text-base font-semibold">{t('quantity')}</Label>
                        <Input
                          id="sellQuantity"
                          type="number"
                          placeholder={t('quantity_placeholder')}
                          value={sellQuantity}
                          onChange={(e) => setSellQuantity(e.target.value)}
                          required
                          min="1"
                          className="h-11 border-2"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="sellPrice" className="text-base font-semibold">{t('price_per_token_usd')}</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                          <Input
                            id="sellPrice"
                            type="number"
                            placeholder={t('price_placeholder')}
                            value={sellPrice}
                            onChange={(e) => setSellPrice(e.target.value)}
                            required
                            min="0.01"
                            step="0.01"
                            className="pl-8 h-11 border-2"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button
                        type="submit"
                        size="lg"
                        className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold shadow-md"
                      >
                        {t('publish_sell_offer')}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        className="border-2"
                        onClick={() => {
                          setSelectedTokenToSell('');
                          setSellQuantity('');
                          setSellPrice('');
                        }}
                      >
                        Limpiar
                      </Button>
                    </div>
                  </form>
                </SectionCard>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  );
}