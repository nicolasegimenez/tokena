import { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Gavel, Clock, Users, Search } from 'lucide-react'
import { useLanguage } from '@/lib/language'
import { useAuth } from '@/lib/auth'
import SignUpModal from '@/components/SignUpModal'

const auctionProjects = [
  {
    id: "1",
    name: "Subasta Tokenizada - Toyota Corolla 2015",
    description: "Auto de alta demanda, buen estado, completamente documentado",
    category: "Automóviles",
    image: "https://res.cloudinary.com/dhacybdxf/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1763417178/2015TOY005c01_fordpi.jpg",
    totalInvestment: 100000,
    expectedRevenue: 125000,
    tokenPrice: 100,
    tokensAvailable: 1000,
    tokensSold: 750,
    currentBid: 18500,
    buyerCount: 450,
    auctionStartDate: "2025-01-15",
    auctionEndDate: "2025-01-22",
    projectStatus: "active",
    expectedReturn: 11.3,
    tokenName: "AUTO-Corolla",
    description_long: "Proyecto de tokenización de automóviles usados de alta demanda. Este Toyota Corolla 2015 será comprado, reacondicionado y vendido en subasta pública. Los inversores que participan reciben tokens que representan su inversión y recibirán ganancias proporcionales a su participación.",
    carDetails: {
      brand: "Toyota",
      model: "Corolla",
      year: 2015,
      mileage: "45,000 km",
      condition: "Excelente",
      transmission: "Manual",
      fuelType: "Gasolina"
    },
    costs: {
      purchase: 65000,
      repairs: 12000,
      documentation: 8000,
      administration: 15000
    }
  },
  {
    id: "2",
    name: "Subasta Tokenizada - Volkswagen Amarok",
    description: "Camioneta pickup de carga, modelo económico popular",
    category: "Automóviles",
    image: "https://res.cloudinary.com/dhacybdxf/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1763417683/D_NQ_NP_911955-MLA80334559322_112024-F_bhcui2.jpg",
    totalInvestment: 180000,
    expectedRevenue: 215000,
    tokenPrice: 100,
    tokensAvailable: 1800,
    tokensSold: 1200,
    currentBid: 24500,
    buyerCount: 650,
    auctionStartDate: "2025-01-20",
    auctionEndDate: "2025-01-27",
    projectStatus: "active",
    expectedReturn: 15.2,
    tokenName: "AUTO-Amarok",
    description_long: "Subasta de una Volkswagen Amarok 4x2, vehículo de carga muy demandado. Incluye reparaciones mecánicas completas y documentación vigente. Los inversores tokenizados participan en la ganancia de la venta.",
    carDetails: {
      brand: "Volkswagen",
      model: "Amarok",
      year: 2012,
      mileage: "120,000 km",
      condition: "Buen estado",
      transmission: "Manual",
      fuelType: "Diesel"
    },
    costs: {
      purchase: 95000,
      repairs: 35000,
      documentation: 12000,
      administration: 38000
    }
  },
  {
    id: "3",
    name: "Subasta Tokenizada - Fiat 500 City Car",
    description: "Auto urbano compacto, económico y fácil de vender",
    category: "Automóviles",
    image: "https://res.cloudinary.com/dhacybdxf/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1763417703/fc0c48381abf3a1271ffaed662788d9856c2b86d_k9hgsp.jpg",
    totalInvestment: 75000,
    expectedRevenue: 93000,
    tokenPrice: 100,
    tokensAvailable: 750,
    tokensSold: 450,
    currentBid: 12200,
    buyerCount: 320,
    auctionStartDate: "2025-01-18",
    auctionEndDate: "2025-01-25",
    projectStatus: "active",
    expectedReturn: 18.5,
    tokenName: "AUTO-Fiat",
    description_long: "Vehículo urbano ideal para la ciudad. Bajo consumo, mantenimiento económico y alta demanda de mercado. Perfecto para inversores que buscan proyectos de corta duración con buenos retornos.",
    carDetails: {
      brand: "Fiat",
      model: "500",
      year: 2018,
      mileage: "62,000 km",
      condition: "Muy bueno",
      transmission: "Automático",
      fuelType: "Gasolina"
    },
    costs: {
      purchase: 38000,
      repairs: 8000,
      documentation: 5000,
      administration: 24000
    }
  },
  {
    id: "4",
    name: "Subasta Tokenizada - Propiedad Comercial Centro",
    description: "Local comercial en zona céntrica de alto tránsito",
    category: "Inmuebles",
    image: "https://res.cloudinary.com/dhacybdxf/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1763417726/W10_QA_C_C3_B3mo_Asegurarte_De_Que_Una_Inversion_En_Una_Propiedad_Comercial_Sea_Rentable_4_kr1xgm.jpg",
    totalInvestment: 500000,
    expectedRevenue: 580000,
    tokenPrice: 1000,
    tokensAvailable: 500,
    tokensSold: 320,
    currentBid: 520000,
    buyerCount: 280,
    auctionStartDate: "2025-02-01",
    auctionEndDate: "2025-02-15",
    projectStatus: "pending",
    expectedReturn: 12.8,
    tokenName: "PROP-Centro",
    description_long: "Propiedad comercial de 150 m² en zona céntrica con alto valor comercial. Será reacondiconada y vendida en subasta a través de la plataforma. Inversión tokenizada con transparencia total.",
    propertyDetails: {
      location: "Centro Comercial",
      size: "150 m²",
      rooms: 3,
      bathrooms: 2,
      garage: "Sí",
      condition: "A restaurar"
    },
    costs: {
      purchase: 350000,
      repairs: 80000,
      documentation: 25000,
      administration: 45000
    }
  },
  {
    id: "5",
    name: "Subasta Tokenizada - Ford Fiesta KD",
    description: "Sedán compacto, modelo económico de tres puertas",
    category: "Automóviles",
    image: "https://res.cloudinary.com/dhacybdxf/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1763417746/nuevo-fiesta-kinetc-1_feqzy7.jpg",
    totalInvestment: 85000,
    expectedRevenue: 102000,
    tokenPrice: 100,
    tokensAvailable: 850,
    tokensSold: 550,
    currentBid: 14800,
    buyerCount: 380,
    auctionStartDate: "2025-01-25",
    auctionEndDate: "2025-02-01",
    projectStatus: "active",
    expectedReturn: 16.9,
    tokenName: "AUTO-Fiesta",
    description_long: "Ford Fiesta KD completamente funcional, bajo costo de mantenimiento y buena demanda en mercado secundario. Apto para inversores con perfil moderado.",
    carDetails: {
      brand: "Ford",
      model: "Fiesta",
      year: 2014,
      mileage: "85,000 km",
      condition: "Bueno",
      transmission: "Manual",
      fuelType: "Gasolina"
    },
    costs: {
      purchase: 42000,
      repairs: 15000,
      documentation: 6000,
      administration: 22000
    }
  },
  {
    id: "6",
    name: "Subasta Tokenizada - Peugeot 208 GTi",
    description: "Hatchback deportivo, modelo popular en demanda creciente",
    category: "Automóviles",
    image: "https://res.cloudinary.com/dhacybdxf/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1763417784/2723505-0tqbyqcv7u-whr_dnipxu.jpg",
    totalInvestment: 120000,
    expectedRevenue: 150000,
    tokenPrice: 100,
    tokensAvailable: 1200,
    tokensSold: 800,
    currentBid: 19500,
    buyerCount: 520,
    auctionStartDate: "2025-01-22",
    auctionEndDate: "2025-01-29",
    projectStatus: "active",
    expectedReturn: 19.4,
    tokenName: "AUTO-Peugeot",
    description_long: "Peugeot 208 GTi con mayor demanda en mercado de autos deportivos. Perfecto para inversores que buscan márgenes de ganancia más altos. Proceso de reacondicionamiento acelerado.",
    carDetails: {
      brand: "Peugeot",
      model: "208 GTi",
      year: 2016,
      mileage: "58,000 km",
      condition: "Excelente",
      transmission: "Manual",
      fuelType: "Gasolina"
    },
    costs: {
      purchase: 68000,
      repairs: 18000,
      documentation: 8000,
      administration: 26000
    }
  }
]

