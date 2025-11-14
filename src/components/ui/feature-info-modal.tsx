'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface FeatureInfoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  featureType: 'crowdfunding' | 'real-assets' | 'financial-assets' | 'p2p' | 'auctions' | 'collections' | null;
}

const featureInfoMap = {
  crowdfunding: {
    title: "Crowdfunding",
    fullDescription: "El crowdfunding es una forma de financiar proyectos innovadores a través de la contribución colectiva de la comunidad. En Investoken, puedes acceder a oportunidades de inversión colectiva donde múltiples inversores aportan capital para proyectos prometedores.",
    benefits: [
      "Acceso a proyectos innovadores antes que el mercado",
      "Bajo monto mínimo de inversión",
      "Diversificación de riesgos entre múltiples proyectos",
      "Transparencia total en el uso de fondos",
      "Potencial de retornos significativos"
    ],
    marketplaceFilters: { category: 'crowdfunding' }
  },
  'real-assets': {
    title: "Tokenización de Activos Reales",
    fullDescription: "Los activos reales tokenizados permiten invertir en bienes tangibles como bienes raíces, arte, oro y otros activos físicos mediante tokens digitales. Cada token representa una fracción de propiedad del activo.",
    benefits: [
      "Invertir en bienes raíces sin necesidad de grandes capitales",
      "Diversificación en activos tangibles y seguros",
      "Liquidez las 24/7 en mercado blockchain",
      "Reducción de costos de intermediarios",
      "Transparencia total en la tenencia y valor del activo"
    ],
    marketplaceFilters: { category: 'real-assets' }
  },
  'financial-assets': {
    title: "Tokenización de Activos Financieros",
    fullDescription: "Los activos financieros tokenizados te permiten acceder a acciones, bonos, fondos índice y otros instrumentos financieros en forma de tokens digitales. Combina la estabilidad de instrumentos tradicionales con la eficiencia de blockchain.",
    benefits: [
      "Acceso a mercados financieros globales 24/7",
      "Reducción de comisiones de intermediación",
      "Liquidez instantánea y asignación de capital eficiente",
      "Acceso a fractiones de acciones de empresas grandes",
      "Automatización mediante contratos inteligentes"
    ],
    marketplaceFilters: { category: 'financial-assets' }
  },
  p2p: {
    title: "P2P (Peer-to-Peer)",
    fullDescription: "El trading P2P permite comprar y vender activos directamente con otros usuarios sin intermediarios. Todo ocurre en blockchain, garantizando seguridad y transparencia.",
    benefits: [
      "Sin intermediarios ni comisiones de plataforma",
      "Negociación directa de precios",
      "Mayor control sobre tus activos",
      "Transacciones seguras mediante blockchain",
      "Acceso 24/7 sin horarios de mercado"
    ],
    marketplaceFilters: { type: 'p2p' }
  },
  auctions: {
    title: "Subastas",
    fullDescription: "Participa en subastas en tiempo real para obtener activos tokenizados al mejor precio. Las subastas proporcionan un mecanismo justo de descubrimiento de precios y oportunidades de obtener activos valiosos.",
    benefits: [
      "Oportunidades de obtener activos a precios competitivos",
      "Mecanismo transparente de determinación de precios",
      "Acceso a activos únicos y limitados",
      "Emoción y competencia en tiempo real",
      "Seguridad garantizada mediante blockchain"
    ],
    marketplaceFilters: { type: 'auction' }
  },
  collections: {
    title: "Colectas",
    fullDescription: "Las colectas son iniciativas comunitarias para apoyar causas sociales, ambientales y proyectos comunitarios. Cada colecta opera con transparencia total en blockchain, garantizando que tus contribuciones lleguen donde se necesitan.",
    benefits: [
      "Apoya causas que importan a la comunidad",
      "Transparencia total en el uso de fondos",
      "Impacto social medible y verificable",
      "Recompensas o reconocimiento por contribuciones",
      "Participa en decisiones sobre cómo usar los fondos"
    ],
    marketplaceFilters: { category: 'collections' }
  }
};

export function FeatureInfoModal({ open, onOpenChange, featureType }: FeatureInfoModalProps) {
  const navigate = useNavigate();

  if (!featureType || !featureInfoMap[featureType]) {
    return null;
  }

  const info = featureInfoMap[featureType];

  const handleExplore = () => {
    onOpenChange(false);

    // P2P se redirige a /trade, el resto a /market con filtros
    if (featureType === 'p2p') {
      navigate('/trade');
    } else {
      const filters = info.marketplaceFilters;
      const queryParams = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        queryParams.append(key, String(value));
      });

      navigate(`/market?${queryParams.toString()}`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl">{info.title}</DialogTitle>
          <DialogDescription className="text-lg mt-4">
            {info.fullDescription}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Beneficios clave:</h3>
          <ul className="space-y-2">
            {info.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-foreground/90">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-3 mt-8">
          <Button onClick={() => onOpenChange(false)} variant="outline" className="flex-1">
            Cerrar
          </Button>
          <Button onClick={handleExplore} className="flex-1">
            Explorar en Marketplace
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
