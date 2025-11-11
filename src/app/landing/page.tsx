import React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center px-4">
      {/* Hero Section */}
      <section className="py-20 w-full max-w-4xl">
        <h1 className="text-5xl font-bold tracking-tight mb-6">
          Bienvenido a Investoken - Tu plataforma de invrsion tokenizada de confianza. 
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Invierte en el futuro con confianza. Seguro, transparente y innovador.
        </p>
        <Button size="lg" className="text-lg px-8 py-4">
          Empezar
        </Button>
      </section>

      {/* Features Section */}
      <section className="py-16 w-full max-w-6xl">
        <h2 className="text-4xl font-bold tracking-tight mb-12">Why Choose Tokena?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="flex flex-col items-center p-6">
            <CardHeader>
              <CardTitle className="text-2xl">Secure & Transparent</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Leveraging blockchain technology for unparalleled security and transparency in all your investments.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="flex flex-col items-center p-6">
            <CardHeader>
              <CardTitle className="text-2xl">Innovative Solutions</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Access cutting-edge investment opportunities and decentralized financial tools.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="flex flex-col items-center p-6">
            <CardHeader>
              <CardTitle className="text-2xl">User-Friendly Interface</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Easily manage your portfolio with an intuitive and modern user experience.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
