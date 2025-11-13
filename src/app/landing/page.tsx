import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { useLanguage } from '@/lib/language';
import { HeroParallaxDemo } from '@/components/ui/hero-parallax-demo';
import { ShaderBackground } from '@/components/ui/hero-shader';
import { Navbar } from '@/components/ui/navbar';
import { Users2, TrendingUp, Rocket } from 'lucide-react';

const LandingPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleDemoLogin = () => {
    login();
    navigate('/');
  };

  return (
    <main className="flex flex-col w-full relative">
      {/* Hero Section with Shader Background */}
      <ShaderBackground>
        {/* Navigation Bar - Inside Hero */}
        <Navbar />

        <div className="relative w-full flex flex-col flex-1 items-center justify-center px-3 xs:px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 xs:py-10 sm:py-12 md:py-16 lg:py-20">
          {/* Content Container */}
          <div className="w-full max-w-7xl flex items-center justify-center">
            {/* Main Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center w-full">
              {/* Left Side - Text Content */}
              <div className="order-2 lg:order-1 z-10">
                {/* Animated Badge */}
                <div className="inline-flex items-center gap-1.5 xs:gap-2 px-3 xs:px-4 py-1.5 xs:py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-4 xs:mb-6 sm:mb-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  style={{
                    filter: "url(#glass-effect)",
                  }}
                >
                  <span className="text-cyan-400 animate-pulse text-sm">●</span>
                  <span className="text-white/90 text-xs xs:text-sm font-medium">{t('landing_beta_badge') || 'Lanzamiento beta abierto'}</span>
                </div>

                {/* Main Heading */}
                <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight text-white mb-3 xs:mb-4 sm:mb-6 font-bold">
                  {t('landing_hero_title') || 'Inversión tokenizada con seguridad y transparencia'}
                </h1>

                {/* Divider Line */}
                <div className="w-10 xs:w-12 h-0.5 xs:h-1 bg-gradient-to-r from-cyan-500 to-transparent mb-4 xs:mb-6"></div>

                {/* Description */}
                <p className="text-xs xs:text-sm sm:text-base md:text-lg font-light text-white/80 mb-6 xs:mb-8 sm:mb-10 leading-relaxed max-w-xl">
                  {t('landing_hero_desc') || 'Investoken te ayuda a diversificar tu portafolio con activos tokenizados. Costos bajos, liquidez, y control total.'}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2.5 xs:gap-3 sm:gap-4 mb-8 xs:mb-10 sm:mb-12 w-full xs:w-auto">
                  <Button
                    onClick={handleDemoLogin}
                    className="px-4 xs:px-6 sm:px-8 py-2.5 xs:py-3 sm:py-4 rounded-full bg-white text-black font-semibold text-xs xs:text-sm sm:text-base transition-all duration-300 hover:bg-white/90 hover:shadow-2xl hover:shadow-white/20 active:scale-95"
                  >
                    {t('landing_demo_login') || 'Demo Login'}
                  </Button>
                  <Button
                    asChild
                    className="px-4 xs:px-6 sm:px-8 py-2.5 xs:py-3 sm:py-4 rounded-full bg-transparent border-2 border-white/40 text-white font-semibold text-xs xs:text-sm sm:text-base transition-all duration-300 hover:bg-white/10 hover:border-white/60 hover:shadow-lg hover:shadow-white/10"
                  >
                    <Link to="/market">
                      {t('landing_explore_market') || 'Explorar mercado'}
                    </Link>
                  </Button>
                </div>

                {/* Trust indicators */}
                <div className="flex flex-col xs:flex-row xs:items-center gap-2.5 xs:gap-3 sm:gap-4 text-xs xs:text-sm text-white/70">
                  <div className="flex items-center gap-1.5 xs:gap-2">
                    <svg className="w-4 xs:w-5 h-4 xs:h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{t('landing_no_hidden_costs') || 'Sin costos ocultos'}</span>
                  </div>
                  <div className="hidden xs:flex items-center gap-1.5 xs:gap-2">
                    <svg className="w-4 xs:w-5 h-4 xs:h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Auditorías certificadas</span>
                  </div>
                </div>
              </div>

              {/* Right Side - Feature Cards */}
              <div className="order-1 lg:order-2 hidden lg:block">
                {/* Glow Effects */}
                <div className="absolute -top-20 -right-20 sm:-top-32 sm:-right-32 w-48 sm:w-96 h-48 sm:h-96 bg-cyan-500/10 rounded-full blur-2xl sm:blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 -right-24 sm:-right-48 w-48 sm:w-96 h-48 sm:h-96 bg-pink-500/5 rounded-full blur-2xl sm:blur-3xl pointer-events-none"></div>

                {/* Cards Stacked Layout */}
                <div className="space-y-3 sm:space-y-4 lg:space-y-6 relative z-10">
                  {/* Card 1 - P2P Trading */}
                  <div className="group cursor-pointer transform transition-all duration-500 hover:-translate-y-2 hover:scale-105">
                    <div className="p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl lg:rounded-3xl bg-gradient-to-br from-slate-900/80 to-slate-800/50 border border-cyan-500/30 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:shadow-cyan-500/20 hover:border-cyan-500/60 transition-all duration-500">
                      <div className="flex items-start gap-2 sm:gap-3 lg:gap-4">
                        <div className="w-10 sm:w-12 lg:w-14 h-10 sm:h-12 lg:h-14 rounded-lg sm:rounded-2xl bg-gradient-to-br from-cyan-500/30 to-cyan-600/10 flex items-center justify-center group-hover:from-cyan-500/50 transition-all duration-300 flex-shrink-0">
                          <Users2 className="w-5 sm:w-6 lg:w-7 h-5 sm:h-6 lg:h-7 text-cyan-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm sm:text-lg lg:text-xl font-bold text-white mb-0.5 sm:mb-1">P2P Trading</h3>
                          <p className="text-xs text-cyan-400/80 font-medium mb-1 sm:mb-2">Disponible</p>
                          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">Intercambia tokens directamente entre usuarios sin intermediarios</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 2 - Marketplace */}
                  <div className="group cursor-pointer transform transition-all duration-500 hover:-translate-y-2 hover:scale-105 lg:ml-8">
                    <div className="p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl lg:rounded-3xl bg-gradient-to-br from-slate-900/80 to-slate-800/50 border border-orange-500/30 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:shadow-orange-500/20 hover:border-orange-500/60 transition-all duration-500">
                      <div className="flex items-start gap-2 sm:gap-3 lg:gap-4">
                        <div className="w-10 sm:w-12 lg:w-14 h-10 sm:h-12 lg:h-14 rounded-lg sm:rounded-2xl bg-gradient-to-br from-orange-500/30 to-orange-600/10 flex items-center justify-center group-hover:from-orange-500/50 transition-all duration-300 flex-shrink-0">
                          <TrendingUp className="w-5 sm:w-6 lg:w-7 h-5 sm:h-6 lg:h-7 text-orange-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm sm:text-lg lg:text-xl font-bold text-white mb-0.5 sm:mb-1">Marketplace</h3>
                          <p className="text-xs text-orange-400/80 font-medium mb-1 sm:mb-2">Tiempo real</p>
                          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">Descubre y invierte en oportunidades premium curadas especialmente</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 3 - Tokenizar */}
                  <div className="group cursor-pointer transform transition-all duration-500 hover:-translate-y-2 hover:scale-105 lg:ml-16">
                    <div className="p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl lg:rounded-3xl bg-gradient-to-br from-slate-900/80 to-slate-800/50 border border-pink-500/30 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:shadow-pink-500/20 hover:border-pink-500/60 transition-all duration-500">
                      <div className="flex items-start gap-2 sm:gap-3 lg:gap-4">
                        <div className="w-10 sm:w-12 lg:w-14 h-10 sm:h-12 lg:h-14 rounded-lg sm:rounded-2xl bg-gradient-to-br from-pink-500/30 to-pink-600/10 flex items-center justify-center group-hover:from-pink-500/50 transition-all duration-300 flex-shrink-0">
                          <Rocket className="w-5 sm:w-6 lg:w-7 h-5 sm:h-6 lg:h-7 text-pink-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm sm:text-lg lg:text-xl font-bold text-white mb-0.5 sm:mb-1">Tokenizar</h3>
                          <p className="text-xs text-pink-400/80 font-medium mb-1 sm:mb-2">Para creadores</p>
                          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">Transforma tu idea en activos tokenizados y accede a capital global</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ShaderBackground>

      {/* Parallax Projects Section */}
      <section className="w-full py-0 px-0 bg-muted/20" aria-label="Oportunidades de inversión">
        <HeroParallaxDemo />
      </section>

      {/* Trust Section - moved earlier for credibility */}
      <section id="trust" className="py-20 w-full px-0 bg-gradient-to-b from-background to-muted/30" aria-label="Confianza y cumplimiento">
        <div className="max-w-6xl mx-auto px-4">
          <Card className="border-2">
            <CardContent className="pt-12 pb-12">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{t('landing_trust_title')}</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  {t('landing_trust_desc')}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center text-center">
                  <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{t('landing_custody_title')}</h3>
                  <p className="text-sm text-muted-foreground">{t('landing_custody_desc')}</p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{t('landing_kyc_title')}</h3>
                  <p className="text-sm text-muted-foreground">{t('landing_kyc_desc')}</p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{t('landing_support_title')}</h3>
                  <p className="text-sm text-muted-foreground">{t('landing_support_desc')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 w-full px-0" aria-label="Características principales">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{t('landing_why_choose')}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('landing_why_desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
              <CardHeader className="text-center pb-4">
                <div className="mb-4 inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary/10 mx-auto">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <CardTitle className="text-2xl">{t('landing_security_title')}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base leading-relaxed">
                  {t('landing_security_desc')}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
              <CardHeader className="text-center pb-4">
                <div className="mb-4 inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary/10 mx-auto">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <CardTitle className="text-2xl">{t('landing_performance_title')}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base leading-relaxed">
                  {t('landing_performance_desc')}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
              <CardHeader className="text-center pb-4">
                <div className="mb-4 inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary/10 mx-auto">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <CardTitle className="text-2xl">{t('landing_experience_title')}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base leading-relaxed">
                  {t('landing_experience_desc')}
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>


      {/* SEO Content Section */}
      <section className="py-16 w-full px-0" aria-label="Inversión tokenizada SEO">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">{t('landing_tokenized_assets')}</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('landing_tokenized_assets_desc')}
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 w-full px-0" aria-label="Preguntas frecuentes">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold tracking-tight mb-4">{t('landing_faq_title')}</h2>
            <p className="text-lg text-muted-foreground">{t('landing_faq_desc')}</p>
          </div>

          <div className="space-y-4">
            <Card className="overflow-hidden hover:shadow-md transition-shadow">
              <details className="group">
                <summary className="flex items-center justify-between p-6 font-semibold cursor-pointer list-none">
                  <span className="text-lg">{t('landing_faq_q1')}</span>
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <CardContent className="pt-0 pb-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {t('landing_faq_a1')}
                  </p>
                </CardContent>
              </details>
            </Card>

            <Card className="overflow-hidden hover:shadow-md transition-shadow">
              <details className="group">
                <summary className="flex items-center justify-between p-6 font-semibold cursor-pointer list-none">
                  <span className="text-lg">{t('landing_faq_q2')}</span>
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <CardContent className="pt-0 pb-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {t('landing_faq_a2')}
                  </p>
                </CardContent>
              </details>
            </Card>

            <Card className="overflow-hidden hover:shadow-md transition-shadow">
              <details className="group">
                <summary className="flex items-center justify-between p-6 font-semibold cursor-pointer list-none">
                  <span className="text-lg">{t('landing_faq_q3')}</span>
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <CardContent className="pt-0 pb-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {t('landing_faq_a3')}
                  </p>
                </CardContent>
              </details>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 w-full px-0" aria-label="Llamado a la acción final">
        <div className="max-w-5xl mx-auto px-4">
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background">
            <CardContent className="pt-16 pb-16 text-center">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">{t('landing_cta_title')}</h2>
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                {t('landing_cta_desc')}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button onClick={handleDemoLogin} size="lg" className="text-lg px-12 py-7 h-auto shadow-lg hover:shadow-xl">
                  {t('landing_demo_login')}
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-12 py-7 h-auto border-2">
                  <Link to="/analytics" aria-label={t('landing_view_analytics')}>
                    {t('landing_view_analytics')}
                  </Link>
                </Button>
              </div>
              <p className="mt-8 text-sm text-muted-foreground">
                {t('landing_join_investors')}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
