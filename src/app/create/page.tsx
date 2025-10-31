import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function CreateProjectPage() {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [fundingGoal, setFundingGoal] = useState('');
  const [projectImageUrl, setProjectImageUrl] = useState('');
  const [tokenTicker, setTokenTicker] = useState('');
  const [totalSupply, setTotalSupply] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el proyecto
    console.log({
      projectName,
      projectDescription,
      fundingGoal,
      projectImageUrl,
      tokenTicker,
      totalSupply,
    });
    alert('Proyecto enviado (simulado)! Revisa la consola para los datos.');
    // Reset form
    setProjectName('');
    setProjectDescription('');
    setFundingGoal('');
    setProjectImageUrl('');
    setTokenTicker('');
    setTotalSupply('');
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Publicar Nuevo Proyecto de Inversión</CardTitle>
          <CardDescription>
            Completa los detalles para que otros usuarios puedan invertir en tu proyecto.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="projectName">Nombre del Proyecto</Label>
              <Input
                id="projectName"
                placeholder="Mi Innovador Proyecto"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="projectDescription">Descripción del Proyecto</Label>
              <Textarea
                id="projectDescription"
                placeholder="Describe tu proyecto en detalle..."
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="fundingGoal">Objetivo de Financiación (USD)</Label>
              <Input
                id="fundingGoal"
                type="number"
                placeholder="100000"
                value={fundingGoal}
                onChange={(e) => setFundingGoal(e.target.value)}
                required
                min="1"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="projectImageUrl">URL de la Imagen del Proyecto</Label>
              <Input
                id="projectImageUrl"
                type="url"
                placeholder="https://ejemplo.com/imagen-proyecto.jpg"
                value={projectImageUrl}
                onChange={(e) => setProjectImageUrl(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tokenTicker">Símbolo del Token (Ej: MYPROJ)</Label>
              <Input
                id="tokenTicker"
                placeholder="MYPROJ"
                value={tokenTicker}
                onChange={(e) => setTokenTicker(e.target.value.toUpperCase())}
                maxLength={10}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="totalSupply">Suministro Total de Tokens</Label>
              <Input
                id="totalSupply"
                type="number"
                placeholder="1000000"
                value={totalSupply}
                onChange={(e) => setTotalSupply(e.target.value)}
                required
                min="1"
              />
            </div>
            <Button type="submit" className="w-full">Publicar Proyecto</Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            Al publicar, tu proyecto estará visible para posibles inversores.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
