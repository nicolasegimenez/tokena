import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import data from "./data.json";

export default function Page() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col gap-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <ChartAreaInteractive />
          </div>
          <div className="md:col-span-1">
            <div className="rounded-xl border bg-card text-card-foreground shadow">
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="font-semibold leading-none tracking-tight">Token Information</h3>
                <p className="text-sm text-muted-foreground">Details about your token</p>
              </div>
              <div className="p-6 pt-0">
                <p>Some token information here.</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <DataTable data={data} />
        </div>
      </div>
    </div>
  );
}
