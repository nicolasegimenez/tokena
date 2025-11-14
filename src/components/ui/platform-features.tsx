'use client';

import { useState } from 'react';
import { cn } from "@/lib/utils";
import {
  IconBuildingBank,
  IconCoins,
  IconTrendingUp,
  IconUsers,
  IconGavel,
  IconHeartHandshake,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { FeatureInfoModal } from "@/components/ui/feature-info-modal";

type FeatureType = 'crowdfunding' | 'real-assets' | 'financial-assets' | 'p2p' | 'auctions' | 'collections';

interface FeatureConfig {
  title: string;
  description: string;
  icon: React.ReactNode;
  type: FeatureType;
}

export function PlatformFeatures() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<FeatureType | null>(null);

  const features: FeatureConfig[] = [
    {
      title: "Crowdfunding",
      description:
        "Financia proyectos innovadores con la comunidad. Acceso a oportunidades de inversión colectiva.",
      icon: <IconBuildingBank />,
      type: 'crowdfunding',
    },
    {
      title: "Tokenización de Activos Reales",
      description:
        "Invierte en bienes raíces, arte y otros activos tangibles tokenizados en blockchain.",
      icon: <IconCoins />,
      type: 'real-assets',
    },
    {
      title: "Tokenización de Activos Financieros",
      description:
        "Accede a acciones, bonos y otros instrumentos financieros en forma de tokens digitales.",
      icon: <IconTrendingUp />,
      type: 'financial-assets',
    },
    {
      title: "P2P",
      description:
        "Compra y vende directamente con otros usuarios. Sin intermediarios, solo blockchain.",
      icon: <IconUsers />,
      type: 'p2p',
    },
    {
      title: "Subastas",
      description:
        "Participa en subastas en tiempo real. Obtén activos tokenizados al mejor precio.",
      icon: <IconGavel />,
      type: 'auctions',
    },
    {
      title: "Colectas",
      description:
        "Apoya causas y proyectos comunitarios. Transparencia total en cada colecta.",
      icon: <IconHeartHandshake />,
      type: 'collections',
    },
  ];

  const handleInfoClick = (featureType: FeatureType) => {
    setSelectedFeature(featureType);
    setModalOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-10 py-10 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <Feature
            key={feature.title}
            {...feature}
            index={index}
            onInfoClick={() => handleInfoClick(feature.type)}
          />
        ))}
      </div>
      <FeatureInfoModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        featureType={selectedFeature}
      />
    </>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
  onInfoClick,
}: FeatureConfig & {
  index: number;
  onInfoClick: () => void;
}) => {
  return (
    <div
      onClick={onInfoClick}
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800 cursor-pointer transition-all duration-300",
        (index === 0 || index === 3) && "lg:border-l dark:border-neutral-800",
        index < 3 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 3 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 3 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10 mb-4">
        {description}
      </p>
      <div className="relative z-10 px-10">
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onInfoClick();
          }}
          className="text-blue-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30 h-auto p-1 font-semibold"
        >
          + Info
        </Button>
      </div>
    </div>
  );
};
