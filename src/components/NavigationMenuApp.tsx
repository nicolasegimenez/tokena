import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/lib/auth";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ModeToggle } from "./mode-toggle";
import { useLanguage } from "@/lib/language";

interface SingleMenuItem {
  href: string;
  titleKey: string;
}

const singleMenuItems: SingleMenuItem[] = [
  { href: "/investments", titleKey: "my_investments" },
  { href: "/market", titleKey: "invest" },
  { href: "/trade", titleKey: "trade" },
  { href: "/create", titleKey: "create_project" },
];

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "es" ? "en" : "es");
  };

  return (
    <Button variant="ghost" size="sm" onClick={toggleLanguage}>
      {language.toUpperCase()}
    </Button>
  );
};

const NavigationMenuApp = () => {
  const isMobile = useIsMobile();
  const { isAuthenticated, user, logout, login } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <div className="p-4">
            <Menu />
          </div>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>InvestToken</SheetTitle>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            {singleMenuItems.map((item: SingleMenuItem) => (
              <Link
                key={item.href}
                to={item.href}
                className="block p-2 hover:bg-accent font-bold"
              >
                {t(item.titleKey)}
              </Link>
            ))}
            <div className="flex items-center gap-2 pt-4">
              <LanguageSwitcher />
              <ModeToggle />
              {!isAuthenticated ? (
                <div className="inline-flex items-center gap-2">
                  <Button asChild variant="outline">
                    <Link to="/registrarse">Registrarse</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/login">Iniciar sesión</Link>
                  </Button>
                  <Button variant="ghost" onClick={() => login()}>Demo</Button>
                </div>
              ) : null}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div className="flex w-full items-center justify-between gap-4 p-4 border-b">
      <div className="flex items-center gap-4">
        <Link to="/">
          <img
            src="https://res.cloudinary.com/dhacybdxf/image/upload/v1762901050/Investoken/investoken_solo_logo_oficial_azul_y_blanco_jdbnpk.svg"
            alt="Investoken"
            className="h-10 w-10 cursor-pointer hover:opacity-80 transition-opacity"
          />
        </Link>
        <div className="hidden lg:flex items-center gap-1">
          {singleMenuItems.map((item: SingleMenuItem) => (
            <Link key={item.href} to={item.href}>
              <Button variant="ghost" size="sm">
                {t(item.titleKey)}
              </Button>
            </Link>
          ))}
        </div>
        <div className="hidden md:block">
          <Input type="search" placeholder="Buscar..." className="md:w-[200px]" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <LanguageSwitcher />
        <ModeToggle />
        {!isAuthenticated ? (
          <div className="hidden sm:inline-flex items-center gap-2">
            <Button asChild variant="outline" size="sm">
              <Link to="/registrarse">Registrarse</Link>
            </Button>
            <Button asChild size="sm">
              <Link to="/login">Iniciar sesión</Link>
            </Button>
          </div>
        ) : null}
        {isAuthenticated && (
          <div className="flex items-center gap-3">
            {/* Balance Badge */}
            <div className="hidden sm:flex px-3 py-1.5 rounded-lg bg-green-600/10 backdrop-blur-sm border border-green-500/30 shadow-sm">
              <span className="text-xs font-bold text-green-600">$ 5,432.50</span>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="inline-flex items-center gap-2 p-1 rounded-full hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                  <Avatar className="h-10 w-10 ring-2 ring-primary/20 hover:ring-primary/40 transition-all">
                    <AvatarImage src={user?.avatarUrl || ""} alt={user?.name || "Usuario"} />
                    <AvatarFallback className="font-semibold bg-gradient-to-br from-primary/20 to-primary/10">
                      {user?.name?.slice(0, 2).toUpperCase() || "US"}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 p-0">
              {/* User Header */}
              <div className="px-4 py-3 border-b bg-gradient-to-r from-primary/5 to-transparent">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                    <AvatarImage src={user?.avatarUrl || ""} alt={user?.name || "Usuario"} />
                    <AvatarFallback className="font-bold text-sm">{user?.name?.slice(0, 2).toUpperCase() || "US"}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{user?.name || "Usuario"}</p>
                    <p className="text-xs text-muted-foreground truncate">{user?.email || "email@example.com"}</p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="p-2 border-b space-y-1">
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/profile" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent">
                    <span className="text-lg">👤</span>
                    <span className="text-sm font-medium">{t("my_profile")}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/investments" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent">
                    <span className="text-lg">💼</span>
                    <span className="text-sm font-medium">{t("my_investments")}</span>
                  </Link>
                </DropdownMenuItem>
              </div>

              {/* Settings */}
              <div className="p-2 border-b">
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/account" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent">
                    <span className="text-lg">⚙️</span>
                    <span className="text-sm font-medium">Configuración</span>
                  </Link>
                </DropdownMenuItem>
              </div>

              {/* Logout */}
              <div className="p-2">
                <DropdownMenuItem
                  onSelect={(e) => { e.preventDefault(); logout(); navigate("/"); }}
                  className="cursor-pointer"
                >
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-red-600 hover:bg-red-50 transition-colors">
                    <span className="text-lg">🚪</span>
                    <span className="text-sm font-medium">{t("logout")}</span>
                  </button>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavigationMenuApp;
