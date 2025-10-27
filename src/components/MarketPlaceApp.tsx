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
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"

const investmentsData = [
    {
      id: 1,
      title: "Departamentos Pozo Tokenizados",
      description: "Inversión en departamentos de lujo en zona premium con tokenización completa",
      price: 50000,
      roi: 12,
      duration: 24,
      available: 15,
      status: "Disponible",
      category: "Real Estate",
      image: edificiosImg
    },
    {
      id: 2,
      title: "Fondo de Criptomonedas",
      description: "Portfolio diversificado de criptomonedas principales con gestión profesional",
      price: 25000,
      roi: 18,
      duration: 12,
      available: 50,
      status: "Disponible",
      category: "Crypto",
      image: ethereumImg
    },
    {
      id: 3,
      title: "Startup Tech Tokenizada",
      description: "Participación en startup de tecnología con gran potencial de crecimiento",
      price: 75000,
      roi: 25,
      duration: 36,
      available: 8,
      status: "Agotado",
      category: "Startup",
      image: startupImg
    }
  ]

const MarketPlaceApp = () => {
    const [investments, setInvestments] = useState(investmentsData);
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("all");
    const [sortBy, setSortBy] = useState("default");

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        filterAndSortInvestments(event.target.value, category, sortBy);
    };

    const handleCategoryChange = (value: string) => {
        setCategory(value);
        filterAndSortInvestments(searchTerm, value, sortBy);
    };

    const handleSortByChange = (value: string) => {
        setSortBy(value);
        filterAndSortInvestments(searchTerm, category, value);
    };

    const filterAndSortInvestments = (search: string, cat: string, sort: string) => {
        let filtered = investmentsData.filter(investment => 
            investment.title.toLowerCase().includes(search.toLowerCase()) ||
            investment.description.toLowerCase().includes(search.toLowerCase())
        );

        if (cat !== "all") {
            filtered = filtered.filter(investment => investment.category === cat);
        }

        if (sort === "price-asc") {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sort === "price-desc") {
            filtered.sort((a, b) => b.price - a.price);
        } else if (sort === "roi-desc") {
            filtered.sort((a, b) => b.roi - a.roi);
        }

        setInvestments(filtered);
    };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Market Place</h1>
        <p className="text-muted-foreground">
          Descubre oportunidades de inversión tokenizadas
        </p>
      </div>
      <div className="flex justify-between mb-4">
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="max-w-sm"
        />
        <div className="flex gap-2">
            <Select onValueChange={handleCategoryChange} defaultValue="all">
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="Real Estate">Real Estate</SelectItem>
                    <SelectItem value="Crypto">Crypto</SelectItem>
                    <SelectItem value="Startup">Startup</SelectItem>
                </SelectContent>
            </Select>
            <Select onValueChange={handleSortByChange} defaultValue="default">
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="roi-desc">ROI: High to Low</SelectItem>
                </SelectContent>
            </Select>
        </div>
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
                  <p className="text-lg font-bold">${investment.price.toLocaleString()}</p>
                </div>
                <div>
                  <p className="font-medium text-muted-foreground">ROI Esperado</p>
                  <p className="text-lg font-bold text-green-600">{investment.roi}%</p>
                </div>
                <div>
                  <p className="font-medium text-muted-foreground">Duración</p>
                  <p className="font-semibold">{investment.duration} meses</p>
                </div>
                <div>
                  <p className="font-medium text-muted-foreground">Disponibles</p>
                  <p className="font-semibold">{investment.available} tokens</p>
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