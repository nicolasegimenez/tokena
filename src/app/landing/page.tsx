import React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { ModeToggle } from '@/components/mode-toggle';
import { useLanguage } from '@/lib/language';
import { HeroParallaxDemo } from '@/components/ui/hero-parallax-demo';
import { ShaderBackground } from '@/components/ui/hero-shader';
import { AuthenticatedFeaturesCards } from '@/components/ui/authenticated-features-cards';
import { MetricsKeyCards } from '@/components/ui/metrics-key-cards';

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
  const { t, language } = useLanguage();

  const handleDemoLogin = () => {
    login();
    navigate('/');
  };

  return (
    <main className="flex flex-col w-full relative">

      {/* Hero Section with Shader Background */}
      <ShaderBackground>
        <main className="absolute bottom-12 left-8 z-20 max-w-lg md:bottom-16 md:left-12 pt-20">
          <div className="text-left">
            {/* Badge */}
            <div
              className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm mb-4"
              style={{
                filter: "url(#glass-effect)",
              }}
            >
              <span className="text-white/90 text-xs font-light">✨ {t('landing_beta_badge') || 'Lanzamiento beta abierto'}</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl leading-tight tracking-tight text-white mb-4 font-bold">
              {t('landing_hero_title') || 'Inversión tokenizada con seguridad y transparencia'}
            </h1>

            {/* Description */}
            <p className="text-xs md:text-sm font-light text-white/70 mb-6 leading-relaxed max-w-md">
              {t('landing_hero_desc') || 'Investoken te ayuda a diversificar tu portafolio con activos tokenizados. Costos bajos, liquidez, y control total.'}
            </p>

            {/* Buttons */}
            <div className="flex items-center gap-4 flex-wrap">
              <Button
                onClick={handleDemoLogin}
                className="px-6 py-2 rounded-full bg-white text-black font-normal text-xs transition-all duration-200 hover:bg-white/90"
              >
                {t('landing_demo_login') || 'Demo Login'}
              </Button>
              <Button
                asChild
                className="px-6 py-2 rounded-full bg-transparent border border-white/30 text-white font-normal text-xs transition-all duration-200 hover:bg-white/10 hover:border-white/50"
              >
                <Link to="/market">
                  {t('landing_explore_market') || 'Explorar mercado'}
                </Link>
              </Button>
            </div>

            {/* Trust badge */}
            <p className="mt-6 text-xs text-white/70 flex items-center gap-2">
              <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {t('landing_no_hidden_costs') || 'Sin costos ocultos. Cumplimiento y auditorías.'}
            </p>
          </div>
        </main>
      </ShaderBackground>

      {/* Solutions Section with Display Cards */}
      <section className="w-full py-20 px-4" aria-label={t('landing_metrics_title')}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{t('landing_metrics_title') || 'Métricas clave'}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t('landing_why_desc') || 'Plataforma diseñada para inversores que buscan transparencia, seguridad y control total sobre sus activos'}</p>
          </div>

          <MetricsKeyCards language={language as "es" | "en"} />
        </div>
      </section>

      {/* Parallax Projects Section */}
      <section className="w-full py-20 px-4 bg-muted/20" aria-label="Oportunidades de inversión">
        <HeroParallaxDemo />
      </section>

      {/* Trust Section - moved earlier for credibility */}
      <section id="trust" className="py-20 w-full px-4 bg-gradient-to-b from-background to-muted/30" aria-label="Confianza y cumplimiento">
        <div className="max-w-6xl mx-auto">
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
      <section id="features" className="py-20 w-full px-4" aria-label="Características principales">
        <div className="max-w-6xl mx-auto">
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

      {/* Authenticated Users Features Section with Display Cards */}
      <section className="py-20 w-full px-4" aria-label="Características para usuarios registrados">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{t('landing_authenticated_features') || 'Características al Registrarse'}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('landing_authenticated_desc') || 'Accede a herramientas avanzadas y sigue tu portafolio en tiempo real'}
            </p>
          </div>

          <AuthenticatedFeaturesCards language={language as "es" | "en"} />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 w-full px-4 bg-muted/30" aria-label="Testimonios de clientes">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight mb-4">{t('landing_testimonials_title')}</h2>
            <p className="text-lg text-muted-foreground">{t('landing_testimonials_desc')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-left hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    nb1</svg>
                  ))}
                </div>
                <p className="text-base text-muted-foreground mb-4 leading-relaxed">
                  "{t('landing_testimonial_1')}"
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
                  "{t('landing_testimonial_2')}"
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
                  "{t('landing_testimonial_3')}"
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
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-16 w-full px-4" aria-label="Inversión tokenizada SEO">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">{t('landing_tokenized_assets')}</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('landing_tokenized_assets_desc')}
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 w-full px-4" aria-label="Preguntas frecuentes">
        <div className="max-w-4xl mx-auto">
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
      <section className="py-24 w-full px-4" aria-label="Llamado a la acción final">
        <div className="max-w-5xl mx-auto">
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
