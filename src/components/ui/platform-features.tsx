import { cn } from "@/lib/utils";
import {
  IconBuildingBank,
  IconCoins,
  IconTrendingUp,
  IconUsers,
  IconGavel,
  IconHeartHandshake,
} from "@tabler/icons-react";

export function PlatformFeatures() {
  const features = [
    {
      title: "Crowdfunding",
      description:
        "Financia proyectos innovadores con la comunidad. Acceso a oportunidades de inversión colectiva.",
      icon: <IconBuildingBank className="w-6 h-6" />,
    },
    {
      title: "Tokenización de Activos Reales",
      description:
        "Invierte en bienes raíces, arte y otros activos tangibles tokenizados en blockchain.",
      icon: <IconCoins className="w-6 h-6" />,
    },
    {
      title: "Tokenización de Activos Financieros",
      description:
        "Accede a acciones, bonos y otros instrumentos financieros en forma de tokens digitales.",
      icon: <IconTrendingUp className="w-6 h-6" />,
    },
    {
      title: "P2P",
      description:
        "Compra y vende directamente con otros usuarios. Sin intermediarios, solo blockchain.",
      icon: <IconUsers className="w-6 h-6" />,
    },
    {
      title: "Subastas",
      description:
        "Participa en subastas en tiempo real. Obtén activos tokenizados al mejor precio.",
      icon: <IconGavel className="w-6 h-6" />,
    },
    {
      title: "Colectas",
      description:
        "Apoya causas y proyectos comunitarios. Transparencia total en cada colecta.",
      icon: <IconHeartHandshake className="w-6 h-6" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-10 py-10 max-w-7xl mx-auto gap-6 md:gap-8">
      {features.map((feature) => (
        <Feature key={feature.title} {...feature} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col p-6 md:p-8 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300 group relative overflow-hidden"
      )}
    >
      {/* Gradient background on hover */}
      <div className="opacity-0 group-hover:opacity-100 transition duration-300 absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />

      {/* Icon */}
      <div className="mb-4 relative z-10 text-primary group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>

      {/* Title */}
      <div className="text-lg font-bold mb-3 relative z-10 flex items-center justify-center">
        <span className="group-hover:translate-x-2 transition duration-200 inline-block text-neutral-900 dark:text-neutral-100">
          {title}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-neutral-600 dark:text-neutral-400 relative z-10 leading-relaxed">
        {description}
      </p>
    </div>
  );
};
