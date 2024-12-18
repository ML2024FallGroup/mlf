import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Leaderboard, { transformGenreScores } from "@/components/leaderboard";
import { StemDataItem } from "@/lib/stemStore";
import { baseHost } from "@/components/music-card";
import { useRef, useState } from "react";
import useWeightedPredictionsStore from "@/lib/predictionStore";
import { useAudioStore } from "@/lib/store";
import useMainAudioStore from "@/lib/audioStore";

interface ChunkCardProps {
  chunkNo: number;
  title: string;
  artist: string;
  coverArt: string;
  start: number;
  end: number;
  spectrogram: string;
  stemSpectrograms: {
    vocals: string;
    instruments: string;
    bass: string;
    other: string;
  };
  genrePredictions: { genre: string; probability: number }[];
}

const stems = ["vocals", "drums", "bass", "other"];
interface Segment {
  segment: StemDataItem;
  chunkNo: number;
}

const getBeforeLastUnderscore = (input: string): string =>
  input.split("_").slice(0, -1).join("_");

export default function ChunkCard({ segment, chunkNo }: Segment) {
  const {
    detail: {
      segment_data: { segment_spec, stem_specs, stem_director, segment_path },
    },
  } = segment;
  const stem_spec_base = getBeforeLastUnderscore(stem_specs[0]);
  const vocalRef = useRef<HTMLAudioElement>(null);
  const [isVocal, setIsVocal] = useState(false);
  const drumRef = useRef<HTMLAudioElement>(null);
  const [isDrum, setIsDrum] = useState(false);
  const bassRef = useRef<HTMLAudioElement>(null);
  const [isBass, setIsBass] = useState(false);
  const otherRef = useRef<HTMLAudioElement>(null);
  const [isOther, setIsOther] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const prediction = useWeightedPredictionsStore(
    (state) => state.getTopNForStemAtIndex
  );
  const meta = useMainAudioStore((state) => state.audioData?.detail);

  const toggleVocal = () => {
    if (vocalRef.current) {
      if (isVocal) {
        vocalRef.current.pause();
      } else {
        vocalRef.current.play();
      }
      setIsVocal(!isVocal);
    }
  };
  const toggleDrum = () => {
    if (drumRef.current) {
      if (isDrum) {
        drumRef.current.pause();
      } else {
        drumRef.current.play();
      }
      setIsDrum(!isDrum);
    }
  };
  const toggleBass = () => {
    if (bassRef.current) {
      if (isBass) {
        bassRef.current.pause();
      } else {
        bassRef.current.play();
      }
      setIsBass(!isBass);
    }
  };
  const toggleOther = () => {
    if (otherRef.current) {
      if (isOther) {
        otherRef.current.pause();
      } else {
        otherRef.current.play();
      }
      setIsOther(!isOther);
    }
  };
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

  const mapping = new Map();
  mapping.set("bass", [toggleBass, bassRef, isBass]);
  mapping.set("other", [toggleOther, otherRef, isOther]);
  mapping.set("vocals", [toggleVocal, vocalRef, isVocal]);
  mapping.set("drums", [toggleDrum, drumRef, isDrum]);

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3">
              <Image
                src={`${
                  meta?.cover ? `${baseHost}${meta.cover}` : "/placeholder.svg"
                }`}
                alt={`${meta?.metadata.title ?? "Unknown"} by ${
                  meta?.metadata.artist ?? "Unknown"
                }`}
                width={300}
                height={300}
                className="rounded-lg w-full"
              />
            </div>
            <div className="w-full md:w-2/3 space-y-4">
              <h3 className="text-xl font-bold">
                {meta?.metadata.title ?? "Unknown"}-{chunkNo}
              </h3>
              <audio src={`${baseHost}${segment_path}`} ref={audioRef} />
              <div className="flex justify-center space-x-4">
                <Button onClick={togglePlayPause} className="w-full">
                  {isPlaying ? (
                    <Pause className="mr-2 h-4 w-4" />
                  ) : (
                    <Play className="mr-2 h-4 w-4" />
                  )}
                  {isPlaying ? "Pause Chunk" : "Play Chunk"}
                </Button>
              </div>
            </div>
          </div>
          <div className="w-full">
            <Tabs defaultValue="chunk">
              <TabsList className="w-full">
                <TabsTrigger value="chunk" className="flex-1">
                  Chunk Spectrogram
                </TabsTrigger>
                <TabsTrigger value="stems" className="flex-1">
                  Stem Spectrograms
                </TabsTrigger>
              </TabsList>
              <TabsContent value="chunk">
                <Image
                  src={`${baseHost}${segment_spec}`}
                  alt={`Spectrogram for ${"title"}-${chunkNo}`}
                  width={800}
                  height={200}
                  className="w-full h-auto rounded-lg"
                />
              </TabsContent>
              <TabsContent value="stems">
                <div className="grid grid-cols-2 gap-4">
                  {stems.map((stem) => (
                    <div key={stem} className="space-y-2">
                      <p className="text-sm font-medium capitalize">{stem}</p>
                      <Image
                        src={`${baseHost}${stem_spec_base}_${stem}.png`}
                        alt={`${stem} Spectrogram for ${"title"}-${chunkNo}`}
                        width={400}
                        height={100}
                        className="w-full h-auto rounded-lg"
                      />
                      <audio
                        src={`${baseHost}${stem_director}/${stem}.wav`}
                        ref={mapping.get(stem)[1]}
                      />
                      <Button
                        size="sm"
                        className="w-full"
                        onClick={mapping.get(stem)[0]}
                      >
                        {mapping.get(stem)[2] ? (
                          <Pause className="mr-2 h-4 w-4" />
                        ) : (
                          <Play className="mr-2 h-4 w-4" />
                        )}
                        {mapping.get(stem)[2]
                          ? `Pause ${stem}`
                          : `Play ${stem}`}
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          <Leaderboard predictions={prediction(chunkNo, 3, 0.3, 0.7)} />
        </div>
      </CardContent>
    </Card>
  );
}
