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

          {/* Investment Details */}
          <Card>
            <CardHeader>
              <CardTitle>Detalles de Inversión</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Rentabilidad Objetivo</p>
                <p className="font-semibold">{projectData.investmentDetails.rentabilidadObjetivo}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Modalidad</p>
                <p className="font-semibold">{projectData.investmentDetails.modalidad}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Superficie Total</p>
                <p className="font-semibold">{projectData.investmentDetails.superficieTotal}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Superficie Agrícola</p>
                <p className="font-semibold">{projectData.investmentDetails.superficieAgricola}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Ticket Mínimo</p>
                <p className="font-semibold">{projectData.investmentDetails.ticketMinimo}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Renta Objetivo</p>
                <p className="font-semibold">{projectData.investmentDetails.rentaObjetivo}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-muted-foreground">Ubicación</p>
                <p className="font-semibold">{projectData.investmentDetails.ubicacion}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-muted-foreground">Cultivos</p>
                <p className="font-semibold">{projectData.investmentDetails.cultivos}</p>
              </div>
            </CardContent>
          </Card>

          {/* Tesis de Inversión */}
          <Card>
            <CardHeader>
              <CardTitle>Tesis de Inversión</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {projectData.tesis.map((punto, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-muted-foreground">{punto}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Riesgos */}
          <Card>
            <CardHeader>
              <CardTitle>Riesgos & Mitigantes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {projectData.riesgos.map((riesgo, idx) => (
                <div key={idx} className="border-b pb-4 last:border-b-0">
                  <h4 className="font-semibold text-sm">{riesgo.titulo}</h4>
                  <p className="text-sm text-muted-foreground mt-2">✓ {riesgo.mitigante}</p>
                </div>
              ))}
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

          {/* FAQs */}
          <Card>
            <CardHeader>
              <CardTitle>Preguntas Frecuentes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {projectData.faqs.map((faq, idx) => (
                <div key={idx} className="border-b pb-4 last:border-b-0">
                  <p className="font-semibold text-sm">{faq.pregunta}</p>
                  <p className="text-sm text-muted-foreground mt-2">{faq.respuesta}</p>
                </div>
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
                <span className="text-muted-foreground">Custodian</span>
                <span className="font-medium">{projectData.compliance.custodian}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">KYC/AML Required</span>
                <span className="font-medium">{projectData.compliance.kycRequired ? "Sí" : "No"}</span>
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
            projectData={({
              pricePerToken: projectData.pricePerToken,
              roi: 12.5,
              duration: 36,
              fundingGoal: projectData.fundingGoal,
              amountRaised: projectData.amountRaised,
            })}
          />
        </div>
      </div>
    </div>
  );
}
