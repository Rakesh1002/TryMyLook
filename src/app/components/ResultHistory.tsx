"use client";

import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Download } from "lucide-react";

interface TryOnResult {
  outputUrl: string;
  modelPreview: string;
  apparelPreview: string;
  timestamp: string;
}

export default function ResultHistory() {
  const [results, setResults] = useState<TryOnResult[]>([]);

  useEffect(() => {
    // Load results from localStorage
    const loadResults = () => {
      const storedResults = localStorage.getItem("tryOnResults");
      if (storedResults) {
        setResults(JSON.parse(storedResults));
      }
    };

    // Load initial results
    loadResults();

    // Add event listener for storage changes
    window.addEventListener("storage", loadResults);

    return () => {
      window.removeEventListener("storage", loadResults);
    };
  }, []);

  const handleDelete = (index: number) => {
    const newResults = results.filter((_, i) => i !== index);
    localStorage.setItem("tryOnResults", JSON.stringify(newResults));
    setResults(newResults);
  };

  const handleDownload = async (url: string, index: number) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `try-on-result-${index + 1}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  if (results.length === 0) {
    return null;
  }

  return (
    <div className="mt-12 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          Previous Try-Ons
        </h2>
        <span className="text-sm text-gray-500">
          {results.length} {results.length === 1 ? "result" : "results"}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {results.map((result, index) => (
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-200"
            >
              <div className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex space-x-2">
                    <div className="relative group">
                      <img
                        src={result.apparelPreview}
                        alt="Apparel"
                        className="w-16 h-16 object-contain rounded-lg bg-gray-50"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200 rounded-lg" />
                    </div>
                    <div className="relative group">
                      <img
                        src={result.modelPreview}
                        alt="Model"
                        className="w-16 h-16 object-contain rounded-lg bg-gray-50"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200 rounded-lg" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleDownload(result.outputUrl, index)}
                      className="p-1.5 text-gray-500 hover:text-primary-500 transition-colors"
                      title="Download result"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="p-1.5 text-gray-500 hover:text-red-500 transition-colors"
                      title="Delete result"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="relative group">
                  <div className="aspect-square w-full rounded-lg overflow-hidden bg-gray-50">
                    <img
                      src={result.outputUrl}
                      alt="Try-on result"
                      className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="text-xs text-white">
                      {formatDistanceToNow(new Date(result.timestamp), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
