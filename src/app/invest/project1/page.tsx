import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import projectData from "./data.json";

export default function InvestPage() {
  const progress = (projectData.amountRaised / projectData.fundingGoal) * 100;

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Project Details */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <Card className="overflow-hidden border-2 hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="p-0">
              <div className="relative w-full">
                <img 
                  src={projectData.image} 
                  alt={projectData.name} 
                  className="w-full h-80 object-cover" 
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-green-500 hover:bg-green-600">
                    En Financiamiento
                  </Badge>
                </div>
              </div>
              <div className="p-6">
                <h1 className="text-4xl font-bold tracking-tight mb-3 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  {projectData.name}
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {projectData.description}
                </p>
              </div>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardHeader className="border-b">
              <CardTitle className="text-2xl">Resumen de la Inversión</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              <div className="flex justify-between items-center p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <span className="text-muted-foreground font-medium">Moneda del Proyecto</span>
                <Badge variant="secondary" className="font-semibold">{projectData.investmentSummary.currency}</Badge>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <span className="text-muted-foreground font-medium">Rentabilidad Estimada Total</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 font-semibold">
                  {projectData.investmentSummary.estimatedTotalReturn}
                </Badge>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <span className="text-muted-foreground font-medium">Pago Trimestral</span>
                <Badge variant="secondary" className="font-semibold">{projectData.investmentSummary.quarterlyPayment}</Badge>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <span className="text-muted-foreground font-medium">Duración Total</span>
                <Badge variant="secondary" className="font-semibold">{projectData.investmentSummary.totalDuration}</Badge>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <span className="text-muted-foreground font-medium">Inversión Mínima</span>
                <Badge variant="secondary" className="font-semibold">{projectData.investmentSummary.minimumInvestment}</Badge>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <span className="text-muted-foreground font-medium">Fiduciaria</span>
                <span className="font-semibold text-right">{projectData.investmentSummary.fiduciary}</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <span className="text-muted-foreground font-medium">Desarrollador</span>
                <span className="font-semibold text-right">{projectData.investmentSummary.developer}</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <span className="text-muted-foreground font-medium">Constructora</span>
                <span className="font-semibold text-right">{projectData.investmentSummary.constructor}</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg hover:bg-muted/50 transition-colors md:col-span-2">
                <span className="text-muted-foreground font-medium">Vehículo Legal</span>
                <span className="font-semibold text-right">{projectData.investmentSummary.legalVehicle}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardHeader className="border-b">
              <CardTitle className="text-2xl">Team</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6 pt-6">
              {projectData.team.map(member => (
                <div 
                  key={member.name} 
                  className="flex items-start gap-4 p-4 rounded-lg border hover:bg-muted/30 transition-all duration-200 hover:border-primary/20"
                >
                  <Avatar className="h-14 w-14 border-2 border-primary/20">
                    <AvatarFallback className="text-lg font-bold">
                      {member.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-bold text-lg mb-1">{member.name}</p>
                    <p className="text-sm font-medium text-muted-foreground mb-2">{member.role}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardHeader className="border-b">
              <CardTitle className="text-2xl">Documents</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 pt-6">
              {projectData.documents.map(doc => (
                <a 
                  key={doc.name} 
                  href={doc.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 p-3 rounded-lg text-primary hover:bg-primary/10 transition-all duration-200 font-medium group"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">📄</span>
                  {doc.name}
                </a>
              ))}
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow duration-200 border-2 border-primary/10">
            <CardHeader className="border-b bg-gradient-to-r from-primary/5 to-transparent">
              <CardTitle className="text-2xl">Compliance & Legal (T-REX Standard)</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex justify-between items-center p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <span className="text-muted-foreground font-medium">Token Standard</span>
                  <Badge variant="outline" className="font-semibold">{projectData.compliance.tokenStandard}</Badge>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <span className="text-muted-foreground font-medium">Legal Structure</span>
                  <Badge variant="outline" className="font-semibold">{projectData.compliance.legalStructure}</Badge>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <span className="text-muted-foreground font-medium">Asset Custodian</span>
                  <span className="font-semibold">{projectData.compliance.custodian}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <span className="text-muted-foreground font-medium">KYC/AML Required</span>
                  <Badge className={projectData.compliance.kycRequired ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 font-semibold" : "font-semibold"}>
                    {projectData.compliance.kycRequired ? "Yes" : "No"}
                  </Badge>
                </div>
              </div>
              <div className="mt-2">
                <h4 className="font-bold text-lg mb-4">Legal Documents</h4>
                <div className="flex flex-col gap-2">
                  {projectData.compliance.legalDocuments.map(doc => (
                    <a 
                      key={doc.name} 
                      href={doc.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-2 p-3 rounded-lg text-primary hover:bg-primary/10 transition-all duration-200 font-medium group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200">⚖️</span>
                      {doc.name}
                    </a>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Investment Card */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8 border-2 hover:shadow-xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-br from-primary/10 to-primary/5 border-b">
              <CardTitle className="text-2xl text-center">Invest in this Project</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6 pt-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-muted-foreground">Funding Progress</span>
                  <span className="text-sm font-bold text-primary">{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-primary to-primary/80 h-full rounded-full transition-all duration-700 ease-out shadow-sm" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">
                    ${projectData.amountRaised.toLocaleString()} raised
                  </span>
                  <span className="text-muted-foreground">
                    ${projectData.fundingGoal.toLocaleString()} goal
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border bg-muted/30 text-center hover:bg-muted/50 transition-colors">
                  <p className="text-xs text-muted-foreground mb-1">Investors</p>
                  <p className="text-2xl font-bold">{projectData.investors}</p>
                </div>
                <div className="p-4 rounded-lg border bg-muted/30 text-center hover:bg-muted/50 transition-colors">
                  <p className="text-xs text-muted-foreground mb-1">Price per Token</p>
                  <p className="text-2xl font-bold text-primary">${projectData.pricePerToken}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="investment-amount" className="text-sm font-semibold">
                    Investment Amount (USD)
                  </Label>
                  <Input 
                    id="investment-amount" 
                    type="number" 
                    placeholder="e.g., 1000" 
                    className="h-12 text-lg"
                  />
                </div>
                <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                  <p className="text-center text-sm">
                    <span className="font-bold text-green-700 dark:text-green-400">You will receive 10 tokens</span>
                  </p>
                </div>
              </div>

              <Button 
                size="lg" 
                className="w-full h-14 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-200 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
              >
                Invest Now
              </Button>
              
              <div className="pt-2">
                <p className="text-xs text-center text-muted-foreground">
                  🔒 Secured by blockchain technology
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
