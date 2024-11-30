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
  // Removed isExpanded state
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setImageLoaded(false);
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

  // Removed handleExpand function

  return (
    <Card>
      <CardContent className="p-4">
        <h2 className="text-2xl font-semibold mb-4">Result</h2>
        <div className="relative inline-block w-full">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              Loading...
            </div>
          )}
          <Image
            src={outputUrl}
            alt="Virtual Try-On Result"
            width={800}
            height={1200}
            className={`rounded-lg shadow-md w-full ${
              imageLoaded ? "" : "hidden"
            }`}
            onLoad={() => setImageLoaded(true)}
          />
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
