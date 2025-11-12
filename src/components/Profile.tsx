import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Shield, Bell, Palette, Lock, FileText, Upload, CheckCircle2, AlertCircle } from "lucide-react"
import { useAuth } from "@/lib/auth"

function Profile() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Mi Perfil</h1>
        <p className="text-lg text-muted-foreground">
          Gestiona tu información personal, seguridad y preferencias
        </p>
      </div>

      {/* Profile Header Card */}
      <Card className="mb-8 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-primary/20 to-primary/10" />
        <CardContent className="pt-0">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-16 mb-6">
            <Avatar className="h-40 w-40 border-4 border-background shadow-lg">
              <AvatarImage src={user?.avatarUrl || ""} />
              <AvatarFallback className="text-4xl font-bold">
                {user?.name?.slice(0, 2).toUpperCase() || "US"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-3xl font-bold">{user?.name || "Usuario"}</h2>
              <p className="text-muted-foreground mb-3">{user?.email || "email@example.com"}</p>
              <div className="flex gap-2 flex-wrap">
                <Badge className="bg-green-600">Verificado</Badge>
                <Badge variant="secondary">Usuario Activo</Badge>
              </div>
            </div>
            <Button className="md:self-end">
              <Upload className="h-4 w-4 mr-2" />
              Cambiar Foto
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for Different Sections */}
      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="personal">
            <FileText className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Información</span>
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Seguridad</span>
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Notificaciones</span>
          </TabsTrigger>
          <TabsTrigger value="preferences">
            <Palette className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Preferencias</span>
          </TabsTrigger>
        </TabsList>

        {/* Personal Information Tab */}
        <TabsContent value="personal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Información Personal</CardTitle>
              <CardDescription>
                Actualiza tu información de perfil
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullname" className="text-base font-medium">Nombre Completo</Label>
                  <Input
                    id="fullname"
                    defaultValue={user?.name || ""}
                    placeholder="Tu nombre completo"
                    className="h-10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base font-medium">Correo Electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue={user?.email || ""}
                    placeholder="tu@email.com"
                    className="h-10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-base font-medium">Teléfono</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+54 9 11 1234-5678"
                    className="h-10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country" className="text-base font-medium">País</Label>
                  <Input
                    id="country"
                    placeholder="Argentina"
                    className="h-10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="wallet" className="text-base font-medium">Dirección de Wallet</Label>
                  <Input
                    id="wallet"
                    placeholder="0x..."
                    className="h-10 font-mono text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency" className="text-base font-medium">Moneda Preferida</Label>
                  <Input
                    id="currency"
                    defaultValue="ARS"
                    placeholder="ARS"
                    className="h-10"
                  />
                </div>
              </div>

              <Separator />

              <div className="flex justify-end gap-3">
                <Button variant="outline">Cancelar</Button>
                <Button>Guardar Cambios</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Seguridad de Cuenta</CardTitle>
              <CardDescription>
                Protege tu cuenta con estas opciones de seguridad
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <Lock className="h-5 w-5 text-muted-foreground mt-1" />
                    <div>
                      <h4 className="font-semibold">Contraseña</h4>
                      <p className="text-sm text-muted-foreground">Última modificación hace 3 meses</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Cambiar</Button>
                </div>
              </div>

              <Separator />

              {/* 2FA */}
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-4">
                    <Shield className="h-5 w-5 text-green-600 mt-1" />
                    <div>
                      <h4 className="font-semibold">Autenticación de Dos Factores</h4>
                      <p className="text-sm text-muted-foreground">
                        Añade una capa adicional de seguridad a tu cuenta
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Activo
                    </Badge>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <Separator />

              {/* KYC Status */}
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-4">
                    <FileText className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-semibold">Verificación KYC/AML</h4>
                      <p className="text-sm text-muted-foreground">
                        Tu identidad ha sido verificada correctamente
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge className="bg-green-600">Verificado</Badge>
                    <Button variant="link" size="sm" className="text-xs">
                      Ver Documentos
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Sessions */}
              <div>
                <h4 className="font-semibold mb-4">Sesiones Activas</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium text-sm">Google Chrome - Windows</p>
                      <p className="text-xs text-muted-foreground">Última actividad hace 5 minutos</p>
                    </div>
                    <Badge variant="secondary" className="text-xs">Actual</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Safari - iPhone</p>
                      <p className="text-xs text-muted-foreground">Última actividad hace 2 horas</p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                      Cerrar
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Preferencias de Notificaciones</CardTitle>
              <CardDescription>
                Controla cómo y cuándo recibir notificaciones
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Email Notifications */}
              <div>
                <h4 className="font-semibold mb-4">Notificaciones por Email</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Nuevas Oportunidades de Inversión</p>
                      <p className="text-sm text-muted-foreground">Recibe notificaciones de nuevos proyectos</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Cambios en mis Inversiones</p>
                      <p className="text-sm text-muted-foreground">Alertas de cambios en el valor de tus tokens</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Reportes Mensuales</p>
                      <p className="text-sm text-muted-foreground">Resumen mensual de tu portafolio</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Actualizaciones de la Plataforma</p>
                      <p className="text-sm text-muted-foreground">Nuevas funcionalidades y mejoras</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Push Notifications */}
              <div>
                <h4 className="font-semibold mb-4">Notificaciones Push</h4>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Notificaciones en el Navegador</p>
                    <p className="text-sm text-muted-foreground">Alertas en tiempo real mientras navegas</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Preferencias de Interfaz</CardTitle>
              <CardDescription>
                Personaliza tu experiencia en la plataforma
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Theme */}
              <div>
                <h4 className="font-semibold mb-4">Apariencia</h4>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Modo Oscuro</p>
                    <p className="text-sm text-muted-foreground">Reduce la fatiga visual en condiciones de poca luz</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <Separator />

              {/* Language & Region */}
              <div>
                <h4 className="font-semibold mb-4">Idioma y Región</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="language" className="text-base font-medium">Idioma</Label>
                    <Input
                      id="language"
                      defaultValue="Español"
                      className="h-10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone" className="text-base font-medium">Zona Horaria</Label>
                    <Input
                      id="timezone"
                      defaultValue="GMT-3"
                      className="h-10"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Data & Privacy */}
              <div>
                <h4 className="font-semibold mb-4">Datos y Privacidad</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Compartir Datos de Analítica</p>
                      <p className="text-sm text-muted-foreground">Nos ayuda a mejorar la plataforma</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Marketing Personalizado</p>
                      <p className="text-sm text-muted-foreground">Ofertas y contenido relevante para ti</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Danger Zone */}
              <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                <h4 className="font-semibold text-red-900 mb-3 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Zona de Peligro
                </h4>
                <p className="text-sm text-red-800 mb-4">
                  Estas acciones son irreversibles. Por favor, procede con cuidado.
                </p>
                <Button variant="destructive" className="w-full md:w-auto">
                  Eliminar Cuenta Permanentemente
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Footer Actions */}
      <div className="mt-8 flex justify-between gap-4">
        <Button variant="outline">
          Descargar mis Datos
        </Button>
        <div className="flex gap-3">
          <Button variant="outline">
            Cancelar
          </Button>
          <Button>
            Guardar Cambios
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Profile;
