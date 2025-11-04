import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  investment: {
    id: number;
    title: string;
    price: number;
    currency?: string;
  };
}

type PaymentMethod = "crypto" | "pesos" | "dolares";

const PaymentDialog = ({ open, onOpenChange, investment }: PaymentDialogProps) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("crypto");
  const [amount, setAmount] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      // TODO: Integrar con API de manteca.dev
      // const response = await fetch('https://api.manteca.dev/...', {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     investmentId: investment.id,
      //     amount: parseFloat(amount),
      //     currency: paymentMethod,
      //   })
      // });
      
      // Simulación de pago
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("Pago procesado:", {
        investmentId: investment.id,
        amount: parseFloat(amount),
        method: paymentMethod,
      });
      
      alert("Pago procesado exitosamente (simulación)");
      onOpenChange(false);
    } catch (error) {
      console.error("Error en el pago:", error);
      alert("Error al procesar el pago");
    } finally {
      setLoading(false);
    }
  };

  const handleAmountChange = (value: string) => {
    const numValue = value.replace(/[^0-9.]/g, "");
    if (numValue === "" || (!isNaN(parseFloat(numValue)) && parseFloat(numValue) >= 0)) {
      setAmount(numValue);
    }
  };

  const getPaymentLabel = (method: PaymentMethod) => {
    switch (method) {
      case "crypto":
        return "Criptomonedas";
      case "pesos":
        return "Pesos Argentinos";
      case "dolares":
        return "Dólares";
    }
  };

  const getCurrencySymbol = (method: PaymentMethod) => {
    switch (method) {
      case "crypto":
        return "USDT";
      case "pesos":
        return "ARS";
      case "dolares":
        return "USD";
    }
  };

  const maxAmount = investment.price;
  const amountValue = parseFloat(amount) || 0;
  const isValidAmount = amountValue > 0 && amountValue <= maxAmount;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Procesar Inversión</DialogTitle>
          <DialogDescription>
            Completa los datos para realizar tu inversión en {investment.title}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Resumen de inversión */}
          <div className="rounded-lg border p-4 bg-muted/50">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Inversión</span>
              <Badge variant="secondary">{investment.title}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Monto total</span>
              <span className="text-lg font-bold">
                ${investment.price.toLocaleString()} {investment.currency || "USD"}
              </span>
            </div>
          </div>

          <Separator />

          {/* Método de pago */}
          <div className="space-y-2">
            <Label htmlFor="payment-method">Método de pago</Label>
            <Select value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}>
              <SelectTrigger id="payment-method">
                <SelectValue placeholder="Selecciona método de pago" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="crypto">Criptomonedas (USDT, BTC, ETH)</SelectItem>
                <SelectItem value="pesos">Pesos Argentinos (ARS)</SelectItem>
                <SelectItem value="dolares">Dólares (USD)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Monto a invertir */}
          <div className="space-y-2">
            <Label htmlFor="amount">Monto a invertir</Label>
            <div className="flex gap-2">
              <Input
                id="amount"
                type="text"
                placeholder="0.00"
                value={amount}
                onChange={(e) => handleAmountChange(e.target.value)}
                className="flex-1"
              />
              <div className="flex items-center px-3 border rounded-md bg-muted">
                <span className="text-sm font-medium">{getCurrencySymbol(paymentMethod)}</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Máximo: {maxAmount.toLocaleString()} {investment.currency || "USD"}
            </p>
            {amountValue > maxAmount && (
              <p className="text-xs text-destructive">
                El monto excede el máximo permitido
              </p>
            )}
          </div>

          {/* Resumen de pago */}
          {amountValue > 0 && isValidAmount && (
            <div className="rounded-lg border p-4 bg-green-50 dark:bg-green-950/20">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Monto</span>
                  <span className="font-medium">
                    {amountValue.toLocaleString()} {getCurrencySymbol(paymentMethod)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Método</span>
                  <span className="font-medium">{getPaymentLabel(paymentMethod)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-green-600 dark:text-green-400">
                    {amountValue.toLocaleString()} {getCurrencySymbol(paymentMethod)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Nota sobre API */}
          <div className="rounded-lg border border-dashed p-3 bg-muted/30">
            <p className="text-xs text-muted-foreground text-center">
              Este pago se procesará a través de la API de manteca.dev
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
            Cancelar
          </Button>
          <Button
            onClick={handlePayment}
            disabled={!isValidAmount || loading}
            className="bg-green-600 hover:bg-green-700"
          >
            {loading ? "Procesando..." : `Pagar con ${getPaymentLabel(paymentMethod)}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;
