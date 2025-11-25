import React, { useState, useEffect, useRef, ImgHTMLAttributes } from 'react';

interface LazyImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  placeholder?: string;
  threshold?: number;
  rootMargin?: string;
  onLoad?: () => void;
  onError?: () => void;
  fallbackSrc?: string;
}

/**
 * Componente de imagen con carga lazy usando Intersection Observer
 * Optimizado para rendimiento con placeholder y manejo de errores
 */
const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlMGUwZTAiLz48L3N2Zz4=',
  threshold = 0.1,
  rootMargin = '50px',
  onLoad,
  onError,
  fallbackSrc = '/images/placeholder.png',
  className = '',
  ...props
}) => {
  const [imageSrc, setImageSrc] = useState<string>(placeholder);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Comenzar a cargar la imagen real
            loadImage();
            // Dejar de observar una vez que se inicia la carga
            if (imgRef.current) {
              observer.unobserve(imgRef.current);
            }
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [src, threshold, rootMargin]);

  /**
   * Carga la imagen real
   */
  const loadImage = () => {
    const img = new Image();

    img.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
      setHasError(false);
      if (onLoad) onLoad();
    };

    img.onerror = () => {
      setHasError(true);
      setImageSrc(fallbackSrc);
      if (onError) onError();
    };

    img.src = src;
  };

  return (
    <div className={`lazy-image-container ${className}`} style={{ position: 'relative' }}>
      <img
        ref={imgRef}
        src={imageSrc}
        alt={alt}
        className={`
          lazy-image
          ${isLoaded ? 'loaded' : 'loading'}
          ${hasError ? 'error' : ''}
          ${className}
        `}
        style={{
          transition: 'opacity 0.3s ease-in-out',
          opacity: isLoaded || hasError ? 1 : 0.5,
        }}
        {...props}
      />

      {!isLoaded && !hasError && (
        <div
          className="lazy-image-loader"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="animate-spin h-8 w-8 border-b-2 border-gray-900 rounded-full" />
        </div>
      )}
    </div>
  );
};

export default React.memo(LazyImage);