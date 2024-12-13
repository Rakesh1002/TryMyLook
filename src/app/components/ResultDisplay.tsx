"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { Button } from "./ui/button";
import { FaDownload } from "react-icons/fa";
import { toast } from "sonner";

interface ResultDisplayProps {
  outputUrl: string;
}

export default function ResultDisplay({ outputUrl }: ResultDisplayProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;

  const handleImageError = useCallback(() => {
    if (retryCount < MAX_RETRIES) {
      setTimeout(() => {
        setRetryCount((prev) => prev + 1);
        setImageError(false);
      }, 1000);
    } else {
      setImageError(true);
      toast.error("Failed to load the image. Please try again.");
    }
  }, [retryCount, MAX_RETRIES]);

  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
    setRetryCount(0);

    const preloadImage = async () => {
      try {
        const response = await fetch(outputUrl);
        if (!response.ok) throw new Error("Failed to load image");
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        const img = new window.Image();
        img.src = objectUrl;
        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = () => reject(new Error("Failed to load image"));
        });
        URL.revokeObjectURL(objectUrl);
        setImageLoaded(true);
      } catch (error) {
        handleImageError();
      }
    };

    preloadImage();
  }, [outputUrl, handleImageError]);

  const handleDownload = async () => {
    try {
      const response = await fetch(outputUrl);
      if (!response.ok) throw new Error("Failed to download image");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "virtual-tryon-result.png";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success("Image downloaded successfully!");
    } catch (error) {
      toast.error("Failed to download the image. Please try again.");
    }
  };

  return (
    <div className="relative rounded-lg overflow-hidden bg-white shadow-lg">
      {/* Loading State */}
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-lg">
          <div className="flex flex-col items-center gap-3">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent" />
            <p className="text-gray-500">
              Loading result... Attempt {retryCount + 1}/{MAX_RETRIES + 1}
            </p>
          </div>
        </div>
      )}

      {/* Error State */}
      {imageError && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-50 rounded-lg">
          <div className="flex flex-col items-center gap-3 p-4 text-center">
            <p className="text-red-500 font-medium">
              Failed to load the result. Please try again.
            </p>
            <Button
              variant="secondary"
              onClick={() => {
                setImageError(false);
                setRetryCount(0);
              }}
            >
              Retry
            </Button>
          </div>
        </div>
      )}

      {/* Image */}
      {outputUrl && (
        <div className="relative aspect-[3/4] min-h-[400px]">
          <Image
            src={outputUrl}
            alt="Virtual Try-On Result"
            className={`rounded-lg shadow-md w-full ${
              !imageLoaded ? "hidden" : ""
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={handleImageError}
            fill
            style={{ objectFit: "contain" }}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized
          />
        </div>
      )}

      {/* Download Button */}
      {imageLoaded && (
        <div className="absolute top-2 right-2 space-x-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={handleDownload}
            className="opacity-70 hover:opacity-100 transition-opacity"
          >
            <FaDownload className="mr-2" /> Download
          </Button>
        </div>
      )}
    </div>
  );
}
