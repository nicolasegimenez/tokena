import { useState, useMemo, useEffect, useRef } from 'react';
import { Card, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Tag, Building2, DollarSign, Filter, TrendingUp, Coins, Trees, Beef, CircleDot, Music, X, ArrowUpDown, Sparkles, ShoppingCart, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const translations = {
  en: {
    p2p_market: 'P2P Market',
    trade_security_tokens: 'Trade security tokens directly with other investors',
    filters: 'Filters',
    search_by_name: 'Search by name...',
    category: 'Category',
    all_categories: 'All Categories',
    real_estate: 'Real Estate',
    energy: 'Energy',
    venture_capital: 'Venture Capital',
    crypto: 'Crypto',
    collectibles: 'Collectibles',
    sort_by: 'Sort By',
    price_asc: 'Price: Low to High',
    price_desc: 'Price: High to Low',
    newest: 'Newest First',
    clear_filters: 'Clear Filters',
    buy_tokens: 'Buy Tokens',
    sell_my_tokens: 'Sell My Tokens',
    buy_now: 'Buy Now',
    more_info: 'More Info',
    create_sell_offer: 'Create Sell Offer',
    publish_your_tokens: 'Publish your tokens for sale',
    token_to_sell: 'Token to Sell',
    select_from_portfolio: 'Select from your portfolio',
    available_to_sell: 'available',
    quantity: 'Quantity',
    quantity_placeholder: 'Enter quantity',
    price_per_token_usd: 'Price per Token (USD)',
    price_placeholder: 'Enter price',
    publish_sell_offer: 'Publish Sell Offer',
    sell_offer_created: 'Sell offer created successfully!',
    confirm_purchase: 'Confirm Purchase',
    purchase_details: 'Review your purchase details',
    total_cost: 'Total Cost',
    confirm: 'Confirm Purchase',
    cancel: 'Cancel',
  },
  es: {
    p2p_market: 'Mercado P2P',
    trade_security_tokens: 'Intercambia tokens de seguridad directamente con otros inversores',
    filters: 'Filtros',
    search_by_name: 'Buscar por nombre...',
    category: 'Categoría',
    all_categories: 'Todas las Categorías',
    real_estate: 'Bienes Raíces',
    energy: 'Energía',
    venture_capital: 'Capital de Riesgo',
    crypto: 'Cripto',
    collectibles: 'Coleccionables',
    sort_by: 'Ordenar Por',
    price_asc: 'Precio: Menor a Mayor',
    price_desc: 'Precio: Mayor a Menor',
    newest: 'Más Recientes',
    clear_filters: 'Limpiar Filtros',
    buy_tokens: 'Comprar Tokens',
    sell_my_tokens: 'Vender Mis Tokens',
    buy_now: 'Comprar Ahora',
    more_info: 'Más Info',
    create_sell_offer: 'Crear Oferta de Venta',
    publish_your_tokens: 'Publica tus tokens para la venta',
    token_to_sell: 'Token a Vender',
    select_from_portfolio: 'Selecciona de tu portafolio',
    available_to_sell: 'disponibles',
    quantity: 'Cantidad',
    quantity_placeholder: 'Ingresa cantidad',
    price_per_token_usd: 'Precio por Token (USD)',
    price_placeholder: 'Ingresa precio',
    publish_sell_offer: 'Publicar Oferta',
    sell_offer_created: '¡Oferta de venta creada exitosamente!',
    confirm_purchase: 'Confirmar Compra',
    purchase_details: 'Revisa los detalles de tu compra',
    total_cost: 'Costo Total',
    confirm: 'Confirmar Compra',
    cancel: 'Cancelar',
  }
};

const useLanguage = () => {
  const [language] = useState<'en' | 'es'>('es');
  const t = (key: keyof typeof translations.en) => translations[language][key];
  return { t, language };
};

const myTokens = [
  { id: 't1', projectName: 'Eco-Friendly Housing', tokenSymbol: 'ECOH', quantity: 200, availableToSell: 150, image: 'https://res.cloudinary.com/dhacybdxf/image/upload/v1762299810/edificio_qhi0ri.png' },
  { id: 't2', projectName: 'Tech Startup Fund', tokenSymbol: 'TSF', quantity: 100, availableToSell: 100, image: 'https://res.cloudinary.com/dhacybdxf/image/upload/v1762299809/ethereum_vs8k4y.png' },
];

const marketProjects = [
  {
    id: '1',
    projectName: 'Green Energy Solar Farm',
    tokenSymbol: 'GESF',
    quantity: 500,
    pricePerToken: 125.50,
    seller: 'EcoInvest Corp',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop',
    category: 'Energy',
    marketUrl: '/market/green-energy',
    paymentMethods: ['Transferencia Bancaria', 'MercadoPago', 'USDT'],
    totalDuration: '24 meses',
  },
  {
    id: '2',
    projectName: 'Downtown Office Complex',
    tokenSymbol: 'DOC',
    quantity: 250,
    pricePerToken: 450.00,
    seller: 'RealEstate Pro',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
    category: 'Real Estate',
    marketUrl: '/market/downtown-office',
    paymentMethods: ['Transferencia Bancaria', 'BTC'],
    totalDuration: '36 meses',
  },
  {
    id: '3',
    projectName: 'Tech Startup Accelerator',
    tokenSymbol: 'TSA',
    quantity: 1000,
    pricePerToken: 75.25,
    seller: 'Venture Partners',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop',
    category: 'Venture Capital',
    marketUrl: '/market/tech-accelerator',
    paymentMethods: ['MercadoPago', 'ETH', 'USDT'],
    totalDuration: '18 meses',
  },
  {
    id: '4',
    projectName: 'Organic Farm Collective',
    tokenSymbol: 'OFC',
    quantity: 750,
    pricePerToken: 50.00,
    seller: 'AgriTech Solutions',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop',
    category: 'Agriculture',
    marketUrl: '/market/organic-farm',
    paymentMethods: ['Transferencia Bancaria', 'MercadoPago'],
    totalDuration: '12 meses',
  },
  {
    id: '5',
    projectName: 'Bitcoin Mining Operation',
    tokenSymbol: 'BMO',
    quantity: 300,
    pricePerToken: 320.00,
    seller: 'CryptoMine Ltd',
    image: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&h=600&fit=crop',
    category: 'Crypto',
    marketUrl: '/market/bitcoin-mining',
    paymentMethods: ['BTC', 'USDT', 'ETH'],
    totalDuration: '24 meses',
  },
  {
    id: '6',
    projectName: 'Rare Art Collection',
    tokenSymbol: 'RAC',
    quantity: 100,
    pricePerToken: 1250.00,
    seller: 'ArtVault Gallery',
    image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&h=600&fit=crop',
    category: 'Collectibles',
    marketUrl: '/market/art-collection',
    paymentMethods: ['Transferencia Bancaria', 'ETH'],
    totalDuration: '48 meses',
  },
];

const categoryIcons: Record<string, any> = {
  'Real Estate': Building2,
  'Crypto': Coins,
  'Agriculture': Trees,
  'Livestock': Beef,
  'Sports': CircleDot,
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

const getPaymentMethodVariant = (method: string): "default" | "secondary" | "destructive" | "outline" => {
  switch (method.toLowerCase()) {
    case 'transferencia bancaria':
      return 'default';
    case 'mercadopago':
      return 'secondary';
    case 'usdt':
    case 'btc':
    case 'eth':
      return 'outline';
    default:
      return 'default';
  }
};

function SectionCard({ 
  title, 
  description, 
  children, 
  className,
  highlight = false 
}: { 
  title: string; 
  description?: string; 
  children: React.ReactNode; 
  className?: string;
  highlight?: boolean;
}) {
  return (
    <Card className={cn(
      "border-2 transition-all duration-300",
      highlight && "border-emerald-200 dark:border-emerald-800 bg-gradient-to-br from-white to-emerald-50/30 dark:from-slate-900 dark:to-emerald-950/20",
      className
    )}>
      <CardContent className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            {highlight && <Sparkles className="w-5 h-5 text-emerald-600" />}
            {title}
          </h3>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        {children}
      </CardContent>
    </Card>
  );
}

function P2PTradeDialog({ 
  isOpen, 
  onOpenChange, 
  listing 
}: { 
  isOpen: boolean; 
  onOpenChange: (open: boolean) => void; 
  listing: Listing | null;
}) {
  const { t } = useLanguage();
  const [quantity, setQuantity] = useState('1');

  if (!listing) return null;

  const totalCost = parseFloat(quantity || '0') * listing.pricePerToken;

  const handleConfirm = () => {
    alert(`Compra confirmada: ${quantity} ${listing.tokenSymbol} por $${totalCost.toFixed(2)}`);
    onOpenChange(false);
    setQuantity('1');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-emerald-600" />
            {t('confirm_purchase')}
          </DialogTitle>
          <DialogDescription>{t('purchase_details')}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex items-center gap-4">
            <img src={listing.image} alt={listing.projectName} className="w-16 h-16 rounded-lg object-cover" />
            <div>
              <p className="font-semibold">{listing.projectName}</p>
              <Badge variant="outline">{listing.tokenSymbol}</Badge>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="buy-quantity">{t('quantity')}</Label>
            <Input
              id="buy-quantity"
              type="number"
              min="1"
              max={listing.quantity}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-lg p-4 border border-emerald-200 dark:border-emerald-800">
            <p className="text-sm text-muted-foreground mb-1">{t('total_cost')}</p>
            <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
              ${totalCost.toFixed(2)}
            </p>
          </div>
        </div>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t('cancel')}
          </Button>
          <Button onClick={handleConfirm} className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
            {t('confirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ListingCard({ listing, onBuyClick }: { listing: Listing, onBuyClick: (listing: Listing) => void }) {
  const { t } = useLanguage();
  const Icon = categoryIcons[listing.category] || Building2;

  return (
    <Card className={cn(
      "group overflow-hidden transition-all duration-500",
      "hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-2",
      "flex flex-col h-full border-2 border-slate-200/50 dark:border-slate-700/50",
      "hover:border-emerald-400/50 dark:hover:border-emerald-600/50",
      "bg-gradient-to-br from-white to-slate-50/50 dark:from-slate-900 dark:to-slate-800/50"
    )}>
      <div className="relative h-56 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
        <img
          src={listing.image}
          alt={listing.projectName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <div className="absolute top-4 right-4 z-20">
          <Badge className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg backdrop-blur-sm border-0">
            <Icon className="w-3 h-3 mr-1" />
            {listing.category}
          </Badge>
        </div>

        <div className="absolute bottom-4 left-4 right-4 z-20">
          <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-xl px-4 py-3 shadow-xl border border-white/20">
            <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">Vendedor</p>
            <p className="text-sm font-bold text-slate-900 dark:text-white">{listing.seller}</p>
          </div>
        </div>
      </div>

      <CardContent className="p-6 flex-grow flex flex-col gap-5">
        <div>
          <CardTitle className="text-lg font-bold line-clamp-2 mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            {listing.projectName}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700 font-semibold">
              {listing.tokenSymbol}
            </Badge>
            <span className="text-xs text-muted-foreground font-medium">{listing.quantity} tokens</span>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-xl p-5 bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
          <div className="relative">
            <p className="text-xs text-emerald-100 font-semibold mb-1">Precio por Token</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-white">${listing.pricePerToken}</span>
              <span className="text-sm text-emerald-100 font-medium">USD</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
            <p className="text-xs text-muted-foreground font-semibold mb-1">Disponibles</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white">{listing.quantity}</p>
          </div>
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
            <p className="text-xs text-muted-foreground font-semibold mb-1">Duración</p>
            <p className="text-xl font-black text-slate-900 dark:text-white">{listing.totalDuration}</p>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">Métodos de pago</p>
          <div className="flex flex-wrap gap-2">
            {listing.paymentMethods.map(method => (
              <Badge key={method} variant={getPaymentMethodVariant(method)} className="text-xs font-semibold px-3 py-1">
                {method}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 mt-auto gap-3 grid grid-cols-2">
        <Button
          className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold shadow-lg hover:shadow-xl transition-all group/btn"
          onClick={() => onBuyClick(listing)}
        >
          <ShoppingCart className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
          {t('buy_now')}
        </Button>
        <Button variant="outline" className="w-full border-2 border-emerald-300 dark:border-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 font-semibold group/btn">
          <Info className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
          {t('more_info')}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function TradePage() {
  const { t } = useLanguage();
  const [selectedTokenToSell, setSelectedTokenToSell] = useState('');
  const [sellQuantity, setSellQuantity] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const [activeTab, setActiveTab] = useState('buy');

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('price-asc');

  const [isTradeDialogOpen, setIsTradeDialogOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  const [showHeader, setShowHeader] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const lastScrollY = useRef(0);

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

  const filteredListings = useMemo(() => {
    let listings = marketProjects.filter(listing => {
      const searchTermMatch = listing.projectName.toLowerCase().includes(searchTerm.toLowerCase());
      const categoryMatch = selectedCategory === 'all' || listing.category.toLowerCase().replace(' ', '-') === selectedCategory;
      return searchTermMatch && categoryMatch;
    });

    listings.sort((a, b) => {
      switch (sortBy) {
        case 'price-desc':
          return b.pricePerToken - a.pricePerToken;
        case 'newest':
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/20 to-teal-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <P2PTradeDialog
        isOpen={isTradeDialogOpen}
        onOpenChange={setIsTradeDialogOpen}
        listing={selectedListing}
      />

      <div className={cn(
        "border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl sticky top-0 z-40 transition-all duration-300 ease-in-out transform shadow-lg",
        showHeader ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
      )}>
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent">
                {t('p2p_market')}
              </h1>
              <p className="text-sm text-muted-foreground mt-2 font-medium">{t('trade_security_tokens')}</p>
            </div>
            <Badge className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-5 py-2.5 text-base font-bold shadow-lg">
              {filteredListings.length} {filteredListings.length === 1 ? 'Listado' : 'Listados'}
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <div className="lg:hidden mb-4">
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2 border-2 hover:border-emerald-400 dark:hover:border-emerald-600 font-semibold"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
              >
                <Filter className="h-4 w-4" />
                {showMobileFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
              </Button>
            </div>

            {(selectedCategory !== "all" || sortBy !== "price-asc") && (
              <div className="flex flex-wrap gap-2 items-center mb-4 lg:hidden">
                {selectedCategory !== "all" && (
                  <Badge variant="secondary" className="text-xs font-semibold">
                    {selectedCategory}
                    <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => setSelectedCategory('all')} />
                  </Badge>
                )}
                {sortBy !== "price-asc" && (
                  <Badge variant="secondary" className="text-xs font-semibold">
                    <ArrowUpDown className="w-3 h-3 mr-1" />
                    {sortBy === "price-desc" ? "Precio ↓" : "Más nuevo"}
                  </Badge>
                )}
              </div>
            )}

            <SectionCard
              title={t('filters')}
              description="Refina tu búsqueda"
              className={cn(
                "transition-all duration-300 overflow-hidden sticky top-24",
                showMobileFilters ? 'max-h-full opacity-100' : 'lg:max-h-full lg:opacity-100 max-h-0 opacity-0 lg:pointer-events-auto pointer-events-none'
              )}
            >
              <div className="space-y-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                  <Input
                    placeholder={t('search_by_name')}
                    className="pl-10 border-2 focus-visible:border-emerald-400 h-11"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="grid gap-3">
                  <Label className="font-bold text-base">{t('category')}</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="border-2 h-11">
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
                  <Label className="font-bold text-base">{t('sort_by')}</Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="border-2 h-11">
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
                  className="w-full border-2 font-semibold"
                >
                  {t('clear_filters')}
                </Button>
              </div>
            </SectionCard>
          </aside>

          <main className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl h-14">
                <TabsTrigger 
                  value="buy" 
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-lg rounded-lg transition-all font-bold text-base"
                >
                  {t('buy_tokens')}
                </TabsTrigger>
                <TabsTrigger 
                  value="sell" 
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-lg rounded-lg transition-all font-bold text-base"
                >
                  {t('sell_my_tokens')}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="buy">
                {filteredListings.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredListings.map((listing) => (
                      <ListingCard key={listing.id} listing={listing} onBuyClick={handleBuyClick} />
                    ))}
                  </div>
                ) : (
                  <Card className="border-2 border-dashed">
                    <CardContent className="p-16 text-center">
                      <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-30" />
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">No se encontraron resultados</h3>
                      <p className="text-muted-foreground">Intenta ajustar tus filtros de búsqueda</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="sell">
                <SectionCard
                  title={t('create_sell_offer')}
                  description={t('publish_your_tokens')}
                  highlight
                >
                  <form onSubmit={handleSellSubmit} className="space-y-6">
                    <div className="space-y-3">
                      <Label htmlFor="tokenToSell" className="text-base font-bold">{t('token_to_sell')}</Label>
                      <Select onValueChange={setSelectedTokenToSell} value={selectedTokenToSell}>
                        <SelectTrigger id="tokenToSell" className="h-12 border-2">
                          <SelectValue placeholder={t('select_from_portfolio')} />
                        </SelectTrigger>
                        <SelectContent>
                          {myTokens.map(token => (
                            <SelectItem key={token.id} value={token.tokenSymbol}>
                              <div className="flex items-center gap-3">
                                <img src={token.image} className="w-8 h-8 object-cover rounded-lg"/>
                                <div className="text-sm">
                                  <p className="font-semibold">{token.projectName}</p>
                                  <p className="text-xs text-muted-foreground">{token.availableToSell} {t('available_to_sell')}</p>
                                </div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {selectedTokenToSell && (
                      <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 border-2 border-emerald-200 dark:border-emerald-800/50">
                        <CardContent className="pt-6">
                          <p className="text-sm font-bold text-emerald-900 dark:text-emerald-100 mb-4">Resumen de la oferta</p>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs text-emerald-700 dark:text-emerald-300 font-semibold mb-1">Total a recibir</p>
                              <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
                                ${(parseInt(sellQuantity) * parseFloat(sellPrice) || 0).toFixed(2)}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-emerald-700 dark:text-emerald-300 font-semibold mb-1">Disponibles</p>
                              <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
                                {myTokens.find(t => t.tokenSymbol === selectedTokenToSell)?.availableToSell || 0}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Label htmlFor="sellQuantity" className="text-base font-bold">{t('quantity')}</Label>
                        <Input
                          id="sellQuantity"
                          type="number"
                          placeholder={t('quantity_placeholder')}
                          value={sellQuantity}
                          onChange={(e) => setSellQuantity(e.target.value)}
                          required
                          min="1"
                          className="h-12 border-2"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="sellPrice" className="text-base font-bold">{t('price_per_token_usd')}</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                          <Input
                            id="sellPrice"
                            type="number"
                            placeholder={t('price_placeholder')}
                            value={sellPrice}
                            onChange={(e) => setSellPrice(e.target.value)}
                            required
                            min="0.01"
                            step="0.01"
                            className="pl-10 h-12 border-2"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button
                        type="submit"
                        size="lg"
                        className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold shadow-lg h-12"
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        {t('publish_sell_offer')}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        className="border-2 h-12 font-semibold"
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
