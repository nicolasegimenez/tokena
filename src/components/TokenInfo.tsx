import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function TokenInfo() {
  const token = {
    name: "T-REX Token",
    symbol: "TREX",
    totalSupply: "1000000",
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Token Information</CardTitle>
        <CardDescription>Details of the deployed T-REX token.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Name</span>
          <span>{token.name}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Symbol</span>
          <span>{token.symbol}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Total Supply</span>
          <span>{token.totalSupply}</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default TokenInfo;
