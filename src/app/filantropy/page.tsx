import { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Heart, Users, Target, Search } from 'lucide-react'
import { useLanguage } from '@/lib/language'
import { useAuth } from '@/lib/auth'
import SignUpModal from '@/components/SignUpModal'

const philanthropyProjects = [
  {
    id: "1",
    name: "Club Atlético Juventud - Copa Barcelona 2025",
    description: "Viaje a España para competir en la Copa Barcelona 2025",
    category: "Deportes",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&h=300&fit=crop",
    goalAmount: 120000,
    raisedAmount: 85000,
    contributorCount: 4200,
    averageContribution: 20,
    beneficiary: "Club Atlético Juventud",
    description_long: "El Club Atlético Juventud necesita reunir fondos para viajar a España y competir en la Copa Barcelona 2025. Con tu aporte voluntario, ayudarás a estos jóvenes atletas a cumplir su sueño.",
    tokenName: "Juventud 2025",
    daysLeft: 45,
    status: "active"
  },
  {
    id: "2",
    name: "Fundación Educativa - Becas Escolares 2025",
    description: "Programa de becas para estudiantes de bajos recursos",
    category: "Educación",
    image: "https://res.cloudinary.com/dhacybdxf/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1763240602/5ee3acb7ecd99_1004x565_lyawpb.jpg",
    goalAmount: 50000,
    raisedAmount: 32000,
    contributorCount: 2100,
    averageContribution: 15,
    beneficiary: "Fundación Educativa",
    description_long: "Ayuda a estudiantes talentosos pero sin recursos a acceder a educación de calidad. Cada aporte contribuye a cambiar vidas.",
    tokenName: "Educación 2025",
    daysLeft: 60,
    status: "active"
  },
  {
    id: "3",
    name: "Casa Hogar - Refugio para Niños",
    description: "Mejoras y ampliación de instalaciones para 150 niños",
    category: "Bienestar Social",
    image: "https://res.cloudinary.com/dhacybdxf/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1763241338/imagen-casa-hogar_m30nib.png",
    goalAmount: 75000,
    raisedAmount: 58000,
    contributorCount: 3500,
    averageContribution: 16.57,
    beneficiary: "Casa Hogar Infantil",
    description_long: "Buscamos mejorar las instalaciones y servicios para los niños bajo nuestro cuidado. Tu donación directa llega al beneficiario.",
    tokenName: "Hogar Solidario 2025",
    daysLeft: 30,
    status: "active"
  },
  {
    id: "4",
    name: "Fondo Verde - Reforestación Amazónica",
    description: "Plantación de 50.000 árboles en la región amazónica",
    category: "Medio Ambiente",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=300&fit=crop",
    goalAmount: 100000,
    raisedAmount: 45000,
    contributorCount: 3800,
    averageContribution: 11.84,
    beneficiary: "Fondo Verde Global",
    description_long: "Participa en la reforestación del Amazonas. Cada aporte se documenta y puedes ver el impacto de tu donación.",
    tokenName: "Árbol 2025",
    daysLeft: 90,
    status: "active"
  },
  {
    id: "5",
    name: "Salud Rural - Clínica Móvil",
    description: "Servicio de atención médica en zonas rurales",
    category: "Salud",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&h=300&fit=crop",
    goalAmount: 80000,
    raisedAmount: 72000,
    contributorCount: 2800,
    averageContribution: 25.71,
    beneficiary: "Asociación Salud Rural",
    description_long: "Brindamos servicios de salud gratuitos a comunidades rurales. Tu aporte financia medicinas, equipos y personal médico.",
    tokenName: "Salud Rural 2025",
    daysLeft: 20,
    status: "active"
  },
]

