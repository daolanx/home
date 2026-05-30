interface ImageLoaderProps {
  src: string;
  width: number;
  quality?: number;
}

export default function r2ImageLoader({ src, width, quality }: ImageLoaderProps) {
  const q = quality || 75;
  return `${src}?w=${width}&q=${q}`;
}
