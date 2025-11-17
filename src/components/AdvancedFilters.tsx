import { useState, useCallback } from 'react';
import { Search, X, Save, Trash2 } from 'lucide-react';
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface FilterState {
  searchTerm: string;
  priceRange: [number, number];
  categories: string[];
  paymentMethods: string[];
  minRating: number;
  availability: string[];
  minSales: number;
}

interface AdvancedFiltersProps {
  onFilterChange: (filters: FilterState) => void;
  onReset?: () => void;
  categories: { id: string; label: string }[];
  paymentMethods: string[];
  isCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
}

export function AdvancedFilters({
  onFilterChange,
  onReset,
  categories,
  paymentMethods: availablePaymentMethods,
  isCollapsed = false,
  onCollapsedChange,
}: AdvancedFiltersProps) {
  // useLanguage() hook available for future translations
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: '',
    priceRange: [0, 1000],
    categories: [],
    paymentMethods: [],
    minRating: 0,
    availability: [],
    minSales: 0,
  });

  const [savedFilters, setSavedFilters] = useState<FilterState[]>([]);
  const [filterName, setFilterName] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  const handleFilterChange = useCallback((newFilters: Partial<FilterState>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    onFilterChange(updated);
  }, [filters, onFilterChange]);

  const handleCategoryToggle = (categoryId: string) => {
    const updated = filters.categories.includes(categoryId)
      ? filters.categories.filter(id => id !== categoryId)
      : [...filters.categories, categoryId];
    handleFilterChange({ categories: updated });
  };

  const handlePaymentMethodToggle = (method: string) => {
    const updated = filters.paymentMethods.includes(method)
      ? filters.paymentMethods.filter(m => m !== method)
      : [...filters.paymentMethods, method];
    handleFilterChange({ paymentMethods: updated });
  };

  const handleAvailabilityToggle = (availability: string) => {
    const updated = filters.availability.includes(availability)
      ? filters.availability.filter(a => a !== availability)
      : [...filters.availability, availability];
    handleFilterChange({ availability: updated });
  };

  const handleSaveFilters = () => {
    if (filterName.trim()) {
      setSavedFilters([...savedFilters, { ...filters }]);
      setFilterName('');
      setShowSaveDialog(false);
    }
  };

  const handleLoadSavedFilter = (savedFilter: FilterState) => {
    setFilters(savedFilter);
    onFilterChange(savedFilter);
  };

  const handleResetFilters = () => {
    const emptyFilters: FilterState = {
      searchTerm: '',
      priceRange: [0, 1000],
      categories: [],
      paymentMethods: [],
      minRating: 0,
      availability: [],
      minSales: 0,
    };
    setFilters(emptyFilters);
    onFilterChange(emptyFilters);
    onReset?.();
  };

  // Count active filters
  const activeFilterCount = [
    filters.searchTerm ? 1 : 0,
    filters.categories.length > 0 ? 1 : 0,
    filters.paymentMethods.length > 0 ? 1 : 0,
    filters.minRating > 0 ? 1 : 0,
    filters.availability.length > 0 ? 1 : 0,
    filters.minSales > 0 ? 1 : 0,
    filters.priceRange[0] !== 0 || filters.priceRange[1] !== 1000 ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={cn(
        "overflow-hidden transition-all duration-300",
        "border-2 border-slate-200 dark:border-slate-700"
      )}>
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CardTitle className="text-lg font-semibold">Filtros Avanzados</CardTitle>
              {activeFilterCount > 0 && (
                <Badge className="bg-emerald-600 text-white">
                  {activeFilterCount} activo{activeFilterCount > 1 ? 's' : ''}
                </Badge>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onCollapsedChange?.(!isCollapsed)}
            >
              {isCollapsed ? '▼' : '▲'}
            </Button>
          </div>
        </div>

        {/* Content */}
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CardContent className="p-6 space-y-6">
                {/* Search */}
                <div className="space-y-2">
                  <Label className="font-semibold flex items-center gap-2">
                    <Search className="w-4 h-4" />
                    Buscar por nombre o símbolo
                  </Label>
                  <div className="relative">
                    <Input
                      placeholder="Buscar..."
                      value={filters.searchTerm}
                      onChange={(e) => handleFilterChange({ searchTerm: e.target.value })}
                      className="border-2 focus-visible:border-emerald-400"
                    />
                    {filters.searchTerm && (
                      <button
                        onClick={() => handleFilterChange({ searchTerm: '' })}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Price Range */}
                <div className="space-y-4">
                  <Label className="font-semibold">Rango de Precio (USD)</Label>
                  <Slider
                    min={0}
                    max={1000}
                    step={10}
                    value={filters.priceRange}
                    onValueChange={(value) => handleFilterChange({ priceRange: value as [number, number] })}
                    className="w-full"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-50 dark:bg-slate-800/30 rounded-lg p-3 border border-slate-200 dark:border-slate-700">
                      <p className="text-xs text-muted-foreground mb-1">Mínimo</p>
                      <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                        ${filters.priceRange[0]}
                      </p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/30 rounded-lg p-3 border border-slate-200 dark:border-slate-700">
                      <p className="text-xs text-muted-foreground mb-1">Máximo</p>
                      <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                        ${filters.priceRange[1]}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Categories */}
                <div className="space-y-3">
                  <Label className="font-semibold">Categorías</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {categories.map(cat => (
                      <label key={cat.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/30 cursor-pointer transition-colors">
                        <input
                          type="checkbox"
                          checked={filters.categories.includes(cat.id)}
                          onChange={() => handleCategoryToggle(cat.id)}
                          className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                        />
                        <span className="text-sm font-medium">{cat.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="space-y-3">
                  <Label className="font-semibold">Métodos de Pago</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {availablePaymentMethods.map(method => (
                      <label key={method} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/30 cursor-pointer transition-colors">
                        <input
                          type="checkbox"
                          checked={filters.paymentMethods.includes(method)}
                          onChange={() => handlePaymentMethodToggle(method)}
                          className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                        />
                        <span className="text-sm font-medium">{method}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Minimum Rating */}
                <div className="space-y-3">
                  <Label className="font-semibold">Clasificación Mínima del Vendedor</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {[0, 3, 4, 4.5, 5].map(rating => (
                      <button
                        key={rating}
                        onClick={() => handleFilterChange({ minRating: rating })}
                        className={cn(
                          "p-2 rounded-lg border-2 transition-all font-semibold text-sm",
                          filters.minRating === rating
                            ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300"
                            : "border-slate-200 dark:border-slate-700 hover:border-emerald-300"
                        )}
                      >
                        {rating === 0 ? 'Todas' : `${rating}★+`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div className="space-y-3">
                  <Label className="font-semibold">Disponibilidad</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {['in-stock', 'low-stock', 'pre-order'].map(avail => (
                      <label key={avail} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/30 cursor-pointer transition-colors">
                        <input
                          type="checkbox"
                          checked={filters.availability.includes(avail)}
                          onChange={() => handleAvailabilityToggle(avail)}
                          className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                        />
                        <span className="text-sm font-medium">
                          {avail === 'in-stock' ? 'En Stock' : avail === 'low-stock' ? 'Stock Bajo' : 'Pre-orden'}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Minimum Sales */}
                <div className="space-y-2">
                  <Label className="font-semibold">Vendedor con mínimas ventas</Label>
                  <Input
                    type="number"
                    min="0"
                    value={filters.minSales}
                    onChange={(e) => handleFilterChange({ minSales: parseInt(e.target.value) || 0 })}
                    placeholder="Mínimo de ventas"
                    className="border-2"
                  />
                </div>

                {/* Saved Filters Preview */}
                {savedFilters.length > 0 && (
                  <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <Label className="font-semibold">Filtros Guardados</Label>
                    <div className="space-y-2">
                      {savedFilters.map((saved, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700"
                        >
                          <button
                            onClick={() => handleLoadSavedFilter(saved)}
                            className="text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:underline text-left flex-1"
                          >
                            Filtro {idx + 1}
                          </button>
                          <button
                            onClick={() => setSavedFilters(savedFilters.filter((_, i) => i !== idx))}
                            className="text-slate-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <Button
                    onClick={() => setShowSaveDialog(true)}
                    variant="outline"
                    className="flex-1 border-2 flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Guardar
                  </Button>
                  <Button
                    onClick={handleResetFilters}
                    variant="destructive"
                    className="flex-1"
                  >
                    Limpiar Filtros
                  </Button>
                </div>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      {/* Save Filter Dialog */}
      <AnimatePresence>
        {showSaveDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setShowSaveDialog(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background rounded-lg shadow-2xl p-6 max-w-sm w-full mx-4"
            >
              <h3 className="text-lg font-semibold mb-4">Guardar Filtros</h3>
              <Input
                autoFocus
                placeholder="Nombre del filtro"
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
                className="border-2 mb-4"
              />
              <div className="flex gap-2">
                <Button
                  onClick={() => setShowSaveDialog(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleSaveFilters}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                >
                  Guardar
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
