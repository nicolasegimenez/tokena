import { useAuth } from "@/lib/auth";
import { lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const CarouselApp = lazy(() => import("@/components/CarouselApp"));
const MarketPlaceApp = lazy(() => import("@/components/MarketPlaceApp"));
const LandingPage = lazy(() => import("@/app/landing/page"));

export default function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"><Skeleton className="w-1/2 h-1/2" /></div>}>
      {isAuthenticated ? (
        // Usuario autenticado: mostrar Carousel + MarketPlace
        <div>
          <CarouselApp />
          <MarketPlaceApp />
        </div>
      ) : (
        // Usuario no autenticado: mostrar Landing Page
        <LandingPage />
      )}
    </Suspense>
  );
}
