"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";

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
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
    />
  );
}
