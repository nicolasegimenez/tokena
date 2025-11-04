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

const MarketPlaceApp = () => {
    const { t, language } = useLanguage();

    const investmentsData = useMemo(() => [
        {
          id: 1,
          title: t('tokenized_apartments_title'),
          description: t('tokenized_apartments_desc'),
          price: 50000,
          roi: 12,
          duration: 24,
          available: 15,
          status: t('available'),
          category: t('real_estate'),
          image: "https://res.cloudinary.com/dhacybdxf/image/upload/v1762299810/edificio_qhi0ri.png",
          currency:"Dolares"
    
        },
        {
          id: 2,
          title: t('crypto_fund_title'),
          description: t('crypto_fund_desc'),
          price: 25000,
          roi: 18,
          duration: 12,
          available: 50,
          status: t('available'),
          category: t('crypto'),
          image: "https://res.cloudinary.com/dhacybdxf/image/upload/v1762299809/ethereum_vs8k4y.png"
        },
        {
          id: 3,
          title: t('tokenized_startup_title'),
          description: t('tokenized_startup_desc'),
          price: 75000,
          roi: 25,
          duration: 36,
          available: 8,
          status: t('sold_out'),
          category: t('startup'),
          image: "https://res.cloudinary.com/dhacybdxf/image/upload/v1762299809/startup_tb5wu3.png"
        }
      ], [language]);

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
    {investment.id === 3 ? (
      <Button className="w-full" disabled>
        {t('coming_soon')}
      </Button>
    ) : investment.status === t('sold_out') ? (
      <Button className="w-full" disabled>
        {t('sold_out')}
      </Button>
    ) : (
      <div className="flex w-full gap-2">
        <Link to={`/invest/project${investment.id}`} className="flex-1">
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