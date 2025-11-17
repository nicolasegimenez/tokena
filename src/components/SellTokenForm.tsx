import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SectionCard } from '@/components/SectionCard';
import { DollarSign } from 'lucide-react';
import { myTokens } from '@/lib/trade-constants';

interface SellTokenFormProps {
  selectedToken: string;
  onTokenChange: (value: string) => void;
  quantity: string;
  onQuantityChange: (value: string) => void;
  price: string;
  onPriceChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClear: () => void;
}

export function SellTokenForm({
  selectedToken,
  onTokenChange,
  quantity,
  onQuantityChange,
  price,
  onPriceChange,
  onSubmit,
  onClear,
}: SellTokenFormProps) {
  const selectedTokenData = myTokens.find(t => t.tokenSymbol === selectedToken);
  const total = selectedTokenData && quantity && price
    ? (parseInt(quantity) * parseFloat(price)).toFixed(2)
    : '0.00';

  return (
    <SectionCard
      title="Crear oferta de venta"
      description="Publica tus tokens en el mercado"
      highlight
    >
      <form onSubmit={onSubmit} className="space-y-6">
        {/* Token Selection */}
        <div className="space-y-3">
          <Label htmlFor="tokenToSell" className="text-base font-semibold">
            Token a vender
          </Label>
          <Select onValueChange={onTokenChange} value={selectedToken}>
            <SelectTrigger id="tokenToSell" className="h-11 border-2">
              <SelectValue placeholder="Seleccionar de tu portafolio" />
            </SelectTrigger>
            <SelectContent>
              {myTokens.map(token => (
                <SelectItem key={token.id} value={token.tokenSymbol}>
                  <div className="flex items-center gap-3">
                    <img src={token.image} className="w-6 h-6 object-cover rounded" alt={token.tokenSymbol} />
                    <div className="text-sm">
                      <p className="font-medium">{token.projectName}</p>
                      <p className="text-xs text-muted-foreground">
                        {token.availableToSell} disponibles
                      </p>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Summary Card */}
        {selectedToken && (
          <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 border-emerald-200 dark:border-emerald-800/50">
            <CardContent className="pt-6">
              <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-100 mb-4">
                Resumen de la oferta
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-emerald-700 dark:text-emerald-300 font-medium">
                    Total a recibir
                  </p>
                  <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                    ${total}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-emerald-700 dark:text-emerald-300 font-medium">
                    Disponibles
                  </p>
                  <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                    {selectedTokenData?.availableToSell || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quantity & Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <Label htmlFor="sellQuantity" className="text-base font-semibold">
              Cantidad
            </Label>
            <Input
              id="sellQuantity"
              type="number"
              placeholder="Cantidad a vender"
              value={quantity}
              onChange={(e) => onQuantityChange(e.target.value)}
              required
              min="1"
              className="h-11 border-2"
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="sellPrice" className="text-base font-semibold">
              Precio por token (USD)
            </Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                id="sellPrice"
                type="number"
                placeholder="Precio"
                value={price}
                onChange={(e) => onPriceChange(e.target.value)}
                required
                min="0.01"
                step="0.01"
                className="pl-8 h-11 border-2"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <Button
            type="submit"
            size="lg"
            className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold shadow-md"
          >
            Publicar oferta
          </Button>
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="border-2"
            onClick={onClear}
          >
            Limpiar
          </Button>
        </div>
      </form>
    </SectionCard>
  );
}
