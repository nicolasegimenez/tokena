import { TrendingUp, TrendingDown, Target, Award, Clock, Zap } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DashboardStats {
  totalInvested: number;
  totalEarned: number;
  activeOrders: number;
  completedOrders: number;
  averageOrderValue: number;
  successRate: number;
  recentActivity: Array<{
    id: string;
    type: 'buy' | 'sell';
    amount: number;
    date: Date;
    projectName: string;
  }>;
  portfolioDistribution: Array<{
    category: string;
    value: number;
    percentage: number;
  }>;
  averageResponseTime?: string;
  trustScore?: number;
}

interface TradingStatsDashboardProps {
  stats: DashboardStats;
}

const StatCard = ({
  icon: Icon,
  label,
  value,
  trend,
  color,
  delay,
}: {
  icon: any;
  label: string;
  value: string | number;
  trend?: { value: number; direction: 'up' | 'down' };
  color: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
  >
    <Card className="border-2 border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300 h-full">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={cn("p-3 rounded-lg", color)}>
            <Icon className="w-5 h-5" />
          </div>
          {trend && (
            <div className={cn(
              "flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg",
              trend.direction === 'up'
                ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300'
                : 'bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300'
            )}>
              {trend.direction === 'up' ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {Math.abs(trend.value)}%
            </div>
          )}
        </div>
        <p className="text-muted-foreground text-sm font-medium mb-1">{label}</p>
        <p className="text-3xl font-bold text-slate-900 dark:text-white">
          {value}
        </p>
      </CardContent>
    </Card>
  </motion.div>
);

export function TradingStatsDashboard({ stats }: TradingStatsDashboardProps) {
  // useLanguage() hook available for future translations

  const netProfit = stats.totalEarned - stats.totalInvested;
  const profitPercentage = stats.totalInvested > 0
    ? ((netProfit / stats.totalInvested) * 100).toFixed(1)
    : '0';

  return (
    <div className="w-full space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          icon={TrendingUp}
          label="Total Invertido"
          value={`$${stats.totalInvested.toLocaleString('es-ES', { minimumFractionDigits: 2 })}`}
          color="bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400"
          trend={{ value: 12, direction: 'up' }}
          delay={0}
        />

        <StatCard
          icon={TrendingUp}
          label="Total Ganado"
          value={`$${stats.totalEarned.toLocaleString('es-ES', { minimumFractionDigits: 2 })}`}
          color="bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400"
          trend={{ value: 8, direction: 'up' }}
          delay={0.1}
        />

        <StatCard
          icon={Target}
          label="Ganancia Neta"
          value={`$${netProfit.toLocaleString('es-ES', { minimumFractionDigits: 2 })}`}
          color="bg-teal-100 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400"
          trend={{ value: parseInt(profitPercentage), direction: netProfit > 0 ? 'up' : 'down' }}
          delay={0.2}
        />

        <StatCard
          icon={Zap}
          label="Órdenes Activas"
          value={stats.activeOrders}
          color="bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400"
          delay={0.3}
        />

        <StatCard
          icon={Award}
          label="Órdenes Completadas"
          value={stats.completedOrders}
          color="bg-purple-100 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400"
          trend={{ value: 5, direction: 'up' }}
          delay={0.4}
        />

        <StatCard
          icon={Clock}
          label="Tasa de Éxito"
          value={`${stats.successRate}%`}
          color="bg-pink-100 dark:bg-pink-950/50 text-pink-600 dark:text-pink-400"
          delay={0.5}
        />
      </div>

      {/* Additional Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Trading Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <Card className="border-2 border-slate-200 dark:border-slate-700">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Rendimiento</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Valor Promedio de Orden</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      ${stats.averageOrderValue.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full"
                      style={{ width: `${Math.min((stats.averageOrderValue / 1000) * 100, 100)}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Tasa de Éxito</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">
                      {stats.successRate}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                      style={{ width: `${stats.successRate}%` }}
                    />
                  </div>
                </div>

                {stats.trustScore && (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Puntuación de Confianza</span>
                      <span className="font-bold text-purple-600 dark:text-purple-400">
                        {stats.trustScore}/100
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full"
                        style={{ width: `${stats.trustScore}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Seller Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.4 }}
        >
          <Card className="border-2 border-slate-200 dark:border-slate-700">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Métricas de Vendedor</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/30 rounded-lg border border-slate-200 dark:border-slate-700">
                  <span className="text-sm font-medium text-muted-foreground">Órdenes Completadas</span>
                  <Badge className="bg-emerald-600 text-white">{stats.completedOrders}</Badge>
                </div>

                {stats.averageResponseTime && (
                  <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/30 rounded-lg border border-slate-200 dark:border-slate-700">
                    <span className="text-sm font-medium text-muted-foreground">Tiempo Promedio de Respuesta</span>
                    <Badge variant="outline">{stats.averageResponseTime}</Badge>
                  </div>
                )}

                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/30 rounded-lg border border-slate-200 dark:border-slate-700">
                  <span className="text-sm font-medium text-muted-foreground">Tasa de Satisfacción</span>
                  <Badge className="bg-blue-600 text-white">{stats.successRate}%</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/30 rounded-lg border border-slate-200 dark:border-slate-700">
                  <span className="text-sm font-medium text-muted-foreground">Volumen Total</span>
                  <Badge variant="secondary">
                    ${(stats.totalInvested + stats.totalEarned).toLocaleString('es-ES', { maximumFractionDigits: 0 })}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Portfolio Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.4 }}
      >
        <Card className="border-2 border-slate-200 dark:border-slate-700">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Distribución de Cartera</h3>
            <div className="space-y-3">
              {stats.portfolioDistribution.map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">{item.category}</span>
                    <div className="text-right">
                      <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                        ${item.value.toLocaleString('es-ES')}
                      </p>
                      <p className="text-xs text-muted-foreground">{item.percentage}%</p>
                    </div>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percentage}%` }}
                      transition={{ delay: 0.8 + idx * 0.1, duration: 0.8 }}
                      className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2.5"
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.4 }}
      >
        <Card className="border-2 border-slate-200 dark:border-slate-700">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Actividad Reciente</h3>
            <div className="space-y-3">
              {stats.recentActivity.length === 0 ? (
                <p className="text-muted-foreground text-sm text-center py-8">
                  No hay actividad reciente
                </p>
              ) : (
                stats.recentActivity.slice(0, 5).map((activity, idx) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + idx * 0.05 }}
                    className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/30 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className={cn(
                        "p-2 rounded-lg",
                        activity.type === 'buy'
                          ? 'bg-emerald-100 dark:bg-emerald-950/50'
                          : 'bg-blue-100 dark:bg-blue-950/50'
                      )}>
                        {activity.type === 'buy' ? (
                          <TrendingDown className={cn(
                            "w-4 h-4",
                            activity.type === 'buy'
                              ? 'text-emerald-600 dark:text-emerald-400'
                              : 'text-blue-600 dark:text-blue-400'
                          )} />
                        ) : (
                          <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">
                          {activity.type === 'buy' ? 'Compra' : 'Venta'} - {activity.projectName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {activity.date.toLocaleDateString('es-ES')}
                        </p>
                      </div>
                    </div>
                    <p className={cn(
                      "font-bold whitespace-nowrap ml-2",
                      activity.type === 'buy'
                        ? 'text-red-600 dark:text-red-400'
                        : 'text-emerald-600 dark:text-emerald-400'
                    )}>
                      {activity.type === 'buy' ? '-' : '+'}${activity.amount.toFixed(2)}
                    </p>
                  </motion.div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
