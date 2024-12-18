import ChunkCard from "@/public/chunk-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import useStemStore from "@/lib/stemStore";

export default function StemCarousel() {
  const stems = useStemStore((state) => state.stems);
  if (stems.length > 0) {
    return (
      <Carousel className="w-full max-w-5xl mx-auto">
        <CarouselContent>
          {stems.map((segment, index) => (
            <CarouselItem key={segment.detail.segment_data.segment_path}>
              <ChunkCard segment={segment} chunkNo={index} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    );
  }

  return (
    <Carousel className="w-full max-w-5xl mx-auto">
      <CarouselContent>
        {/* Render Skeletons for each chunk */}
        {[...Array(5)].map((_, index) => (
          <CarouselItem key={index}>
            <div className="flex flex-col items-center space-y-4">
              {/* Skeleton for the cover art */}
              <Skeleton className="w-40 h-40 rounded-lg" />
              {/* Skeleton for title */}
              <Skeleton className="w-3/4 h-6" />
              {/* Skeleton for artist */}
              <Skeleton className="w-1/2 h-5" />
              {/* Skeleton for start and end times */}
              <div className="flex justify-between w-full">
                <Skeleton className="w-1/4 h-4" />
                <Skeleton className="w-1/4 h-4" />
              </div>
              {/* Skeleton for spectrogram */}
              <Skeleton className="w-full h-32 rounded-lg" />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* Skeleton for Carousel navigation */}
      <CarouselPrevious>
        <Skeleton className="w-10 h-10 rounded-full" />
      </CarouselPrevious>
      <CarouselNext>
        <Skeleton className="w-10 h-10 rounded-full" />
      </CarouselNext>
    </Carousel>
  );
}
