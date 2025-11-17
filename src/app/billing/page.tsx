import { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { BarChart, DollarSign, TrendingUp, Users, Search, FileText, Download } from 'lucide-react'
import { useLanguage } from '@/lib/language'
import { useAuth } from '@/lib/auth'
import SignUpModal from '@/components/SignUpModal'

const billingProjects = [
  {
    id: "1",
    name: "AutoToken Project - Fase 1 (Autos)",
    description: "Compra y subasta de 8-10 autos usados alta demanda",
    category: "Tokenización de Autos",
    image: "https://images.unsplash.com/photo-1551355291-bbee5243267b?w=500&h=300&fit=crop",
    totalInvestment: 150000,
    tokenSupply: 1500,
    tokenPrice: 100,
    currentValue: 158400,
    investorsCount: 342,
    startDate: "2025-01-15",
    endDate: "2025-07-15",
    status: "active",
    profitTarget: 30000,
    profitCurrent: 8400,
    breakdown: {
      carPurchase: 130000,
      repairs: 12000,
      admin: 3000,
      reserve: 5000
    },
    expectedReturn: 11.3,
    auctionPrice: 180000,
    financingStructure: {
      structuring: 3750,
      administration: 1800,
      auctionCommission: 3000,
      successFee: 4500,
      total: 13050
    }
  },
  {
    id: "2",
    name: "AutoToken Project - Fase 2 (Expansión)",
    description: "Segunda ronda: 12-15 autos adicionales",
    category: "Tokenización de Autos",
    image: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=500&h=300&fit=crop",
    totalInvestment: 200000,
    tokenSupply: 2000,
    tokenPrice: 100,
    currentValue: 195000,
    investorsCount: 287,
    startDate: "2025-06-01",
    endDate: "2025-12-01",
    status: "upcoming",
    profitTarget: 40000,
    profitCurrent: -5000,
    breakdown: {
      carPurchase: 170000,
      repairs: 18000,
      admin: 4000,
      reserve: 8000
    },
    expectedReturn: 10.5,
    auctionPrice: 240000,
    financingStructure: {
      structuring: 5000,
      administration: 2400,
      auctionCommission: 4000,
      successFee: 6000,
      total: 17400
    }
  },
  {
    id: "3",
    name: "AutoToken - Contribuidor Especial (Galpón)",
    description: "Aportante de infraestructura: galpón de guarda",
    category: "Activo Complementario",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&h=300&fit=crop",
    totalInvestment: 18000,
    tokenSupply: 180,
    tokenPrice: 100,
    currentValue: 19188,
    investorsCount: 1,
    startDate: "2025-01-15",
    endDate: "2025-07-15",
    status: "active",
    profitTarget: 3600,
    profitCurrent: 1008,
    breakdown: {
      garageRental: 18000
    },
    expectedReturn: 11.3,
    auctionPrice: 180000,
    financingStructure: {
      rentCredit: 18000
    }
  }
]

const labels = {
  es: {
    billing: "Facturación y Rendimientos",
    billing_subtitle: "Seguimiento de inversiones, estructura de costos y distribución de rendimientos",
    search: "Buscar proyectos...",
    category: "Categoría",
    all_categories: "Todos los proyectos",
    total_investment: "Inversión Total",
    current_value: "Valor Actual",
    investors: "Inversores",
    status: "Estado",
    active: "Activo",
    upcoming: "Próximo",
    profit_target: "Meta de Ganancia",
    profit_current: "Ganancia Actual",
    expected_return: "Retorno Esperado",
    view_details: "Ver detalles",
    financing_structure: "Estructura de Financiamiento",
    investment_breakdown: "Desglose de Inversión",
    profit_distribution: "Distribución de Ganancias",
    auction_expected: "Precio Esperado en Subasta",
    total_fees: "Honorarios Totales",
    net_profit: "Ganancia Neta",
    profit_per_token: "Ganancia por Token",
    tokens: "Tokens",
    price_per_token: "Precio por Token",
    download_report: "Descargar Reporte",
    view_breakdown: "Ver desglose",
    close: "Cerrar",
    total_raised: "Total Recaudado",
    our_commission: "Nuestra Comisión",
    investor_profit: "Ganancia a Inversores"
  },
  en: {
    billing: "Billing & Returns",
    billing_subtitle: "Track investments, cost structure and returns distribution",
    search: "Search projects...",
    category: "Category",
    all_categories: "All projects",
    total_investment: "Total Investment",
    current_value: "Current Value",
    investors: "Investors",
    status: "Status",
    active: "Active",
    upcoming: "Upcoming",
    profit_target: "Profit Target",
    profit_current: "Current Profit",
    expected_return: "Expected Return",
    view_details: "View Details",
    financing_structure: "Financing Structure",
    investment_breakdown: "Investment Breakdown",
    profit_distribution: "Profit Distribution",
    auction_expected: "Expected Auction Price",
    total_fees: "Total Fees",
    net_profit: "Net Profit",
    profit_per_token: "Profit per Token",
    tokens: "Tokens",
    price_per_token: "Price per Token",
    download_report: "Download Report",
    view_breakdown: "View Breakdown",
    close: "Close",
    total_raised: "Total Raised",
    our_commission: "Our Commission",
    investor_profit: "Investor Profit"
  }
}

export default function BillingPage() {
  const { language } = useLanguage()
  const { isAuthenticated } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedProject, setSelectedProject] = useState<typeof billingProjects[0] | null>(null)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [showSignUpModal, setShowSignUpModal] = useState(false)

  const t = (key: string) => {
    return labels[language as keyof typeof labels][key as keyof typeof labels.es] || key
  }

  const categories = [
    "Tokenización de Autos",
    "Activo Complementario"
  ]

  const filteredProjects = useMemo(() => {
    return billingProjects.filter(project => {
      const searchMatch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase())
      const categoryMatch = selectedCategory === "all" || project.category === selectedCategory
      return searchMatch && categoryMatch
    })
  }, [searchTerm, selectedCategory])

  const totalInvested = billingProjects.reduce((sum, p) => sum + p.totalInvestment, 0)
  const totalProfitCurrent = billingProjects.reduce((sum, p) => sum + p.profitCurrent, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header */}
      <div className="border-b bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          {/* Title Section */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <DollarSign className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  {t('billing')}
                </h1>
              </div>
              <p className="text-muted-foreground mt-2">
                {t('billing_subtitle')}
              </p>
            </div>
            <div className="text-right">
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-lg p-4 border border-blue-200/30 dark:border-blue-800/30 mb-4">
                <p className="text-sm text-muted-foreground mb-1">{t('total_raised')}</p>
                <p className="text-2xl font-bold text-blue-600">${(totalInvested / 1000).toFixed(0)}K</p>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-lg p-4 border border-green-200/30 dark:border-green-800/30">
                <p className="text-sm text-muted-foreground mb-1">{t('profit_current')}</p>
                <p className="text-2xl font-bold text-green-600">${(totalProfitCurrent / 1000).toFixed(1)}K</p>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="space-y-4">
            <div className="flex gap-2 items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input
                  placeholder={t('search')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/80 dark:bg-slate-800/80 border-blue-200/50 dark:border-blue-800/50 focus:border-blue-500 focus:ring-blue-500/20"
                />
              </div>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2">
              <Button
                onClick={() => setSelectedCategory("all")}
                variant={selectedCategory === "all" ? "default" : "outline"}
                className={selectedCategory === "all" ? "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700" : "border-blue-200/50 dark:border-blue-800/50"}
                size="sm"
              >
                {t('all_categories')}
              </Button>
              {categories.map(cat => (
                <Button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  className={selectedCategory === cat ? "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700" : "border-blue-200/50 dark:border-blue-800/50"}
                  size="sm"
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-blue-200 dark:hover:border-blue-800 flex flex-col">
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <Badge className={project.status === 'active' ? "bg-green-500 text-white border-0" : "bg-blue-500 text-white border-0"}>
                    {project.status === 'active' ? t('active') : t('upcoming')}
                  </Badge>
                </div>

                {/* Category Badge */}
                <div className="absolute bottom-4 left-4">
                  <Badge variant="secondary" className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm">
                    {project.category}
                  </Badge>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-lg group-hover:text-blue-600 transition-colors line-clamp-2">
                  {project.name}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4 flex-grow">
                {/* Investment Summary */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-blue-50/50 dark:bg-blue-950/20 rounded-lg p-3 border border-blue-200/30 dark:border-blue-800/30">
                    <p className="text-xs text-muted-foreground mb-1">{t('total_investment')}</p>
                    <p className="font-semibold text-sm text-blue-600 dark:text-blue-400">${(project.totalInvestment / 1000).toFixed(0)}K</p>
                  </div>
                  <div className="bg-cyan-50/50 dark:bg-cyan-950/20 rounded-lg p-3 border border-cyan-200/30 dark:border-cyan-800/30">
                    <p className="text-xs text-muted-foreground mb-1">{t('current_value')}</p>
                    <p className="font-semibold text-sm text-cyan-600 dark:text-cyan-400">${(project.currentValue / 1000).toFixed(1)}K</p>
                  </div>
                </div>

                {/* Profit Metrics */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                      <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                        +{project.profitCurrent.toLocaleString()} USD
                      </span>
                    </div>
                    <span className="text-xs font-bold text-green-600 dark:text-green-400">
                      +{((project.profitCurrent / project.totalInvestment) * 100).toFixed(2)}%
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Meta: ${project.profitTarget.toLocaleString()} USD
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs">{t('investors')}</p>
                    <p className="font-semibold flex items-center gap-1">
                      <Users className="h-3 w-3 text-blue-600" />
                      {project.investorsCount}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">{t('expected_return')}</p>
                    <p className="font-semibold text-blue-600">{project.expectedReturn}%</p>
                  </div>
                </div>

                {/* Token Info */}
                <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">{t('tokens')}</span>
                    <span className="font-semibold">{project.tokenSupply.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm mt-1">
                    <span className="text-muted-foreground">{t('price_per_token')}</span>
                    <span className="font-semibold">USD {project.tokenPrice}</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="gap-2">
                <Button
                  className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                  onClick={() => {
                    if (!isAuthenticated) {
                      setShowSignUpModal(true)
                    } else {
                      setSelectedProject(project)
                      setShowDetailsDialog(true)
                    }
                  }}
                >
                  {t('view_details')}
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-blue-200/50 dark:border-blue-800/50"
                  onClick={() => {
                    // TODO: Implement download functionality
                  }}
                  title={t('download_report')}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              {language === 'es'
                ? 'No se encontraron proyectos con los filtros seleccionados'
                : 'No projects found with the selected filters'}
            </p>
          </div>
        )}
      </div>

      {/* Project Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedProject.name}</DialogTitle>
                <DialogDescription>{selectedProject.category}</DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Project Image */}
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Description */}
                <div>
                  <h3 className="font-semibold text-lg mb-2">{selectedProject.description}</h3>
                  <p className="text-muted-foreground">
                    {selectedProject.category === 'Tokenización de Autos'
                      ? 'Proyecto de tokenización de compra, reacondicionamiento y subasta de autos usados de alta demanda. El retorno se distribuye proporcionalmente a los holders de AutoTokens.'
                      : 'Aportación especial de infraestructura para el proyecto. El contribuidor recibe tokens equivalentes al valor de mercado del aporte.'}
                  </p>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-4 border border-blue-200/30 dark:border-blue-800/30">
                    <p className="text-xs text-muted-foreground mb-1">{t('total_investment')}</p>
                    <p className="font-semibold text-blue-600 dark:text-blue-400">${(selectedProject.totalInvestment / 1000).toFixed(0)}K USD</p>
                  </div>
                  <div className="bg-cyan-50 dark:bg-cyan-950/30 rounded-lg p-4 border border-cyan-200/30 dark:border-cyan-800/30">
                    <p className="text-xs text-muted-foreground mb-1">{t('current_value')}</p>
                    <p className="font-semibold text-cyan-600 dark:text-cyan-400">${(selectedProject.currentValue / 1000).toFixed(1)}K USD</p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-950/30 rounded-lg p-4 border border-green-200/30 dark:border-green-800/30">
                    <p className="text-xs text-muted-foreground mb-1">{t('profit_current')}</p>
                    <p className="font-semibold text-green-600 dark:text-green-400">+${selectedProject.profitCurrent.toLocaleString()} USD</p>
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-950/30 rounded-lg p-4 border border-yellow-200/30 dark:border-yellow-800/30">
                    <p className="text-xs text-muted-foreground mb-1">{t('expected_return')}</p>
                    <p className="font-semibold text-yellow-600 dark:text-yellow-400">{selectedProject.expectedReturn}%</p>
                  </div>
                </div>

                {/* Investment Breakdown */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <BarChart className="h-5 w-5 text-blue-600" />
                    {t('investment_breakdown')}
                  </h3>
                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 space-y-2">
                    {Object.entries(selectedProject.breakdown).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <span className="font-semibold">${(value as number).toLocaleString()} USD</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Financing Structure (if applicable) */}
                {selectedProject.financingStructure && (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                      {t('financing_structure')}
                    </h3>
                    <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 space-y-2">
                      {Object.entries(selectedProject.financingStructure).map(([key, value]) => {
                        if (key === 'total') return null
                        return (
                          <div key={key} className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </span>
                            <span className="font-semibold">${(value as number).toLocaleString()} USD</span>
                          </div>
                        )
                      })}
                      <div className="border-t border-slate-200 dark:border-slate-700 pt-2 mt-2 flex justify-between items-center font-bold">
                        <span>{t('total_fees')}</span>
                        <span className="text-red-600">-${(selectedProject.financingStructure?.total || 0).toLocaleString()} USD</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Profit Distribution */}
                <div className="space-y-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-lg p-4 border border-green-200/30 dark:border-green-800/30">
                  <h3 className="font-semibold text-lg text-green-600 dark:text-green-400">{t('profit_distribution')}</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{t('auction_expected')}</span>
                      <span className="font-semibold">${selectedProject.auctionPrice.toLocaleString()} USD</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{t('total_investment')}</span>
                      <span className="font-semibold">-${selectedProject.totalInvestment.toLocaleString()} USD</span>
                    </div>
                    <div className="border-t border-green-200 dark:border-green-800 pt-2 flex justify-between items-center font-semibold">
                      <span>Ganancia Bruta</span>
                      <span className="text-green-600 dark:text-green-400">${(selectedProject.auctionPrice - selectedProject.totalInvestment).toLocaleString()} USD</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{t('our_commission')}</span>
                      <span className="font-semibold text-red-600">-${(selectedProject.financingStructure?.total || 0).toLocaleString()} USD</span>
                    </div>
                    <div className="border-t border-green-200 dark:border-green-800 pt-2 flex justify-between items-center font-bold text-lg">
                      <span>{t('investor_profit')}</span>
                      <span className="text-green-600 dark:text-green-400">
                        ${((selectedProject.auctionPrice - selectedProject.totalInvestment) - (selectedProject.financingStructure?.total || 0)).toLocaleString()} USD
                      </span>
                    </div>
                    <div className="pt-2 border-t border-green-200 dark:border-green-800 flex justify-between items-center">
                      <span className="text-sm font-semibold">{t('profit_per_token')}</span>
                      <span className="font-bold text-green-600 dark:text-green-400">
                        USD {(((selectedProject.auctionPrice - selectedProject.totalInvestment) - (selectedProject.financingStructure?.total || 0)) / selectedProject.tokenSupply).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Token Info */}
                <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">{t('tokens')}</p>
                    <p className="text-2xl font-bold">{selectedProject.tokenSupply.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">{t('price_per_token')}</p>
                    <p className="text-2xl font-bold">USD {selectedProject.tokenPrice}</p>
                  </div>
                </div>

                {/* Action Button */}
                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                  onClick={() => setShowDetailsDialog(false)}
                >
                  {t('close')}
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* SignUp Modal */}
      <SignUpModal open={showSignUpModal} onOpenChange={setShowSignUpModal} />
    </div>
  )
}
