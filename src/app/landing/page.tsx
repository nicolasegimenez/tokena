import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { useLanguage } from '@/lib/language';
import { HeroParallaxDemo } from '@/components/ui/hero-parallax-demo';
import { ShaderBackground } from '@/components/ui/hero-shader';
import { Navbar } from '@/components/ui/navbar';
import { PlatformFeatures } from '@/components/ui/platform-features';
import { SquareCarousel } from '@/components/ui/square-carousel';

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
          {/* Background Glow Effects */}
          <div className="absolute inset-0 -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-cyan-500/15 to-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute inset-0 bottom-0 -right-48 w-96 h-96 bg-gradient-to-tl from-pink-500/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>

          {/* Content Container - Centered */}
          <div className="w-full max-w-7xl text-center z-10">
            {/* Logo + Brand Title */}
            <div className="flex items-center gap-4 xs:gap-6 sm:gap-8 mb-6 xs:mb-8 sm:mb-10 justify-center">
              <div className="h-16 xs:h-20 sm:h-24 md:h-28 w-16 xs:w-20 sm:w-24 md:w-28 flex items-center justify-center flex-shrink-0">
                <img
                  src="https://res.cloudinary.com/dhacybdxf/image/upload/v1762901050/Investoken/investoken_solo_logo_oficial_azul_y_blanco_jdbnpk.svg"
                  alt="Investoken Logo"
                  className="w-full h-full"
                />
              </div>
              <div>
                <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black text-white">
                  Investoken
                </h1>
              </div>
            </div>

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
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight text-white mb-3 xs:mb-4 sm:mb-6 font-bold">
              {t('landing_hero_title') || 'Inversión tokenizada con seguridad y transparencia'}
            </h2>

            {/* Description */}
            <p className="text-xs xs:text-sm sm:text-base md:text-lg font-light text-white/80 mb-6 xs:mb-8 sm:mb-10 leading-relaxed mx-auto">
              {t('landing_hero_desc') || 'Investoken te ayuda a diversificar tu portafolio con activos tokenizados. Costos bajos, liquidez, y control total.'}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2.5 xs:gap-3 sm:gap-4 mb-8 xs:mb-10 sm:mb-12 justify-center">
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
            <div className="flex flex-col xs:flex-row xs:items-center gap-3 xs:gap-4 sm:gap-6 text-xs xs:text-sm text-white/75 justify-center">
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
        </div>
      </ShaderBackground>

      {/* Platform Features Section */}
      <section id="features" className="py-20 w-full px-3 xs:px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 bg-gradient-to-b from-background to-muted/20" aria-label="Características de la plataforma">
        <div className="max-w-7xl mx-auto">
          <PlatformFeatures />
        </div>
      </section>

      {/* Parallax Projects Section */}
      <section className="w-full py-12 md:py-20 px-3 xs:px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 bg-muted/40" aria-label="Oportunidades de inversión">
        <HeroParallaxDemo />
      </section>

      {/* Trust Section - moved earlier for credibility */}
      <section id="trust" className="py-20 w-full px-3 xs:px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 bg-gradient-to-b from-background to-muted/30" aria-label="Confianza y cumplimiento">
        <div className="max-w-6xl mx-auto">
          <Card className="border-2">
            <CardContent className="pt-12 pb-12">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{t('landing_trust_title')}</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  {t('landing_trust_desc')}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
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

      {/* Carousel Section */}
      <section className="py-20 md:py-32 w-full px-3 xs:px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 bg-gradient-to-b from-background to-muted/20" aria-label="Galería de inversión">
        <SquareCarousel
          images={[
            {
              url: "https://res.cloudinary.com/dhacybdxf/image/upload/v1763145320/1F724B03-A736-4CB0-90C6-FB400A0F04A5_ez5kjc.png",
              alt: "Inversión 1"
            },
            {
              url: "https://res.cloudinary.com/dhacybdxf/image/upload/v1763145320/5402C399-5DA9-495A-879F-D935C231CAE6_lx6lwp.png",
              alt: "Inversión 2"
            },
            {
              url: "https://res.cloudinary.com/dhacybdxf/image/upload/v1763145320/B65B8204-B699-418B-AFB1-057A0CCDB95A_sdsqgp.png",
              alt: "Inversión 3"
            },
            {
              url: "https://res.cloudinary.com/dhacybdxf/image/upload/v1763145320/5A20ECF8-FDB3-4185-B08F-CABB8D1BF22A_ybvuxj.png",
              alt: "Inversión 4"
            }
          ]}
        />
      </section>


      {/* SEO Content Section */}
      <section className="py-20 w-full px-3 xs:px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 bg-gradient-to-b from-transparent to-primary/5" aria-label="Inversión tokenizada SEO">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 md:mb-8">{t('landing_tokenized_assets')}</h2>
          <p className="text-base md:text-lg text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            {t('landing_tokenized_assets_desc')}
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 w-full px-3 xs:px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 bg-gradient-to-b from-primary/5 to-transparent" aria-label="Preguntas frecuentes">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 md:mb-8">{t('landing_faq_title')}</h2>
            <p className="text-base md:text-lg text-foreground/75">{t('landing_faq_desc')}</p>
          </div>

          <div className="space-y-3 md:space-y-4">
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
      <section className="py-24 md:py-32 w-full px-3 xs:px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16" aria-label="Llamado a la acción final">
        <div className="max-w-5xl mx-auto">
          <Card className="border-2 border-primary/40 bg-gradient-to-br from-primary/10 via-primary/5 to-background shadow-lg">
            <CardContent className="pt-20 pb-20 md:pt-24 md:pb-24 text-center">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 md:mb-10">{t('landing_cta_title')}</h2>
              <p className="text-lg md:text-xl text-foreground/75 mb-12 md:mb-16 max-w-2xl mx-auto leading-relaxed">
                {t('landing_cta_desc')}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mb-10 md:mb-12">
                <Button onClick={handleDemoLogin} size="lg" className="text-lg px-12 py-7 h-auto shadow-lg hover:shadow-xl">
                  {t('landing_demo_login')}
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-12 py-7 h-auto border-2">
                  <Link to="/analytics" aria-label={t('landing_view_analytics')}>
                    {t('landing_view_analytics')}
                  </Link>
                </Button>
              </div>
              <p className="mt-10 md:mt-12 text-sm md:text-base text-foreground/70">
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
