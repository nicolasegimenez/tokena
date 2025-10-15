import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import edificiosImg from "@/assets/edificio.png"
import ethereumImg from "@/assets/ethereum.png"
import startupImg from "@/assets/startup.png"

const MarketPlaceApp = () => {
  const investments = [
    {
      id: 1,
      title: "Departamentos Pozo Tokenizados",
      description: "Inversión en departamentos de lujo en zona premium con tokenización completa",
      price: "$50,000",
      roi: "12%",
      duration: "24 meses",
      available: "15 tokens",
      status: "Disponible",
      category: "Real Estate",
      image: edificiosImg
    },
    {
      id: 2,
      title: "Fondo de Criptomonedas",
      description: "Portfolio diversificado de criptomonedas principales con gestión profesional",
      price: "$25,000",
      roi: "18%",
      duration: "12 meses",
      available: "50 tokens",
      status: "Disponible",
      category: "Crypto",
      image: ethereumImg
    },
    {
      id: 3,
      title: "Startup Tech Tokenizada",
      description: "Participación en startup de tecnología con gran potencial de crecimiento",
      price: "$75,000",
      roi: "25%",
      duration: "36 meses",
      available: "8 tokens",
      status: "Agotado",
      category: "Startup",
      image: startupImg
    }
  ]

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Market Place</h1>
        <p className="text-muted-foreground">
          Descubre oportunidades de inversión tokenizadas
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {investments.map((investment) => (
          <Card key={investment.id} className="hover:shadow-lg transition-shadow">
            {investment.image && (
              <div className="h-48 w-full overflow-hidden rounded-t-lg">
                <img 
                  src={investment.image} 
                  alt={investment.title}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
  <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <Badge variant="secondary">{investment.category}</Badge>
                <Badge 
                  variant={investment.status === "Disponible" ? "default" : "destructive"}
                >
                  {investment.status}
                </Badge>
              </div>
              <CardTitle className="text-xl">{investment.title}</CardTitle>
              <CardDescription className="text-sm">
                {investment.description}
              </CardDescription>
  </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-muted-foreground">Precio por token</p>
                  <p className="text-lg font-bold">{investment.price}</p>
                </div>
                <div>
                  <p className="font-medium text-muted-foreground">ROI Esperado</p>
                  <p className="text-lg font-bold text-green-600">{investment.roi}</p>
                </div>
                <div>
                  <p className="font-medium text-muted-foreground">Duración</p>
                  <p className="font-semibold">{investment.duration}</p>
                </div>
                <div>
                  <p className="font-medium text-muted-foreground">Disponibles</p>
                  <p className="font-semibold">{investment.available}</p>
                </div>
              </div>
  </CardContent>
            
  <CardFooter>
              <Button 
                className="w-full" 
                disabled={investment.status === "Agotado"}
              >
                {investment.status === "Agotado" ? "Agotado" : "Invertir"}
              </Button>
  </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default MarketPlaceApp