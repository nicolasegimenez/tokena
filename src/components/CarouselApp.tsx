import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"




const investments = [
    {
      id: 1,
      title: "Departamentos Pozo Tokenizados",
      description: "Inversión en departamentos de lujo en zona premium con tokenización completa",
      image: "https://res.cloudinary.com/dhacybdxf/image/upload/v1762299810/edificio_qhi0ri.png"
    },
    {
      id: 2,
      title: "Fondo de Criptomonedas",
      description: "Portfolio diversificado de criptomonedas principales con gestión profesional",
      image: "https://res.cloudinary.com/dhacybdxf/image/upload/v1762299809/ethereum_vs8k4y.png"
    },
    {
      id: 3,
      title: "Startup Tech Tokenizada",
      description: "Participación en startup de tecnología con gran potencial de crecimiento",
      image: "https://res.cloudinary.com/dhacybdxf/image/upload/v1762299809/startup_tb5wu3.png"
    }
  ]

const CarouselApp = () => {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {investments.map((investment) => (
          <CarouselItem key={investment.id}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-video items-center justify-center p-6 relative">
                    <img src={investment.image} alt={investment.title} className="absolute top-0 left-0 w-full h-full object-cover" />
                    <div className="z-10 text-white bg-black bg-opacity-50 p-4 rounded-lg">
                        <h3 className="text-2xl font-semibold">{investment.title}</h3>
                        <p>{investment.description}</p>
                    </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export default CarouselApp