import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const CarouselApp = () => {
  return (
    <Carousel className="w-full max-w-xs mx-auto">
      <CarouselContent>
        <CarouselItem>
          <div className="p-1">
            <div className="flex aspect-square items-center justify-center p-6 bg-gray-100 rounded-lg">
              <span className="text-4xl font-semibold">Inversion 1</span>
            </div>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="p-1">
            <div className="flex aspect-square items-center justify-center p-6 bg-gray-100 rounded-lg">
              <span className="text-4xl font-semibold">Inversion 2</span>
            </div>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="p-1">
            <div className="flex aspect-square items-center justify-center p-6 bg-gray-100 rounded-lg">
              <span className="text-4xl font-semibold">Inversion 3</span>
            </div>
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export default CarouselApp