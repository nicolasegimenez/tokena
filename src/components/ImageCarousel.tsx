import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

type MediaItem = {
  url: string;
  type: 'image' | 'video';
};

interface ImageCarouselProps {
  images?: string[];
  media?: MediaItem[];
  alt?: string;
  className?: string;
}

const isVideoUrl = (url: string): boolean => {
  return /\.(mp4|webm|ogv|mov|avi|mkv)$/i.test(url) || url.includes('video_upload');
};

const convertToMediaArray = (images?: string[], media?: MediaItem[]): MediaItem[] => {
  if (media && media.length > 0) {
    return media;
  }
  if (images && images.length > 0) {
    return images.map(url => ({
      url,
      type: isVideoUrl(url) ? 'video' : 'image',
    }));
  }
  return [];
};

export const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  media,
  alt = 'Project media',
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const mediaArray = convertToMediaArray(images, media);

  if (!mediaArray || mediaArray.length === 0) {
    return (
      <div className={`w-full h-64 bg-muted rounded-lg flex items-center justify-center ${className}`}>
        <div className="text-center text-muted-foreground">
          <p className="text-sm">No media available</p>
        </div>
      </div>
    );
  }

  const currentMedia = mediaArray[currentIndex];

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? mediaArray.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === mediaArray.length - 1 ? 0 : prevIndex + 1
    );
  };

  const renderMedia = (media: MediaItem, expanded: boolean = false) => {
    const containerClass = expanded
      ? 'w-full h-full'
      : 'w-full h-full object-cover cursor-pointer hover:brightness-110 transition-brightness';

    if (media.type === 'video') {
      return (
        <video
          src={media.url}
          className={containerClass}
          controls={expanded}
          autoPlay={expanded}
          onClick={() => !expanded && setIsExpanded(true)}
          onError={(e) => {
            const video = e.target as HTMLVideoElement;
            video.style.display = 'none';
          }}
        />
      );
    }

    return (
      <img
        src={media.url}
        alt={`${alt} - ${currentIndex + 1}`}
        className={containerClass}
        onClick={() => setIsExpanded(true)}
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            'https://via.placeholder.com/600x400?text=Media+Not+Found';
        }}
      />
    );
  };

  // Floating Modal
  if (isExpanded) {
    return (
      <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setIsExpanded(false)}>
        <div className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-300" onClick={(e) => e.stopPropagation()}>
          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(false)}
            className="absolute top-3 right-3 text-white hover:bg-white/20 z-10"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </Button>

          {/* Main Media */}
          <div className="w-full h-full flex items-center justify-center">
            {renderMedia(currentMedia, true)}
          </div>

          {/* Navigation Controls - Only show if multiple media */}
          {mediaArray.length > 1 && (
            <>
              {/* Previous Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePrevious}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-20"
                aria-label="Previous media"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>

              {/* Next Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-20"
                aria-label="Next media"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>

              {/* Media Counter */}
              <div className="absolute bottom-3 right-3 bg-black/60 text-white px-3 py-1 rounded-md text-xs font-medium">
                {currentIndex + 1} / {mediaArray.length}
              </div>

              {/* Dots Indicator */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {mediaArray.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`rounded-full transition-all ${
                      index === currentIndex ? 'bg-white w-6 h-2' : 'bg-white/50 hover:bg-white/75 w-2 h-2'
                    }`}
                    aria-label={`Go to media ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // Normal Carousel View
  return (
    <div className={`relative w-full h-96 md:h-[500px] rounded-xl overflow-hidden bg-muted group shadow-lg ${className}`}>
      {/* Main Media */}
      {renderMedia(currentMedia)}

      {/* Fullscreen Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsExpanded(true)}
        className="absolute top-2 right-2 bg-black/30 hover:bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"
        aria-label="Expand to fullscreen"
      >
        <Maximize2 className="h-5 w-5" />
      </Button>

      {/* Navigation Buttons - Only show if multiple media */}
      {mediaArray.length > 1 && (
        <>
          {/* Previous Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrevious}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full p-2"
            aria-label="Previous media"
          >
            <ChevronLeft className="h-7 w-7" />
          </Button>

          {/* Next Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full p-2"
            aria-label="Next media"
          >
            <ChevronRight className="h-7 w-7" />
          </Button>

          {/* Media Counter */}
          <div className="absolute bottom-2 right-2 bg-black/40 text-white px-3 py-1 rounded-md text-xs font-medium">
            {currentIndex + 1} / {mediaArray.length}
          </div>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {mediaArray.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-white w-7 h-2.5' : 'bg-white/40 hover:bg-white/70 w-2 h-2'
                }`}
                aria-label={`Go to media ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageCarousel;
