
import { Outlet } from "react-router-dom";
import NavigationMenuApp from "@/components/NavigationMenuApp";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/lib/auth";

export function Layout() {
  const { isAuthenticated, login } = useAuth();
  return (
    <div>
      <header className="flex items-center justify-between p-4">
        <ModeToggle />
        {!isAuthenticated ? (
          <div className="inline-flex items-center gap-2">
            <Button asChild variant="outline">
              <Link to="/registrarse">Registrarse</Link>
            </Button>
            <Button asChild>
              <Link to="/login">Iniciar sesión</Link>
            </Button>
            {/* Solo para demo: botón rápido para simular login */}
            <Button variant="ghost" onClick={() => login()}>Demo Login</Button>
          </div>
        ) : null}
      </header>
      <NavigationMenuApp />
      <main className="p-4">
        <Outlet />
      </main>
      <footer className="text-center p-4">
        <p>© 2025 Tokena. All rights reserved.</p>
      </footer>
    </div>
  );
}
