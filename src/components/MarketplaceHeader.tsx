import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter, X, SortAsc } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useLanguage } from "@/lib/language"

interface MarketplaceHeaderProps {
  investmentCount: number
  searchTerm: string
  onSearchChange: (value: string) => void
  category: string
  onCategoryChange: (value: string) => void
  sortBy: string
  onSortByChange: (value: string) => void
  showFilters: boolean
  onToggleFilters: () => void
  isCollapsed?: boolean
}

export function MarketplaceHeader({
  investmentCount,
  searchTerm,
  onSearchChange,
  category,
  onCategoryChange,
  sortBy,
  onSortByChange,
  showFilters,
  onToggleFilters,
  isCollapsed = false,
}: MarketplaceHeaderProps) {
  const { language } = useLanguage();

  const labels = {
    es: {
      invest_market: "Invest Market",
      discover_tokenized_opportunities: "Descubre oportunidades de inversión tokenizadas",
      search: "Buscar proyectos...",
      category: "Categoría",
      all_categories: "Todas las categorías",
      real_estate: "Real Estate",
      crypto: "Crypto",
      agriculture: "Agricultura",
      livestock: "Ganadería",
      startup: "Startup",
      sports: "Deportes",
      entertainment: "Entretenimiento",
      sort_by: "Ordenar por",
      default: "Destacados",
      price_asc: "Precio: Menor a Mayor",
      price_desc: "Precio: Mayor a Menor",
      roi_desc: "Mayor rentabilidad",
      duration_asc: "Menor duración",
      progress: "Más fondeados",
      projects_count: "{count} Proyectos",
      clear_filters: "Limpiar filtros",
      show_filters: "Mostrar filtros",
      hide_filters: "Ocultar filtros",
      active_filters: "Filtros activos",
    },
    en: {
      invest_market: "Invest Market",
      discover_tokenized_opportunities: "Discover tokenized investment opportunities",
      search: "Search projects...",
      category: "Category",
      all_categories: "All categories",
      real_estate: "Real Estate",
      crypto: "Crypto",
      agriculture: "Agriculture",
      livestock: "Livestock",
      startup: "Startup",
      sports: "Sports",
      entertainment: "Entertainment",
      sort_by: "Sort by",
      default: "Featured",
      price_asc: "Price: Low to High",
      price_desc: "Price: High to Low",
      roi_desc: "Higher Returns",
      duration_asc: "Shorter Duration",
      progress: "Most Funded",
      projects_count: "{count} Projects",
      clear_filters: "Clear filters",
      show_filters: "Show filters",
      hide_filters: "Hide filters",
      active_filters: "Active filters",
    }
  };
  const getLabel = (key: string) => {
    const value = labels[language as keyof typeof labels][key as keyof typeof labels.es];
    if (typeof value === 'string' && value.includes('{count}')) {
      return value.replace('{count}', investmentCount.toString());
    }
    return value;
  };

  return (
    <div className="border-b bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 transition-all duration-300" style={{ paddingTop: isCollapsed ? '0.75rem' : '1.5rem', paddingBottom: isCollapsed ? '0.75rem' : '1.5rem' }}>
        {/* Title Section - Collapses on Scroll */}
        <div className={`flex items-center justify-between mb-6 transition-all duration-300 overflow-hidden ${
          isCollapsed ? 'max-h-0 opacity-0 mb-0' : 'max-h-32 opacity-100'
        }`}>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {getLabel('invest_market')}
            </h1>
            <p className="text-muted-foreground mt-2">
              {getLabel('discover_tokenized_opportunities')}
            </p>
          </div>
          <Badge variant="secondary" className="text-sm px-4 py-2">
            {getLabel('projects_count')}
          </Badge>
        </div>

        {/* Enhanced Filters Section */}
        <div className="space-y-4">
          {/* Search Bar - Always Visible with Enhanced Styling */}
          <div className="flex gap-2 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                placeholder={getLabel('search')}
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 bg-white/80 dark:bg-slate-800/80 border-emerald-200/50 dark:border-emerald-800/50 focus:border-emerald-500 focus:ring-emerald-500/20"
              />
            </div>

            {/* Mobile Filter Toggle Button */}
            <div className="md:hidden">
              <Button
                variant="outline"
                size="icon"
                onClick={onToggleFilters}
                className="border-emerald-200/50 dark:border-emerald-800/50 hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
              >
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Active Filters Display with Clear Button */}
          {(category !== "all" || sortBy !== "default") && (
            <div className="flex flex-wrap gap-2 items-center bg-gradient-to-r from-emerald-50/50 to-teal-50/50 dark:from-emerald-950/20 dark:to-teal-950/20 p-3 rounded-lg border border-emerald-200/30 dark:border-emerald-800/30">
              <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                <Filter className="h-3 w-3" />
                {getLabel('active_filters')}:
              </span>
              {category !== "all" && (
                <Badge variant="secondary" className="text-xs bg-emerald-100 dark:bg-emerald-900/50 text-emerald-900 dark:text-emerald-100 border-emerald-300 dark:border-emerald-700">
                  {category === "tokenizacion-activos-reales" ? "Activos Reales" : category === "tokenizacion-activos-financieros" ? "Activos Financieros" : category === "crowfunding" ? "Crowfunding" : category}
                  <button
                    onClick={() => onCategoryChange("all")}
                    className="ml-1 hover:opacity-70 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {sortBy !== "default" && (
                <Badge variant="secondary" className="text-xs bg-emerald-100 dark:bg-emerald-900/50 text-emerald-900 dark:text-emerald-100 border-emerald-300 dark:border-emerald-700">
                  {sortBy === "price-asc" ? "Precio ↑" : sortBy === "price-desc" ? "Precio ↓" : sortBy === "roi-desc" ? "ROI ↓" : sortBy === "duration-asc" ? "Duración ↑" : "Más Fondeados"}
                  <button
                    onClick={() => onSortByChange("default")}
                    className="ml-1 hover:opacity-70 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  onCategoryChange("all");
                  onSortByChange("default");
                }}
                className="ml-auto text-xs text-muted-foreground hover:text-foreground hover:bg-white/50 dark:hover:bg-slate-800/50"
              >
                {getLabel('clear_filters')}
              </Button>
            </div>
          )}

          {/* Filter Controls - Collapsible on Mobile, Visible on Desktop */}
          <div className={`transition-all duration-300 overflow-hidden ${
            showFilters && !isCollapsed ? 'max-h-96 opacity-100' : 'md:max-h-96 md:opacity-100 max-h-0 opacity-0 md:pointer-events-auto pointer-events-none'
          }`}>
            <div className="flex flex-col md:flex-row gap-3 bg-gradient-to-r from-slate-50/50 to-transparent dark:from-slate-800/50 dark:to-transparent p-4 rounded-lg border border-slate-200/50 dark:border-slate-700/50">
              {/* Category Filter */}
              <div className="flex-1 md:flex-none">
                <label className="text-xs font-semibold text-muted-foreground mb-2 block">
                  {getLabel('category')}
                </label>
                <Select value={category} onValueChange={onCategoryChange}>
                  <SelectTrigger className="w-full md:w-[220px] bg-white/80 dark:bg-slate-800/80 border-slate-200/50 dark:border-slate-700/50 hover:border-emerald-400 dark:hover:border-emerald-600 focus:border-emerald-500 focus:ring-emerald-500/20">
                    <Filter className="h-4 w-4 mr-2 text-emerald-600" />
                    <SelectValue placeholder={getLabel('all_categories')} />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-slate-900">
                    <SelectItem value="all">{getLabel('all_categories')}</SelectItem>

                    {/* Activos Reales */}
                    <div className="px-2 py-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800">Activos Reales</div>
                    <SelectItem value="tokenizacion-activos-reales">
                      <span>{getLabel('real_estate')}</span>, {getLabel('agriculture')}, {getLabel('livestock')}
                    </SelectItem>

                    {/* Activos Financieros */}
                    <div className="px-2 py-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800">Activos Financieros</div>
                    <SelectItem value="tokenizacion-activos-financieros">
                      <span>{getLabel('crypto')}, {getLabel('startup')}</span>
                    </SelectItem>

                    {/* Crowfunding */}
                    <div className="px-2 py-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800">Crowfunding</div>
                    <SelectItem value="crowfunding">
                      <span>{getLabel('entertainment')}, {getLabel('sports')}</span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Sort Filter */}
              <div className="flex-1 md:flex-none">
                <label className="text-xs font-semibold text-muted-foreground mb-2 block">
                  {getLabel('sort_by')}
                </label>
                <Select value={sortBy} onValueChange={onSortByChange}>
                  <SelectTrigger className="w-full md:w-[220px] bg-white/80 dark:bg-slate-800/80 border-slate-200/50 dark:border-slate-700/50 hover:border-emerald-400 dark:hover:border-emerald-600 focus:border-emerald-500 focus:ring-emerald-500/20">
                    <SortAsc className="h-4 w-4 mr-2 text-emerald-600" />
                    <SelectValue placeholder={getLabel('default')} />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-slate-900">
                    <SelectItem value="default">{getLabel('default')}</SelectItem>
                    <SelectItem value="price-asc">{getLabel('price_asc')}</SelectItem>
                    <SelectItem value="price-desc">{getLabel('price_desc')}</SelectItem>
                    <SelectItem value="roi-desc">{getLabel('roi_desc')}</SelectItem>
                    <SelectItem value="duration-asc">{getLabel('duration_asc')}</SelectItem>
                    <SelectItem value="progress">{getLabel('progress')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
