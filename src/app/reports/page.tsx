import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import reportsData from "./data.json";

export default function ReportsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Reports & Statements</h1>
      </div>

      <div className="flex flex-col gap-8">
        {/* Download Statements */}
        <Card>
          <CardHeader>
            <CardTitle>Download Statements</CardTitle>
            <CardDescription>Generate and download your account statements.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-4 items-center">
            <Select>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Select statement type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">Select a date range (DatePicker placeholder)</p>
            <Button>Generate & Download PDF</Button>
          </CardContent>
        </Card>

        {/* Tax Information */}
        <Card>
          <CardHeader>
            <CardTitle>Tax Information (2024)</CardTitle>
            <CardDescription>Summary of your capital gains and losses.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Gains</TableHead>
                  <TableHead>Losses</TableHead>
                  <TableHead>Net</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Short-term Capital</TableCell>
                  <TableCell className="text-green-500">${reportsData.capitalGains.shortTerm.gains.toFixed(2)}</TableCell>
                  <TableCell className="text-red-500">(${Math.abs(reportsData.capitalGains.shortTerm.losses).toFixed(2)})</TableCell>
                  <TableCell>${reportsData.capitalGains.shortTerm.net.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Long-term Capital</TableCell>
                  <TableCell className="text-green-500">${reportsData.capitalGains.longTerm.gains.toFixed(2)}</TableCell>
                  <TableCell className="text-red-500">(${Math.abs(reportsData.capitalGains.longTerm.losses).toFixed(2)})</TableCell>
                  <TableCell>${reportsData.capitalGains.longTerm.net.toFixed(2)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Transaction History */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>A detailed log of all your transactions.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Asset</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reportsData.transactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell>{tx.date}</TableCell>
                    <TableCell>{tx.type}</TableCell>
                    <TableCell>{tx.asset}</TableCell>
                    <TableCell>{tx.amount}</TableCell>
                    <TableCell>${tx.price.toFixed(2)}</TableCell>
                    <TableCell>${tx.total.toFixed(2)}</TableCell>
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
