import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Heart, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react'
import { useLanguage } from '@/lib/language'

const philanthropyProjects: Record<string, any> = {
  "1": {
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
    description_long: "El Club Atlético Juventud necesita reunir fondos para viajar a España y competir en la Copa Barcelona 2025. Con tu aporte voluntario, ayudarás a estos jóvenes atletas a cumplir su sueño de competir a nivel internacional.",
    tokenName: "Juventud 2025",
    daysLeft: 45,
    status: "active",
    fullDescription: "Los jóvenes deportistas del Club Atlético Juventud han trabajado durante meses para clasificar a la Copa Barcelona 2025. Este es un evento internacional de gran importancia para su desarrollo deportivo. Los fondos serán utilizados para cubrir pasajes aéreos, alojamiento, alimentación y gastos de inscripción en el torneo.",
    impact: "Tu aporte ayudará a 45 jóvenes atletas a viajar y competir internacionalmente, brindándoles una oportunidad de desarrollo deportivo sin precedentes."
  },
  "2": {
    id: "2",
    name: "Fundación Educativa - Becas Escolares 2025",
    description: "Programa de becas para estudiantes de bajos recursos",
    category: "Educación",
    image: "https://images.unsplash.com/photo-1427504494785-cdaa41d4d126?w=500&h=300&fit=crop",
    goalAmount: 50000,
    raisedAmount: 32000,
    contributorCount: 2100,
    averageContribution: 15,
    beneficiary: "Fundación Educativa",
    description_long: "Ayuda a estudiantes talentosos pero sin recursos a acceder a educación de calidad. Cada aporte contribuye a cambiar vidas.",
    tokenName: "Educación 2025",
    daysLeft: 60,
    status: "active",
    fullDescription: "Creemos que la educación es el camino hacia un futuro mejor. Esta iniciativa busca proporcionar becas completas a 100 estudiantes de excelencia académica pero con recursos económicos limitados.",
    impact: "Cada USD 500 patrocina un año completo de educación para un estudiante en situación vulnerable."
  },
  "3": {
    id: "3",
    name: "Casa Hogar - Refugio para Niños",
    description: "Mejoras y ampliación de instalaciones para 150 niños",
    category: "Bienestar Social",
    image: "https://images.unsplash.com/photo-1469571486292-31ba42216767?w=500&h=300&fit=crop",
    goalAmount: 75000,
    raisedAmount: 58000,
    contributorCount: 3500,
    averageContribution: 16.57,
    beneficiary: "Casa Hogar Infantil",
    description_long: "Buscamos mejorar las instalaciones y servicios para los niños bajo nuestro cuidado. Tu donación directa llega al beneficiario.",
    tokenName: "Hogar Solidario 2025",
    daysLeft: 30,
    status: "active",
    fullDescription: "Casa Hogar alberga a 150 niños en situación vulnerable. Los fondos se utilizarán para mejorar dormitorios, instalar agua caliente, renovar cocina y crear áreas de estudio.",
    impact: "Tu aporte mejora directamente las condiciones de vida de niños en situación vulnerable."
  },
  "4": {
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
    status: "active",
    fullDescription: "Plantaremos 50.000 árboles nativos en zonas deforestadas de la Amazonía. Cada árbol será rastreado y documentado en blockchain para garantizar transparencia total.",
    impact: "USD 2 planta un árbol que ayuda a combatir el cambio climático."
  },
  "5": {
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
    status: "active",
    fullDescription: "Operamos una clínica móvil que atiende a comunidades rurales sin acceso a servicios médicos. Los fondos se utilizan para medicamentos, equipos médicos y salarios de profesionales.",
    impact: "USD 10 proporciona atención médica completa a una familia rural."
  }
}

const labels = {
  es: {
    contribute_to: "Contribuir a",
    contribution_amount: "Monto de aporte",
    minimum: "Mínimo USD 1",
    maximum: "Máximo USD 1.000",
    tokens_you_will_receive: "Tokens que recibirás",
    payment_method: "Método de pago",
    select_method: "Selecciona un método de pago",
    bank_transfer: "Transferencia Bancaria",
    mercadopago: "MercadoPago",
    crypto_transfer: "Transferencia Cripto",
    next: "Siguiente",
    back: "Volver",
    make_contribution: "Realizar aporte",
    contribution_summary: "Resumen del aporte",
    beneficiary: "Beneficiario",
    about_project: "Sobre el proyecto",
    project_impact: "Impacto de tu aporte",
    your_impact: "Tu impacto",
    transparency_info: "Información de transparencia",
    blockchain_tracking: "Rastreo en Blockchain",
    solidarity_token: "Token Solidario",
    voluntary: "Aporte Voluntario",
    no_return: "Sin retorno financiero",
    contribution_success: "¡Aporte registrado exitosamente!",
    token_sent: "Tu token solidario ha sido enviado a tu billetera.",
    thank_you: "¡Gracias por cambiar vidas!",
    view_blockchain: "Ver en Blockchain",
    continue_exploring: "Continuar explorando",
    error_message: "Hubo un error procesando tu aporte. Por favor intenta nuevamente.",
    required_field: "Este campo es requerido",
    invalid_amount: "El monto debe estar entre USD 1 y USD 1.000",
  },
  en: {
    contribute_to: "Contribute to",
    contribution_amount: "Contribution amount",
    minimum: "Minimum USD 1",
    maximum: "Maximum USD 1,000",
    tokens_you_will_receive: "Tokens you will receive",
    payment_method: "Payment method",
    select_method: "Select a payment method",
    bank_transfer: "Bank Transfer",
    mercadopago: "MercadoPago",
    crypto_transfer: "Crypto Transfer",
    next: "Next",
    back: "Back",
    make_contribution: "Make contribution",
    contribution_summary: "Contribution summary",
    beneficiary: "Beneficiary",
    about_project: "About the project",
    project_impact: "Impact of your contribution",
    your_impact: "Your impact",
    transparency_info: "Transparency information",
    blockchain_tracking: "Blockchain tracking",
    solidarity_token: "Solidarity Token",
    voluntary: "Voluntary Contribution",
    no_return: "No financial return",
    contribution_success: "Contribution registered successfully!",
    token_sent: "Your solidarity token has been sent to your wallet.",
    thank_you: "Thank you for changing lives!",
    view_blockchain: "View on Blockchain",
    continue_exploring: "Continue exploring",
    error_message: "There was an error processing your contribution. Please try again.",
    required_field: "This field is required",
    invalid_amount: "Amount must be between USD 1 and USD 1,000",
  }
}

