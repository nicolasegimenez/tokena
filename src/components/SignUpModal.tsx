import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth";
import { Mail, Lock } from "lucide-react";

interface SignUpModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SignUpModal = ({ open, onOpenChange }: SignUpModalProps) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDemoLogin = () => {
    setLoading(true);
    try {
      login({
        name: "Usuario Demo",
        email: email || "demo@investoken.com",
      });
      setEmail("");
      setPassword("");
      onOpenChange(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!email || !password) {
      alert("Por favor completa todos los campos");
      return;
    }

    setLoading(true);
    try {
      // Simulación de registro
      await new Promise(resolve => setTimeout(resolve, 1000));

      login({
        name: email.split("@")[0],
        email: email,
      });

      setEmail("");
      setPassword("");
      onOpenChange(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Crear Cuenta</DialogTitle>
          <DialogDescription>
            Crea tu cuenta en Investoken para acceder a oportunidades de inversión tokenizadas
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Correo electrónico
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          {/* Contraseña */}
          <div className="space-y-2">
            <Label htmlFor="password" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Contraseña
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-muted-foreground/20"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">O</span>
            </div>
          </div>

          {/* Demo Login Button */}
          <Button
            onClick={handleDemoLogin}
            variant="outline"
            className="w-full text-base h-10"
            disabled={loading}
          >
            {loading ? "Procesando..." : "Prueba con Demo Login"}
          </Button>

          {/* Info Box */}
          <div className="rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30 p-4">
            <p className="text-sm text-blue-900 dark:text-blue-200">
              💡 <strong>Demo Login</strong> te permite explorar Investoken sin necesidad de registrarte con tus datos reales.
            </p>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex gap-3 pt-4 border-t">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSignUp}
            disabled={loading || !email || !password}
            className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
          >
            {loading ? "Procesando..." : "Crear Cuenta"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignUpModal;
