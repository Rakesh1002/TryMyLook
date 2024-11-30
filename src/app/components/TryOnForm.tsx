"use client";

import { useState } from "react";
import ImageSelector from "./ImageSelector";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Upload } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

const modelImages = {
  male: [
    "/images/models/male/1.png",
    "/images/models/male/9.png",
    "/images/models/male/3.png",
    "/images/models/male/4.png",
    "/images/models/male/5.png",
    "/images/models/male/6.png",
    "/images/models/male/7.png",
    "/images/models/male/8.png",
  ],
  female: [
    "/images/models/female/1.png",
    "/images/models/female/9.png",
    "/images/models/female/3.png",
    "/images/models/female/11.png",
    "/images/models/female/5.png",
    "/images/models/female/10.png",
    "/images/models/female/12.png",
    "/images/models/female/8.png",
  ],
};

const apparelImages = {
  dress: [
    "/images/apparel/dress/1.png",
    "/images/apparel/dress/2.png",
    "/images/apparel/dress/3.png",
  ],
  upper: [
    "/images/apparel/upper/1.png",
    "/images/apparel/upper/2.png",
    "/images/apparel/upper/3.png",
    "/images/apparel/upper/4.png",
    "/images/apparel/upper/5.png",
    "/images/apparel/upper/6.png",
    "/images/apparel/upper/7.png",
    "/images/apparel/upper/8.png",
  ],
  lower: [
    "/images/apparel/lower/1.png",
    "/images/apparel/lower/2.png",
    "/images/apparel/lower/3.png",
    "/images/apparel/lower/4.png",
  ],
};

interface TryOnFormProps {
  onResult: (outputUrl: string) => void;
}

