"use client";

import BeforeAfterSlider from "./BeforeAfterSlider";
import { Button } from "./ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, RefreshCcw, Zap } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { GradientText } from "../components/ui/GradientText";
import { AuroraBackground } from "./ui/aurora-background";

// Add new animation variants for the remaining motion components
const statCardVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    boxShadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
  tap: { scale: 0.95 },
};

const iconVariants = {
  initial: { rotate: 0 },
  hover: {
    rotate: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.5 },
  },
};

export default function LandingPage() {
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(
          `Message sent successfully! We'll get back to you at ${formData.email} soon.`,
          {
            duration: 5000,
          }
        );

        // Reset form
        setFormData({
          companyName: "",
          email: "",
          message: "",
        });
      } else {
        toast.error(
          `Failed to send message. ${
            data.error || "Please try again or contact us directly."
          }`,
          {
            duration: 5000,
          }
        );
      }
    } catch (error) {
      toast.error(
        "Something went wrong. Please try again later or email us at contact@trymylook.com",
        {
          duration: 5000,
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-cool-50">
      {/* Hero Section */}
      <AuroraBackground className="relative min-h-screen flex flex-col justify-between">
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 flex-1 flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center space-y-16 sm:space-y-20 mt-32 sm:mt-40"
          >
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight">
                <span className="block text-primary-600 mb-6">
                  Increase Your Sales
                </span>
                <span className="block text-secondary-500">
                  with AI Virtual Try-ons
                </span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-xl sm:text-2xl md:text-3xl text-cool-500 max-w-3xl mx-auto leading-relaxed font-light"
              >
                Generate high-quality on-model images from flatlay apparel
                images
                <span className="text-primary-500 font-medium">
                  {" "}
                  within seconds
                </span>
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-8 justify-center items-center"
            >
              <Link href="/demo">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-primary-600 hover:bg-primary-500 
                    text-white px-12 py-7 text-xl font-medium rounded-2xl shadow-lg hover:shadow-xl 
                    transition-all duration-300 group hover:scale-105 hover:-translate-y-1"
                >
                  Try Demo{" "}
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <Link href="#contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-primary-300 text-primary-600 
                    backdrop-blur-sm hover:bg-primary-50/50 px-12 py-7 text-xl font-medium 
                    rounded-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                >
                  Contact Sales
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator with enhanced animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mb-8 flex flex-col items-center gap-2 hidden sm:flex"
        >
          <motion.span
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: [0, 1, 0], y: [0, 0, 5] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
            }}
            className="text-primary-400 text-sm font-medium tracking-wider"
          >
            Discover more
          </motion.span>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-8 h-14 border-2 border-primary-300 rounded-full p-2
              backdrop-blur-sm bg-white/10 hover:border-primary-400 transition-colors
              cursor-pointer shadow-lg"
            onClick={() => {
              const statsSection = document.querySelector("#stats-section");
              statsSection?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <motion.div
              className="w-2 h-2 bg-primary-400 rounded-full mx-auto"
              animate={{
                y: [0, 24, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>
      </AuroraBackground>

      {/* Stats Section */}
      <motion.section
        id="stats-section"
        className="py-20 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "40%",
              subtitle: "Increase in Conversion",
              icon: TrendingUp,
              gradient: "from-primary-400 to-primary-600",
            },
            {
              title: "30%",
              subtitle: "Reduction in Returns",
              icon: RefreshCcw,
              gradient: "from-secondary-400 to-secondary-600",
            },
            {
              title: "2x",
              subtitle: "Customer Engagement",
              icon: Zap,
              gradient: "from-accent-400 to-accent-600",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-6 rounded-xl bg-cool-50 cursor-pointer relative group overflow-hidden"
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              variants={statCardVariants}
              viewport={{ once: true }}
            >
              {/* Background gradient overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              />

              {/* Icon with animation */}
              <motion.div variants={iconVariants}>
                <stat.icon className="w-12 h-12 mx-auto mb-4 text-primary-500 transition-colors duration-300 group-hover:text-primary-600" />
              </motion.div>

              {/* Content with hover effects */}
              <motion.h3
                className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent mb-2"
                initial={{ y: 0 }}
                whileHover={{ y: -2 }}
              >
                {stat.title}
              </motion.h3>

              <motion.p
                className="text-cool-500 group-hover:text-cool-600 transition-colors duration-300"
                initial={{ y: 0 }}
                whileHover={{ y: -1 }}
              >
                {stat.subtitle}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Features Section with Multiple Examples */}
      <section className="py-20 px-4 sm:px-8 bg-gradient-to-b from-white to-cool-50 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-primary-500 to-secondary-400 bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Experience the Magic
          </motion.h2>

          {/* Example 1: Enhanced Customer Experience */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center mb-32">
            <motion.div
              className="w-full rounded-2xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <BeforeAfterSlider
                beforeImage="/images/models/male/3.png"
                afterImage="/images/models/male/3_after.jpg"
              />
            </motion.div>
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-semibold text-primary-600">
                Enhanced Customer Experience
              </h2>
              <p className="text-cool-500 text-lg leading-relaxed">
                AI Virtual try-on technology provides customers with a more
                engaging and interactive shopping experience, allowing them to
                see how products look on themselves before making a purchase.
                This helps to reduce uncertainty and increase confidence in
                their buying decisions.
              </p>
              <Button
                asChild
                className="bg-cool-500 hover:bg-gradient-to-r hover:from-primary-500 hover:to-secondary-400 text-white shadow-sm hover:shadow transition-all duration-300"
              >
                <Link href="#contact">Request Access</Link>
              </Button>
            </motion.div>
          </div>

          {/* Example 2: Increased Conversion */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center mb-32">
            <motion.div
              className="space-y-6 order-2 md:order-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-semibold text-primary-600">
                Increased Conversion Rates
              </h2>
              <p className="text-cool-500 text-lg leading-relaxed">
                By providing a more realistic and personalized way for customers
                to try on products, brands increase conversion rates from the
                view page to purchases.
              </p>
              <Button
                asChild
                className="bg-cool-500 hover:bg-gradient-to-r hover:from-primary-500 hover:to-secondary-400 text-white shadow-sm hover:shadow transition-all duration-300"
              >
                <Link href="#contact">Request Access</Link>
              </Button>
            </motion.div>
            <motion.div
              className="rounded-2xl overflow-hidden shadow-2xl order-1 md:order-2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <BeforeAfterSlider
                beforeImage="/images/models/female/12.png"
                afterImage="/images/models/female/12_after.jpg"
              />
            </motion.div>
          </div>

          {/* Example 3: Reduced Returns */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center mb-32">
            <motion.div
              className="rounded-2xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <BeforeAfterSlider
                beforeImage="/images/models/male/4.png"
                afterImage="/images/models/male/4_after.jpg"
              />
            </motion.div>
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-semibold text-primary-600">
                Reduced Returns
              </h2>
              <p className="text-cool-500 text-lg leading-relaxed">
                Virtual try-ons can help to reduce the number of returns and
                save time and costs associated with processing the returns.
              </p>
              <Button
                asChild
                className="bg-cool-500 hover:bg-gradient-to-r hover:from-primary-500 hover:to-secondary-400 text-white shadow-sm hover:shadow transition-all duration-300"
              >
                <Link href="#contact">Request Access</Link>
              </Button>
            </motion.div>
          </div>

          {/* Example 4: Stand Out */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <motion.div
              className="space-y-6 order-2 md:order-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-semibold text-primary-600">
                Differentiate from the Competition
              </h2>
              <p className="text-cool-500 text-lg leading-relaxed">
                By leveraging AI Virtual try-on technology, brands can
                differentiate themselves from competitors and stand out in the
                increasingly crowded market.
              </p>
              <Button
                asChild
                className="bg-cool-500 hover:bg-gradient-to-r hover:from-primary-500 hover:to-secondary-400 text-white shadow-sm hover:shadow transition-all duration-300"
              >
                <Link href="#contact">Request Access</Link>
              </Button>
            </motion.div>
            <motion.div
              className="rounded-2xl overflow-hidden shadow-2xl order-1 md:order-2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <BeforeAfterSlider
                beforeImage="/images/models/female/11.png"
                afterImage="/images/models/female/11_after.jpg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      {/* <section className="py-20 px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-primary-500 to-secondary-400 bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Why Choose Us
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Increased Conversion',
                description:
                  'Boost your sales with interactive try-on experiences',
                icon: ShoppingBag,
              },
              {
                title: 'Reduced Returns',
                description: 'Help customers make confident purchase decisions',
                icon: RefreshCcw,
              },
              {
                title: 'Stand Out',
                description:
                  'Differentiate your brand with cutting-edge technology',
                icon: Zap,
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-xl bg-cool-50 hover:shadow-lg transition-all duration-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -5 }}
              >
                <benefit.icon className="w-12 h-12 text-primary-500 mb-4" />
                <h3 className="text-xl font-semibold text-primary-600 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-cool-500">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Contact Section */}
      <motion.section
        id="contact"
        className="py-20 px-4 bg-gradient-to-b from-cool-50 to-white pt-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-2xl mx-auto px-12 pt-20">
          <h2 className="text-3xl font-bold mb-2 text-center bg-gradient-to-r from-primary-500 to-secondary-400 bg-clip-text text-transparent">
            Get Started Today
          </h2>
          <p className="text-cool-500 text-center mb-8">
            Transform your business with AI-powered virtual try-on
          </p>
          <motion.form
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Company Name"
              value={formData.companyName}
              onChange={(e) =>
                setFormData({ ...formData, companyName: e.target.value })
              }
              required
              className="w-full p-4 border-2 border-cool-200 rounded-xl focus:border-primary-300 focus:ring-2 focus:ring-primary-100 transition-all duration-200 bg-white"
            />
            <input
              type="email"
              placeholder="Business Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className="w-full p-4 border-2 border-cool-200 rounded-xl focus:border-primary-300 focus:ring-2 focus:ring-primary-100 transition-all duration-200 bg-white"
            />
            <textarea
              placeholder="Message"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              required
              className="w-full p-4 border-2 border-cool-200 rounded-xl focus:border-primary-300 focus:ring-2 focus:ring-primary-100 transition-all duration-200 h-32 bg-white"
            />
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary-600 text-white px-8 py-2 rounded-xl font-semibold text-lg shadow-lg group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 10,
              }}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Sending...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <span>Send Message</span>
                  <ArrowRight className="group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              )}
            </motion.button>
          </motion.form>
        </div>
      </motion.section>

      {/* Footer Section - Add this at the end before closing div */}
      <footer className="bg-white border-t border-cool-200">
        <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-8"> */}
          {/* Brand Column */}
          {/* <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="bg-gradient-to-r from-primary-500 to-secondary-400 p-1.5 rounded-lg">
                  <Shirt className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-semibold bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
                  TryMyLook
                </span>
              </div>
              <p className="text-cool-500 text-sm">
                Transform your e-commerce experience with AI-powered virtual
                try-ons
              </p>
            </div> */}

          {/* Quick Links */}
          {/* <div>
              <h3 className="text-sm font-semibold text-cool-900 mb-4">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {['Features', 'Benefits', 'Demo', 'Contact'].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="text-cool-500 hover:text-primary-500 text-sm transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div> */}

          {/* Legal */}
          {/* <div>
              <h3 className="text-sm font-semibold text-cool-900 mb-4">
                Legal
              </h3>
              <ul className="space-y-3">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(
                  (item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-cool-500 hover:text-primary-500 text-sm transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div> */}

          {/* Social Links */}
          {/* <div>
              <h3 className="text-sm font-semibold text-cool-900 mb-4">
                Connect With Us
              </h3>
              <div className="flex space-x-4">
                {[
                  { icon: Github, href: '#' },
                  { icon: Twitter, href: '#' },
                  { icon: Linkedin, href: '#' },
                  { icon: Mail, href: '#' },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="text-cool-400 hover:text-primary-500 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div> */}

          {/* Bottom Bar */}
          {/* <div className="mt-12 pt-8 border-t border-cool-200"> */}
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-cool-500 text-base flex items-center gap-1">
              © {new Date().getFullYear()}{" "}
              <GradientText className="text-lg px-1">TryMyLook AI</GradientText>{" "}
              | All rights reserved.
            </p>
            <div className="flex items-center space-x-2 mt-2 sm:mt-0">
              <span className="text-cool-400 text-base">Made with</span>
              <span className="text-accent-400">❤</span>
              <span className="text-cool-400 text-base">in India</span>
            </div>
          </div>
        </div>
        {/* </div> */}
      </footer>
    </div>
  );
}
