"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import MusicCard from "@/components/music-card";
import ChunkCard from "@/public/chunk-card";
import Leaderboard from "@/components/leaderboard-final";
import StemCarousel from "@/components/stem-carousel";
import useWeightedPredictionsStore from "@/lib/predictionStore";

export default function MusicGenrePrediction() {
  const [songData, setSongData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  return (
    <div className="container mx-auto p-4 space-y-8">
      <MusicCard />
      <StemCarousel />
      <Leaderboard />
    </div>
  );
}
