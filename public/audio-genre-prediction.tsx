"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";
import { GenrePredictionLeaderboard } from "@/public/genre-prediction-leaderboard";
import { AudioWaveform } from "@/public/audio-waveform";

interface AudioData {
  title: string;
  author: string;
  audioSrc: string;
  artSrc: string;
  spectrogramSrc: string;
  predictions: { genre: string; probability: number }[];
  duration: number;
}

const audioData: AudioData = {
  title: "Midnight Serenade",
  author: "Luna Harmony",
  audioSrc: "/placeholder.mp3",
  artSrc: "/placeholder.svg?height=300&width=300",
  spectrogramSrc: "/placeholder.svg?height=200&width=600",
  predictions: [
    { genre: "Jazz", probability: 0.75 },
    { genre: "Blues", probability: 0.2 },
    { genre: "Classical", probability: 0.05 },
  ],
  duration: 180, // 3 minutes in seconds
};

export default function AudioGenrePrediction() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(10);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    audio.addEventListener("timeupdate", updateTime);
    return () => audio.removeEventListener("timeupdate", updateTime);
  }, []);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Image
            src={audioData.artSrc}
            alt={`Album art for ${audioData.title}`}
            width={100}
            height={100}
            className="rounded-md"
          />
          <div>
            <CardTitle>{audioData.title}</CardTitle>
            <p className="text-sm text-muted-foreground">{audioData.author}</p>
          </div>
        </CardHeader>
        <CardContent>
          <audio ref={audioRef} src={audioData.audioSrc} className="hidden" />
          <AudioWaveform
            duration={audioData.duration}
            currentTime={currentTime}
          />
          {/* <div className="mt-2 text-sm text-muted-foreground flex justify-between">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(audioData.duration)}</span>
          </div> */}
        </CardContent>
        <CardFooter>
          <Button onClick={togglePlayPause} className="w-full">
            {isPlaying ? (
              <Pause className="mr-2 h-4 w-4" />
            ) : (
              <Play className="mr-2 h-4 w-4" />
            )}
            {isPlaying ? "Pause" : "Play"}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Spectrogram</CardTitle>
        </CardHeader>
        <CardContent>
          <Image
            src={audioData.spectrogramSrc}
            alt="Audio spectrogram"
            width={600}
            height={200}
            className="w-full h-auto"
          />
        </CardContent>
      </Card>

      <GenrePredictionLeaderboard predictions={audioData.predictions} />
    </div>
  );
}
