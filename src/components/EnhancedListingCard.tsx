import { useState } from 'react';
import { Heart, Star, CheckCircle2, Clock, TrendingUp, Share2 } from 'lucide-react';
import { Card, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SellerInfo {
  name: string;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  responseTime: string;
  totalSales: number;
}

interface EnhancedListing {
  id: string;
  projectName: string;
  tokenSymbol: string;
  quantity: number;
  pricePerToken: number;
  seller: SellerInfo;
  image: string;
  category: string;
  marketUrl: string;
  paymentMethods: string[];
  totalDuration: string;
  isBestPrice?: boolean;
  availabilityPercent?: number;
  priceHistory?: { date: string; price: number }[];
  compareSelected?: boolean;
}

interface EnhancedListingCardProps {
  listing: EnhancedListing;
  onBuyClick: (listing: EnhancedListing) => void;
  onFavoriteClick?: (listing: EnhancedListing) => void;
  onCompareClick?: (listing: EnhancedListing) => void;
  isFavorited?: boolean;
  isComparing?: boolean;
  categoryIcon: React.ComponentType<any>;
}

export function EnhancedListingCard({
  listing,
  onBuyClick,
  onFavoriteClick,
  onCompareClick,
  isFavorited = false,
  isComparing = false,
  categoryIcon: Icon,
}: EnhancedListingCardProps) {
  // useLanguage() hook available for future translations
  const [imageLoaded, setImageLoaded] = useState(false);

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={cn(
              "w-3.5 h-3.5",
              i < Math.floor(rating)
                ? "fill-amber-400 text-amber-400"
                : i < rating
                  ? "fill-amber-300 text-amber-300"
                  : "text-slate-300 dark:text-slate-600"
            )}
          />
        ))}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      className={cn(
        "h-full transition-all duration-300",
        isComparing && "ring-2 ring-emerald-500"
      )}
    >
      <Card className={cn(
        "group overflow-hidden transition-all duration-300",
        "hover:shadow-2xl border-2",
        "flex flex-col h-full",
        "border-slate-200 dark:border-slate-700 hover:border-emerald-400 dark:hover:border-emerald-600"
      )}>
        {/* Image Container with Overlay */}
        <div className="relative h-56 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
          <img
            src={listing.image}
            alt={listing.projectName}
            onLoad={() => setImageLoaded(true)}
            className={cn(
              "w-full h-full object-cover group-hover:scale-110 transition-transform duration-500",
              !imageLoaded && "opacity-0"
            )}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onFavoriteClick?.(listing)}
              className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-full p-2 shadow-lg hover:bg-white transition-colors"
            >
              <Heart
                className={cn(
                  "w-4 h-4 transition-all",
                  isFavorited ? "fill-red-500 text-red-500" : "text-slate-600 dark:text-slate-400"
                )}
              />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onCompareClick?.(listing)}
              className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-full p-2 shadow-lg hover:bg-white transition-colors"
            >
              <TrendingUp
                className={cn(
                  "w-4 h-4",
                  isComparing ? "text-emerald-600" : "text-slate-600 dark:text-slate-400"
                )}
              />
            </motion.button>
          </div>

          {/* Category & Best Price Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <Badge className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg">
              <Icon className="w-3 h-3 mr-1" />
              {listing.category}
            </Badge>
            {listing.isBestPrice && (
              <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg text-xs">
                Mejor Precio
              </Badge>
            )}
          </div>

          {/* Seller Info Overlay */}
          <div className="absolute bottom-4 left-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-lg px-3 py-2 shadow-lg">
            <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              {listing.seller.isVerified && <CheckCircle2 className="w-3 h-3" />}
              {listing.seller.name}
            </p>
            <div className="flex items-center gap-1 mt-1">
              {renderStars(listing.seller.rating)}
              <span className="text-xs text-slate-600 dark:text-slate-400 ml-1">
                ({listing.seller.reviewCount})
              </span>
            </div>
          </div>

          {/* Availability Progress */}
          {listing.availabilityPercent !== undefined && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300"
                style={{ width: `${listing.availabilityPercent}%` }}
              />
            </div>
          )}
        </div>

        {/* Card Content */}
        <CardContent className="p-5 flex-grow flex flex-col gap-3">
          {/* Title & Symbol */}
          <div>
            <CardTitle className="text-base font-bold line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              {listing.projectName}
            </CardTitle>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline" className="bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800">
                {listing.tokenSymbol}
              </Badge>
              <span className="text-xs text-muted-foreground">{listing.quantity} tokens</span>
            </div>
          </div>

          {/* Seller Trust Metrics */}
          <div className="grid grid-cols-2 gap-2 bg-slate-50 dark:bg-slate-800/30 rounded-lg p-3 border border-slate-200 dark:border-slate-700">
            <div className="text-center">
              <p className="text-xs text-muted-foreground font-medium">Ventas</p>
              <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                {listing.seller.totalSales}
              </p>
            </div>
            <div className="flex items-center gap-1 justify-center">
              <Clock className="w-3 h-3 text-muted-foreground" />
              <div className="text-center">
                <p className="text-xs text-muted-foreground font-medium">Responde</p>
                <p className="text-xs font-bold">{listing.seller.responseTime}</p>
              </div>
            </div>
          </div>

          {/* Price Highlight */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 rounded-lg p-4 border border-emerald-200/50 dark:border-emerald-800/50">
            <p className="text-xs text-muted-foreground font-medium mb-1">Precio por Token</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                ${listing.pricePerToken}
              </span>
              <span className="text-xs text-muted-foreground">USD</span>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3 border border-slate-200 dark:border-slate-700">
              <p className="text-xs text-muted-foreground font-medium">Disponibles</p>
              <p className="text-lg font-bold text-slate-900 dark:text-white">
                {listing.quantity}
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3 border border-slate-200 dark:border-slate-700">
              <p className="text-xs text-muted-foreground font-medium">Duración</p>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                {listing.totalDuration}
              </p>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">Métodos de pago</p>
            <div className="flex flex-wrap gap-1">
              {listing.paymentMethods.slice(0, 2).map(method => (
                <Badge key={method} variant="secondary" className="text-xs font-medium">
                  {method}
                </Badge>
              ))}
              {listing.paymentMethods.length > 2 && (
                <Badge variant="outline" className="text-xs font-medium">
                  +{listing.paymentMethods.length - 2}
                </Badge>
              )}
            </div>
          </div>
        </CardContent>

        {/* Actions */}
        <CardFooter className="p-4 pt-0 mt-auto gap-2 grid grid-cols-2">
          <Button
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold shadow-md hover:shadow-lg transition-all"
            onClick={() => onBuyClick(listing)}
          >
            Comprar
          </Button>
          <Button
            variant="outline"
            className="w-full border-emerald-300 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 flex items-center justify-center gap-1"
            onClick={() => {}}
          >
            <Share2 className="w-3 h-3" />
            Compartir
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
