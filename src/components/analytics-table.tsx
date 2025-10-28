import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TokenData {
  id: number;
  name: string;
  price: number;
  change: string;
  volume: number;
}

interface AnalyticsTableProps {
  data: TokenData[];
}

export function AnalyticsTable({ data }: AnalyticsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Token</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>24h Change</TableHead>
          <TableHead>24h Volume</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((token) => (
          <TableRow key={token.id}>
            <TableCell>{token.name}</TableCell>
            <TableCell>${token.price.toFixed(2)}</TableCell>
            <TableCell className={token.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
              {token.change}
            </TableCell>
            <TableCell>${token.volume.toLocaleString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
