"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Navbar from "./Navbar";

// Dynamically import heavy components
const TryOnForm = dynamic(() => import("./TryOnForm"), {
  loading: () => <div className="animate-pulse bg-cool-100 rounded-2xl h-96" />,
  ssr: false,
});

const ResultDisplay = dynamic(() => import("./ResultDisplay"), {
  loading: () => <div className="animate-pulse bg-cool-100 rounded-2xl h-96" />,
  ssr: false,
});

const ResultHistory = dynamic(() => import("./ResultHistory"), {
  loading: () => <div className="animate-pulse bg-cool-100 rounded-2xl h-48" />,
  ssr: false,
});

export default function DemoContent() {
  const [result, setResult] = useState<string | null>(null);

  const handleResult = (outputUrl: string) => {
    setResult(outputUrl);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-primary-50/30 via-cool-50 to-white pt-24">
        {/* Back Button */}
        <div className="fixed top-24 left-4 z-40">
          <Link href="/">
            <motion.div
              className="flex items-center gap-2 px-4 py-2 text-cool-600 hover:text-primary-600 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm hover:shadow transition-all duration-200"
              whileHover={{ x: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Home</span>
            </motion.div>
          </Link>
        </div>

        <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-4xl mx-auto space-y-8"
          >
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary-500 via-secondary-400 to-accent-400 bg-clip-text text-transparent mb-4">
                Try Our Virtual Try-On Demo
              </h1>
              <p className="text-cool-500 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
                Experience how our AI technology transforms online shopping with
                virtual try-ons
              </p>
            </div>

            {/* Main Content */}
            <motion.div
              className="rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <TryOnForm onResult={handleResult} />
            </motion.div>

            {/* Result Display */}
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <ResultDisplay outputUrl={result} />
              </motion.div>
            )}

            {/* Result History */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <ResultHistory />
            </motion.div>

            {/* Footer Note */}
            <motion.div
              className="text-center text-cool-400 text-sm mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <p>
                Note: This is a demo version. For enterprise solutions,{" "}
                <Link
                  href="/#contact"
                  className="text-primary-500 hover:text-primary-600 underline decoration-2 decoration-primary-200 underline-offset-4"
                >
                  contact our sales team
                </Link>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </>
  );
}
