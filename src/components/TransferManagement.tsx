import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function TransferManagement() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transfer Tokens</CardTitle>
        <CardDescription>
          Send T-REX tokens to another address, respecting compliance rules.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="recipient">Recipient Address</Label>
          <Input id="recipient" placeholder="0x..." />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="amount">Amount</Label>
          <Input id="amount" placeholder="100" type="number" />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Transfer</Button>
      </CardFooter>
    </Card>
  );
}

export default TransferManagement;
