import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getRandomAvatarUrl } from "@/lib/utils";
import InvestmentSimulator from "@/components/InvestmentSimulator";
import { ProjectHeroSection } from "@/components/ProjectHeroSection";
import { ThemeLanguageToolbar } from "@/components/ui/theme-language-toolbar";
import { useLanguage } from "@/lib/language";
import { useNavigate } from "react-router-dom";
import { Users, TrendingUp, Clock, ArrowLeft, Download, CheckCircle2, AlertCircle } from 'lucide-react';

type BilingualString = string | { es: string; en: string };

const extractText = (value: BilingualString, language: string): string => {
  if (typeof value === 'string') return value;
  return value[language as keyof typeof value] || value.es || '';
};

interface ProjectData {
  name: BilingualString;
  description: BilingualString;
  image: string;
  images?: string[];
  fundingGoal: number;
  amountRaised: number;
  investors: number;
  pricePerToken: number;
  team: Array<{
    name: string;
    role: BilingualString;
    bio: BilingualString;
  }>;
  documents: Array<{
    name: BilingualString;
    url: string;
  }>;
  compliance: {
    tokenStandard: string;
    legalStructure: BilingualString;
    custodian: BilingualString;
    kycRequired: boolean;
    legalDocuments: Array<{
      name: BilingualString;
      url: string;
    }>;
  };
  [key: string]: any;
}

const labels = {
  es: {
    team: "Equipo",
    documents: "Documentos",
    compliance: "Cumplimiento Normativo",
    tokenStandard: "Estándar de Token",
    legalStructure: "Estructura Legal",
    custodian: "Custodio",
    kycRequired: "KYC/AML Requerido",
    legalDocuments: "Documentos Legales",
    yes: "Sí",
    no: "No",
    back_to_market: "Volver al Mercado",
    project_details: "Detalles del Proyecto",
    funding_progress: "Progreso de Fondeo",
    investors: "Inversores",
    funded: "Fondeado",
    of: "de",
    download: "Descargar",
    investment_summary: "Resumen de Inversión",
    min_investment: "Inversión Mínima",
    expected_return: "Rentabilidad Esperada",
    duration: "Plazo",
  },
  en: {
    team: "Team",
    documents: "Documents",
    compliance: "Compliance & Legal",
    tokenStandard: "Token Standard",
    legalStructure: "Legal Structure",
    custodian: "Custodian",
    kycRequired: "KYC/AML Required",
    legalDocuments: "Legal Documents",
    yes: "Yes",
    no: "No",
    back_to_market: "Back to Market",
    project_details: "Project Details",
    funding_progress: "Funding Progress",
    investors: "Investors",
    funded: "Funded",
    of: "of",
    download: "Download",
    investment_summary: "Investment Summary",
    min_investment: "Minimum Investment",
    expected_return: "Expected Return",
    duration: "Duration",
  }
};

