
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
import { Link } from "react-router-dom";

const menuItems = [
  {
    title: "Dashboard",
    items: [
      {
        href: "/",
        title: "Tokena Dashboard",
        description: "Gestiona tus inversiones y tokens de manera inteligente",
      },
      {
        href: "/portfolio",
        title: "Portfolio",
        description: "Visualiza tu cartera de inversiones",
      },
      {
        href: "/analytics",
        title: "Analytics",
        description: "Análisis detallado de rendimiento",
      },
      {
        href: "/reports",
        title: "Reportes",
        description: "Reportes mensuales y trimestrales",
      },
    ],
  },
  {
    title: "Inversiones",
    items: [
      {
        href: "/investments/new",
        title: "Nueva Inversión",
        description: "Crear una nueva inversión",
      },
      {
        href: "/investments/active",
        title: "Inversiones Activas",
        description: "Ver inversiones en curso",
      },
      {
        href: "/investments/history",
        title: "Historial",
        description: "Historial completo de inversiones",
      },
      {
        href: "/investments/strategies",
        title: "Estrategias",
        description: "Estrategias de inversión recomendadas",
      },
    ],
  },
];

const singleMenuItems = [
  { href: "/market", title: "Market Place" },
  { href: "/profile", title: "Profile" },
];

const NavigationMenuApp = () => {
  const isMobile = useIsMobile();

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
            <SheetTitle>Tokena</SheetTitle>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            {menuItems.map((item) => (
              <div key={item.title}>
                <h3 className="font-bold">{item.title}</h3>
                {item.items.map((subItem) => (
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
            {singleMenuItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="block p-2 hover:bg-accent font-bold"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <NavigationMenu className="max-w-full">
      <NavigationMenuList>
        {menuItems.map((item) => (
          <NavigationMenuItem key={item.title}>
            <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {item.items.map((subItem, index) => (
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
        {singleMenuItems.map((item) => (
          <NavigationMenuItem key={item.href}>
            <Link to={item.href}>
              <NavigationMenuLink className="p-2 hover:bg-accent">
                {item.title}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
      <NavigationMenuViewport />
    </NavigationMenu>
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
