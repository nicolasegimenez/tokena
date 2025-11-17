import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/PageHeader";
import { SectionCard } from "@/components/SectionCard";
import { StatsCard } from "@/components/StatsCard";
import { TrendingUp, ArrowUpRight, ArrowDownLeft, PieChart } from 'lucide-react';
import portfolioData from "./my-portfolio-data.json";

export default function PortfolioPage() {
  const totalValue = portfolioData.assets.reduce((acc, asset) => acc + (asset.quantity * asset.price), 0);
  const isPositiveChange = portfolioData.portfolioChange24h >= 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Premium Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <PageHeader
            title="Mi Portafolio"
            description="Gestiona y monitorea tus inversiones tokenizadas"
            breadcrumbs={[
              { label: 'Home', href: '/' },
              { label: 'Portafolio', href: '/portfolio' }
            ]}
          />
          <div className="flex flex-wrap gap-2">
            <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white">
              Depositar
            </Button>
            <Button variant="outline" className="border-2">
              Retirar
            </Button>
            <Button variant="outline" className="border-2">
              Tradear
            </Button>
          </div>
        </div>

        {/* Portfolio Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Valor Total del Portafolio"
            value={`$${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            description="Valor actual de tus activos"
            icon={<PieChart className="w-5 h-5" />}
            change={{ value: Math.abs(portfolioData.portfolioChangePercent24h), type: isPositiveChange ? 'up' : 'down' }}
            gradient
          />
          <StatsCard
            title="Cambio 24h"
            value={`$${Math.abs(portfolioData.portfolioChange24h).toFixed(2)}`}
            description="Variación en las últimas 24 horas"
            icon={isPositiveChange ? <ArrowUpRight className="w-5 h-5 text-emerald-600" /> : <ArrowDownLeft className="w-5 h-5 text-red-600" />}
            change={{ value: portfolioData.portfolioChangePercent24h, type: isPositiveChange ? 'up' : 'down' }}
            highlight
          />
          <StatsCard
            title="Activos Totales"
            value={portfolioData.assets.length.toString()}
            description="Diferentes activos en tu cartera"
            icon={<TrendingUp className="w-5 h-5" />}
          />
        </div>

        <div className="flex flex-col gap-8">
          {/* Portfolio Chart */}
          <SectionCard
            title="Evolución del Portafolio"
            description="Historial de valor en los últimos 30 días"
            collapsible
            defaultOpen
            highlight
          >
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-lg p-6 -mx-4 md:-mx-5">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={portfolioData.portfolioValueHistory}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis domain={['dataMin - 1000', 'dataMax + 1000']} tick={{ fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--background))',
                        borderColor: 'hsl(var(--border))',
                      }}
                      labelStyle={{
                        color: 'hsl(var(--foreground))',
                      }}
                      itemStyle={{
                        color: 'hsl(var(--foreground))',
                      }}
                      formatter={(value) => [`$${value.toLocaleString()}`, 'Valor']}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#10b981"
                      fill="url(#colorValue)"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 8, strokeWidth: 2 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </SectionCard>

          {/* My Assets Table */}
          <SectionCard
            title="Mis Activos"
            description="Distribución de tu portafolio"
            collapsible
            defaultOpen
          >
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b-2">
                    <TableHead>Activo</TableHead>
                    <TableHead className="text-right">Precio</TableHead>
                    <TableHead className="text-right">Cambio 24h</TableHead>
                    <TableHead className="text-right">Holdings</TableHead>
                    <TableHead className="text-right">Asignación</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {portfolioData.assets.map((asset) => {
                    const holdingValue = asset.quantity * asset.price;
                    const allocation = (holdingValue / totalValue) * 100;
                    const isPositive = asset.change24h >= 0;
                    return (
                      <TableRow key={asset.id} className="border-b hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <TableCell className="flex items-center gap-3">
                          <img src={asset.logo} alt={asset.name} className="w-8 h-8 rounded-full" />
                          <div>
                            <div className="font-semibold text-slate-900 dark:text-white">{asset.name}</div>
                            <div className="text-xs text-muted-foreground">{asset.symbol}</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-semibold">${asset.price.toFixed(2)}</TableCell>
                        <TableCell className="text-right">
                          <Badge variant={isPositive ? 'default' : 'destructive'} className={isPositive ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400' : 'bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400'}>
                            {isPositive ? '+' : ''}{asset.change24h.toFixed(2)}%
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="font-semibold">${holdingValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                          <div className="text-xs text-muted-foreground">{asset.quantity} {asset.symbol}</div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <div className="w-16 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
                                style={{ width: `${allocation}%` }}
                              />
                            </div>
                            <span className="text-sm font-semibold min-w-10 text-right">{allocation.toFixed(1)}%</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </SectionCard>

          {/* Recent Activity */}
          <SectionCard
            title="Actividad Reciente"
            description="Historial de tus operaciones"
            collapsible
            defaultOpen
          >
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b-2">
                    <TableHead>Tipo</TableHead>
                    <TableHead>Token</TableHead>
                    <TableHead className="text-right">Cantidad</TableHead>
                    <TableHead className="text-right">Precio</TableHead>
                    <TableHead>Fecha</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {portfolioData.recentActivity.map((activity) => (
                    <TableRow key={activity.id} className="border-b hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <TableCell>
                        <Badge variant="outline" className={activity.type === 'Buy' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800' : 'bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400 border-amber-200 dark:border-amber-800'}>
                          {activity.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-semibold">{activity.token}</TableCell>
                      <TableCell className="text-right">{activity.amount}</TableCell>
                      <TableCell className="text-right font-semibold">{activity.price ? `$${activity.price.toFixed(2)}` : '-'}</TableCell>
                      <TableCell className="text-muted-foreground">{activity.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
