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
  { href: "/market", titleKey: "invest" },
  { href: "/trade", titleKey: "trade" },
  { href: "/investments", titleKey: "my_investments" },
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
      <nav className="border-b border-border/30 bg-background sticky top-0 z-50 shadow-sm">
        <div className="flex w-full items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center hover:opacity-85 transition-opacity" aria-label="Investoken">
            <img
              src="https://res.cloudinary.com/dhacybdxf/image/upload/v1762901050/Investoken/investoken_solo_logo_oficial_azul_y_blanco_jdbnpk.svg"
              alt="Investoken"
              className="h-10 w-10"
            />
          </Link>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ModeToggle />

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" aria-label="Abrir menú">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72">
                <SheetHeader className="mb-8">
                  <SheetTitle className="text-primary text-xl">Investoken</SheetTitle>
                </SheetHeader>

                <div className="space-y-3">
                  {singleMenuItems.map((item: SingleMenuItem) => (
                    <Link key={item.href} to={item.href}>
                      <div className="block px-4 py-3 text-base font-medium text-foreground hover:bg-primary/10 active:bg-primary/15 rounded-lg transition-colors">
                        {t(item.titleKey)}
                      </div>
                    </Link>
                  ))}

                  <div className="my-4 border-t border-border/50" />

                  {!isAuthenticated ? (
                    <div className="space-y-2">
                      <Button asChild variant="outline" className="w-full h-11 text-base">
                        <Link to="/registrarse">Registrarse</Link>
                      </Button>
                      <Button asChild className="w-full h-11 text-base">
                        <Link to="/login">Iniciar sesión</Link>
                      </Button>
                      <Button onClick={() => login()} variant="secondary" className="w-full h-11 text-base">
                        Demo Login
                      </Button>
                    </div>
                  ) : null}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="border-b border-border/30 bg-background sticky top-0 z-50 shadow-sm">
      <div className="flex w-full items-center justify-between gap-4 px-6 py-4">
        {/* Left: Logo + Navigation */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center hover:opacity-85 transition-opacity" aria-label="Investoken - Ir a inicio">
            <img
              src="https://res.cloudinary.com/dhacybdxf/image/upload/v1762901050/Investoken/investoken_solo_logo_oficial_azul_y_blanco_jdbnpk.svg"
              alt="Investoken"
              className="h-11 w-11"
            />
          </Link>

          {/* Desktop Navigation - Larger buttons for accessibility */}
          <div className="hidden lg:flex items-center gap-2">
            {singleMenuItems.map((item: SingleMenuItem) => (
              <Link key={item.href} to={item.href}>
                <Button variant="ghost" size="lg" className="text-base font-medium text-foreground hover:text-primary hover:bg-primary/10 active:bg-primary/15 transition-colors rounded-lg h-10">
                  {t(item.titleKey)}
                </Button>
              </Link>
            ))}
          </div>

          {/* Search - Desktop only */}
          <div className="hidden md:flex flex-1 max-w-xs">
            <Input
              type="search"
              placeholder="Buscar activos..."
              aria-label="Buscar activos"
              className="bg-card border-border/50 text-base"
            />
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
            {/* Balance Badge - Elegant Display with Strong Green */}
            <div className="hidden sm:flex px-4 py-2 rounded-lg bg-[var(--gain)]/15 backdrop-blur-sm border border-[var(--gain)]/40 shadow-sm">
              <span className="text-sm font-semibold text-[var(--gain)]">$ 5,432.50</span>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="inline-flex items-center gap-2 p-1.5 rounded-full hover:bg-primary/10 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2" aria-label="Perfil de usuario">
                  <Avatar className="h-11 w-11 ring-2 ring-primary/30 hover:ring-primary/50 transition-all">
                    <AvatarImage src={user?.avatarUrl || ""} alt={user?.name || "Usuario"} />
                    <AvatarFallback className="font-bold bg-primary/20 text-primary">
                      {user?.name?.slice(0, 2).toUpperCase() || "US"}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72 p-0 shadow-lg">
              {/* User Header - Elegant with clear info */}
              <div className="px-5 py-4 border-b border-border/50 bg-gradient-to-r from-primary/8 to-transparent">
                <div className="flex items-center gap-3">
                  <Avatar className="h-14 w-14 ring-2 ring-primary/30">
                    <AvatarImage src={user?.avatarUrl || ""} alt={user?.name || "Usuario"} />
                    <AvatarFallback className="font-bold text-base bg-primary/15 text-primary">{user?.name?.slice(0, 2).toUpperCase() || "US"}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-bold text-foreground truncate">{user?.name || "Usuario"}</p>
                    <p className="text-sm text-muted-foreground truncate">{user?.email || "email@example.com"}</p>
                  </div>
                </div>
              </div>

              {/* Quick Actions - Larger, easier to click */}
              <div className="p-3 border-b border-border/50 space-y-1">
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/profile" className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-primary/10 active:bg-primary/15 transition-colors">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-base font-medium">{t("my_profile")}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/investments" className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-primary/10 active:bg-primary/15 transition-colors">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-base font-medium">{t("my_investments")}</span>
                  </Link>
                </DropdownMenuItem>
              </div>

              {/* Settings - Clearly separated */}
              <div className="p-3 border-b border-border/50">
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/account" className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-primary/10 active:bg-primary/15 transition-colors">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-base font-medium">Configuración</span>
                  </Link>
                </DropdownMenuItem>
              </div>

              {/* Logout - Danger action, clearly visible */}
              <div className="p-3">
                <DropdownMenuItem
                  onSelect={(e) => { e.preventDefault(); logout(); navigate("/"); }}
                  className="cursor-pointer"
                >
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-md text-destructive hover:bg-destructive/10 active:bg-destructive/15 transition-colors font-medium">
                    <svg className="w-5 h-5 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className="text-base">{t("logout")}</span>
                  </button>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </div>
    </nav>
  );
};

export default NavigationMenuApp;
