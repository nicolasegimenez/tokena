"use client";

import DisplayCards from "@/components/ui/display-cards";
import { Users2, TrendingUp, Rocket } from "lucide-react";

interface MetricsKeyCardsProps {
  language?: "es" | "en";
}

export function MetricsKeyCards({ language = "es" }: MetricsKeyCardsProps) {
  const features = {
    es: [
      {
        icon: <Users2 className="size-4 text-cyan-300" />,
        title: "P2P Trading",
        description: "Intercambia tokens entre usuarios",
        date: "Disponible ahora",
        iconClassName: "text-cyan-500",
        titleClassName: "text-cyan-500",
        className:
          "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
      },
      {
        icon: <TrendingUp className="size-4 text-orange-300" />,
        title: "Marketplace",
        description: "Invierte en oportunidades premium",
        date: "Tiempo real",
        iconClassName: "text-orange-500",
        titleClassName: "text-orange-500",
        className:
          "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
      },
      {
        icon: <Rocket className="size-4 text-pink-300" />,
        title: "Tokenizar",
        description: "Crea y publica tu proyecto",
        date: "Para creadores",
        iconClassName: "text-pink-500",
        titleClassName: "text-pink-500",
        className:
          "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10",
      },
    ],
    en: [
      {
        icon: <Users2 className="size-4 text-cyan-300" />,
        title: "P2P Trading",
        description: "Exchange tokens between users",
        date: "Available now",
        iconClassName: "text-cyan-500",
        titleClassName: "text-cyan-500",
        className:
          "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
      },
      {
        icon: <TrendingUp className="size-4 text-orange-300" />,
        title: "Marketplace",
        description: "Invest in premium opportunities",
        date: "Real-time",
        iconClassName: "text-orange-500",
        titleClassName: "text-orange-500",
        className:
          "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
      },
      {
        icon: <Rocket className="size-4 text-pink-300" />,
        title: "Tokenize",
        description: "Create and publish your project",
        date: "For creators",
        iconClassName: "text-pink-500",
        titleClassName: "text-pink-500",
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
