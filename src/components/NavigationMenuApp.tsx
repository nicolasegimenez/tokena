import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/lib/auth";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ModeToggle } from "./mode-toggle";
import { useLanguage } from "@/lib/language";

interface SubMenuItem {
  href: string;
  title: string;
  description: string;
}

interface MenuItem {
  title: string;
  items: SubMenuItem[];
}

const menuItems: MenuItem[] = [];

interface SingleMenuItem {
  href: string;
  titleKey: string;
}

const singleMenuItems: SingleMenuItem[] = [
  { href: "/", titleKey: "Home" },
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
    <Button variant="ghost" onClick={toggleLanguage}>
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
            {menuItems.map((item: MenuItem) => (
              <div key={item.title}>
                <h3 className="font-bold">{item.title}</h3>
                {item.items.map((subItem: SubMenuItem) => (
                  <Link
                    key={subItem.href}
                    to={subItem.href}
                    className="block p-2 hover:bg-accent"
                  >
                    {subItem.title}
                  </Link>
                ))}
              </div>
            ))}
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
                  {/* Solo para demo: botón rápido para simular login */}
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
    <div className="flex w-full items-center justify-between gap-4 p-4">
      <div className="flex items-center gap-4">
        <Link to="/">
          <img
            src="https://res.cloudinary.com/dhacybdxf/image/upload/v1762901050/Investoken/investoken_solo_logo_oficial_azul_y_blanco_jdbnpk.svg"
            alt="Investoken"
            className="h-10 w-10 cursor-pointer hover:opacity-80 transition-opacity"
          />
        </Link>
        <NavigationMenu className="max-w-full">
          <NavigationMenuList>
            {menuItems.map((item: MenuItem) => (
              <NavigationMenuItem key={item.title}>
                <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {item.items.map((subItem: SubMenuItem, index: number) => (
                      <ListItem
                        key={subItem.href}
                        href={subItem.href}
                        title={subItem.title}
                        className={index === 0 ? "row-span-3" : ""}
                      >
                        {subItem.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
            {singleMenuItems.map((item: SingleMenuItem) => (
              <NavigationMenuItem key={item.href}>
                <Link to={item.href}>
                  <NavigationMenuLink className="p-2 hover:bg-accent text-lg font-semibold">
                    {t(item.titleKey)}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
          <NavigationMenuViewport />
        </NavigationMenu>
        <div>
          <Input type="search" placeholder="Search..." className="md:w-[100px] lg:w-[300px]" />
        </div>
      </div>

      <div className="flex items-center gap-2">
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
            {/* Solo para demo: botón rápido para simular login */}
            <Button variant="ghost" onClick={() => login()}>Demo Login</Button>
          </div>
        ) : null}
        {isAuthenticated && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="inline-flex items-center gap-2 rounded-full p-1 outline-none ring-0 hover:opacity-90">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user?.avatarUrl || ""} alt="Usuario" />
                  <AvatarFallback>{user?.name?.slice(0,2).toUpperCase() || "US"}</AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>{t("my_account")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile">{t("my_profile")}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/investments">{t("my_investments")}</Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link to="/benefits">{t("my_benefits")}</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/account">{t("my_account")}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={(e) => { e.preventDefault(); logout(); navigate("/login"); }}>{t("logout")}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

const ListItem = ({
  className,
  title,
  children,
  href,
  ...props
}: {
  className?: string;
  title: string;
  children: React.ReactNode;
  href: string;
}) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          to={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};

export default NavigationMenuApp;
