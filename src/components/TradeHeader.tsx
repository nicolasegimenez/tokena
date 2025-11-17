import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

interface TradeHeaderProps {
  showHeader: boolean;
  filteredListingsCount: number;
}

export function TradeHeader({ showHeader, filteredListingsCount }: TradeHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: showHeader ? 1 : 0,
        y: showHeader ? 0 : -80,
        pointerEvents: showHeader ? 'auto' : 'none',
      }}
      transition={{ duration: 0.3 }}
      className="border-b bg-gradient-to-r from-white/80 to-white/50 dark:from-slate-900/80 dark:to-slate-800/50 backdrop-blur-xl sticky top-0 z-40 shadow-sm"
    >
      <div className="container mx-auto px-4 py-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Mercado P2P
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Intercambia tokens de seguridad de forma segura
            </p>
          </div>
          <Badge className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2 text-sm">
            {filteredListingsCount} {filteredListingsCount === 1 ? 'Listado' : 'Listados'}
          </Badge>
        </div>
      </div>
    </motion.div>
  );
}
