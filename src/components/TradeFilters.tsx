import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SectionCard } from '@/components/SectionCard';
import { Search, Filter } from 'lucide-react';
import { CATEGORIES, SORT_OPTIONS } from '@/lib/trade-constants';
import { motion, AnimatePresence } from 'framer-motion';

interface TradeFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  onReset: () => void;
  showMobileFilters: boolean;
  onToggleMobileFilters: (show: boolean) => void;
}

export function TradeFilters({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  onReset,
  showMobileFilters,
  onToggleMobileFilters,
}: TradeFiltersProps) {
  return (
    <aside className="lg:col-span-1">
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2 border-2 hover:border-emerald-400 dark:hover:border-emerald-600"
          onClick={() => onToggleMobileFilters(!showMobileFilters)}
        >
          <Filter className="h-4 w-4" />
          {showMobileFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
        </Button>
      </div>

      <AnimatePresence>
        {(showMobileFilters || window.innerWidth >= 1024) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <SectionCard
              title="Filtros"
              description="Refina tu búsqueda"
              collapsible={false}
            >
              <div className="space-y-5">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                  <Input
                    placeholder="Buscar por nombre o símbolo"
                    className="pl-10 border-2 focus-visible:border-emerald-400"
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                  />
                </div>

                {/* Category */}
                <div className="grid gap-3">
                  <Label className="font-semibold">Categoría</Label>
                  <Select value={selectedCategory} onValueChange={onCategoryChange}>
                    <SelectTrigger className="border-2 h-10">
                      <SelectValue placeholder="Todas las categorías" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas las categorías</SelectItem>
                      {CATEGORIES.map(cat => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Sort */}
                <div className="grid gap-3">
                  <Label className="font-semibold">Ordenar por</Label>
                  <Select value={sortBy} onValueChange={onSortChange}>
                    <SelectTrigger className="border-2 h-10">
                      <SelectValue placeholder="Precio ascendente" />
                    </SelectTrigger>
                    <SelectContent>
                      {SORT_OPTIONS.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Clear Button */}
                <Button
                  onClick={onReset}
                  variant="outline"
                  className="w-full border-2"
                >
                  Limpiar filtros
                </Button>
              </div>
            </SectionCard>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}
