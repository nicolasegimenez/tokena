import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Tag, Building, DollarSign, Clock } from 'lucide-react';
import { useLanguage } from '@/lib/language';
import { marketProjects } from '@/lib/market-data';
import { Badge } from '@/components/ui/badge';
import { P2PTradeDialog } from '@/components/P2PTradeDialog';

const myTokens = [
  { id: 't1', projectName: 'Eco-Friendly Housing', tokenSymbol: 'ECOH', quantity: 200, availableToSell: 150, image: 'https://res.cloudinary.com/dhacybdxf/image/upload/v1762299810/edificio_qhi0ri.png' },
  { id: 't2', projectName: 'Tech Startup Fund', tokenSymbol: 'TSF', quantity: 100, availableToSell: 100, image: 'https://res.cloudinary.com/dhacybdxf/image/upload/v1762299809/ethereum_vs8k4y.png' },
];

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

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 duration-300 flex flex-col">
      <CardHeader className="p-0">
        <img src={listing.image} alt={listing.projectName} className="w-full h-48 object-cover" />
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-bold mb-2 truncate">{listing.projectName}</CardTitle>
        <CardDescription className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Tag className="w-4 h-4" /> {listing.tokenSymbol}
          <Building className="w-4 h-4 ml-auto" /> {t(listing.category.toLowerCase().replace(' ', '_'))}
        </CardDescription>
        <div className="flex justify-between items-center mb-4">
          <div className="text-2xl font-bold text-primary">${listing.pricePerToken}</div>
          <div className="text-right">
            <p className="text-sm font-medium">{t('available')}</p>
            <p className="text-sm text-muted-foreground">{listing.quantity}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Clock className="w-4 h-4" />
          <span>{listing.totalDuration} para recibir ganancias</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {listing.paymentMethods.map(method => (
            <Badge key={method} variant={getPaymentMethodVariant(method)}>{method}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 mt-auto grid grid-cols-2 gap-2">
        <Button className="w-full" onClick={() => onBuyClick(listing)}>{t('buy_now')}</Button>
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
  const [selectedTokenToSell, setSelectedTokenToSell] = useState('');
  const [sellQuantity, setSellQuantity] = useState('');
  const [sellPrice, setSellPrice] = useState('');

  // State for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('price-asc');

  // State for P2P Dialog
  const [isTradeDialogOpen, setIsTradeDialogOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

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
    <div className="container mx-auto py-8">
      <P2PTradeDialog 
        isOpen={isTradeDialogOpen} 
        onOpenChange={setIsTradeDialogOpen} 
        listing={selectedListing} 
      />
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">{t('p2p_market')}</h1>
        <p className="text-muted-foreground mt-2">{t('trade_security_tokens')}</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* --- Sidebar de Filtros --- */}
        <aside className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">{t('filters')}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder={t('search_by_name')} className="pl-10" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
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
              <Button variant="secondary" onClick={() => { setSearchTerm(''); setSelectedCategory('all'); setSortBy('price-asc'); }}>{t('clear_filters')}</Button>
            </CardContent>
          </Card>
        </aside>

        {/* --- Contenido Principal (Tabs) --- */}
        <main className="lg:col-span-3">
          <Tabs defaultValue="buy" className="w-full">
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
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">{t('create_sell_offer')}</CardTitle>
                  <CardDescription>{t('publish_your_tokens')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSellSubmit} className="grid gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="tokenToSell">{t('token_to_sell')}</Label>
                      <Select onValueChange={setSelectedTokenToSell} value={selectedTokenToSell}>
                        <SelectTrigger id="tokenToSell">
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
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="sellQuantity">{t('quantity')}</Label>
                        <Input id="sellQuantity" type="number" placeholder={t('quantity_placeholder')} value={sellQuantity} onChange={(e) => setSellQuantity(e.target.value)} required min="1" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="sellPrice">{t('price_per_token_usd')}</Label>
                        <div className="relative">
                           <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                           <Input id="sellPrice" type="number" placeholder={t('price_placeholder')} value={sellPrice} onChange={(e) => setSellPrice(e.target.value)} required min="0.01" step="0.01" className="pl-8"/>
                        </div>
                      </div>
                    </div>
                    <CardFooter className="p-0 pt-4">
                       <Button type="submit" size="lg" className="w-full">{t('publish_sell_offer')}</Button>
                    </CardFooter>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}