const labels = {
  es: {
    auctions: "Subastas Tokenizadas",
    auctions_subtitle: "Invierte en subastas de activos reales con rendimiento comprobado",
    search: "Buscar subastas...",
    category: "Categoría",
    all_categories: "Todas las categorías",
    investment: "Inversión",
    expected_revenue: "Ingresos Esperados",
    token_price: "Precio por Token",
    tokens_available: "Tokens Disponibles",
    current_bid: "Puja Actual",
    investors: "Inversores",
    auction_date: "Fecha de Subasta",
    expected_return: "Retorno Esperado",
    invest: "Invertir",
    learn_more: "Más información",
    active_auction: "Subasta Activa",
    pending_auction: "Próximamente",
    auction_details: "Detalles de la Subasta",
    tokenized_investment: "Inversión Tokenizada",
    no_financial_risk: "Respaldada por Activos Reales",
    blockchain_tracking: "Rastreo en Blockchain",
    full_transparency: "Transparencia Total",
    proceed_to_invest: "Continuar con la Inversión",
    close: "Cerrar",
    auction_starts: "Inicia",
    auction_ends: "Finaliza",
    profit_distribution: "Distribución de Ganancias",
    days_left: "Días restantes",
    project_costs: "Costos del Proyecto",
    car_details: "Detalles del Vehículo",
    property_details: "Detalles de la Propiedad",
    purchase: "Compra",
    repairs: "Reparaciones",
    documentation: "Documentación",
    administration: "Administración",
    brand: "Marca",
    model: "Modelo",
    year: "Año",
    mileage: "Kilometraje",
    condition: "Condición",
    transmission: "Transmisión",
    fuel_type: "Tipo de Combustible",
    location: "Ubicación",
    size: "Tamaño",
    garage: "Garaje",
    profit_calc: "Ganancia Estimada",
    your_investment: "Tu Inversión",
    profit_per_token: "Ganancia por Token"
  },
  en: {
    auctions: "Tokenized Auctions",
    auctions_subtitle: "Invest in auctions of real assets with proven returns",
    search: "Search auctions...",
    category: "Category",
    all_categories: "All categories",
    investment: "Investment",
    expected_revenue: "Expected Revenue",
    token_price: "Token Price",
    tokens_available: "Available Tokens",
    current_bid: "Current Bid",
    investors: "Investors",
    auction_date: "Auction Date",
    expected_return: "Expected Return",
    invest: "Invest",
    learn_more: "Learn more",
    active_auction: "Active Auction",
    pending_auction: "Coming Soon",
    auction_details: "Auction Details",
    tokenized_investment: "Tokenized Investment",
    no_financial_risk: "Backed by Real Assets",
    blockchain_tracking: "Blockchain Tracking",
    full_transparency: "Full Transparency",
    proceed_to_invest: "Proceed to Invest",
    close: "Close",
    auction_starts: "Starts",
    auction_ends: "Ends",
    profit_distribution: "Profit Distribution",
    days_left: "Days left",
    project_costs: "Project Costs",
    car_details: "Car Details",
    property_details: "Property Details",
    purchase: "Purchase",
    repairs: "Repairs",
    documentation: "Documentation",
    administration: "Administration",
    brand: "Brand",
    model: "Model",
    year: "Year",
    mileage: "Mileage",
    condition: "Condition",
    transmission: "Transmission",
    fuel_type: "Fuel Type",
    location: "Location",
    size: "Size",
    garage: "Garage",
    profit_calc: "Estimated Profit",
    your_investment: "Your Investment",
    profit_per_token: "Profit per Token"
  }
}