const labels = {
  es: {
    philanthropy: "Filantropía",
    solidarity_projects: "Proyectos de Impacto Social",
    solidarity_subtitle: "Contribuye a cambiar vidas. Aportes voluntarios para causas solidarias.",
    search: "Buscar proyectos...",
    category: "Categoría",
    all_categories: "Todas las categorías",
    goal: "Meta",
    raised: "Recaudado",
    contributors: "Aportantes",
    average: "Promedio",
    days_left: "Días restantes",
    contribute: "Aportar",
    learn_more: "Más información",
    beneficiary: "Beneficiario",
    about_project: "Acerca del proyecto",
    token_info: "Token Solidario",
    progress: "Progreso",
    view_details: "Ver detalles",
    active: "Activo",
    completed: "Completado",
    voluntary_contribution: "Aporte voluntario",
    no_financial_return: "Sin retorno financiero",
    blockchain_tracking: "Rastreo en blockchain",
    full_transparency: "Transparencia total",
    project_details: "Detalles del Proyecto",
    impact_description: "Descripción del Impacto",
    proceed_to_contribute: "Continuar con el aporte",
    close: "Cerrar",
  },
  en: {
    philanthropy: "Philanthropy",
    solidarity_projects: "Impact Projects",
    solidarity_subtitle: "Contribute to changing lives. Voluntary donations for solidarity causes.",
    search: "Search projects...",
    category: "Category",
    all_categories: "All categories",
    goal: "Goal",
    raised: "Raised",
    contributors: "Contributors",
    average: "Average",
    days_left: "Days left",
    contribute: "Contribute",
    learn_more: "Learn more",
    beneficiary: "Beneficiary",
    about_project: "About the project",
    token_info: "Solidarity Token",
    progress: "Progress",
    view_details: "View details",
    active: "Active",
    completed: "Completed",
    voluntary_contribution: "Voluntary contribution",
    no_financial_return: "No financial return",
    blockchain_tracking: "Blockchain tracking",
    full_transparency: "Full transparency",
    project_details: "Project Details",
    impact_description: "Impact Description",
    proceed_to_contribute: "Proceed to Contribute",
    close: "Close",
  }
}

