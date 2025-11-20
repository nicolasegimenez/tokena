import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { Wallet } from "lucide-react";

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
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);

  const handleWalletConnect = async (walletId: string) => {
    setLoading(true);
    setSelectedWallet(walletId);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const mockAddress = `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`;

      login({
        name: `User ${mockAddress.slice(-4)}`,
        email: `${mockAddress}@ethereum.wallet`,
      });

      onOpenChange(false);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    } finally {
      setLoading(false);
      setSelectedWallet(null);
    }
  };

  const handleDemoLogin = () => {
    setLoading(true);
    try {
      login();
      onOpenChange(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Wallet className="h-6 w-6" />
            Login with Ethereum
          </DialogTitle>
          <DialogDescription>
            Connect your Ethereum wallet to access Investoken
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Wallet Options */}
          <div className="space-y-3">
            {walletOptions.map((wallet) => (
              <button
                key={wallet.id}
                onClick={() => handleWalletConnect(wallet.id)}
                disabled={loading}
                className="w-full flex items-center gap-4 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-accent/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center">
                  <img
                    src={wallet.logo}
                    alt={`${wallet.name} logo`}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      // Fallback to colored circle with initial if image fails to load
                      const target = e.currentTarget;
                      target.style.display = "none";
                      const parent = target.parentElement;
                      if (parent && !parent.querySelector(".fallback-circle")) {
                        const fallback = document.createElement("div");
                        fallback.className =
                          "fallback-circle w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-lg";
                        fallback.textContent = wallet.name.charAt(0);
                        parent.appendChild(fallback);
                      }
                    }}
                  />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-semibold text-base group-hover:text-primary transition-colors">
                    {wallet.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {wallet.description}
                  </div>
                </div>
                {loading && selectedWallet === wallet.id && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <svg
                      className="animate-spin h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Connecting...
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-muted-foreground/20"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or
              </span>
            </div>
          </div>

          {/* Demo Login Option */}
          <Button
            onClick={handleDemoLogin}
            variant="outline"
            className="w-full text-base h-12"
            disabled={loading}
          >
            {loading && !selectedWallet
              ? "Processing..."
              : "Continue with Demo Login"}
          </Button>

          {/* Info Box */}
          <div className="rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30 p-4">
            <p className="text-sm text-blue-900 dark:text-blue-200">
              <span className="font-semibold">🔒 Secure Connection:</span> Your
              wallet credentials never leave your device. We use
              industry-standard encryption to keep your assets safe.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-center pt-4 border-t">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            disabled={loading}
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
