import React from 'react';
import { Card } from '@/components/ui/card';
import { ImageCarousel } from '@/components/ImageCarousel';
import { CheckCircle2, Home } from 'lucide-react';

type BilingualString = string | { es: string; en: string };

const extractText = (value: BilingualString, language: string): string => {
  if (typeof value === 'string') return value;
  return value[language as keyof typeof value] || value.es || '';
};

interface ProjectHeroSectionProps {
  images?: string[];
  title: string;
  language: string;
  projectDetails?: BilingualString;
  projectOverview?: BilingualString;
}

const getAboutSectionContent = (language: string) => {
  const defaultContent = {
    es: {
      title: "Acerca del Proyecto",
      intro: "Viví frente al mar. Invertí desde cualquier lugar.",
      highlights: [
        "Ubicación Premium",
        "Amenities de Primer Nivel",
        "Acceso Tokenizado",
        "Rentabilidad Objetivo",
        "Plazo Definido",
        "Transparencia Total"
      ]
    },
    en: {
      title: "About the Project",
      intro: "Live by the sea. Invest from anywhere.",
      highlights: [
        "Premium Location",
        "First-Class Amenities",
        "Tokenized Access",
        "Target Return",
        "Defined Timeline",
        "Total Transparency"
      ]
    }
  };

  return defaultContent[language as keyof typeof defaultContent];
};

export const ProjectHeroSection: React.FC<ProjectHeroSectionProps> = ({
  images,
  title,
  language,
  projectDetails,
  projectOverview,
}) => {
  const content = getAboutSectionContent(language);
  const overviewText = projectOverview ? extractText(projectOverview, language) : null;
  const detailsText = projectDetails ? extractText(projectDetails, language) : null;

  return (
    <div className="w-full space-y-6">
      {/* Carousel Container */}
      <Card className="overflow-hidden border-2 hover:border-emerald-200 dark:hover:border-emerald-800 transition-colors shadow-xl">
        <ImageCarousel
          images={images}
          alt={title}
          className="w-full"
        />
      </Card>

      {/* Description and Features Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Description */}
        <div className="lg:col-span-2">
          <Card className="border-2 hover:border-emerald-200 dark:hover:border-emerald-800 transition-colors h-full">
            <div className="p-6 space-y-6">
              {/* Title with icon */}
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-lg">
                  <Home className="h-6 w-6 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  {content.title}
                </h2>
              </div>

              {/* Intro text with emphasis */}
              <div className="pl-4 border-l-3 border-emerald-500">
                <p className="text-lg font-semibold text-emerald-600 dark:text-emerald-400 italic">
                  "{content.intro}"
                </p>
              </div>

              {/* Main description text - Use projectOverview if available */}
              <div className="space-y-4 text-justify">
                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                  {overviewText || content.intro}
                </p>
                {detailsText && (
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {detailsText}
                  </p>
                )}
              </div>

              {/* Key highlights */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">
                  {language === 'es' ? 'Características Clave' : 'Key Features'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {content.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-2 group">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                      <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProjectHeroSection;