export default function TryOnForm({ onResult }: TryOnFormProps) {
  const [selectedGender, setSelectedGender] = useState<"male" | "female">(
    "male"
  );
  const [selectedApparelType, setSelectedApparelType] = useState<
    "upper" | "lower" | "dress"
  >("upper");
  const [modelImage, setModelImage] = useState<File | null>(null);
  const [apparelImage, setApparelImage] = useState<File | null>(null);
  const [selectedModelPreview, setSelectedModelPreview] = useState<string>("");
  const [selectedApparelPreview, setSelectedApparelPreview] =
    useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleModelSelect = async (imagePath: string) => {
    try {
      // Set preview immediately for better UX
      setSelectedModelPreview(imagePath);

      // Create a new Image to ensure it loads
      const img = new window.Image();
      img.src = imagePath;

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      // Fetch the image as a blob
      const response = await fetch(imagePath);
      if (!response.ok) throw new Error("Failed to fetch image");

      const blob = await response.blob();
      const file = new File([blob], "model.png", { type: "image/png" });
      setModelImage(file);
    } catch (error) {
      console.error("TryOnForm: Error selecting model:", error);
      setSelectedModelPreview("");
      setModelImage(null);
    }
  };

  const handleApparelSelect = async (imagePath: string) => {
    try {
      // Set preview immediately for better UX
      setSelectedApparelPreview(imagePath);

      // Create a new Image to ensure it loads
      const img = new window.Image();
      img.src = imagePath;

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      // Fetch the image as a blob
      const response = await fetch(imagePath);
      if (!response.ok) throw new Error("Failed to fetch image");

      const blob = await response.blob();
      const file = new File([blob], "apparel.png", { type: "image/png" });
      setApparelImage(file);
    } catch (error) {
      console.error("TryOnForm: Error selecting apparel:", error);
      setSelectedApparelPreview("");
      setApparelImage(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);

    try {
      if (!modelImage || !apparelImage) {
        throw new Error("Please select both model and apparel images");
      }

      const formData = new FormData();
      formData.append("requestType", "tryon");
      formData.append("modelImage", modelImage);
      formData.append("apparelImage", apparelImage);

      const response = await fetch("/api/try-on", {
        method: "POST",
        body: formData,
      });

      if (response.status === 429) {
        const data = await response.json();
        if (data.contactSales) {
          toast.error(data.error, {
            action: {
              label: "Contact Sales",
              onClick: () =>
                (window.location.href = "mailto:contact@getmytry.com"),
            },
          });
        } else {
          toast.error(data.error);
        }
        throw new Error(data.error);
      }

      if (!response.ok) {
        throw new Error("Failed to process images");
      }

      const result = await response.json();

      if (result.result) {
        // Store the result in local storage with timestamp
        const tryOnResult = {
          outputUrl: result.result,
          modelPreview: selectedModelPreview,
          apparelPreview: selectedApparelPreview,
          timestamp: new Date().toISOString(),
        };

        // Get existing results or initialize empty array
        const existingResults = JSON.parse(
          localStorage.getItem("tryOnResults") || "[]"
        );

        // Add new result at the beginning
        existingResults.unshift(tryOnResult);

        // Keep only the last 10 results
        const updatedResults = existingResults.slice(0, 10);

        // Save back to local storage
        localStorage.setItem("tryOnResults", JSON.stringify(updatedResults));

        onResult(result.result);
      }

      // Show remaining trials after successful generation
      const remaining = response.headers.get("X-RateLimit-Remaining");
      if (remaining) {
        toast.success(`${remaining} trial generations remaining`);
      }
    } catch (error) {
      console.error("Error:", error);
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileUpload = (type: "model" | "apparel", file: File) => {
    if (type === "model") {
      setModelImage(file);
      setSelectedModelPreview(URL.createObjectURL(file));
    } else {
      setApparelImage(file);
      setSelectedApparelPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-12">
        {/* Apparel Section */}
        <Card className="p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow duration-200 bg-cool-50 border-cool-200 order-1 sm:order-1">
          <h3 className="text-xl font-semibold mb-4 text-center text-primary-600">
            Apparel Image
          </h3>
          <div className="space-y-4">
            <div className="aspect-[3/4] w-full flex items-center justify-center border-2 border-dashed rounded-xl border-primary-100 hover:border-primary-400 transition-colors bg-white">
              {selectedApparelPreview ? (
                <div className="relative w-full h-full p-4 flex items-center justify-center">
                  <Image
                    src={selectedApparelPreview}
                    alt="Selected apparel"
                    width={400}
                    height={400}
                    className="max-w-full max-h-full object-contain"
                  />
                  <button
                    onClick={() => {
                      setSelectedApparelPreview("");
                      setApparelImage(null);
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 text-xs shadow-lg hover:bg-red-600 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <label htmlFor="apparelUpload" className="cursor-pointer group">
                  <div className="flex flex-col items-center p-4">
                    <Upload className="w-10 sm:w-12 h-10 sm:h-12 mb-2 text-cool-400 group-hover:text-secondary-400 transition-colors" />
                    <span className="text-sm text-gray-500 group-hover:text-gray-700">
                      Upload Apparel Image
                    </span>
                  </div>
                </label>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload("apparel", file);
                }}
                className="hidden"
                id="apparelUpload"
              />
            </div>

            <div>
              <p className="text-sm font-medium text-cool-500 mb-3 text-center">
                Or Select Sample Apparel
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4 justify-center">
                {["upper", "lower", "dress"].map((type) => (
                  <Button
                    key={type}
                    variant={
                      selectedApparelType === type ? "default" : "outline"
                    }
                    onClick={() =>
                      setSelectedApparelType(type as typeof selectedApparelType)
                    }
                    className={`px-2 sm:px-3 py-1.5 h-auto text-sm transition-all duration-200 ${
                      selectedApparelType === type
                        ? "bg-accent-400 text-white shadow-md hover:bg-accent-500"
                        : "text-cool-500 hover:text-cool-600 border-cool-300"
                    }`}
                  >
                    {type}
                  </Button>
                ))}
              </div>
              <ImageSelector
                images={apparelImages[selectedApparelType]}
                onSelect={handleApparelSelect}
                selectedImage={selectedApparelPreview}
                className="grid grid-cols-4 gap-2"
              />
            </div>
          </div>
        </Card>

        {/* Model Section */}
        <Card className="p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow duration-200 bg-cool-50 border-cool-200 order-2 sm:order-2">
          <h3 className="text-xl font-semibold mb-4 text-center text-primary-600">
            Model Image
          </h3>
          <div className="space-y-4">
            <div className="aspect-[3/4] w-full flex items-center justify-center border-primary-100 border-2 border-dashed rounded-xl hover:border-primary-400 transition-colors bg-white">
              {selectedModelPreview ? (
                <div className="relative w-full h-full p-4 flex items-center justify-center">
                  <Image
                    src={selectedModelPreview}
                    alt="Selected model"
                    width={400}
                    height={400}
                    className="max-w-full max-h-full object-contain"
                  />
                  <button
                    onClick={() => {
                      setSelectedModelPreview("");
                      setModelImage(null);
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 text-xs shadow-lg hover:bg-red-600 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <label htmlFor="modelUpload" className="cursor-pointer group">
                  <div className="flex flex-col items-center p-4">
                    <Upload className="w-10 sm:w-12 h-10 sm:h-12 mb-2 text-cool-400 group-hover:text-secondary-400 transition-colors" />
                    <span className="text-sm text-gray-500 group-hover:text-gray-700">
                      Upload Model Image
                    </span>
                  </div>
                </label>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload("model", file);
                }}
                className="hidden"
                id="modelUpload"
              />
            </div>

            <div>
              <p className="text-sm font-medium text-cool-500 mb-3 text-center">
                Or Select Sample Model
              </p>
              <div className="flex gap-2 mb-4 justify-center">
                {["male", "female"].map((gender) => (
                  <Button
                    key={gender}
                    variant={selectedGender === gender ? "default" : "outline"}
                    onClick={() =>
                      setSelectedGender(gender as typeof selectedGender)
                    }
                    className={`px-3 sm:px-4 py-1.5 h-auto text-sm transition-all duration-200 ${
                      selectedGender === gender
                        ? "bg-secondary-400 text-white shadow-md hover:bg-secondary-500"
                        : "text-cool-500 hover:text-cool-600 border-cool-300"
                    }`}
                  >
                    {gender}
                  </Button>
                ))}
              </div>
              <ImageSelector
                images={modelImages[selectedGender]}
                onSelect={handleModelSelect}
                selectedImage={selectedModelPreview}
                className="grid grid-cols-4 gap-2"
              />
            </div>
          </div>
        </Card>
      </div>

      <Button
        className="w-full py-4 sm:py-6 text-base sm:text-lg font-semibold shadow-lg text-white hover:shadow-xl transition-all duration-200 relative overflow-hidden group bg-primary-500 hover:opacity-90"
        disabled={!modelImage || !apparelImage || isProcessing}
        onClick={handleSubmit}
      >
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="relative">
          {isProcessing ? (
            <div className="flex items-center gap-2 justify-center">
              <div className="animate-spin rounded-full h-4 sm:h-5 w-4 sm:w-5 border-2 border-white border-t-transparent" />
              Processing...
            </div>
          ) : (
            "Generate Try-On"
          )}
        </span>
      </Button>
    </div>
  );
}