export function ProjectDetail({
  projectData,
  roi,
  duration,
  children
}: {
  projectData: ProjectData;
  roi: number;
  duration: number;
  children?: React.ReactNode;
}) {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = (key: keyof typeof labels.es) => labels[language][key];


  const projectName = extractText(projectData.name, language);
  const projectDescription = extractText(projectData.description, language);

  // Calculate funding percentage
  const fundingPercentage = (projectData.amountRaised / projectData.fundingGoal) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="gap-2 mb-6"
          onClick={() => navigate('/market')}
        >
          <ArrowLeft className="h-4 w-4" />
          {t('back_to_market')}
        </Button>
        <div className="flex items-start justify-between gap-4 mb-8">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
              {projectName}
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              {projectDescription}
            </p>
          </div>
          <ThemeLanguageToolbar />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Project Details */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Hero Section with Carousel and Description */}
            <ProjectHeroSection
              images={projectData.images || [projectData.image]}
              title={projectName}
              projectDetails={projectData.description}
              projectOverview={(projectData as any).projectOverview}
              language={language}
            />

            {/* Funding Progress Card */}
            <Card className="border-2 hover:border-emerald-200 dark:hover:border-emerald-800 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-emerald-600" />
                  {t('funding_progress')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 rounded-lg p-4">
                    <div className="text-2xl font-bold text-emerald-600">
                      {fundingPercentage.toFixed(0)}%
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{t('funded')}</p>
                  </div>
                  <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
                    <div className="text-2xl font-bold">${(projectData.amountRaised / 1_000_000).toFixed(1)}M</div>
                    <p className="text-xs text-muted-foreground mt-1">{t('funded')}</p>
                  </div>
                  <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
                    <div className="text-2xl font-bold flex items-center gap-1">
                      <Users className="h-5 w-5" />
                      {projectData.investors}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{t('investors')}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Progreso</span>
                    <span className="font-semibold">${(projectData.amountRaised / 1_000_000).toFixed(1)}M {t('of')} ${(projectData.fundingGoal / 1_000_000).toFixed(1)}M</span>
                  </div>
                  <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
                      style={{ width: `${Math.min(fundingPercentage, 100)}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {children}

            {/* Team Section */}
            <Card className="border-2 hover:border-emerald-200 dark:hover:border-emerald-800 transition-colors">
              <CardHeader>
                <CardTitle>{t('team')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {projectData.team.map(member => (
                  <div key={member.name} className="flex items-start gap-4 pb-4 border-b last:pb-0 last:border-0">
                    <Avatar className="h-12 w-12 flex-shrink-0">
                      <AvatarImage src={getRandomAvatarUrl(member.name)} />
                      <AvatarFallback className="bg-gradient-to-br from-emerald-400 to-teal-400 text-white font-bold">
                        {member.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-semibold text-base">{member.name}</p>
                      <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                        {extractText(member.role, language)}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {extractText(member.bio, language)}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Documents Section */}
            <Card className="border-2 hover:border-emerald-200 dark:hover:border-emerald-800 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5 text-emerald-600" />
                  {t('documents')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {projectData.documents.length > 0 ? (
                  projectData.documents.map(doc => (
                    <a
                      key={extractText(doc.name, language)}
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-3 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-950/20 transition-colors text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                    >
                      <Download className="h-4 w-4" />
                      {extractText(doc.name, language)}
                    </a>
                  ))
                ) : (
                  <p className="text-muted-foreground text-sm">{language === 'es' ? 'No hay documentos disponibles' : 'No documents available'}</p>
                )}
              </CardContent>
            </Card>

            {/* Compliance Section */}
            <Card className="border-2 hover:border-emerald-200 dark:hover:border-emerald-800 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  {t('compliance')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-1">{t('tokenStandard')}</p>
                    <p className="font-semibold text-base">{projectData.compliance.tokenStandard}</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-1">{t('legalStructure')}</p>
                    <p className="font-semibold text-base">{extractText(projectData.compliance.legalStructure, language)}</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-1">{t('custodian')}</p>
                    <p className="font-semibold text-base">{extractText(projectData.compliance.custodian, language)}</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-1">{t('kycRequired')}</p>
                    <div className="flex items-center gap-2">
                      {projectData.compliance.kycRequired ? (
                        <AlertCircle className="h-5 w-5 text-orange-500" />
                      ) : (
                        <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                      )}
                      <span className="font-semibold">{projectData.compliance.kycRequired ? t('yes') : t('no')}</span>
                    </div>
                  </div>
                </div>

                {/* Legal Documents */}
                {projectData.compliance.legalDocuments.length > 0 && (
                  <div className="pt-4 border-t">
                    <h4 className="font-semibold mb-3">{t('legalDocuments')}</h4>
                    <div className="space-y-2">
                      {projectData.compliance.legalDocuments.map(doc => (
                        <a
                          key={extractText(doc.name, language)}
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors text-emerald-600 hover:text-emerald-700 dark:text-emerald-400"
                        >
                          <Download className="h-4 w-4" />
                          {extractText(doc.name, language)}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Investment Simulator */}
          <div className="lg:col-span-1">
              <Card className="border-2 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border-emerald-200 dark:border-emerald-800">
                <CardHeader>
                  <CardTitle>{t('investment_summary')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{t('min_investment')}</p>
                      <p className="text-2xl font-bold text-emerald-600">${projectData.pricePerToken}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{t('expected_return')}</p>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-emerald-600" />
                        <p className="text-2xl font-bold text-emerald-600">{roi}%</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{t('duration')}</p>
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-emerald-600" />
                        <p className="text-lg font-semibold">{duration} meses</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <InvestmentSimulator
                projectData={{
                  id: 1,
                  title: projectName,
                  pricePerToken: projectData.pricePerToken,
                  roi,
                  duration,
                  fundingGoal: projectData.fundingGoal,
                  amountRaised: projectData.amountRaised,
                }}
              />
            </div>
          </div>
        </div>
      </div>
  );
}
