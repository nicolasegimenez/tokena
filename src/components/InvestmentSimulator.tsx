import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/lib/auth";
import SignUpModal from "@/components/SignUpModal";
import PaymentDialog from "@/components/PaymentDialog";

interface InvestmentSimulatorProps {
  projectData: {
    id: number;
    title: string;
    pricePerToken: number;
    roi: number;
    duration: number;
    fundingGoal: number;
    amountRaised: number;
    currency?: string;
  };
}

const InvestmentSimulator = ({ projectData }: InvestmentSimulatorProps) => {
  const { isAuthenticated } = useAuth();
  const [investmentAmount, setInvestmentAmount] = useState(1000);
  const [inputValue, setInputValue] = useState("1000");
  const [timeframe, setTimeframe] = useState(projectData.duration);
  const [roi, setRoi] = useState(projectData.roi);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [signUpDialogOpen, setSignUpDialogOpen] = useState(false);

  // Calcular tokens a recibir
  const tokensToReceive = Math.floor(investmentAmount / projectData.pricePerToken);
  
  // Calcular ganancia total
  const totalReturn = investmentAmount * (1 + roi / 100);
  const profit = totalReturn - investmentAmount;
  
  // Calcular ganancia mensual (comentado por ahora, se puede usar más adelante)
  // const monthlyReturn = investmentAmount * ((roi / 100) / (timeframe / 12));
  // const monthlyProfit = monthlyReturn - (investmentAmount / timeframe);

  // Calcular proyección por mes
  const monthlyProjections = Array.from({ length: Math.min(timeframe, 36) }, (_, i) => {
    const month = i + 1;
    // ROI anual compuesto mensualmente
    const monthlyRate = Math.pow(1 + roi / 100, 1 / 12) - 1;
    const cumulativeReturn = investmentAmount * Math.pow(1 + monthlyRate, month);
    const cumulativeProfit = cumulativeReturn - investmentAmount;
    return {
      month,
      value: cumulativeReturn,
      profit: cumulativeProfit,
    };
  });

  // Calcular diferentes escenarios
  const scenarios = [
    { label: "Conservador", roiMultiplier: 0.7, color: "bg-blue-500" },
    { label: "Esperado", roiMultiplier: 1.0, color: "bg-green-500" },
    { label: "Optimista", roiMultiplier: 1.3, color: "bg-yellow-500" },
  ];

  const handleAmountChange = (value: number) => {
    const validatedValue = Math.max(100, Math.min(value, projectData.fundingGoal - projectData.amountRaised));
    setInvestmentAmount(validatedValue);
    setInputValue(validatedValue.toString());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Permitir escribir libremente (vacío, números, punto decimal)
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setInputValue(value);
      // Si es un número válido, actualizar también el monto
      const numValue = parseFloat(value);
      if (!isNaN(numValue) && numValue > 0) {
        setInvestmentAmount(numValue);
      }
    }
  };

  const handleInputBlur = () => {
    // Validar y ajustar el valor al perder el foco
    const numValue = parseFloat(inputValue);
    if (isNaN(numValue) || numValue < 100) {
      handleAmountChange(100);
    } else if (numValue > projectData.fundingGoal - projectData.amountRaised) {
      handleAmountChange(projectData.fundingGoal - projectData.amountRaised);
    } else {
      setInvestmentAmount(numValue);
      setInputValue(numValue.toString());
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Simulador de Inversión</CardTitle>
        <CardDescription>
          Calcula tus ganancias potenciales y proyecta tu retorno
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="simulator" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="simulator">Simulador</TabsTrigger>
            <TabsTrigger value="projections">Proyecciones</TabsTrigger>
          </TabsList>

          <TabsContent value="simulator" className="space-y-6 mt-4">
            {/* Monto de inversión */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label htmlFor="amount">Monto de Inversión (USD)</Label>
                <Badge variant="secondary">
                  Máx: ${(projectData.fundingGoal - projectData.amountRaised).toLocaleString()}
                </Badge>
              </div>
              <div className="space-y-2">
                <Input
                  id="amount"
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  placeholder="1000"
                  className="text-lg font-semibold"
                />
                <Slider
                  value={[investmentAmount]}
                  onValueChange={([value]) => handleAmountChange(value)}
                  min={100}
                  max={Math.min(100000, projectData.fundingGoal - projectData.amountRaised)}
                  step={100}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>$100</span>
                  <span>${Math.min(100000, projectData.fundingGoal - projectData.amountRaised).toLocaleString()}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* ROI y duración */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="roi">ROI Esperado (%)</Label>
                <Input
                  id="roi"
                  type="number"
                  value={roi}
                  onChange={(e) => setRoi(Number(e.target.value))}
                  min={0}
                  max={100}
                  className="text-center font-semibold"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duración (meses)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={timeframe}
                  onChange={(e) => setTimeframe(Number(e.target.value))}
                  min={1}
                  max={60}
                  className="text-center font-semibold"
                />
              </div>
            </div>

            <Separator />

            {/* Resumen de inversión */}
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Resumen de Inversión</h4>
              <div className="rounded-lg border p-4 space-y-3 bg-muted/30">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Tokens a recibir</span>
                  <span className="text-lg font-bold">{tokensToReceive.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Precio por token</span>
                  <span className="font-medium">${projectData.pricePerToken}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Resultados principales */}
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Proyección de Retorno</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border p-4 bg-green-50 dark:bg-green-950/20">
                  <p className="text-xs text-muted-foreground mb-1">Inversión Inicial</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    ${investmentAmount.toLocaleString()}
                  </p>
                </div>
                <div className="rounded-lg border p-4 bg-blue-50 dark:bg-blue-950/20">
                  <p className="text-xs text-muted-foreground mb-1">Ganancia Total</p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    ${profit.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
              <div className="rounded-lg border p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20">
                <p className="text-xs text-muted-foreground mb-1">Valor Total al Vencimiento</p>
                <p className="text-3xl font-extrabold text-center">
                  ${totalReturn.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </p>
              </div>
            </div>

            <Separator />

            {/* Escenarios */}
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Escenarios de Retorno</h4>
              <div className="space-y-2">
                {scenarios.map((scenario) => {
                  const scenarioROI = roi * scenario.roiMultiplier;
                  const scenarioReturn = investmentAmount * (1 + scenarioROI / 100);
                  const scenarioProfit = scenarioReturn - investmentAmount;
                  
                  return (
                    <div key={scenario.label} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${scenario.color}`} />
                        <span className="text-sm font-medium">{scenario.label}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold">
                          ${scenarioReturn.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          +${scenarioProfit.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="projections" className="space-y-6 mt-4">
            <div className="space-y-4">
              <h4 className="font-semibold text-sm">Proyección Mensual</h4>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {monthlyProjections.map((projection) => (
                  <div key={projection.month} className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <p className="font-medium">Mes {projection.month}</p>
                      <p className="text-xs text-muted-foreground">
                        Valor acumulado: ${projection.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      </p>
                    </div>
                    <Badge variant={projection.profit > 0 ? "default" : "secondary"} className="ml-auto">
                      +${projection.profit.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <Separator />

        <Button
          size="lg"
          className="w-full bg-green-600 hover:bg-green-700"
          onClick={() => {
            if (isAuthenticated) {
              setPaymentDialogOpen(true);
            } else {
              setSignUpDialogOpen(true);
            }
          }}
        >
          Proceder con Inversión
        </Button>

        {/* Payment Dialog - Solo se abre si está autenticado */}
        {isAuthenticated && (
          <PaymentDialog
            open={paymentDialogOpen}
            onOpenChange={setPaymentDialogOpen}
            investment={{
              id: projectData.id,
              title: projectData.title,
              price: investmentAmount,
              currency: projectData.currency || "USD",
            }}
          />
        )}

        {/* SignUp Modal - Solo se abre si NO está autenticado */}
        {!isAuthenticated && (
          <SignUpModal
            open={signUpDialogOpen}
            onOpenChange={(open) => {
              setSignUpDialogOpen(open);
              // Si se completa el signup, abre el payment dialog
              if (!open && isAuthenticated) {
                setPaymentDialogOpen(true);
              }
            }}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default InvestmentSimulator;
