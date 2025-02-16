"use client";

import { formatDistanceToNow } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Download } from "lucide-react";
import Image from "next/image";
import { useDemoStore } from "@/store/demoStore";
import { toast } from "sonner";

export default function ResultHistory() {
  const { tryOnResults, addTryOnResult } = useDemoStore();

  const handleDelete = (index: number) => {
    const newResults = tryOnResults.filter((_, i) => i !== index);
    addTryOnResult({ ...newResults[0], timestamp: new Date().toISOString() }); // Trigger state update
  };

  const handleDownload = async (url: string, index: number) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to download image");

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `try-on-result-${index + 1}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);

      toast.success("Image downloaded successfully");
    } catch (error) {
      console.error("Error downloading image:", error);
      toast.error("Failed to download image");
    }
  };

  if (tryOnResults.length === 0) return null;

  return (
    <div className="mt-12 space-y-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">
          Previous Try-Ons
        </h2>
        <span className="text-sm text-cool-500">
          {tryOnResults.length}{" "}
          {tryOnResults.length === 1 ? "result" : "results"}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {tryOnResults.map((result, index) => (
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-200"
            >
              {/* Header with previews and actions */}
              <div className="p-4 border-b border-cool-100">
                <div className="flex justify-between items-center">
                  {/* Preview Images */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-16 h-16">
                      <Image
                        src={result.modelPreview}
                        alt="Model"
                        width={64}
                        height={64}
                        className="rounded-lg object-cover bg-cool-50"
                      />
                    </div>
                    <div className="flex-shrink-0 w-16 h-16">
                      <Image
                        src={result.apparelPreview}
                        alt="Apparel"
                        width={64}
                        height={64}
                        className="rounded-lg object-cover bg-cool-50"
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-sm text-cool-500 pl-4">
                      {formatDistanceToNow(new Date(result.timestamp), {
                        addSuffix: true,
                      })}
                    </span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleDownload(result.outputUrl, index)}
                        className="p-2 text-cool-500 hover:text-primary-500 transition-colors rounded-full hover:bg-cool-50"
                        title="Download result"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="p-2 text-cool-500 hover:text-red-500 transition-colors rounded-full hover:bg-cool-50"
                        title="Delete result"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Result Image */}
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src={result.outputUrl}
                  alt="Try-on result"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
