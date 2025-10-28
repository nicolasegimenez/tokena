import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import portfolioData from "./my-portfolio-data.json";

export default function PortfolioPage() {
  const totalValue = portfolioData.assets.reduce((acc, asset) => acc + (asset.quantity * asset.price), 0);

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">My Portfolio</h1>
        <div className="flex gap-2">
          <Button>Deposit</Button>
          <Button variant="outline">Withdraw</Button>
          <Button variant="secondary">Trade</Button>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        {/* Portfolio Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl sm:text-4xl font-bold">${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            <p className="text-md sm:text-lg text-muted-foreground">
              <span className={portfolioData.portfolioChange24h >= 0 ? "text-green-500" : "text-red-500"}>
                {portfolioData.portfolioChange24h >= 0 ? '+' : ''}${portfolioData.portfolioChange24h.toFixed(2)} ({portfolioData.portfolioChangePercent24h.toFixed(2)}%)
              </span>
              &nbsp;in the last 24 hours
            </p>
            <div className="h-80 mt-8">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={portfolioData.portfolioValueHistory}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis domain={['dataMin - 1000', 'dataMax + 1000']} tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      borderColor: 'hsl(var(--border))',
                    }}
                    labelStyle={{
                      color: 'hsl(var(--foreground))',
                    }}
                    itemStyle={{
                      color: 'hsl(var(--foreground))',
                    }}
                    formatter={(value) => [`${value.toLocaleString()}`, 'Value']}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="var(--color-desktop)"
                    fill="url(#colorValue)"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 8, strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* My Assets */}
        <Card>
          <CardHeader>
            <CardTitle>My Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Asset</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>24h Change</TableHead>
                  <TableHead>Holdings</TableHead>
                  <TableHead>Allocation</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {portfolioData.assets.map((asset) => {
                  const holdingValue = asset.quantity * asset.price;
                  const allocation = (holdingValue / totalValue) * 100;
                  return (
                    <TableRow key={asset.id}>
                      <TableCell className="flex items-center gap-4">
                        <img src={asset.logo} alt={asset.name} className="w-8 h-8" />
                        <div>
                          <div className="font-medium">{asset.name}</div>
                          <div className="text-sm text-muted-foreground">{asset.symbol}</div>
                        </div>
                      </TableCell>
                      <TableCell>${asset.price.toFixed(2)}</TableCell>
                      <TableCell className={asset.change24h >= 0 ? "text-green-500" : "text-red-500"}>
                        {asset.change24h.toFixed(2)}%
                      </TableCell>
                      <TableCell>
                        <div>${holdingValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <div className="text-sm text-muted-foreground">{asset.quantity} {asset.symbol}</div>
                      </TableCell>
                      <TableCell>{allocation.toFixed(2)}%</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Token</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {portfolioData.recentActivity.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell>{activity.type}</TableCell>
                    <TableCell>{activity.token}</TableCell>
                    <TableCell>{activity.amount}</TableCell>
                    <TableCell>{activity.price ? `$${activity.price.toFixed(2)}` : '-'}</TableCell>
                    <TableCell>{activity.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