export default function PhilanthropyPage() {
  const { language } = useLanguage()
  const { isAuthenticated } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedProject, setSelectedProject] = useState<typeof philanthropyProjects[0] | null>(null)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [showContributeDialog, setShowContributeDialog] = useState(false)
  const [contributionAmount, setContributionAmount] = useState("")
  const [contributionError, setContributionError] = useState("")
  const [showSignUpModal, setShowSignUpModal] = useState(false)

  const t = (key: string) => {
    return labels[language as keyof typeof labels][key as keyof typeof labels.es] || key
  }

  const categories = [
    "Deportes",
    "Educación",
    "Bienestar Social",
    "Medio Ambiente",
    "Salud"
  ]

  const filteredProjects = useMemo(() => {
    return philanthropyProjects.filter(project => {
      const searchMatch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase())
      const categoryMatch = selectedCategory === "all" || project.category === selectedCategory
      return searchMatch && categoryMatch
    })
  }, [searchTerm, selectedCategory])

  const totalRaised = philanthropyProjects.reduce((sum, p) => sum + p.raisedAmount, 0)
  const totalContributors = philanthropyProjects.reduce((sum, p) => sum + p.contributorCount, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-red-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header */}
      <div className="border-b bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          {/* Title Section */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Heart className="w-8 h-8 text-red-500" />
                <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                  {t('philanthropy')}
                </h1>
              </div>
              <p className="text-muted-foreground mt-2">
                {t('solidarity_subtitle')}
              </p>
            </div>
            <div className="text-right">
              <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950/30 dark:to-pink-950/30 rounded-lg p-4 border border-red-200/30 dark:border-red-800/30">
                <p className="text-sm text-muted-foreground mb-1">Total recaudado</p>
                <p className="text-2xl font-bold text-red-600">${(totalRaised / 1000).toFixed(0)}K</p>
                <p className="text-xs text-muted-foreground mt-2">{totalContributors.toLocaleString()} aportantes</p>
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
                  className="pl-10 bg-white/80 dark:bg-slate-800/80 border-red-200/50 dark:border-red-800/50 focus:border-red-500 focus:ring-red-500/20"
                />
              </div>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2">
              <Button
                onClick={() => setSelectedCategory("all")}
                variant={selectedCategory === "all" ? "default" : "outline"}
                className={selectedCategory === "all" ? "bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700" : "border-red-200/50 dark:border-red-800/50"}
                size="sm"
              >
                {t('all_categories')}
              </Button>
              {categories.map(cat => (
                <Button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  className={selectedCategory === cat ? "bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700" : "border-red-200/50 dark:border-red-800/50"}
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
            <Card key={project.id} className="group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-red-200 dark:hover:border-red-800 flex flex-col">
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
                  <Badge className="bg-red-500 text-white border-0">
                    {project.status === 'active' ? t('active') : t('completed')}
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
                <CardTitle className="text-lg group-hover:text-red-600 transition-colors line-clamp-2">
                  {project.name}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4 flex-grow">
                {/* Beneficiary */}
                <div className="bg-red-50/50 dark:bg-red-950/20 rounded-lg p-3 border border-red-200/30 dark:border-red-800/30">
                  <p className="text-xs text-muted-foreground mb-1">{t('beneficiary')}</p>
                  <p className="font-semibold text-sm text-red-600 dark:text-red-400">{project.beneficiary}</p>
                </div>

                {/* Goal Progress */}
                <div className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950 dark:to-pink-950 rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Target className="h-4 w-4 text-red-600" />
                    <span className="text-2xl font-extrabold text-red-600">
                      {Math.round((project.raisedAmount / project.goalAmount) * 100)}%
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    ${(project.raisedAmount / 1000).toFixed(0)}K de ${(project.goalAmount / 1000).toFixed(0)}K
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs">{t('contributors')}</p>
                    <p className="font-semibold flex items-center gap-1">
                      <Users className="h-3 w-3 text-red-600" />
                      {project.contributorCount.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">{t('average')}</p>
                    <p className="font-semibold text-red-600">${project.averageContribution.toFixed(2)}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-500 to-pink-500 transition-all duration-500"
                      style={{ width: `${Math.min((project.raisedAmount / project.goalAmount) * 100, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Info Badges */}
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs border-red-200/50 dark:border-red-800/50 text-red-600 dark:text-red-400">
                    {t('voluntary_contribution')}
                  </Badge>
                  <Badge variant="outline" className="text-xs border-red-200/50 dark:border-red-800/50 text-red-600 dark:text-red-400">
                    {t('blockchain_tracking')}
                  </Badge>
                </div>
              </CardContent>

              <CardFooter className="gap-2">
                <Button
                  className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700"
                  onClick={() => {
                    if (!isAuthenticated) {
                      setShowSignUpModal(true)
                    } else {
                      setSelectedProject(project)
                      setShowContributeDialog(true)
                    }
                  }}
                >
                  {t('contribute')}
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-red-200/50 dark:border-red-800/50"
                  onClick={() => {
                    setSelectedProject(project)
                    setShowDetailsDialog(true)
                  }}
                >
                  {t('view_details')}
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
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
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
                  <h3 className="font-semibold text-lg mb-2">{t('about_project')}</h3>
                  <p className="text-muted-foreground">{selectedProject.description_long}</p>
                </div>

                {/* Impact Description */}
                <div className="bg-red-50/50 dark:bg-red-950/20 rounded-lg p-4 border border-red-200/30 dark:border-red-800/30">
                  <h3 className="font-semibold mb-2 text-red-600 dark:text-red-400">{t('impact_description')}</h3>
                  <p className="text-sm text-muted-foreground">
                    Tu aporte contribuye directamente al logro de los objetivos de este proyecto. Cada donación se registra en blockchain para total transparencia.
                  </p>
                </div>

                {/* Project Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4">
                    <p className="text-xs text-muted-foreground mb-1">{t('beneficiary')}</p>
                    <p className="font-semibold text-red-600 dark:text-red-400">{selectedProject.beneficiary}</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4">
                    <p className="text-xs text-muted-foreground mb-1">{t('days_left')}</p>
                    <p className="font-semibold text-red-600 dark:text-red-400">{selectedProject.daysLeft} días</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4">
                    <p className="text-xs text-muted-foreground mb-1">{t('contributors')}</p>
                    <p className="font-semibold">{selectedProject.contributorCount.toLocaleString()}</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4">
                    <p className="text-xs text-muted-foreground mb-1">{t('average')}</p>
                    <p className="font-semibold">${selectedProject.averageContribution.toFixed(2)}</p>
                  </div>
                </div>

                {/* Progress Info */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-semibold">{t('progress')}</p>
                    <p className="text-sm font-bold text-red-600">
                      {Math.round((selectedProject.raisedAmount / selectedProject.goalAmount) * 100)}%
                    </p>
                  </div>
                  <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-500 to-pink-500"
                      style={{ width: `${Math.min((selectedProject.raisedAmount / selectedProject.goalAmount) * 100, 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    ${(selectedProject.raisedAmount / 1000).toFixed(0)}K de ${(selectedProject.goalAmount / 1000).toFixed(0)}K
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700"
                    onClick={() => {
                      if (!isAuthenticated) {
                        setShowSignUpModal(true)
                      } else {
                        setShowDetailsDialog(false)
                        setShowContributeDialog(true)
                      }
                    }}
                  >
                    {t('proceed_to_contribute')}
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

      {/* Contribution Dialog */}
      <Dialog open={showContributeDialog} onOpenChange={setShowContributeDialog}>
        <DialogContent className="max-w-md">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle>{t('contribute')} a {selectedProject.name}</DialogTitle>
                <DialogDescription>
                  {language === 'es' ? 'Ingresa el monto que deseas aportar' : 'Enter the amount you want to contribute'}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                {/* Project Quick Info */}
                <div className="bg-red-50/50 dark:bg-red-950/20 rounded-lg p-3 border border-red-200/30 dark:border-red-800/30">
                  <p className="text-xs text-muted-foreground mb-1">{t('beneficiary')}</p>
                  <p className="font-semibold text-sm text-red-600 dark:text-red-400">{selectedProject.beneficiary}</p>
                </div>

                {/* Amount Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {language === 'es' ? 'Monto (USD)' : 'Amount (USD)'}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10000"
                    value={contributionAmount}
                    onChange={(e) => {
                      setContributionAmount(e.target.value)
                      setContributionError("")
                    }}
                    placeholder={language === 'es' ? 'Ingresa un monto' : 'Enter amount'}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-md bg-white dark:bg-slate-900 focus:border-red-500 focus:ring-red-500/20 focus:ring-2 outline-none transition"
                  />
                </div>

                {/* Error Message */}
                {contributionError && (
                  <div className="bg-red-50 dark:bg-red-950/30 border border-red-200/50 dark:border-red-800/50 rounded-lg p-3 flex items-start gap-2">
                    <div className="text-red-600 dark:text-red-400 mt-0.5">!</div>
                    <p className="text-sm text-red-600 dark:text-red-400">{contributionError}</p>
                  </div>
                )}

                {/* Info */}
                <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-3 space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">{language === 'es' ? 'Token simbólico' : 'Symbolic token'}</span>
                    <span className="font-semibold">
                      {contributionAmount ? Math.floor(parseFloat(contributionAmount) / 10) : 0} {selectedProject.tokenName}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {language === 'es'
                      ? '1 token por cada USD 10 aportados'
                      : '1 token per USD 10 contributed'}
                  </div>
                </div>

                {/* Transparency Badges */}
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs border-red-200/50 dark:border-red-800/50 text-red-600 dark:text-red-400">
                    {t('voluntary_contribution')}
                  </Badge>
                  <Badge variant="outline" className="text-xs border-red-200/50 dark:border-red-800/50 text-red-600 dark:text-red-400">
                    {t('blockchain_tracking')}
                  </Badge>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4">
                  <Button
                    className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700"
                    onClick={() => {
                      if (!contributionAmount) {
                        setContributionError(language === 'es' ? 'Campo requerido' : 'Required field')
                        return
                      }
                      const amount = parseFloat(contributionAmount)
                      if (isNaN(amount) || amount < 1 || amount > 10000) {
                        setContributionError(
                          language === 'es'
                            ? 'El monto debe estar entre USD 1 y USD 10.000'
                            : 'Amount must be between USD 1 and USD 10,000'
                        )
                        return
                      }
                      // TODO: Implement actual contribution flow
                      setShowContributeDialog(false)
                      setContributionAmount("")
                    }}
                  >
                    {t('contribute')}
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setShowContributeDialog(false)
                      setContributionAmount("")
                      setContributionError("")
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
