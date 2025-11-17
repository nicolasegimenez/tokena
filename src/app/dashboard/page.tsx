import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { StatsCard } from "@/components/StatsCard";
import { SectionCard } from "@/components/SectionCard";
import { PageHeader } from "@/components/PageHeader";
import { TrendingUp, Wallet, DollarSign, PieChart } from 'lucide-react';
import data from "./data.json";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Premium Page Header */}
        <PageHeader
          title="Dashboard"
          description="Monitorea tu portafolio de inversiones en tiempo real"
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Dashboard', href: '/dashboard' }
          ]}
        />

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Valor Total"
            value="$45,230"
            description="De tu portafolio"
            icon={<Wallet className="w-5 h-5" />}
            change={{ value: 12.5, type: 'up', period: 'este mes' }}
            gradient
          />
          <StatsCard
            title="Ganancia"
            value="$3,450"
            description="Rendimiento acumulado"
            icon={<TrendingUp className="w-5 h-5" />}
            change={{ value: 8.2, type: 'up', period: 'desde inicio' }}
            highlight
          />
          <StatsCard
            title="Inversiones"
            value="12"
            description="Proyectos activos"
            icon={<PieChart className="w-5 h-5" />}
          />
          <StatsCard
            title="Disponible"
            value="$8,920"
            description="Para invertir"
            icon={<DollarSign className="w-5 h-5" />}
          />
        </div>

        {/* Charts and Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Main Chart */}
          <div className="lg:col-span-2">
            <SectionCard
              title="Rendimiento del Portafolio"
              description="Evolución de tu inversión en los últimos 12 meses"
              collapsible
              defaultOpen
            >
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-lg p-6 -mx-4 md:-mx-5">
                <ChartAreaInteractive />
              </div>
            </SectionCard>
          </div>

          {/* Token Information Card */}
          <div>
            <SectionCard
              title="Información del Token"
              description="Detalles de tu portafolio"
              collapsible
              defaultOpen
            >
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-lg p-4 border border-emerald-200/50 dark:border-emerald-800/50">
                  <p className="text-xs text-muted-foreground font-medium mb-1">Total de Tokens</p>
                  <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">1,250</p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-lg p-4 border border-blue-200/50 dark:border-blue-800/50">
                  <p className="text-xs text-muted-foreground font-medium mb-1">Valor Promedio</p>
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">$36.18</p>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-lg p-4 border border-amber-200/50 dark:border-amber-800/50">
                  <p className="text-xs text-muted-foreground font-medium mb-1">Diversificación</p>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-full" style={{ width: '72%' }} />
                  </div>
                  <p className="text-sm font-semibold text-amber-700 dark:text-amber-300 mt-2">72% distribuido</p>
                </div>
              </div>
            </SectionCard>
          </div>
        </div>

        {/* Data Table Section */}
        <SectionCard
          title="Transacciones Recientes"
          description="Historial de tus operaciones"
          collapsible
          defaultOpen
        >
          <div className="overflow-x-auto">
            <DataTable data={data} />
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
