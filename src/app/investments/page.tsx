import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, DollarSign, Wallet } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const InvestmentsPage: React.FC = () => {
  // Mock data - Inversiones que posee el usuario
  const myInvestments = [
    {
      id: 1,
      title: "Apartamentos Tokenizados",
      symbol: "APT",
      quantity: 150,
      pricePerToken: 1000,
      currentValue: 150000,
      roi: 12.5,
      change24h: 1250,
      changePercent: 0.84,
      status: "active"
    },
    {
      id: 2,
      title: "Crypto Fund Premium",
      symbol: "CFP",
      quantity: 500,
      pricePerToken: 500,
      currentValue: 250000,
      roi: 18.7,
      change24h: 3500,
      changePercent: 1.42,
      status: "active"
    },
    {
      id: 3,
      title: "Startup Tecnológica",
      symbol: "TECH",
      quantity: 75,
      pricePerToken: 750,
      currentValue: 56250,
      roi: 25.3,
      change24h: 850,
      changePercent: 1.53,
      status: "active"
    },
    {
      id: 4,
      title: "Energía Solar",
      symbol: "SOLAR",
      quantity: 100,
      pricePerToken: 1500,
      currentValue: 150000,
      roi: 9.8,
      change24h: -1200,
      changePercent: -0.79,
      status: "active"
    }
  ];

  // Calcular totales
  const totalValue = myInvestments.reduce((sum, inv) => sum + inv.currentValue, 0);
  const totalChange = myInvestments.reduce((sum, inv) => sum + inv.change24h, 0);
  const totalChangePercent = (totalChange / totalValue) * 100;

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Mis Inversiones</h1>
        <p className="text-lg text-muted-foreground">
          Gestiona y monitorea tus activos tokenizados
        </p>
      </div>

      {/* Portfolio Summary */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ${totalValue.toLocaleString('es-AR', { maximumFractionDigits: 0 })}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {myInvestments.length} activos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cambio 24h</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${totalChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {totalChange >= 0 ? '+' : ''}${Math.abs(totalChange).toLocaleString('es-AR', { maximumFractionDigits: 0 })}
            </div>
            <p className={`text-xs mt-2 ${totalChangePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {totalChangePercent >= 0 ? '+' : ''}{totalChangePercent.toFixed(2)}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ROI Promedio</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {(myInvestments.reduce((sum, inv) => sum + inv.roi, 0) / myInvestments.length).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Retorno anual esperado
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Investments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Tus Tokens</CardTitle>
          <CardDescription>
            Listado de todos los activos que posees
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Activo</TableHead>
                  <TableHead className="text-right">Cantidad</TableHead>
                  <TableHead className="text-right">Precio Unitario</TableHead>
                  <TableHead className="text-right">Valor Total</TableHead>
                  <TableHead className="text-right">Cambio 24h</TableHead>
                  <TableHead className="text-right">ROI Anual</TableHead>
                  <TableHead className="text-center">Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {myInvestments.map((investment) => (
                  <TableRow key={investment.id}>
                    <TableCell>
                      <div>
                        <div className="font-semibold">{investment.title}</div>
                        <div className="text-sm text-muted-foreground">{investment.symbol}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {investment.quantity.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      ${investment.pricePerToken.toLocaleString('es-AR')}
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      ${investment.currentValue.toLocaleString('es-AR', { maximumFractionDigits: 0 })}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className={investment.change24h >= 0 ? 'text-green-600' : 'text-red-600'}>
                        <div className="font-medium">
                          {investment.change24h >= 0 ? '+' : ''}${Math.abs(investment.change24h).toLocaleString('es-AR')}
                        </div>
                        <div className="text-xs">
                          {investment.changePercent >= 0 ? '+' : ''}{investment.changePercent.toFixed(2)}%
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="text-green-600 font-bold">{investment.roi}%</span>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="default" className="bg-green-600">
                        Activo
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="mt-8 flex justify-end gap-4">
        <Button variant="outline">
          Descargar Reporte
        </Button>
        <Button>
          Invertir Más
        </Button>
      </div>
    </div>
  );
};

export default InvestmentsPage;
