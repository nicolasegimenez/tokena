"use client";

import DisplayCards from "@/components/ui/display-cards";
import { Users, Zap, Plus } from "lucide-react";

interface AuthenticatedFeaturesCardsProps {
  language?: "es" | "en";
}

export function AuthenticatedFeaturesCards({ language = "es" }: AuthenticatedFeaturesCardsProps) {
  const features = {
    es: [
      {
        icon: <Users className="size-4 text-green-300" />,
        title: "P2P Trading",
        description: "Intercambia tokens directamente",
        date: "Disponible",
        iconClassName: "text-green-500",
        titleClassName: "text-green-500",
        className:
          "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
      },
      {
        icon: <Zap className="size-4 text-yellow-300" />,
        title: "Marketplace",
        description: "Descubre inversiones premium",
        date: "En tiempo real",
        iconClassName: "text-yellow-500",
        titleClassName: "text-yellow-500",
        className:
          "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
      },
      {
        icon: <Plus className="size-4 text-purple-300" />,
        title: "Crear Proyectos",
        description: "Tokeniza tu idea innovadora",
        date: "Nuevo",
        iconClassName: "text-purple-500",
        titleClassName: "text-purple-500",
        className:
          "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10",
      },
    ],
    en: [
      {
        icon: <Users className="size-4 text-green-300" />,
        title: "P2P Trading",
        description: "Exchange tokens directly",
        date: "Available",
        iconClassName: "text-green-500",
        titleClassName: "text-green-500",
        className:
          "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
      },
      {
        icon: <Zap className="size-4 text-yellow-300" />,
        title: "Marketplace",
        description: "Discover premium investments",
        date: "Real-time",
        iconClassName: "text-yellow-500",
        titleClassName: "text-yellow-500",
        className:
          "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
      },
      {
        icon: <Plus className="size-4 text-purple-300" />,
        title: "Create Projects",
        description: "Tokenize your innovative idea",
        date: "New",
        iconClassName: "text-purple-500",
        titleClassName: "text-purple-500",
        className:
          "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10",
      },
    ],
  };

  const cards = features[language];

  return (
    <div className="flex justify-center w-full">
      <DisplayCards cards={cards} />
    </div>
  );
}
