import {
  NavigationMenu,
  NavigationMenuContent,

  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

const NavigationMenuApp = () => {
  return (
    <NavigationMenu className="max-w-full">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Dashboard</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Tokena Dashboard
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Gestiona tus inversiones y tokens de manera inteligente
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/portfolio" title="Portfolio">
                Visualiza tu cartera de inversiones
              </ListItem>
              <ListItem href="/analytics" title="Analytics">
                Análisis detallado de rendimiento
              </ListItem>
              <ListItem href="/reports" title="Reportes">
                Reportes mensuales y trimestrales
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuTrigger>Inversiones</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <ListItem href="/investments/new" title="Nueva Inversión">
                Crear una nueva inversión
              </ListItem>
              <ListItem href="/investments/active" title="Inversiones Activas">
                Ver inversiones en curso
              </ListItem>
              <ListItem href="/investments/history" title="Historial">
                Historial completo de inversiones
              </ListItem>
              <ListItem href="/investments/strategies" title="Estrategias">
                Estrategias de inversión recomendadas
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink href="/market">
            Market Place
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink href="/settings">
            Profile
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuViewport />
    </NavigationMenu>
  )
}

const ListItem = ({
  className,
  title,
  children,
  href,
  ...props
}: {
  className?: string
  title: string
  children: React.ReactNode
  href: string
}) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          href={href}
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
        </a>
      </NavigationMenuLink>
    </li>
  )
}

export default NavigationMenuApp