export default function ContributePhilanthropyPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { language } = useLanguage()

  const projectId = searchParams.get('project') || '1'
  const project = philanthropyProjects[projectId]

  const [step, setStep] = useState<'amount' | 'payment' | 'success'>('amount')
  const [amount, setAmount] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [error, setError] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  const t = (key: string) => {
    return labels[language as keyof typeof labels][key as keyof typeof labels.es] || key
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setAmount(value)
    setError('')
  }

  const validateAmount = () => {
    if (!amount) {
      setError(t('required_field'))
      return false
    }
    const numAmount = parseFloat(amount)
    if (isNaN(numAmount) || numAmount < 1 || numAmount > 1000) {
      setError(t('invalid_amount'))
      return false
    }
    return true
  }

  const handleNext = () => {
    if (validateAmount()) {
      setStep('payment')
    }
  }

  const handlePayment = async () => {
    if (!paymentMethod) {
      setError(t('required_field'))
      return
    }

    setIsProcessing(true)
    setError('')

    // Simular procesamiento
    setTimeout(() => {
      setIsProcessing(false)
      setStep('success')
    }, 2000)
  }

  const tokensToReceive = amount ? Math.floor(parseFloat(amount) / 10) : 0

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-red-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground mb-4">Proyecto no encontrado</p>
            <Button onClick={() => navigate('/filantropy')}>Volver a proyectos</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-red-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header */}
      <div className="border-b bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => navigate('/filantropy')}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('back')}
          </button>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Heart className="w-6 h-6 text-red-500" />
            {t('contribute_to')}
          </h1>
          <p className="text-muted-foreground">{project.name}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Project Info */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 border-2 border-red-200/30 dark:border-red-800/30">
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="pt-4 space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Meta</p>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-2xl font-bold text-red-600">${(project.raisedAmount / 1000).toFixed(0)}K</p>
                    <p className="text-sm text-muted-foreground">de ${(project.goalAmount / 1000).toFixed(0)}K</p>
                  </div>
                  <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-500 to-pink-500"
                      style={{ width: `${Math.min((project.raisedAmount / project.goalAmount) * 100, 100)}%` }}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Beneficiario</p>
                    <p className="font-semibold text-sm">{project.beneficiary}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Aportantes</p>
                    <p className="font-semibold text-sm">{project.contributorCount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Días restantes</p>
                    <p className="font-semibold text-sm">{project.daysLeft} días</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                  <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase">{t('transparency_info')}</p>
                  <div className="space-y-2">
                    <Badge variant="outline" className="text-xs border-red-200/50 dark:border-red-800/50 w-full justify-start">
                      <CheckCircle2 className="w-3 h-3 mr-1 text-red-600" />
                      {t('blockchain_tracking')}
                    </Badge>
                    <Badge variant="outline" className="text-xs border-red-200/50 dark:border-red-800/50 w-full justify-start">
                      <CheckCircle2 className="w-3 h-3 mr-1 text-red-600" />
                      {t('voluntary')}
                    </Badge>
                    <Badge variant="outline" className="text-xs border-red-200/50 dark:border-red-800/50 w-full justify-start">
                      <CheckCircle2 className="w-3 h-3 mr-1 text-red-600" />
                      {t('no_return')}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            {step === 'amount' && (
              <Card className="border-2 border-red-200/30 dark:border-red-800/30">
                <CardHeader>
                  <CardTitle>{t('contribution_amount')}</CardTitle>
                  <CardDescription>{t('minimum')} | {t('maximum')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="amount" className="mb-2 block">Monto USD</Label>
                    <Input
                      id="amount"
                      type="number"
                      min="1"
                      max="1000"
                      step="1"
                      placeholder="Ingresa el monto"
                      value={amount}
                      onChange={handleAmountChange}
                      className="text-lg"
                    />
                    {error && (
                      <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {error}
                      </p>
                    )}
                  </div>

                  {amount && (
                    <div className="bg-gradient-to-r from-red-50/50 to-pink-50/50 dark:from-red-950/20 dark:to-pink-950/20 rounded-lg p-4 border border-red-200/30 dark:border-red-800/30">
                      <p className="text-sm text-muted-foreground mb-3">{t('tokens_you_will_receive')}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">{project.tokenName}</span>
                          <span className="text-lg font-bold text-red-600">{tokensToReceive}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {tokensToReceive} {project.tokenName} = {tokensToReceive * 10} USD de valor simbólico
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="bg-blue-50/50 dark:bg-blue-950/20 rounded-lg p-4 border border-blue-200/30 dark:border-blue-800/30">
                    <p className="text-sm text-muted-foreground">
                      <strong>Recordatorio:</strong> Este es un aporte voluntario sin retorno financiero. El token es un certificado digital para reconocimiento y rastrabilidad.
                    </p>
                  </div>

                  <div className="pt-4">
                    <h3 className="font-semibold mb-3">{t('project_impact')}</h3>
                    <p className="text-sm text-muted-foreground">{project.impact}</p>
                  </div>
                </CardContent>
                <CardFooter className="gap-2">
                  <Button
                    variant="outline"
                    onClick={() => navigate('/filantropy')}
                    className="flex-1"
                  >
                    {t('back')}
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={!amount}
                    className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700"
                  >
                    {t('next')}
                  </Button>
                </CardFooter>
              </Card>
            )}

            {step === 'payment' && (
              <Card className="border-2 border-red-200/30 dark:border-red-800/30">
                <CardHeader>
                  <CardTitle>{t('payment_method')}</CardTitle>
                  <CardDescription>{t('select_method')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {error && (
                    <div className="bg-red-50 dark:bg-red-950/20 rounded-lg p-4 border border-red-200 dark:border-red-800 flex gap-2">
                      <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                      <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
                    </div>
                  )}

                  <div className="space-y-3">
                    {[
                      { id: 'bank', label: t('bank_transfer'), description: 'Transferencia bancaria directa' },
                      { id: 'mercadopago', label: t('mercadopago'), description: 'Pago seguro con MercadoPago' },
                      { id: 'crypto', label: t('crypto_transfer'), description: 'USDT o USDC en blockchain' }
                    ].map(method => (
                      <label key={method.id} className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all"
                        style={{
                          borderColor: paymentMethod === method.id ? 'rgb(220, 38, 38)' : 'currentColor',
                          backgroundColor: paymentMethod === method.id ? 'rgba(220, 38, 38, 0.05)' : 'transparent'
                        }}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={method.id}
                          checked={paymentMethod === method.id}
                          onChange={(e) => {
                            setPaymentMethod(e.target.value)
                            setError('')
                          }}
                          className="mr-3"
                        />
                        <div>
                          <p className="font-semibold text-sm">{method.label}</p>
                          <p className="text-xs text-muted-foreground">{method.description}</p>
                        </div>
                      </label>
                    ))}
                  </div>

                  <div className="bg-gradient-to-r from-red-50/50 to-pink-50/50 dark:from-red-950/20 dark:to-pink-950/20 rounded-lg p-4 border border-red-200/30 dark:border-red-800/30">
                    <p className="text-sm font-semibold mb-2">Resumen</p>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Monto:</span>
                        <span className="font-semibold">${parseFloat(amount).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tokens:</span>
                        <span className="font-semibold">{tokensToReceive} {project.tokenName}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setStep('amount')}
                    className="flex-1"
                  >
                    {t('back')}
                  </Button>
                  <Button
                    onClick={handlePayment}
                    disabled={!paymentMethod || isProcessing}
                    className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700"
                  >
                    {isProcessing ? 'Procesando...' : t('make_contribution')}
                  </Button>
                </CardFooter>
              </Card>
            )}

            {step === 'success' && (
              <Card className="border-2 border-green-200/30 dark:border-green-800/30">
                <CardContent className="pt-12 pb-12 text-center space-y-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-950 dark:to-emerald-950 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-2">{t('contribution_success')}</h2>
                    <p className="text-muted-foreground">{t('thank_you')}</p>
                  </div>

                  <div className="bg-gradient-to-r from-green-50/50 to-emerald-50/50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg p-4 border border-green-200/30 dark:border-green-800/30 space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Aporte realizado</p>
                      <p className="text-2xl font-bold text-green-600">${parseFloat(amount).toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">{t('tokens_you_will_receive')}</p>
                      <p className="text-lg font-semibold">{tokensToReceive} {project.tokenName}</p>
                    </div>
                    <div className="pt-3 border-t border-green-200/30 dark:border-green-800/30">
                      <p className="text-xs text-muted-foreground mb-1">ID de transacción</p>
                      <p className="font-mono text-xs text-green-600">0x{Math.random().toString(16).slice(2, 10).toUpperCase()}</p>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate('/filantropy')}
                  >
                    {t('continue_exploring')}
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
