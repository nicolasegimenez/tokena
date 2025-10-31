import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Placeholder data for available tokens and user's tokens
const availableListings = [
  { id: '1', projectName: 'Eco-Friendly Housing', tokenSymbol: 'ECOH', quantity: 100, pricePerToken: 105, seller: '0xabc...' },
  { id: '2', projectName: 'Renewable Energy Farm', tokenSymbol: 'RENF', quantity: 50, pricePerToken: 210, seller: '0xdef...' },
  { id: '3', projectName: 'Tech Startup Fund', tokenSymbol: 'TSF', quantity: 200, pricePerToken: 50, seller: '0xghi...' },
];

const myTokens = [
  { id: 't1', projectName: 'Eco-Friendly Housing', tokenSymbol: 'ECOH', quantity: 200, availableToSell: 150 },
  { id: 't2', projectName: 'Tech Startup Fund', tokenSymbol: 'TSF', quantity: 100, availableToSell: 100 },
];

export default function TradePage() {
  const [selectedTokenToSell, setSelectedTokenToSell] = useState('');
  const [sellQuantity, setSellQuantity] = useState('');
  const [sellPrice, setSellPrice] = useState('');

  const handleSellSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      action: 'sell',
      token: selectedTokenToSell,
      quantity: sellQuantity,
      price: sellPrice,
    });
    alert('Oferta de venta creada (simulado)!');
    setSelectedTokenToSell('');
    setSellQuantity('');
    setSellPrice('');
  };

  const handleBuy = (listingId: string) => {
    console.log(`Comprar listing: ${listingId}`);
    alert(`Has comprado (simulado) el listing ${listingId}!`);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Mercado P2P de Security Tokens</h1>

      <Tabs defaultValue="buy" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="buy">Comprar Tokens</TabsTrigger>
          <TabsTrigger value="sell">Vender Tokens</TabsTrigger>
        </TabsList>
        <TabsContent value="buy">
          <Card>
            <CardHeader>
              <CardTitle>Listados Disponibles</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Proyecto</TableHead>
                    <TableHead>Símbolo</TableHead>
                    <TableHead>Cantidad</TableHead>
                    <TableHead>Precio/Token (USD)</TableHead>
                    <TableHead>Vendedor</TableHead>
                    <TableHead>Acción</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {availableListings.map((listing) => (
                    <TableRow key={listing.id}>
                      <TableCell className="font-medium">{listing.projectName}</TableCell>
                      <TableCell>{listing.tokenSymbol}</TableCell>
                      <TableCell>{listing.quantity}</TableCell>
                      <TableCell>${listing.pricePerToken}</TableCell>
                      <TableCell>{listing.seller}</TableCell>
                      <TableCell>
                        <Button size="sm" onClick={() => handleBuy(listing.id)}>Comprar</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="sell">
          <Card>
            <CardHeader>
              <CardTitle>Vender Mis Tokens</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSellSubmit} className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="tokenToSell">Seleccionar Token</Label>
                  <Select onValueChange={setSelectedTokenToSell} value={selectedTokenToSell}>
                    <SelectTrigger id="tokenToSell">
                      <SelectValue placeholder="Selecciona un token" />
                    </SelectTrigger>
                    <SelectContent>
                      {myTokens.map(token => (
                        <SelectItem key={token.id} value={token.tokenSymbol}>
                          {token.projectName} ({token.tokenSymbol}) - {token.availableToSell} disponibles
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="sellQuantity">Cantidad a Vender</Label>
                  <Input
                    id="sellQuantity"
                    type="number"
                    placeholder="Ej: 10"
                    value={sellQuantity}
                    onChange={(e) => setSellQuantity(e.target.value)}
                    required
                    min="1"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="sellPrice">Precio por Token (USD)</Label>
                  <Input
                    id="sellPrice"
                    type="number"
                    placeholder="Ej: 105.50"
                    value={sellPrice}
                    onChange={(e) => setSellPrice(e.target.value)}
                    required
                    min="0.01"
                    step="0.01"
                  />
                </div>
                <Button type="submit" className="w-full">Publicar Oferta de Venta</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
