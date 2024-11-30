"use client";

import Image from "next/image";

interface ImageSelectorProps {
  images: string[];
  onSelect: (imagePath: string) => void;
  className?: string;
  selectedImage?: string;
}

export default function ImageSelector({
  images,
  onSelect,
  className = "grid grid-cols-4 gap-2",
  selectedImage,
}: ImageSelectorProps) {
  return (
    <div className={className}>
      {images.map((image, index) => (
        <button
          key={index}
          onClick={() => onSelect(image)}
          className={`
            relative p-2 rounded-lg bg-white 
            transition-all duration-200 
            hover:shadow-md hover:scale-105
            focus:outline-none focus:ring-2 focus:ring-primary-500
            ${
              selectedImage === image ? "ring-2 ring-primary-500 shadow-md" : ""
            }
          `}
        >
          <Image
            src={image}
            alt={`Sample ${index + 1}`}
            width={200}
            height={200}
            className="w-full h-full object-contain"
          />
          {selectedImage === image && (
            <div className="absolute inset-0 bg-primary-500/10 rounded-lg" />
          )}
        </button>
      ))}
    </div>
  );
}
