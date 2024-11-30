"use client";

import { useState, useRef } from "react";
import Image from "next/image";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (event: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x =
      "touches" in event
        ? event.touches[0].clientX - rect.left
        : event.clientX - rect.left;

    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[3/4] overflow-hidden rounded-lg"
      onMouseMove={handleMove}
      onTouchMove={handleMove}
    >
      <div className="absolute inset-0">
        <Image src={afterImage} alt="After" fill className="object-cover" />
      </div>
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image src={beforeImage} alt="Before" fill className="object-cover" />
      </div>
      <div
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
          <div className="w-1 h-4 bg-gray-400 rounded-full" />
        </div>
      </div>
      <div className="absolute top-4 left-4 bg-black/50 text-white px-2 py-1 rounded">
        {beforeLabel}
      </div>
      <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded">
        {afterLabel}
      </div>
    </div>
  );
}
