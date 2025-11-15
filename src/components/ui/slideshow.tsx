import { useState } from "react";
import "./slideshow.css";

export interface SlideData {
  img: string;
  title: string;
  description?: string;
  link?: string;
}

interface SlideshowProps {
  slides: SlideData[];
}

export default function Slideshow({ slides }: SlideshowProps) {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="slideshow">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`slide ${i === current ? "active" : ""}`}
          style={{ backgroundImage: `url(${slide.img})` }}
        >
          <div className="slide-overlay"></div>
          <div className="slide-text">
            <h2>{slide.title}</h2>
            {slide.description && <p>{slide.description}</p>}
            {slide.link && (
              <a href={slide.link} className="slide-link">
                Ver detalles
              </a>
            )}
          </div>
        </div>
      ))}

      {/* Controls */}
      <button className="nav left" onClick={prevSlide} aria-label="Anterior">
        ←
      </button>
      <button className="nav right" onClick={nextSlide} aria-label="Siguiente">
        →
      </button>

      {/* Counter */}
      <div className="counter">
        0{current + 1} / 0{slides.length}
      </div>

      {/* Dots */}
      <div className="dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === current ? "active" : ""}`}
            onClick={() => setCurrent(i)}
            aria-label={`Ir a slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
