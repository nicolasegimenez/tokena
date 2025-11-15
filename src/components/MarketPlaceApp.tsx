import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import { useState, useMemo, useEffect, useRef } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import PaymentDialog from "@/components/PaymentDialog"
import SignUpModal from "@/components/SignUpModal"
import { useLanguage } from "@/lib/language"
import { useAuth } from "@/lib/auth"
import { marketProjects } from "@/lib/market-data"
import { TrendingUp, Clock, Building2, Coins, Trees, Beef, CircleDot, Music } from 'lucide-react'
import { MarketplaceHeader } from "@/components/MarketplaceHeader"

const labels = {
  es: {
    invest_market: "Invest Market",
    discover_tokenized_opportunities: "Descubre oportunidades de inversión tokenizadas",
    search: "Buscar proyectos...",
    category: "Categoría",
    all: "Todos",
    all_categories: "Todas las categorías",
    real_estate: "Real Estate",
    crypto: "Crypto",
    startup: "Startup",
    agriculture: "Agricultura",
    livestock: "Ganadería",
    sports: "Deportes",
    entertainment: "Entretenimiento",
    sort_by: "Ordenar por",
    default: "Destacados",
    price_asc: "Precio: Menor a Mayor",
    price_desc: "Precio: Mayor a Menor",
    roi_desc: "Mayor rentabilidad",
    duration_asc: "Menor duración",
    progress: "Más fondeados",
    available: "Disponible",
    sold_out: "Agotado",
    expected_return: "Rentabilidad esperada anual",
    more_info: "Más Info",
    invest: "Invertir",
    projects_count: "{count} Proyectos",
    progress_label: "Progreso",
    min_investment: "Mínimo",
    duration_label: "Plazo",
    project_1_name: "The Residents – Inversión Inmobiliaria Premium",
    project_2_name: "Fondo de Criptomonedas",
    project_3_name: "Campo Santa Lucía – Zona Núcleo",
    project_4_name: "Tokenización de Ganado – Vaca Alfa",
    project_5_name: "Polo Horse Token – \"Embajador\"",
    project_6_name: "Recital Tokenizado – \"LUNA EN VIVO 2025\"",
  },
  en: {
    invest_market: "Invest Market",
    discover_tokenized_opportunities: "Discover tokenized investment opportunities",
    search: "Search projects...",
    category: "Category",
    all: "All",
    all_categories: "All categories",
    real_estate: "Real Estate",
    crypto: "Crypto",
    startup: "Startup",
    agriculture: "Agriculture",
    livestock: "Livestock",
    sports: "Sports",
    entertainment: "Entertainment",
    sort_by: "Sort by",
    default: "Featured",
    price_asc: "Price: Low to High",
    price_desc: "Price: High to Low",
    roi_desc: "Higher Returns",
    duration_asc: "Shorter Duration",
    progress: "Most Funded",
    available: "Available",
    sold_out: "Sold Out",
    expected_return: "Expected annual return",
    more_info: "More Info",
    invest: "Invest",
    projects_count: "{count} Projects",
    progress_label: "Progress",
    min_investment: "Minimum",
    duration_label: "Duration",
    project_1_name: "The Residents – Premium Real Estate Investment",
    project_2_name: "Cryptocurrency Fund",
    project_3_name: "Santa Lucía Field – Core Zone",
    project_4_name: "Livestock Tokenization – Vaca Alfa",
    project_5_name: "Polo Horse Token – \"Ambassador\"",
    project_6_name: "Tokenized Concert – \"LUNA LIVE 2025\"",
  }
};

// Icon mapping for categories
const categoryIcons: Record<string, any> = {
  'Real Estate': Building2,
  'Crypto': Coins,
  'Agricultura': Trees,
  'Agriculture': Trees,
  'Ganadería': Beef,
  'Livestock': Beef,
  'Deportes': CircleDot,
  'Sports': CircleDot,
  'Entretenimiento': Music,
  'Entertainment': Music,
  'Startup': Building2,
};

