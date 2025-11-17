import { useState } from 'react';
import { Download, Eye, Clock, CheckCircle2, AlertCircle, ChevronDown } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

type OrderStatus = 'pending' | 'completed' | 'cancelled' | 'processing';

interface Transaction {
  id: string;
  type: 'buy' | 'sell';
  projectName: string;
  tokenSymbol: string;
  quantity: number;
  pricePerToken: number;
  totalAmount: number;
  seller?: string;
  buyer?: string;
  paymentMethod: string;
  status: OrderStatus;
  date: Date;
  completionDate?: Date;
  invoiceUrl?: string;
}

interface OrderHistoryProps {
  transactions: Transaction[];
}

const statusConfig: Record<OrderStatus, { color: string; icon: any; label: string }> = {
  completed: {
    color: 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800',
    icon: CheckCircle2,
    label: 'Completado'
  },
  pending: {
    color: 'bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-800',
    icon: Clock,
    label: 'Pendiente'
  },
  processing: {
    color: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800',
    icon: Clock,
    label: 'Procesando'
  },
  cancelled: {
    color: 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800',
    icon: AlertCircle,
    label: 'Cancelado'
  }
};

export function OrderHistory({ transactions }: OrderHistoryProps) {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'buy' | 'sell'>('all');

  const filteredTransactions = transactions.filter(t => {
    if (activeTab === 'all') return true;
    return t.type === activeTab;
  });

  const calculateStats = () => {
    const completed = transactions.filter(t => t.status === 'completed');
    const totalSpent = completed
      .filter(t => t.type === 'buy')
      .reduce((sum, t) => sum + t.totalAmount, 0);
    const totalEarned = completed
      .filter(t => t.type === 'sell')
      .reduce((sum, t) => sum + t.totalAmount, 0);

    return { totalSpent, totalEarned, completedCount: completed.length };
  };

  const stats = calculateStats();

  return (
    <div className="w-full space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-2 border-slate-200 dark:border-slate-700">
          <CardContent className="p-6">
            <p className="text-xs text-muted-foreground font-medium mb-2">Total Invertido</p>
            <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
              ${stats.totalSpent.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-slate-200 dark:border-slate-700">
          <CardContent className="p-6">
            <p className="text-xs text-muted-foreground font-medium mb-2">Total Ganado</p>
            <p className="text-3xl font-bold text-teal-600 dark:text-teal-400">
              ${stats.totalEarned.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-slate-200 dark:border-slate-700">
          <CardContent className="p-6">
            <p className="text-xs text-muted-foreground font-medium mb-2">Operaciones Completadas</p>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {stats.completedCount}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Card className="border-2 border-slate-200 dark:border-slate-700">
        <Tabs value={activeTab} onValueChange={(val: any) => setActiveTab(val)} className="w-full">
          <div className="border-b border-slate-200 dark:border-slate-700 px-6 pt-6">
            <TabsList className="grid w-full grid-cols-3 mb-0 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg w-fit">
              <TabsTrigger value="all" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 rounded-md">
                Todas ({transactions.length})
              </TabsTrigger>
              <TabsTrigger value="buy" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 rounded-md">
                Compras ({transactions.filter(t => t.type === 'buy').length})
              </TabsTrigger>
              <TabsTrigger value="sell" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 rounded-md">
                Ventas ({transactions.filter(t => t.type === 'sell').length})
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value={activeTab} className="space-y-0 border-t-0">
            {filteredTransactions.length === 0 ? (
              <CardContent className="p-12 text-center">
                <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold mb-2">Sin operaciones</h3>
                <p className="text-muted-foreground">
                  No hay {activeTab === 'buy' ? 'compras' : activeTab === 'sell' ? 'ventas' : 'operaciones'} aún
                </p>
              </CardContent>
            ) : (
              <CardContent className="p-0">
                <div className="divide-y divide-slate-200 dark:divide-slate-700">
                  <AnimatePresence>
                    {filteredTransactions.map((transaction, idx) => {
                      const config = statusConfig[transaction.status];
                      const StatusIcon = config.icon;
                      const isExpanded = expandedOrder === transaction.id;

                      return (
                        <motion.div
                          key={transaction.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ delay: idx * 0.05 }}
                        >
                          {/* Main Row */}
                          <button
                            onClick={() => setExpandedOrder(isExpanded ? null : transaction.id)}
                            className="w-full p-4 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors text-left flex items-center justify-between gap-4"
                          >
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-3 mb-2">
                                <Badge variant={transaction.type === 'buy' ? 'default' : 'secondary'}>
                                  {transaction.type === 'buy' ? 'Compra' : 'Venta'}
                                </Badge>
                                <span className="text-sm font-semibold text-slate-900 dark:text-white">
                                  {transaction.projectName}
                                </span>
                                <Badge variant="outline" className="text-xs">
                                  {transaction.tokenSymbol}
                                </Badge>
                              </div>
                              <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                                <div>
                                  <span className="font-medium text-slate-900 dark:text-white">
                                    {transaction.quantity} tokens
                                  </span>
                                  <span className="text-xs ml-2">
                                    @ ${transaction.pricePerToken}
                                  </span>
                                </div>
                                <div>
                                  {transaction.date.toLocaleDateString('es-ES')}
                                </div>
                              </div>
                            </div>

                            {/* Price & Status */}
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                                  ${transaction.totalAmount.toFixed(2)}
                                </p>
                                <div className={cn(
                                  "inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium mt-1",
                                  config.color
                                )}>
                                  <StatusIcon className="w-3 h-3" />
                                  {config.label}
                                </div>
                              </div>

                              <motion.button
                                animate={{ rotate: isExpanded ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <ChevronDown className="w-5 h-5 text-slate-400" />
                              </motion.button>
                            </div>
                          </button>

                          {/* Expanded Details */}
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/20"
                              >
                                <div className="p-4 space-y-4">
                                  {/* Transaction Details */}
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <p className="text-xs text-muted-foreground font-medium mb-1">
                                        {transaction.type === 'buy' ? 'Vendedor' : 'Comprador'}
                                      </p>
                                      <p className="text-sm font-semibold">
                                        {transaction.type === 'buy' ? transaction.seller : transaction.buyer}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-xs text-muted-foreground font-medium mb-1">
                                        Método de Pago
                                      </p>
                                      <p className="text-sm font-semibold">{transaction.paymentMethod}</p>
                                    </div>
                                    <div>
                                      <p className="text-xs text-muted-foreground font-medium mb-1">
                                        Fecha de Solicitud
                                      </p>
                                      <p className="text-sm">
                                        {transaction.date.toLocaleString('es-ES')}
                                      </p>
                                    </div>
                                    {transaction.completionDate && (
                                      <div>
                                        <p className="text-xs text-muted-foreground font-medium mb-1">
                                          Completado
                                        </p>
                                        <p className="text-sm">
                                          {transaction.completionDate.toLocaleString('es-ES')}
                                        </p>
                                      </div>
                                    )}
                                  </div>

                                  {/* Amount Breakdown */}
                                  <div className="bg-white dark:bg-slate-800/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                                    <h4 className="font-semibold text-sm mb-3">Resumen de la Operación</h4>
                                    <div className="space-y-2 text-sm">
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">
                                          {transaction.quantity} × ${transaction.pricePerToken}
                                        </span>
                                        <span className="font-medium">
                                          ${(transaction.quantity * transaction.pricePerToken).toFixed(2)}
                                        </span>
                                      </div>
                                      <div className="flex justify-between text-xs text-muted-foreground">
                                        <span>Comisión (2%)</span>
                                        <span>-${(transaction.totalAmount * 0.02).toFixed(2)}</span>
                                      </div>
                                      <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between font-bold text-emerald-600 dark:text-emerald-400">
                                        <span>Total</span>
                                        <span>${transaction.totalAmount.toFixed(2)}</span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Action Buttons */}
                                  <div className="flex gap-2">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="flex-1 flex items-center justify-center gap-2"
                                    >
                                      <Eye className="w-4 h-4" />
                                      Ver Detalles
                                    </Button>
                                    {transaction.invoiceUrl && (
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex-1 flex items-center justify-center gap-2"
                                      >
                                        <Download className="w-4 h-4" />
                                        Descargar Factura
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </CardContent>
            )}
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
