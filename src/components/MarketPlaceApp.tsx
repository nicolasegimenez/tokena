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



import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState, useMemo } from "react"
import { Link } from "react-router-dom"
import PaymentDialog from "@/components/PaymentDialog"
import { useLanguage } from "@/lib/language"
import { marketProjects } from "@/lib/market-data"

const labels = {
  es: {
    invest_market: "Invest Market",
    discover_tokenized_opportunities: "Descubre oportunidades de inversión tokenizadas",
    search: "Buscar...",
    category: "Categoría",
    all: "Todos",
    real_estate: "Real Estate",
    crypto: "Crypto",
    startup: "Startup",
    entertainment: "Entretenimiento",
    sort_by: "Ordenar por",
    default: "Defecto",
    price_asc: "Precio: Menor a Mayor",
    price_desc: "Precio: Mayor a Menor",
    roi_desc: "ROI: Mayor a Menor",
    available: "Disponible",
    sold_out: "Agotado",
    expected_return: "De Rentabilidad esperada en {currency} a {duration} meses",
    more_info: "Más Info",
    invest: "Invertir",
    project_1_name: "The Residents – Inversión Inmobiliaria Premium",
    project_2_name: "Fondo de Criptomonedas",
    project_3_name: "Campo Santa Lucía – Zona Núcleo",
    project_4_name: "Tokenización de Ganado – Vaca Alfa",
    project_5_name: "Polo Horse Token – \"Embajador\"",
    project_6_name: "Recital Tokenizado – \"LUNA EN VIVO 2025\"",
  },
  en: {
    invest_market: "Invest Market",
    discover_tokenized_opportunities: "Discover tokenized investment opportunities",
    search: "Search...",
    category: "Category",
    all: "All",
    real_estate: "Real Estate",
    crypto: "Crypto",
    startup: "Startup",
    entertainment: "Entertainment",
    sort_by: "Sort by",
    default: "Default",
    price_asc: "Price: Low to High",
    price_desc: "Price: High to Low",
    roi_desc: "ROI: High to Low",
    available: "Available",
    sold_out: "Sold Out",
    expected_return: "Expected return in {currency} in {duration} months",
    more_info: "More Info",
    invest: "Invest",
    project_1_name: "The Residents – Premium Real Estate Investment",
    project_2_name: "Cryptocurrency Fund",
    project_3_name: "Santa Lucía Field – Core Zone",
    project_4_name: "Livestock Tokenization – Vaca Alfa",
    project_5_name: "Polo Horse Token – \"Ambassador\"",
    project_6_name: "Tokenized Concert – \"LUNA LIVE 2025\"",
  }
};

const MarketPlaceApp = () => {
    const { language } = useLanguage();
    const t = (key: keyof typeof labels.es, vars?: Record<string, any>) => {
      let text = labels[language][key] || '';
      if (vars) {
        Object.keys(vars).forEach(key => {
          text = text.replace(`{${key}}`, vars[key]);
        });
      }
      return text;
    };

    const investmentsData = useMemo(() =>
      marketProjects.map((project) => {
        const projectNameKey = `project_${project.id}_name` as keyof typeof labels.es;
        return {
          id: parseInt(project.id),
          title: t(projectNameKey),
          description: t(projectNameKey),
          price: project.pricePerToken * 100,
          roi: 15,
          duration: parseInt(project.totalDuration.replace(/[^0-9]/g, '')),
          available: project.quantity,
          status: project.quantity > 0 ? t('available') : t('sold_out'),
          category: project.category,
          image: project.image,
          currency: "USD",
          marketUrl: project.marketUrl,
          paymentMethods: project.paymentMethods,
        };
      })
    , [language, t]);

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
        <h1 className="text-3xl font-bold mb-2">{t('invest_market')}</h1>
        <p className="text-muted-foreground">
          {t('discover_tokenized_opportunities')}
        </p>
      </div>
      <div className="flex justify-between mb-4">
        <Input
          placeholder={t('search')}
          value={searchTerm}
          onChange={handleSearch}
          className="max-w-sm"
        />
        <div className="flex gap-2">
            <Select onValueChange={handleCategoryChange} defaultValue="all">
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={t('category')} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">{t('all')}</SelectItem>
                    <SelectItem value="Real Estate">{t('real_estate')}</SelectItem>
                    <SelectItem value="Crypto">{t('crypto')}</SelectItem>
                    <SelectItem value="Startup">{t('startup')}</SelectItem>
                    <SelectItem value="Entretenimiento">{t('entertainment')}</SelectItem>
                </SelectContent>
            </Select>
            <Select onValueChange={handleSortByChange} defaultValue="default">
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={t('sort_by')} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="default">{t('default')}</SelectItem>
                    <SelectItem value="price-asc">{t('price_asc')}</SelectItem>
                    <SelectItem value="price-desc">{t('price_desc')}</SelectItem>
                    <SelectItem value="roi-desc">{t('roi_desc')}</SelectItem>
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
                  variant={investment.status === t('available') ? "default" : "destructive"}
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
                  <p className="mt-2 text-xl text-muted-foreground max-w-xs mx-auto">{t('expected_return', { currency: investment.currency, duration: investment.duration })}</p>
                </div>
              </div>
            </CardContent>
            
  <CardFooter>
    {investment.status === t('sold_out') ? (
      <Button className="w-full" disabled>
        {t('sold_out')}
      </Button>
    ) : (
      <div className="flex w-full gap-2">
        <Link to={investment.marketUrl} className="flex-1">
          <Button className="w-full bg-foreground text-background hover:bg-foreground/90" variant="default">
            {t('more_info')}
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
          {t('invest')}
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
