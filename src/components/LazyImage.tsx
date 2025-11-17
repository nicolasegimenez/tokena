import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  placeholder?: string;
  loading?: 'lazy' | 'eager';
  quality?: 'low' | 'medium' | 'high';
  onLoad?: () => void;
}

/**
 * Componente de imagen optimizado para PWA
 * Soporta lazy loading, responsive srcset, y placeholders
 */
export function LazyImage({
  src,
  alt,
  className,
  width,
  height,
  placeholder,
  loading = 'lazy',
  quality = 'medium',
  onLoad,
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(placeholder || '');
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Si el navegador soporta Intersection Observer, usar lazy loading
    if (loading === 'lazy' && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting && imgRef.current) {
              setImgSrc(src);
              observer.unobserve(imgRef.current);
            }
          });
        },
        { rootMargin: '50px' }
      );

      if (imgRef.current) {
        observer.observe(imgRef.current);
      }

      return () => {
        if (imgRef.current) {
          observer.unobserve(imgRef.current);
        }
      };
    } else {
      // Fallback para navegadores viejos
      setImgSrc(src);
    }
  }, [src, loading]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  // Generar srcset responsivo para Cloudinary
  const generateSrcSet = () => {
    if (!src.includes('cloudinary')) {
      return '';
    }

    // Reemplazar 'upload' con 'upload/w_{width}/q_{quality}'
    const baseUrl = src.replace(
      '/upload/',
      `/upload/f_auto/q_${quality === 'low' ? 60 : quality === 'high' ? 90 : 75}/`
    );

    return [
      `${baseUrl.replace('/upload/', '/upload/w_320/').replace(/\/upload\/w_\d+\//, '/upload/w_320/')} 320w`,
      `${baseUrl.replace(/\/upload\/w_\d+\//, '/upload/w_640/')} 640w`,
      `${baseUrl.replace(/\/upload\/w_\d+\//, '/upload/w_1024/')} 1024w`,
      `${baseUrl.replace(/\/upload\/w_\d+\//, '/upload/w_1920/')} 1920w`,
    ].join(', ');
  };

  const sizes = width ? `${width}px` : '(max-width: 640px) 100vw, 50vw';

  return (
    <div className={cn('relative overflow-hidden bg-slate-100 dark:bg-slate-800', className)}>
      <img
        ref={imgRef}
        src={imgSrc || placeholder}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        srcSet={generateSrcSet()}
        sizes={sizes}
        className={cn(
          'w-full h-full object-cover transition-opacity duration-300',
          isLoaded ? 'opacity-100' : 'opacity-0'
        )}
        onLoad={handleLoad}
        decoding="async"
      />
      {!isLoaded && placeholder && (
        <div
          className="absolute inset-0"
          style={{ backgroundImage: `url(${placeholder})`, backgroundSize: 'cover' }}
        />
      )}
    </div>
  );
}

/**
 * Preload de imagen para mejorar performance
 */
export function useImagePreload(src: string) {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [src]);
}

/**
 * Componente picture responsivo con múltiples fuentes
 */
interface ResponsivePictureProps {
  desktop: string;
  tablet: string;
  mobile: string;
  alt: string;
  className?: string;
}

export function ResponsivePicture({
  desktop,
  tablet,
  mobile,
  alt,
  className,
}: ResponsivePictureProps) {
  return (
    <picture>
      <source media="(min-width: 1024px)" srcSet={desktop} />
      <source media="(min-width: 640px)" srcSet={tablet} />
      <img
        src={mobile}
        alt={alt}
        className={className}
        loading="lazy"
        decoding="async"
      />
    </picture>
  );
}
