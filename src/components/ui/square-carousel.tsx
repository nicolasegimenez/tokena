"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface CarouselImage {
  url: string;
  alt: string;
}

export const SquareCarousel = ({ images }: { images: CarouselImage[] }) => {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay, images.length]);

  return (
    <div className="w-full">
      {/* Carousel Container */}
      <div className="relative w-full max-w-5xl mx-auto">
        <div className="relative w-full aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5 shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.img
              key={current}
              src={images[current].url}
              alt={images[current].alt}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6 }}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>

          {/* Dots Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
            {images.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setCurrent(index);
                  setAutoplay(false);
                  setTimeout(() => setAutoplay(true), 8000);
                }}
                className={`rounded-full transition-all ${
                  index === current
                    ? "bg-white w-10 h-3"
                    : "bg-white/50 hover:bg-white/75 w-3 h-3"
                }`}
                aria-label={`Ir a imagen ${index + 1}`}
                whileHover={{ scale: 1.1 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
