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
import { Link } from "react-router-dom"
import PaymentDialog from "@/components/PaymentDialog"


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
      image: edificiosImg,
      currency:"Dolares"

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
    const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
    const [selectedInvestment, setSelectedInvestment] = useState<typeof investmentsData[0] | null>(null);

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
        <h1 className="text-3xl font-bold mb-2">Invest Market</h1>
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
              <div className="grid grid-cols-1 place-items-center text-center"> 
                <div>
                  <p className="text-5xl md:text-7xl font-extrabold text-green-600">{investment.roi}%</p>
                  <p className="mt-2 text-xl text-muted-foreground max-w-xs mx-auto">De Rentabilidad esperada en {investment.currency} a {investment.duration} meses</p>
                </div>
              </div>
            </CardContent>
            
  <CardFooter>
    {investment.id === 3 ? (
      <Button className="w-full" disabled>
        Próximamente
      </Button>
    ) : investment.status === "Agotado" ? (
      <Button className="w-full" disabled>
        Agotado
      </Button>
    ) : (
      <div className="flex w-full gap-2">
        <Link to={`/invest/project${investment.id}`} className="flex-1">
          <Button className="w-full bg-foreground text-background hover:bg-foreground/90" variant="default">
            Más Info
          </Button>
        </Link>
        <Button 
          className="flex-1 bg-green-600 text-white hover:bg-green-700" 
          variant="default"
          onClick={() => {
            setSelectedInvestment(investment);
            setPaymentDialogOpen(true);
          }}
        >
          Invertir
        </Button>
      </div>
    )}
  </CardFooter>
          </Card>
        ))}
      </div>
      
      {selectedInvestment && (
        <PaymentDialog
          open={paymentDialogOpen}
          onOpenChange={setPaymentDialogOpen}
          investment={selectedInvestment}
        />
      )}
    </div>
  )
}

export default MarketPlaceApp