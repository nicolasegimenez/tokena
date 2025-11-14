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
      icon: <IconBuildingBank />,
    },
    {
      title: "Tokenización de Activos Reales",
      description:
        "Invierte en bienes raíces, arte y otros activos tangibles tokenizados en blockchain.",
      icon: <IconCoins />,
    },
    {
      title: "Tokenización de Activos Financieros",
      description:
        "Accede a acciones, bonos y otros instrumentos financieros en forma de tokens digitales.",
      icon: <IconTrendingUp />,
    },
    {
      title: "P2P",
      description:
        "Compra y vende directamente con otros usuarios. Sin intermediarios, solo blockchain.",
      icon: <IconUsers />,
    },
    {
      title: "Subastas",
      description:
        "Participa en subastas en tiempo real. Obtén activos tokenizados al mejor precio.",
      icon: <IconGavel />,
    },
    {
      title: "Colectas",
      description:
        "Apoya causas y proyectos comunitarios. Transparencia total en cada colecta.",
      icon: <IconHeartHandshake />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800",
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
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
