import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Tag, Building, DollarSign } from 'lucide-react';

// --- Datos de Ejemplo Mejorados ---
const availableListings = [
  { id: '1', projectName: 'Eco-Friendly Housing', tokenSymbol: 'ECOH', quantity: 100, pricePerToken: 105, seller: '0xabc...', image: 'https://res.cloudinary.com/dhacybdxf/image/upload/v1762299810/edificio_qhi0ri.png', category: 'Real Estate' },
  { id: '2', projectName: 'Renewable Energy Farm', tokenSymbol: 'RENF', quantity: 50, pricePerToken: 210, seller: '0xdef...', image: 'https://res.cloudinary.com/dhacybdxf/image/upload/v1762299809/startup_tb5wu3.png', category: 'Energy' },
  { id: '3', projectName: 'Tech Startup Fund', tokenSymbol: 'TSF', quantity: 200, pricePerToken: 50, seller: '0xghi...', image: 'https://res.cloudinary.com/dhacybdxf/image/upload/v1762299809/ethereum_vs8k4y.png', category: 'Venture Capital' },
  { id: '4', projectName: 'Real Estate Portfolio', tokenSymbol: 'REPT', quantity: 75, pricePerToken: 150, seller: '0xjkl...', image: 'https://res.cloudinary.com/dhacybdxf/image/upload/v1762299810/edificio_qhi0ri.png', category: 'Real Estate' },
  { id: '5', projectName: 'Crypto Index Fund', tokenSymbol: 'CIF', quantity: 300, pricePerToken: 25, seller: '0xmno...', image: 'https://res.cloudinary.com/dhacybdxf/image/upload/v1762299809/ethereum_vs8k4y.png', category: 'Crypto' },
  { id: '6', projectName: 'Art Collection', tokenSymbol: 'ARTC', quantity: 10, pricePerToken: 1000, seller: '0xpqr...', image: 'https://res.cloudinary.com/dhacybdxf/image/upload/v1762299809/startup_tb5wu3.png', category: 'Collectibles' },
];

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
}

// --- Componente de Tarjeta de Listado ---
function ListingCard({ listing }: { listing: Listing }) {
  const handleBuy = (listingId: string) => {
    console.log(`Comprar listing: ${listingId}`);
    alert(`Has comprado (simulado) el listing ${listingId}!`);
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 duration-300">
      <CardHeader className="p-0">
        <img src={listing.image} alt={listing.projectName} className="w-full h-48 object-cover" />
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg font-bold mb-2 truncate">{listing.projectName}</CardTitle>
        <CardDescription className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Tag className="w-4 h-4" /> {listing.tokenSymbol}
          <Building className="w-4 h-4 ml-auto" /> {listing.category}
        </CardDescription>
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-primary">${listing.pricePerToken}</div>
          <div className="text-right">
            <p className="text-sm font-medium">Disponibles</p>
            <p className="text-sm text-muted-foreground">{listing.quantity}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" onClick={() => handleBuy(listing.id)}>Comprar Ahora</Button>
      </CardFooter>
    </Card>
  );
}

// --- Componente Principal de la Página de Trade ---
export default function TradePage() {
  const [selectedTokenToSell, setSelectedTokenToSell] = useState('');
  const [sellQuantity, setSellQuantity] = useState('');
  const [sellPrice, setSellPrice] = useState('');

  const handleSellSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ action: 'sell', token: selectedTokenToSell, quantity: sellQuantity, price: sellPrice });
    alert('Oferta de venta creada (simulado)!');
    setSelectedTokenToSell('');
    setSellQuantity('');
    setSellPrice('');
  };

  return (
    <div className="container mx-auto py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Mercado P2P</h1>
        <p className="text-muted-foreground mt-2">Intercambia security tokens de forma segura y eficiente.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* --- Sidebar de Filtros --- */}
        <aside className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Filtros</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Buscar por nombre..." className="pl-10" />
              </div>
              <div className="grid gap-2">
                <Label>Categoría</Label>
                <Select>
                  <SelectTrigger className="w-full truncate">
                    <SelectValue placeholder="Todas las categorías" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las categorías</SelectItem>
                    <SelectItem value="real-estate">Real Estate</SelectItem>
                    <SelectItem value="energy">Energy</SelectItem>
                    <SelectItem value="vc">Venture Capital</SelectItem>
                    <SelectItem value="crypto">Crypto</SelectItem>
                    <SelectItem value="collectibles">Collectibles</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Ordenar por</Label>
                <Select>
                  <SelectTrigger className="w-full truncate">
                    <SelectValue placeholder="Precio: de menor a mayor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price-asc">Precio: de menor a mayor</SelectItem>
                    <SelectItem value="price-desc">Precio: de mayor a menor</SelectItem>
                    <SelectItem value="newest">Más recientes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="secondary">Limpiar Filtros</Button>
            </CardContent>
          </Card>
        </aside>

        {/* --- Contenido Principal (Tabs) --- */}
        <main className="lg:col-span-3">
          <Tabs defaultValue="buy" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="buy">Comprar Tokens</TabsTrigger>
              <TabsTrigger value="sell">Vender Mis Tokens</TabsTrigger>
            </TabsList>

            {/* --- Tab de Comprar --- */}
            <TabsContent value="buy">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {availableListings.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            </TabsContent>

            {/* --- Tab de Vender --- */}
            <TabsContent value="sell">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Crear una Oferta de Venta</CardTitle>
                  <CardDescription>Publica tus tokens en el mercado para que otros los compren.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSellSubmit} className="grid gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="tokenToSell">Token a Vender</Label>
                      <Select onValueChange={setSelectedTokenToSell} value={selectedTokenToSell}>
                        <SelectTrigger id="tokenToSell">
                          <SelectValue placeholder="Selecciona de tu portafolio" />
                        </SelectTrigger>
                        <SelectContent>
                          {myTokens.map(token => (
                            <SelectItem key={token.id} value={token.tokenSymbol}>
                              <div className="flex items-center gap-3">
                                <img src={token.image} className="w-8 h-8 object-cover rounded-md"/>
                                <div>
                                  <p>{token.projectName} ({token.tokenSymbol})</p>
                                  <p className="text-xs text-muted-foreground">{token.availableToSell} disponibles</p>
                                </div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="sellQuantity">Cantidad</Label>
                        <Input id="sellQuantity" type="number" placeholder="Ej: 10" value={sellQuantity} onChange={(e) => setSellQuantity(e.target.value)} required min="1" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="sellPrice">Precio por Token (USD)</Label>
                        <div className="relative">
                           <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                           <Input id="sellPrice" type="number" placeholder="Ej: 105.50" value={sellPrice} onChange={(e) => setSellPrice(e.target.value)} required min="0.01" step="0.01" className="pl-8"/>
                        </div>
                      </div>
                    </div>
                    <CardFooter className="p-0 pt-4">
                       <Button type="submit" size="lg" className="w-full">Publicar Oferta de Venta</Button>
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