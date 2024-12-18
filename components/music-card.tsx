import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";
import Image from "next/image";
import { useState, useRef } from "react";
import useMainAudioStore from "@/lib/audioStore";
import { Skeleton } from "@/components/ui/skeleton";

export const baseHost = "http://localhost:8000";
export default function MusicCard() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const audioData = useMainAudioStore((state) => state.audioData);
  const coverArt = "/placeholder.svg";
  const title = "title";
  const artist = "artist";
  const spectrogram = "/placeholder.svg";

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

  if (audioData !== null) {
    const {
      detail: {
        metadata: { title, artist, genre },
        audio_path,
        spectrogram,
        cover,
      },
    } = audioData;

    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/3">
                <Image
                  src={cover ? `${baseHost}${cover}` : "/placeholder.svg"}
                  alt={`${title} by ${artist}`}
                  width={300}
                  height={300}
                  className="rounded-lg w-full"
                />
              </div>
              <div className="w-full md:w-2/3 space-y-4">
                <span className="flex space-x-2">
                  <h2 className="text-2xl font-bold">{title ?? "Unknown"}</h2>
                  <span>-</span>
                  <p className="text-base align-bottom">{genre ?? "Unknown"}</p>
                </span>
                <p className="text-xl">{artist}</p>
                <audio src={`${baseHost}${audio_path}`} ref={audioRef} />
                <div className="flex justify-center space-x-4">
                  <Button onClick={togglePlayPause} className="w-full">
                    {isPlaying ? (
                      <Pause className="mr-2 h-4 w-4" />
                    ) : (
                      <Play className="mr-2 h-4 w-4" />
                    )}
                    {isPlaying ? "Pause" : "Play"}
                  </Button>
                </div>
              </div>
            </div>
            <div className="w-full">
              <h3 className="text-lg font-semibold mb-2">Spectrogram</h3>
              <Image
                src={`${baseHost}${spectrogram}`}
                alt="Song Spectrogram"
                width={800}
                height={200}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-6">
        <div className="flex flex-col gap-6">
          {/* Image and Details Section */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3">
              {/* Skeleton for the Cover Art */}
              <Skeleton className="rounded-lg w-full h-72" />
            </div>
            <div className="w-full md:w-2/3 space-y-4">
              {/* Skeleton for Title */}
              <Skeleton className="h-6 w-3/4" />
              {/* Skeleton for Artist Name */}
              <Skeleton className="h-5 w-1/2" />
              <div className="flex justify-center space-x-4">
                {/* Skeleton for Play/Pause Button */}
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </div>

          {/* Spectrogram Section */}
          <div className="w-full">
            {/* Skeleton for Spectrogram Heading */}
            <Skeleton className="h-5 w-1/4 mb-2" />
            {/* Skeleton for Spectrogram Image */}
            <Skeleton className="w-full h-48 rounded-lg" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