const MarketPlaceApp = () => {
    const navigate = useNavigate();
    const { language } = useLanguage();
    const { isAuthenticated } = useAuth();
    const [searchParams] = useSearchParams();
    const t = (key: keyof typeof labels.es, vars?: Record<string, any>) => {
      let text = labels[language][key] || '';
      if (vars) {
        Object.keys(vars).forEach(key => {
          text = text.replace(`{${key}}`, vars[key]);
        });
      }
      return text;
    };

    const investmentsData = useMemo(() =>
      marketProjects.map((project) => {
        const projectNameKey = `project_${project.id}_name` as keyof typeof labels.es;
        const minInvestment = project.pricePerToken || 500;
        const totalRaised = (project.quantity * minInvestment * 0.75); // Simulated raised amount
        const totalGoal = (project.quantity * minInvestment);

        return {
          id: parseInt(project.id),
          title: t(projectNameKey),
          description: t(projectNameKey),
          price: minInvestment,
          roi: project.roi || 15,
          duration: parseInt(project.totalDuration.replace(/[^0-9]/g, '')),
          available: project.quantity,
          status: project.quantity > 0 ? t('available') : t('sold_out'),
          category: project.category,
          image: project.image,
          currency: "USD",
          marketUrl: project.marketUrl,
          paymentMethods: project.paymentMethods,
          minInvestment: `$${minInvestment.toLocaleString()}`,
          totalRaised,
          totalGoal,
          progressPercentage: (totalRaised / totalGoal) * 100,
          icon: categoryIcons[project.category] || Building2,
        };
      })
    , [language, t]);

    const [investments, setInvestments] = useState(investmentsData);
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState(() => {
      const categoryParam = searchParams.get('category');
      return categoryParam || "all";
    });
    const [sortBy, setSortBy] = useState("default");
    const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
    const [signUpDialogOpen, setSignUpDialogOpen] = useState(false);
    const [selectedInvestment, setSelectedInvestment] = useState<typeof investmentsData[0] | null>(null);

    // Scroll detection states
    const [showFilters, setShowFilters] = useState(false);
    const lastScrollY = useRef(0);

    // Apply filters from URL parameters on mount
    useEffect(() => {
      const categoryParam = searchParams.get('category');
      if (categoryParam) {
        setCategory(categoryParam);
        filterAndSortInvestments(searchTerm, categoryParam, sortBy);
      }
    }, [searchParams]);

    // Smart scroll behavior for mobile - Auto-close filters on scroll down
    useEffect(() => {
      const handleScroll = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY.current && currentScrollY > 300) {
          // Auto-close filters on scroll down for better UX on mobile
          setShowFilters(false);
        }

        lastScrollY.current = currentScrollY;
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearch = (value: string) => {
        setSearchTerm(value);
        filterAndSortInvestments(value, category, sortBy);
    };

    const handleCategoryChange = (value: string) => {
        setCategory(value);
        filterAndSortInvestments(searchTerm, value, sortBy);
    };

    const handleSortByChange = (value: string) => {
        setSortBy(value);
        filterAndSortInvestments(searchTerm, category, value);
    };

    const filterAndSortInvestments = (search: string, cat: string, sort: string) => {
        let filtered = investmentsData.filter(investment =>
            investment.title.toLowerCase().includes(search.toLowerCase()) ||
            investment.description.toLowerCase().includes(search.toLowerCase())
        );

        if (cat !== "all") {
            // Handle grouped category filters
            if (cat === "tokenizacion-activos-reales") {
                filtered = filtered.filter(investment =>
                    investment.category === "Real Estate" ||
                    investment.category === "Agricultura" ||
                    investment.category === "Ganadería"
                );
            } else if (cat === "tokenizacion-activos-financieros") {
                filtered = filtered.filter(investment =>
                    investment.category === "Crypto" ||
                    investment.category === "Startup"
                );
            } else if (cat === "crowfunding") {
                filtered = filtered.filter(investment =>
                    investment.category === "Entretenimiento" ||
                    investment.category === "Deportes"
                );
            } else {
                filtered = filtered.filter(investment => investment.category === cat);
            }
        }

        if (sort === "price-asc") {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sort === "price-desc") {
            filtered.sort((a, b) => b.price - a.price);
        } else if (sort === "roi-desc") {
            filtered.sort((a, b) => b.roi - a.roi);
        } else if (sort === "duration-asc") {
            filtered.sort((a, b) => a.duration - b.duration);
        } else if (sort === "progress") {
            filtered.sort((a, b) => b.progressPercentage - a.progressPercentage);
        }

        setInvestments(filtered);
    };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Marketplace Header - Separated Component */}
      <MarketplaceHeader
        investmentCount={investments.length}
        searchTerm={searchTerm}
        onSearchChange={handleSearch}
        category={category}
        onCategoryChange={handleCategoryChange}
        sortBy={sortBy}
        onSortByChange={handleSortByChange}
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters(!showFilters)}
      />

      {/* Projects Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {investments.map((investment) => {
            const Icon = investment.icon;

            return (
              <Card
                key={investment.id}
                className="group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-emerald-200 dark:hover:border-emerald-800"
              >
                {/* Image with Overlay */}
                {investment.image && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={investment.image}
                      alt={investment.title}
                      className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-emerald-500 text-white border-0">
                        {investment.status}
                      </Badge>
                    </div>

                    {/* Category Badge with Icon */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-2">
                      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-full p-2">
                        <Icon className="h-5 w-5 text-emerald-600" />
                      </div>
                      <Badge variant="secondary" className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm">
                        {investment.category}
                      </Badge>
                    </div>
                  </div>
                )}

                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-emerald-600 transition-colors line-clamp-2">
                    {investment.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {investment.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* ROI Display */}
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 rounded-lg p-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <TrendingUp className="h-5 w-5 text-emerald-600" />
                      <span className="text-4xl font-extrabold text-emerald-600">
                        {investment.roi}%
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {t('expected_return')}
                    </p>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-semibold">{investment.duration} meses</p>
                        <p className="text-xs text-muted-foreground">{t('duration_label')}</p>
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold">{investment.minInvestment}</p>
                      <p className="text-xs text-muted-foreground">{t('min_investment')}</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">{t('progress_label')}</span>
                      <span className="font-semibold">{investment.progressPercentage.toFixed(0)}%</span>
                    </div>
                    <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
                        style={{ width: `${investment.progressPercentage}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>${(investment.totalRaised / 1000).toFixed(0)}K</span>
                      <span>${(investment.totalGoal / 1000).toFixed(0)}K</span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="gap-2">
                  {investment.status === t('sold_out') ? (
                    <Button className="w-full" disabled>
                      {t('sold_out')}
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => navigate(`/invest/project${investment.id}`)}
                      >
                        {t('more_info')}
                      </Button>
                      <Button
                        className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                        onClick={() => {
                          if (isAuthenticated) {
                            setSelectedInvestment(investment);
                            setPaymentDialogOpen(true);
                          } else {
                            setSelectedInvestment(investment);
                            setSignUpDialogOpen(true);
                          }
                        }}
                      >
                        {t('invest')}
                      </Button>
                    </>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {investments.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              {language === 'es'
                ? 'No se encontraron proyectos con los filtros seleccionados'
                : 'No projects found with the selected filters'}
            </p>
          </div>
        )}
      </div>

      {selectedInvestment && (
        <>
          <PaymentDialog
            open={paymentDialogOpen && isAuthenticated}
            onOpenChange={setPaymentDialogOpen}
            investment={selectedInvestment}
          />
          <SignUpModal
            open={signUpDialogOpen && !isAuthenticated}
            onOpenChange={(open) => {
              setSignUpDialogOpen(open);
              // Si se completa el signup, abre el payment dialog
              if (!open && isAuthenticated) {
                setPaymentDialogOpen(true);
              }
            }}
          />
        </>
      )}
    </div>
  )
}

export default MarketPlaceApp
