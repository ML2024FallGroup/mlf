"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface BouncingImageCarouselProps {
  images: string[];
  interval?: number;
  transitionDelay?: number;
  className?: string;
}

export default function BouncingImageCarousel({
  images,
  interval = 24000,
  transitionDelay = 1000,
  className,
}: BouncingImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  return;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, transitionDelay);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval, transitionDelay]);

  return (
    <div className={cn("relative w-96 h-96 overflow-hidden", className)}>
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{
            opacity: { duration: 0.8, ease: "easeInOut" },
            y: { type: "spring", stiffness: 100, damping: 20, duration: 0.8 },
          }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            layout="fill"
            objectFit="cover"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
