"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

  const next = () => {
    setCurrent((prev) => (prev + 1) % images.length);
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 8000);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 8000);
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-16 md:mb-20">
        <div className="inline-block mb-6">
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">
            Galería de Inversión
          </span>
        </div>
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-foreground">
          Oportunidades de Inversión
        </h2>
        <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
          Acceso a proyectos de inversión tokenizados. Participa en grandes oportunidades con pequeñas inversiones, diversifica tu portafolio y crece tu patrimonio de forma segura.
        </p>
      </div>

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

          {/* Navigation Buttons */}
          <button
            onClick={prev}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm transition-all duration-300 group"
            aria-label="Imagen anterior"
          >
            <ChevronLeft className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
          </button>

          <button
            onClick={next}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm transition-all duration-300 group"
            aria-label="Siguiente imagen"
          >
            <ChevronRight className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
          </button>

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

      {/* Image Counter and Description */}
      <div className="text-center mt-10">
        <div className="text-sm font-medium text-primary mb-2">
          {current + 1} / {images.length}
        </div>
        <p className="text-foreground/60">Desplázate para explorar más oportunidades</p>
      </div>
    </div>
  );
};
