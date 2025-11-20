import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { useCrossmintAuth } from "@/lib/hooks/useCrossmintAuth";
interface EthereumLoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const walletOptions = [
  {
    id: "metamask",
    name: "MetaMask",
    description: "Connect using MetaMask browser extension",
    logo: "/images/metamask-logo.png",
  },
  {
    id: "walletconnect",
    name: "WalletConnect",
    description: "Scan with mobile wallet",
    logo: "/images/Walletconnect-logo.png",
  },
  {
    id: "coinbase",
    name: "Coinbase Wallet",
    description: "Connect to your Coinbase Wallet",
    logo: "/images/coinbase-logo.png",
  },
];

const EthereumLoginModal = ({
  open,
  onOpenChange,
}: EthereumLoginModalProps) => {
  const { login, isLoading, user } = useCrossmintAuth();

  const handleLogin = () => {
    login();
  };

  if (user && open) {
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Wallet className="h-6 w-6" />
            Login to Investoken
          </DialogTitle>
          <DialogDescription>
            Choose your preferred login method
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-6">
          {/* Main Login Button */}
          <Button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full text-base h-14 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
          >
            {isLoading ? "Loading..." : "Continue"}
          </Button>

          {/* Login Methods Preview */}
          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <p className="text-sm font-semibold mb-3">
              Available login methods:
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="text-lg">📧</span>
                <span>Email (OTP)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">🔐</span>
                <span>Google</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">🐦</span>
                <span>Twitter/X</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">🦊</span>
                <span>Web3 Wallets</span>
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30 p-4">
            <p className="text-sm text-blue-900 dark:text-blue-200">
              <span className="font-semibold">🔒 Secure Authentication:</span>{" "}
              Powered by Crossmint. Your credentials are encrypted and secured
              by enterprise-grade infrastructure.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-center pt-4 border-t">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EthereumLoginModal;
