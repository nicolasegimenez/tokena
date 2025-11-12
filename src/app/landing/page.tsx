import React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { ModeToggle } from '@/components/mode-toggle';
import { useLanguage } from '@/lib/language';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "es" ? "en" : "es");
  };

  return (
    <Button variant="ghost" size="sm" onClick={toggleLanguage} className="h-8 rounded-md gap-1.5 px-3">
      {language.toUpperCase()}
    </Button>
  );
};

const LandingPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleDemoLogin = () => {
    login();
    navigate('/');
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 relative">
      {/* Theme Toggle & Language Switcher */}
      <div className="absolute top-6 right-6 z-10 flex items-center gap-2">
        <LanguageSwitcher />
        <ModeToggle />
      </div>

      {/* Hero Section */}
      <section className="py-24 w-full max-w-6xl text-center" aria-label="Hero">
        <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium">
          <span className="inline-block h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse" aria-hidden="true" />
          Lanzamiento beta abierto — accedé hoy
        </Badge>
        
        <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight mb-8 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Inversión tokenizada con seguridad y transparencia
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
          Investoken te ayuda a diversificar tu portafolio con activos tokenizados. Costos bajos, liquidez, y control total.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Button onClick={handleDemoLogin} size="lg" className="text-lg px-10 py-6 h-auto shadow-lg hover:shadow-xl transition-shadow">
            Demo Login
          </Button>
          <Button asChild variant="outline" size="lg" className="text-lg px-10 py-6 h-auto border-2">
            <Link to="/market" aria-label="Explorar el marketplace de activos tokenizados">
              Explorar mercado
            </Link>
          </Button>
        </div>
        
        <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Sin costos ocultos. Cumplimiento y auditorías periódicas.
        </p>
      </section>

      {/* Stats Section */}
      <section className="w-full max-w-6xl py-12" aria-label="Métricas clave">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="pt-6 pb-6">
              <p className="text-4xl font-bold bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent">$25M+</p>
              <p className="text-sm text-muted-foreground mt-2">Volumen operado</p>
            </CardContent>
          </Card>
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="pt-6 pb-6">
              <p className="text-4xl font-bold bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent">10k+</p>
              <p className="text-sm text-muted-foreground mt-2">Inversores registrados</p>
            </CardContent>
          </Card>
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="pt-6 pb-6">
              <p className="text-4xl font-bold bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent">98%</p>
              <p className="text-sm text-muted-foreground mt-2">Satisfacción de usuarios</p>
            </CardContent>
          </Card>
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="pt-6 pb-6">
              <p className="text-4xl font-bold bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent">24/7</p>
              <p className="text-sm text-muted-foreground mt-2">Monitoreo y soporte</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 w-full max-w-6xl text-center" aria-label="Características principales">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">¿Por qué elegir Investoken?</h2>
        <p className="text-lg text-muted-foreground mb-16 max-w-2xl mx-auto">
          Plataforma diseñada para inversores que buscan transparencia, seguridad y control total sobre sus activos
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
            <CardHeader className="text-center pb-4">
              <div className="mb-4 inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary/10 text-4xl mx-auto">
                🔒
              </div>
              <CardTitle className="text-2xl">Seguridad garantizada</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-base leading-relaxed">
                Tecnología blockchain para registrar cada operación con trazabilidad completa. Cumplimos criterios de la UIF, pertenecemos a la Cámara Argentina de Fintech y seguimos normas de seguridad estrictas.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
            <CardHeader className="text-center pb-4">
              <div className="mb-4 inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary/10 text-4xl mx-auto">
                ⚡
              </div>
              <CardTitle className="text-2xl">Rendimiento y liquidez</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-base leading-relaxed">
                Acceso a oportunidades con mejor relación riesgo/retorno. Posibilidad de entrada y salida cuando lo necesites con mercado secundario activo.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
            <CardHeader className="text-center pb-4">
              <div className="mb-4 inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary/10 text-4xl mx-auto">
                🧭
              </div>
              <CardTitle className="text-2xl">Experiencia simple</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-base leading-relaxed">
                Interfaz intuitiva y moderna con soporte en español. Crea, gestiona y monitorea tu portafolio completo sin ningún tipo de fricción.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 w-full max-w-6xl text-center" aria-label="Testimonios de clientes">
        <h2 className="text-4xl font-bold tracking-tight mb-4">Lo que dicen nuestros usuarios</h2>
        <p className="text-lg text-muted-foreground mb-12">Miles de inversores confían en Investoken para gestionar sus activos</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-left hover:shadow-lg transition-shadow">
            <CardContent className="pt-8 pb-6">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-base text-muted-foreground mb-4 leading-relaxed">
                "Pude diversificar con tickets bajos y seguimiento en tiempo real. El retiro fue simple y transparente."
              </p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold">LP</div>
                <div>
                  <p className="font-semibold text-sm">Lucía Pérez</p>
                  <p className="text-xs text-muted-foreground">Buenos Aires</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="text-left hover:shadow-lg transition-shadow">
            <CardContent className="pt-8 pb-6">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-base text-muted-foreground mb-4 leading-relaxed">
                "Las métricas y reportes me ayudaron a ajustar mi estrategia de inversión sin complicaciones."
              </p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold">MR</div>
                <div>
                  <p className="font-semibold text-sm">Martín Rodríguez</p>
                  <p className="text-xs text-muted-foreground">Córdoba</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="text-left hover:shadow-lg transition-shadow">
            <CardContent className="pt-8 pb-6">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-base text-muted-foreground mb-4 leading-relaxed">
                "Me gustó la transparencia y el soporte 24/7. Todo quedó claro desde el primer momento."
              </p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold">AG</div>
                <div>
                  <p className="font-semibold text-sm">Ana González</p>
                  <p className="text-xs text-muted-foreground">Mendoza</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 w-full max-w-6xl" aria-label="Confianza y cumplimiento">
        <Card className="border-2">
          <CardContent className="pt-12 pb-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Confianza que se construye</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Diseñado con prácticas de seguridad líderes, verificación de identidad y monitoreo continuo para proteger tu inversión
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">Custodia segura</h3>
                <p className="text-sm text-muted-foreground">Protección de activos con tecnología blockchain</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">KYC/AML verificado</h3>
                <p className="text-sm text-muted-foreground">Cumplimiento y auditorías regulares</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">Soporte 24/7</h3>
                <p className="text-sm text-muted-foreground">Asistencia dedicada cuando la necesites</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* SEO Content Section */}
      <section className="py-16 w-full max-w-6xl text-center" aria-label="Inversión tokenizada SEO">
        <h2 className="text-3xl font-bold tracking-tight mb-4">Activos tokenizados para diversificar tu portafolio</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Invertí en activos tokenizados, proyectos de real estate, energía y fintech. Análisis en tiempo real, reportes y herramientas de trading para decisiones informadas.
        </p>
      </section>

      {/* FAQ Section */}
      <section className="py-20 w-full max-w-4xl" aria-label="Preguntas frecuentes">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight mb-4">Preguntas frecuentes</h2>
          <p className="text-lg text-muted-foreground">Resolvemos tus dudas sobre inversión tokenizada</p>
        </div>
        
        <div className="space-y-4">
          <Card className="overflow-hidden hover:shadow-md transition-shadow">
            <details className="group">
              <summary className="flex items-center justify-between p-6 font-semibold cursor-pointer list-none">
                <span className="text-lg">¿Qué es la inversión tokenizada?</span>
                <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <CardContent className="pt-0 pb-6">
                <p className="text-muted-foreground leading-relaxed">
                  Es la representación digital de activos mediante tokens blockchain para facilitar el acceso, fraccionamiento y liquidez. Permite invertir en activos que tradicionalmente requerían grandes capitales.
                </p>
              </CardContent>
            </details>
          </Card>
          
          <Card className="overflow-hidden hover:shadow-md transition-shadow">
            <details className="group">
              <summary className="flex items-center justify-between p-6 font-semibold cursor-pointer list-none">
                <span className="text-lg">¿Cómo empiezo a invertir?</span>
                <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <CardContent className="pt-0 pb-6">
                <p className="text-muted-foreground leading-relaxed">
                  Crea tu cuenta en minutos, completa la verificación de identidad (KYC) y explora las oportunidades de inversión disponibles en el mercado. Nuestro equipo te guiará en cada paso.
                </p>
              </CardContent>
            </details>
          </Card>
          
          <Card className="overflow-hidden hover:shadow-md transition-shadow">
            <details className="group">
              <summary className="flex items-center justify-between p-6 font-semibold cursor-pointer list-none">
                <span className="text-lg">¿Puedo retirar mi inversión cuando quiera?</span>
                <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <CardContent className="pt-0 pb-6">
                <p className="text-muted-foreground leading-relaxed">
                  Depende del activo específico. Muchos ofrecen ventanas de liquidez programadas o acceso al mercado secundario donde puedes vender tus tokens a otros inversores.
                </p>
              </CardContent>
            </details>
          </Card>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 w-full max-w-5xl" aria-label="Llamado a la acción final">
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background">
          <CardContent className="pt-16 pb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Empezá hoy con Investoken</h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Probá la plataforma gratis y descubre cómo simplificar tu inversión en activos tokenizados
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button onClick={handleDemoLogin} size="lg" className="text-lg px-12 py-7 h-auto shadow-lg hover:shadow-xl">
                Demo Login
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-12 py-7 h-auto border-2">
                <Link to="/analytics" aria-label="Ver analíticas de la plataforma">
                  Ver analíticas
                </Link>
              </Button>
            </div>
            <p className="mt-8 text-sm text-muted-foreground">
              Únete a más de 10,000 inversores que confían en Investoken
            </p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default LandingPage;
