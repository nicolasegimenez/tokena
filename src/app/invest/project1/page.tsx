import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import projectData from "./data.json";

export default function InvestPage() {
  const progress = (projectData.amountRaised / projectData.fundingGoal) * 100;

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Project Details */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <Card>
            <CardHeader>
              <img src={projectData.image} alt={projectData.name} className="w-full h-64 object-cover rounded-lg mb-4" />
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
              <CardTitle>Compliance & Legal (T-REX Standard)</CardTitle>
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

        {/* Right Column: Investment Card */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>Invest in this Project</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div className="bg-primary h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  ${projectData.amountRaised.toLocaleString()} raised of ${projectData.fundingGoal.toLocaleString()}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-sm text-muted-foreground">Investors</p>
                  <p className="text-lg font-bold">{projectData.investors}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Price per Token</p>
                  <p className="text-lg font-bold">${projectData.pricePerToken}</p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="investment-amount">Investment Amount (USD)</Label>
                <Input id="investment-amount" type="number" placeholder="e.g., 1000" />
              </div>

              <div className="text-center text-sm text-muted-foreground">
                <p>You will receive 10 tokens.</p>
              </div>

              <Button size="lg" className="w-full">Invest Now</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