export default function AuctionsPage() {
  const { language } = useLanguage()
  const { isAuthenticated } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedAuction, setSelectedAuction] = useState<typeof auctionProjects[0] | null>(null)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [showInvestDialog, setShowInvestDialog] = useState(false)
  const [investmentAmount, setInvestmentAmount] = useState("")
  const [investmentError, setInvestmentError] = useState("")
  const [showSignUpModal, setShowSignUpModal] = useState(false)

  const t = (key: string) => {
    return labels[language as keyof typeof labels][key as keyof typeof labels.es] || key
  }

  const categories = [
    "Automóviles",
    "Inmuebles"
  ]

  const filteredAuctions = useMemo(() => {
    return auctionProjects.filter(auction => {
      const searchMatch = auction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         auction.description.toLowerCase().includes(searchTerm.toLowerCase())
      const categoryMatch = selectedCategory === "all" || auction.category === selectedCategory
      return searchMatch && categoryMatch
    })
  }, [searchTerm, selectedCategory])

  const totalInvested = auctionProjects.reduce((sum, a) => sum + (a.tokenPrice * a.tokensSold), 0)
  const totalInvestors = auctionProjects.reduce((sum, a) => sum + a.buyerCount, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header */}
      <div className="border-b bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          {/* Title Section */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Gavel className="w-8 h-8 text-blue-600" />
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {t('auctions')}
                </h1>
              </div>
              <p className="text-muted-foreground mt-2">
                {t('auctions_subtitle')}
              </p>
            </div>
            <div className="text-right">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-lg p-4 border border-blue-200/30 dark:border-blue-800/30">
                <p className="text-sm text-muted-foreground mb-1">Capital invertido</p>
                <p className="text-2xl font-bold text-blue-600">${(totalInvested / 1000000).toFixed(1)}M</p>
                <p className="text-xs text-muted-foreground mt-2">{totalInvestors.toLocaleString()} inversores</p>
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
                className={selectedCategory === "all" ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700" : "border-blue-200/50 dark:border-blue-800/50"}
                size="sm"
              >
                {t('all_categories')}
              </Button>
              {categories.map(cat => (
                <Button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  className={selectedCategory === cat ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700" : "border-blue-200/50 dark:border-blue-800/50"}
                  size="sm"
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Auctions Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAuctions.map((auction) => (
            <Card key={auction.id} className="group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-blue-200 dark:hover:border-blue-800 flex flex-col">
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={auction.image}
                  alt={auction.name}
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <Badge className={auction.projectStatus === 'active' ? "bg-blue-500 text-white border-0" : "bg-yellow-500 text-white border-0"}>
                    {auction.projectStatus === 'active' ? t('active_auction') : t('pending_auction')}
                  </Badge>
                </div>

                {/* Category Badge */}
                <div className="absolute bottom-4 left-4">
                  <Badge variant="secondary" className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm">
                    {auction.category}
                  </Badge>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-lg group-hover:text-blue-600 transition-colors line-clamp-2">
                  {auction.name}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {auction.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4 flex-grow">
                {/* Investment Info */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs">{t('token_price')}</p>
                    <p className="font-semibold text-blue-600">${auction.tokenPrice}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">{t('investors')}</p>
                    <p className="font-semibold flex items-center gap-1">
                      <Users className="h-3 w-3 text-blue-600" />
                      {auction.buyerCount.toLocaleString()}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-muted-foreground text-xs mb-1">{t('current_bid')}</p>
                    <p className="font-bold text-lg text-blue-600">{Math.round(auction.currentBid / auction.tokenPrice)} {auction.tokenName}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-xs text-muted-foreground">Tokens vendidos</p>
                    <p className="text-xs font-semibold text-blue-600">
                      {Math.round((auction.tokensSold / auction.tokensAvailable) * 100)}%
                    </p>
                  </div>
                  <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500"
                      style={{ width: `${Math.min((auction.tokensSold / auction.tokensAvailable) * 100, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Auction Timeline */}
                <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-3 text-sm space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{t('auction_starts')}: {new Date(auction.auctionStartDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{t('auction_ends')}: {new Date(auction.auctionEndDate).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Info Badges */}
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs border-blue-200/50 dark:border-blue-800/50 text-blue-600 dark:text-blue-400">
                    {t('tokenized_investment')}
                  </Badge>
                  <Badge variant="outline" className="text-xs border-blue-200/50 dark:border-blue-800/50 text-blue-600 dark:text-blue-400">
                    {t('blockchain_tracking')}
                  </Badge>
                </div>
              </CardContent>

              <CardFooter className="gap-2">
                <Button
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  onClick={() => {
                    if (!isAuthenticated) {
                      setShowSignUpModal(true)
                    } else {
                      setSelectedAuction(auction)
                      setShowInvestDialog(true)
                    }
                  }}
                >
                  {t('invest')}
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-blue-200/50 dark:border-blue-800/50"
                  onClick={() => {
                    setSelectedAuction(auction)
                    setShowDetailsDialog(true)
                  }}
                >
                  {t('learn_more')}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredAuctions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              {language === 'es'
                ? 'No se encontraron subastas con los filtros seleccionados'
                : 'No auctions found with the selected filters'}
            </p>
          </div>
        )}
      </div>

      {/* Auction Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedAuction && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedAuction.name}</DialogTitle>
                <DialogDescription>{selectedAuction.category}</DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Auction Image */}
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <img
                    src={selectedAuction.image}
                    alt={selectedAuction.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Description */}
                <div>
                  <h3 className="font-semibold text-lg mb-2">{t('auction_details')}</h3>
                  <p className="text-muted-foreground">{selectedAuction.description_long}</p>
                </div>

                {/* Return Info */}
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-lg p-4 border border-emerald-200/30 dark:border-emerald-800/30">
                  <h3 className="font-semibold mb-3 text-emerald-600 dark:text-emerald-400">{t('profit_distribution')}</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">{t('investment')}</span>
                      <span className="font-semibold">${selectedAuction.totalInvestment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">{t('expected_revenue')}</span>
                      <span className="font-semibold text-emerald-600">${selectedAuction.expectedRevenue.toLocaleString()}</span>
                    </div>
                    <div className="h-px bg-emerald-200/30 dark:bg-emerald-800/30" />
                    <div className="flex justify-between items-center text-lg">
                      <span className="font-bold">{t('profit_calc')}</span>
                      <span className="font-bold text-emerald-600">${(selectedAuction.expectedRevenue - selectedAuction.totalInvestment).toLocaleString()}</span>
                    </div>
                    <div className="pt-2 border-t border-emerald-200/30 dark:border-emerald-800/30">
                      <p className="text-sm text-emerald-600 dark:text-emerald-400 font-semibold">
                        {t('expected_return')}: {selectedAuction.expectedReturn.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </div>

                {/* Project Costs */}
                <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 border border-slate-200/30 dark:border-slate-800/30">
                  <h3 className="font-semibold mb-3">{t('project_costs')}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t('purchase')}</span>
                      <span>${selectedAuction.costs.purchase.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t('repairs')}</span>
                      <span>${selectedAuction.costs.repairs.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t('documentation')}</span>
                      <span>${selectedAuction.costs.documentation.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t('administration')}</span>
                      <span>${selectedAuction.costs.administration.toLocaleString()}</span>
                    </div>
                    <div className="h-px bg-slate-200/30 dark:bg-slate-800/30" />
                    <div className="flex justify-between font-semibold">
                      <span>{t('investment')}</span>
                      <span>${selectedAuction.totalInvestment.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Vehicle or Property Details */}
                {selectedAuction.category === 'Automóviles' && selectedAuction.carDetails && (
                  <div className="bg-blue-50/50 dark:bg-blue-950/20 rounded-lg p-4 border border-blue-200/30 dark:border-blue-800/30">
                    <h3 className="font-semibold mb-3 text-blue-600 dark:text-blue-400">{t('car_details')}</h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-muted-foreground text-xs">{t('brand')}</p>
                        <p className="font-semibold">{selectedAuction.carDetails.brand}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">{t('model')}</p>
                        <p className="font-semibold">{selectedAuction.carDetails.model}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">{t('year')}</p>
                        <p className="font-semibold">{selectedAuction.carDetails.year}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">{t('mileage')}</p>
                        <p className="font-semibold">{selectedAuction.carDetails.mileage}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">{t('condition')}</p>
                        <p className="font-semibold">{selectedAuction.carDetails.condition}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">{t('transmission')}</p>
                        <p className="font-semibold">{selectedAuction.carDetails.transmission}</p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedAuction.category === 'Inmuebles' && selectedAuction.propertyDetails && (
                  <div className="bg-blue-50/50 dark:bg-blue-950/20 rounded-lg p-4 border border-blue-200/30 dark:border-blue-800/30">
                    <h3 className="font-semibold mb-3 text-blue-600 dark:text-blue-400">{t('property_details')}</h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-muted-foreground text-xs">{t('location')}</p>
                        <p className="font-semibold">{selectedAuction.propertyDetails.location}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">{t('size')}</p>
                        <p className="font-semibold">{selectedAuction.propertyDetails.size}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">{t('condition')}</p>
                        <p className="font-semibold">{selectedAuction.propertyDetails.condition}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Transparency Badges */}
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs border-blue-200/50 dark:border-blue-800/50 text-blue-600 dark:text-blue-400">
                    {t('tokenized_investment')}
                  </Badge>
                  <Badge variant="outline" className="text-xs border-blue-200/50 dark:border-blue-800/50 text-blue-600 dark:text-blue-400">
                    {t('no_financial_risk')}
                  </Badge>
                  <Badge variant="outline" className="text-xs border-blue-200/50 dark:border-blue-800/50 text-blue-600 dark:text-blue-400">
                    {t('blockchain_tracking')}
                  </Badge>
                  <Badge variant="outline" className="text-xs border-blue-200/50 dark:border-blue-800/50 text-blue-600 dark:text-blue-400">
                    {t('full_transparency')}
                  </Badge>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    onClick={() => {
                      if (!isAuthenticated) {
                        setShowSignUpModal(true)
                      } else {
                        setShowDetailsDialog(false)
                        setShowInvestDialog(true)
                      }
                    }}
                  >
                    {t('proceed_to_invest')}
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowDetailsDialog(false)}
                  >
                    {t('close')}
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Investment Dialog */}
      <Dialog open={showInvestDialog} onOpenChange={setShowInvestDialog}>
        <DialogContent className="max-w-md">
          {selectedAuction && (
            <>
              <DialogHeader>
                <DialogTitle>{t('invest')} en {selectedAuction.name}</DialogTitle>
                <DialogDescription>
                  {language === 'es' ? 'Ingresa el monto que deseas invertir' : 'Enter the amount you want to invest'}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                {/* Auction Quick Info */}
                <div className="bg-blue-50/50 dark:bg-blue-950/20 rounded-lg p-3 border border-blue-200/30 dark:border-blue-800/30">
                  <p className="text-xs text-muted-foreground mb-1">{t('expected_return')}</p>
                  <p className="font-semibold text-lg text-blue-600 dark:text-blue-400">{selectedAuction.expectedReturn.toFixed(1)}%</p>
                </div>

                {/* Amount Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {language === 'es' ? 'Monto (USD)' : 'Amount (USD)'}
                  </label>
                  <input
                    type="number"
                    min={selectedAuction.tokenPrice}
                    max="100000"
                    step={selectedAuction.tokenPrice}
                    value={investmentAmount}
                    onChange={(e) => {
                      setInvestmentAmount(e.target.value)
                      setInvestmentError("")
                    }}
                    placeholder={language === 'es' ? `Múltiplos de ${selectedAuction.tokenPrice}` : `Multiples of ${selectedAuction.tokenPrice}`}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-md bg-white dark:bg-slate-900 focus:border-blue-500 focus:ring-blue-500/20 focus:ring-2 outline-none transition"
                  />
                </div>

                {/* Error Message */}
                {investmentError && (
                  <div className="bg-red-50 dark:bg-red-950/30 border border-red-200/50 dark:border-red-800/50 rounded-lg p-3 flex items-start gap-2">
                    <div className="text-red-600 dark:text-red-400 mt-0.5">!</div>
                    <p className="text-sm text-red-600 dark:text-red-400">{investmentError}</p>
                  </div>
                )}

                {/* Investment Info */}
                <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-3 space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">{t('tokens_available')}</span>
                    <span className="font-semibold">
                      {investmentAmount ? Math.floor(parseFloat(investmentAmount) / selectedAuction.tokenPrice) : 0} {selectedAuction.tokenName}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm pt-2 border-t border-slate-200/50 dark:border-slate-700/50">
                    <span className="text-muted-foreground">{t('profit_calc')}</span>
                    <span className="font-semibold text-emerald-600">
                      ${investmentAmount ? Math.floor(parseFloat(investmentAmount) / selectedAuction.tokenPrice) * (selectedAuction.expectedRevenue - selectedAuction.totalInvestment) / (selectedAuction.tokensAvailable) : 0}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    {language === 'es'
                      ? `${selectedAuction.expectedReturn.toFixed(1)}% de retorno estimado en ${Math.ceil((new Date(selectedAuction.auctionEndDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} días`
                      : `${selectedAuction.expectedReturn.toFixed(1)}% estimated return in ${Math.ceil((new Date(selectedAuction.auctionEndDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days`}
                  </div>
                </div>

                {/* Transparency Badges */}
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs border-blue-200/50 dark:border-blue-800/50 text-blue-600 dark:text-blue-400">
                    {t('tokenized_investment')}
                  </Badge>
                  <Badge variant="outline" className="text-xs border-blue-200/50 dark:border-blue-800/50 text-blue-600 dark:text-blue-400">
                    {t('blockchain_tracking')}
                  </Badge>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4">
                  <Button
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    onClick={() => {
                      if (!investmentAmount) {
                        setInvestmentError(language === 'es' ? 'Campo requerido' : 'Required field')
                        return
                      }
                      const amount = parseFloat(investmentAmount)
                      if (isNaN(amount) || amount < selectedAuction.tokenPrice || amount > 100000) {
                        setInvestmentError(
                          language === 'es'
                            ? `El monto debe ser múltiplo de ${selectedAuction.tokenPrice} y menor a 100.000`
                            : `Amount must be a multiple of ${selectedAuction.tokenPrice} and less than 100,000`
                        )
                        return
                      }
                      // TODO: Implement actual investment flow
                      setShowInvestDialog(false)
                      setInvestmentAmount("")
                    }}
                  >
                    {t('invest')}
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setShowInvestDialog(false)
                      setInvestmentAmount("")
                      setInvestmentError("")
                    }}
                  >
                    {t('close')}
                  </Button>
                </div>
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
