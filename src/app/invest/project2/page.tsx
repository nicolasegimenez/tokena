import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import InvestmentSimulator from "@/components/InvestmentSimulator";
import { ImageCarousel } from "@/components/ImageCarousel";
import projectData from "./data.json";

export default function InvestPage() {

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Project Details */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <Card>
            <CardHeader>
              <ImageCarousel
                images={projectData.images || [projectData.image]}
                alt={projectData.name}
                className="mb-4"
              />
              <h1 className="text-3xl font-bold tracking-tight">{projectData.name}</h1>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{projectData.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Team</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {projectData.team.map(member => (
                <div key={member.name} className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                    <p className="text-sm">{member.bio}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {projectData.documents.map(doc => (
                <a key={doc.name} href={doc.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  {doc.name}
                </a>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Compliance & Legal</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Token Standard</span>
                <span className="font-medium">{projectData.compliance.tokenStandard}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Legal Structure</span>
                <span className="font-medium">{projectData.compliance.legalStructure}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Asset Custodian</span>
                <span className="font-medium">{projectData.compliance.custodian}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">KYC/AML Required</span>
                <span className="font-medium">{projectData.compliance.kycRequired ? "Yes" : "No"}</span>
              </div>
              <div>
                <h4 className="font-medium mb-2">Legal Documents</h4>
                <div className="flex flex-col gap-2">
                  {projectData.compliance.legalDocuments.map(doc => (
                    <a key={doc.name} href={doc.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      {doc.name}
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
            projectData={{
              pricePerToken: projectData.pricePerToken,
              roi: 18, // ROI del proyecto 2 según MarketPlaceApp
              duration: 12, // Duración en meses según MarketPlaceApp
              fundingGoal: projectData.fundingGoal,
              amountRaised: projectData.amountRaised,
            }}
          />
        </div>
      </div>
    </div>
  );
}

