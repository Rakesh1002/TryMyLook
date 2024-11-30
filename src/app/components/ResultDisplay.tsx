"use client";

import { useState, useEffect } from "react";
import { FaDownload } from "react-icons/fa";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import Image from "next/image";

interface ResultDisplayProps {
  outputUrl: string | null;
}

export default function ResultDisplay({ outputUrl }: ResultDisplayProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (outputUrl) {
      setImageLoaded(false);
      setImageError(false);
      // Preload image
      const img = new window.Image();
      img.src = outputUrl;
      img.onload = () => setImageLoaded(true);
      img.onerror = () => setImageError(true);
    }
  }, [outputUrl]);

  if (!outputUrl) {
    return null;
  }

  const handleDownload = async () => {
    try {
      const response = await fetch(outputUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "virtual-try-on-result.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <Card>
      <CardContent className="p-4">
        <h2 className="text-2xl font-semibold mb-4">Result</h2>
        <div className="relative inline-block w-full min-h-[400px]">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="flex flex-col items-center gap-3">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent" />
                <p className="text-gray-500">Generating your try-on...</p>
              </div>
            </div>
          )}
          {imageError && (
            <div className="absolute inset-0 flex items-center justify-center bg-red-50 rounded-lg">
              <p className="text-red-500">
                Failed to load the result. Please try again.
              </p>
            </div>
          )}
          {outputUrl && (
            <Image
              src={outputUrl}
              alt="Virtual Try-On Result"
              width={800}
              height={1200}
              className={`rounded-lg shadow-md w-full ${
                !imageLoaded ? "hidden" : ""
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              priority
            />
          )}
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
      </CardContent>
    </Card>
  );
}
