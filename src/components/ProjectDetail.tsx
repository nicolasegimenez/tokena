import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import InvestmentSimulator from "@/components/InvestmentSimulator";
import { ImageCarousel } from "@/components/ImageCarousel";
import { useLanguage } from "@/lib/language";

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
    team: "Team",
    documents: "Documents",
    compliance: "Compliance & Legal",
    tokenStandard: "Token Standard",
    legalStructure: "Legal Structure",
    custodian: "Custodian",
    kycRequired: "KYC/AML Required",
    legalDocuments: "Legal Documents",
    yes: "Sí",
    no: "No",
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
  const { language } = useLanguage();
  const t = (key: keyof typeof labels.es) => labels[language][key];

  const projectName = extractText(projectData.name, language);
  const projectDescription = extractText(projectData.description, language);

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Project Details */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <Card>
            <CardHeader>
              <ImageCarousel
                images={projectData.images || [projectData.image]}
                alt={projectName}
                className="mb-4"
              />
              <h1 className="text-3xl font-bold tracking-tight">{projectName}</h1>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{projectDescription}</p>
            </CardContent>
          </Card>

          {children}

          <Card>
            <CardHeader>
              <CardTitle>{t('team')}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {projectData.team.map(member => (
                <div key={member.name} className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{extractText(member.role, language)}</p>
                    <p className="text-sm">{extractText(member.bio, language)}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('documents')}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {projectData.documents.map(doc => (
                <a key={extractText(doc.name, language)} href={doc.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  {extractText(doc.name, language)}
                </a>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('compliance')}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('tokenStandard')}</span>
                <span className="font-medium">{projectData.compliance.tokenStandard}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('legalStructure')}</span>
                <span className="font-medium">{extractText(projectData.compliance.legalStructure, language)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('custodian')}</span>
                <span className="font-medium">{extractText(projectData.compliance.custodian, language)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('kycRequired')}</span>
                <span className="font-medium">{projectData.compliance.kycRequired ? t('yes') : t('no')}</span>
              </div>
              <div>
                <h4 className="font-medium mb-2">{t('legalDocuments')}</h4>
                <div className="flex flex-col gap-2">
                  {projectData.compliance.legalDocuments.map(doc => (
                    <a key={extractText(doc.name, language)} href={doc.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      {extractText(doc.name, language)}
                    </a>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Investment Simulator */}
        <div className="lg:col-span-1">
          <InvestmentSimulator
            projectData={({
              pricePerToken: projectData.pricePerToken,
              roi,
              duration,
              fundingGoal: projectData.fundingGoal,
              amountRaised: projectData.amountRaised,
            })}
          />
        </div>
      </div>
    </div>
  );
}
