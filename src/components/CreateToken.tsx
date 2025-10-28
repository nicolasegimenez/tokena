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

function CreateToken() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Security Token</CardTitle>
        <CardDescription>
          Use the TREXFactory to deploy a new T-REX compliant token.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="tokenName">Token Name</Label>
          <Input id="tokenName" placeholder="My Security Token" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="tokenSymbol">Token Symbol</Label>
          <Input id="tokenSymbol" placeholder="MST" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="initialSupply">Initial Supply</Label>
          <Input id="initialSupply" placeholder="1000000" type="number" />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Create Token</Button>
      </CardFooter>
    </Card>
  );
}

export default CreateToken;
