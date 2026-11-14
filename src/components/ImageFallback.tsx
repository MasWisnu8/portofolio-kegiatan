"use client";

interface ImageFallbackProps {
  src: string;
  alt: string;
  fallbackSrc: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function ImageFallback({
  src,
  alt,
  fallbackSrc,
  width,
  height,
  className,
}: ImageFallbackProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={(e) => {
        e.currentTarget.src = fallbackSrc;
      }}
    />
  );
}
