import { useState, useMemo, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
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

// --- Componente de Tarjeta de Listado ---
function ListingCard({ listing, onBuyClick }: { listing: Listing, onBuyClick: (listing: Listing) => void }) {
  const { t } = useLanguage();
  const Icon = categoryIcons[listing.category] || Building2;

  return (
    <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-emerald-200 dark:hover:border-emerald-800 flex flex-col">
      {/* Image with Overlay */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={listing.image}
          alt={listing.projectName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Category Badge with Icon */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2">
          <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-full p-2">
            <Icon className="h-5 w-5 text-emerald-600" />
          </div>
          <Badge variant="secondary" className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm">
            {listing.category}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-bold mb-2 truncate group-hover:text-emerald-600 transition-colors">
          {listing.projectName}
        </CardTitle>
        <CardDescription className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Tag className="w-4 h-4" /> {listing.tokenSymbol}
        </CardDescription>

        {/* Price Display */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 rounded-lg p-3 mb-4 text-center">
          <p className="text-xs text-muted-foreground mb-1">Precio por Token</p>
          <p className="text-2xl font-extrabold text-emerald-600">${listing.pricePerToken}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div>
            <p className="text-xs text-muted-foreground">Disponibles</p>
            <p className="text-sm font-semibold">{listing.quantity}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Período</p>
            <p className="text-sm font-semibold truncate">{listing.totalDuration}</p>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="flex flex-wrap gap-1">
          {listing.paymentMethods.map(method => (
            <Badge key={method} variant={getPaymentMethodVariant(method)} className="text-xs">
              {method}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 mt-auto gap-2 grid grid-cols-2">
        <Button
          className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
          onClick={() => onBuyClick(listing)}
        >
          {t('buy_now')}
        </Button>
        <Button asChild variant="outline" className="w-full">
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

      {/* Enhanced Header with Smart Scroll Behavior */}
      <div className={`border-b bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl sticky top-0 z-40 transition-all duration-300 ease-in-out transform ${
        showHeader ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
      }`}>
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                {t('p2p_market')}
              </h1>
              <p className="text-muted-foreground mt-2">{t('trade_security_tokens')}</p>
            </div>
            <Badge variant="secondary" className="text-sm px-4 py-2">
              {filteredListings.length} Listados
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* --- Sidebar de Filtros --- */}
        <aside className="lg:col-span-1">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-4">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
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

          {/* Filter Card - Collapsible on Mobile */}
          <Card className={`transition-all duration-300 overflow-hidden ${
            showMobileFilters ? 'max-h-96 opacity-100' : 'lg:max-h-96 lg:opacity-100 max-h-0 opacity-0 lg:pointer-events-auto pointer-events-none'
          }`}>
            <CardHeader>
              <CardTitle className="text-xl">{t('filters')}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                <Input
                  placeholder={t('search_by_name')}
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>{t('category')}</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full truncate">
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
              <div className="grid gap-2">
                <Label>{t('sort_by')}</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full truncate">
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
                variant="secondary"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSortBy('price-asc');
                  setShowMobileFilters(false);
                }}
              >
                {t('clear_filters')}
              </Button>
            </CardContent>
          </Card>
        </aside>

        {/* --- Contenido Principal (Tabs) --- */}
        <main className="lg:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="buy">{t('buy_tokens')}</TabsTrigger>
              <TabsTrigger value="sell">{t('sell_my_tokens')}</TabsTrigger>
            </TabsList>

            {/* --- Tab de Comprar --- */}
            <TabsContent value="buy">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredListings.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} onBuyClick={handleBuyClick} />
                ))}
              </div>
            </TabsContent>

            {/* --- Tab de Vender --- */}
            <TabsContent value="sell">
              <Card className="border-2 hover:border-emerald-200 dark:hover:border-emerald-800">
                <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950">
                  <CardTitle className="text-2xl">{t('create_sell_offer')}</CardTitle>
                  <CardDescription>{t('publish_your_tokens')}</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <form onSubmit={handleSellSubmit} className="grid gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="tokenToSell" className="text-base font-semibold">{t('token_to_sell')}</Label>
                      <Select onValueChange={setSelectedTokenToSell} value={selectedTokenToSell}>
                        <SelectTrigger id="tokenToSell" className="h-11">
                          <SelectValue placeholder={t('select_from_portfolio')} />
                        </SelectTrigger>
                        <SelectContent>
                          {myTokens.map(token => (
                            <SelectItem key={token.id} value={token.tokenSymbol}>
                              <div className="flex items-center gap-3">
                                <img src={token.image} className="w-8 h-8 object-cover rounded-md"/>
                                <div>
                                  <p>{token.projectName} ({token.tokenSymbol})</p>
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
                      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 rounded-lg p-4 border border-emerald-200 dark:border-emerald-800">
                        <p className="text-sm text-muted-foreground mb-2">Resumen de la oferta</p>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-muted-foreground">Total a recibir</p>
                            <p className="text-lg font-bold text-emerald-600">
                              ${(parseInt(sellQuantity) * parseFloat(sellPrice) || 0).toFixed(2)}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Disponibles</p>
                            <p className="text-lg font-bold">
                              {myTokens.find(t => t.tokenSymbol === selectedTokenToSell)?.availableToSell || 0}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="sellQuantity" className="text-base font-semibold">{t('quantity')}</Label>
                        <Input
                          id="sellQuantity"
                          type="number"
                          placeholder={t('quantity_placeholder')}
                          value={sellQuantity}
                          onChange={(e) => setSellQuantity(e.target.value)}
                          required
                          min="1"
                          className="h-11"
                        />
                      </div>
                      <div className="grid gap-2">
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
                            className="pl-8 h-11"
                          />
                        </div>
                      </div>
                    </div>

                    <CardFooter className="p-0 pt-4 flex gap-2">
                      <Button
                        type="submit"
                        size="lg"
                        className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                      >
                        {t('publish_sell_offer')}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        onClick={() => {
                          setSelectedTokenToSell('');
                          setSellQuantity('');
                          setSellPrice('');
                        }}
                      >
                        Limpiar
                      </Button>
                    </CardFooter>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
        </div>
      </div>
    </div>
  );
}