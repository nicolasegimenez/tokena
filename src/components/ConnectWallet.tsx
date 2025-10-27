import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

const wallets = [
  { name: "MetaMask", address: "0x1234...5678" },
  { name: "Coinbase Wallet", address: "0xABCD...EFGH" },
  { name: "WalletConnect", address: "0xWXYZ...1234" },
];

function ConnectWallet() {
  const [connectedWallet, setConnectedWallet] = useState<{ name: string; address: string } | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleConnect = (wallet: { name: string; address: string }) => {
    setConnectedWallet(wallet);
    setIsOpen(false);
  };

  const handleDisconnect = () => {
    setConnectedWallet(null);
  };

  return (
    <div className="flex items-start justify-end p-4">
      {connectedWallet ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">{connectedWallet.address}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{connectedWallet.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleDisconnect}>Disconnect</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>Connect Wallet</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Connect a wallet</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {wallets.map((wallet) => (
                <Button
                  key={wallet.name}
                  variant="outline"
                  onClick={() => handleConnect(wallet)}
                >
                  {wallet.name}
                </Button>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default ConnectWallet;