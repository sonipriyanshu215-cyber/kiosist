"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { isSupabaseStorageUrl, supabaseImageLoader } from "@/lib/supabase/image-loader";

interface SafeImageProps extends Omit<ImageProps, "onError"> {
  placeholderClassName?: string;
}

export function SafeImage({
  className,
  alt,
  fill,
  width,
  height,
  placeholderClassName = "",
  ...props
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  // Route Supabase-hosted images through the transform endpoint (cached at
  // Supabase's CDN, resized) instead of the un-cached /object/public/ path.
  // Bundled /img/* and any other src keep Next's built-in optimiser.
  const supabaseSrc = typeof props.src === "string" && isSupabaseStorageUrl(props.src);

  if (hasError) {
    const placeholder = (
      <div
        aria-label={alt}
        role="img"
        className={`bg-kio-bg-soft ${placeholderClassName}`}
        style={
          fill
            ? undefined
            : { width: width as number, height: height as number }
        }
      />
    );

    return fill ? (
      <div className={`absolute inset-0 ${className ?? ""} bg-kio-bg-soft`}>
        {placeholder}
      </div>
    ) : placeholder;
  }

  return (
    <Image
      {...props}
      loader={supabaseSrc ? supabaseImageLoader : undefined}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
    />
  );
}
