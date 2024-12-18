import { LeaderboardProps } from "@/components/leaderboard";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import useWeightedPredictionsStore, {
  calculateWeightedPredictions,
} from "@/lib/predictionStore";
import useStemStore, { GenrePredictions, StemDataItem } from "@/lib/stemStore";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { useEffect, useState } from "react";

const getPredictions = (stems: StemDataItem[], dnn: number, cnn: number) => {
  if (!stems.length) return [];
  const result: { genre: string; probability: number }[] = [];

  // Initialize sums object to store running totals for each genre
  const genreSums: GenrePredictions = {
    blues: 0,
    classical: 0,
    country: 0,
    disco: 0,
    hiphop: 0,
    jazz: 0,
    metal: 0,
    pop: 0,
    reggae: 0,
    rock: 0,
  };

  // Sum up all predictions
  for (let i = 0; i < stems.length; i++) {
    const stem = stems[i];
    const { cnn_prediction, dnn_pred } = stem.detail.segment_data;
    const prediction = calculateWeightedPredictions(dnn_pred, cnn_prediction, {
      cnn: cnn,
      dnn: dnn,
    });

    // Add each genre prediction to running totals
    Object.keys(prediction).forEach((genre) => {
      genreSums[genre as keyof GenrePredictions] +=
        prediction[genre as keyof GenrePredictions];
    });
  }

  // Calculate total sum for normalization
  const total = Object.values(genreSums).reduce((sum, value) => sum + value, 0);

  // Convert to array of objects and normalize
  Object.entries(genreSums).forEach(([genre, sum]) => {
    result.push({
      genre,
      probability: total > 0 ? sum / total : 0,
    });
  });

  return result;
};

export default function Leaderboard() {
  const [predictions, setPredictions] = useState<
    { genre: string; probability: number }[]
  >([]);

  const stems = useStemStore((state) => state.stems);
  useEffect(() => {
    setPredictions(getPredictions(stems, 0.7, 0.3));
  }, [stems]);

  if (predictions.length !== 0) {
    const sortedPredictions = [...predictions].sort(
      (a, b) => b.probability - a.probability
    );
    const [first, second, third] = sortedPredictions;

    return (
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4">Overall Genre Prediction</h2>
          <div className="relative pt-16">
            <div className="flex justify-center items-end gap-4">
              {/* Second Place */}
              <div className="flex flex-col items-center">
                <Avatar className="w-16 h-16 border-4 border-white shadow-lg absolute -top-8 left-[calc(50%-6rem)]">
                  <AvatarImage
                    src={
                      `/${second.genre}.png` ||
                      "/placeholder.svg?height=64&width=64"
                    }
                    alt={second?.genre}
                  />
                  <AvatarFallback>{second?.genre[0]}</AvatarFallback>
                </Avatar>
                <div className="text-center mb-2">
                  <div className="font-medium">{second?.genre}</div>
                </div>
                <div className="w-32 bg-green-400 rounded-t-lg pt-6">
                  <div className="h-28 relative flex items-end justify-center pb-4">
                    <div className="px-3 py-1 bg-white rounded-full shadow text-sm">
                      2nd • {(second?.probability * 100).toFixed(0)}%
                    </div>
                  </div>
                </div>
              </div>

              {/* First Place */}
              <div className="flex flex-col items-center">
                <Avatar className="w-20 h-20 border-4 border-white shadow-lg absolute -top-10 left-1/2 -translate-x-1/2">
                  <AvatarImage
                    src={
                      `/${first.genre}.png` ||
                      "/placeholder.svg?height=80&width=80"
                    }
                    alt={first?.genre}
                  />
                  <AvatarFallback>{first?.genre[0]}</AvatarFallback>
                </Avatar>
                <div className="text-center mb-2">
                  <div className="font-medium">{first?.genre}</div>
                </div>
                <div className="w-32 bg-green-700 rounded-t-lg pt-6">
                  <div className="h-36 relative flex items-end justify-center pb-4">
                    <div className="px-3 py-1 bg-white rounded-full shadow text-sm">
                      1st • {(first?.probability * 100).toFixed(0)}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Third Place */}
              <div className="flex flex-col items-center">
                <Avatar className="w-16 h-16 border-4 border-white shadow-lg absolute -top-8 right-[calc(50%-6rem)]">
                  <AvatarImage
                    src={
                      `/${third.genre}.png` ||
                      "/placeholder.svg?height=64&width=64"
                    }
                    alt={third?.genre}
                  />
                  <AvatarFallback>{third?.genre[0]}</AvatarFallback>
                </Avatar>
                <div className="text-center mb-2">
                  <div className="font-medium">{third?.genre}</div>
                </div>
                <div className="w-32 bg-green-300 rounded-t-lg pt-6">
                  <div className="h-24 relative flex items-end justify-center pb-4">
                    <div className="px-3 py-1 bg-white rounded-full shadow text-sm">
                      3rd • {(third?.probability * 100).toFixed(0)}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <Skeleton className="h-8 w-48 mb-4" /> {/* Simulates the heading */}
        <div className="flex flex-col space-y-4">
          {" "}
          {/* Leaderboard skeleton */}
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" /> {/* Avatar */}
            <div className="flex-1">
              <Skeleton className="h-6 w-2/3" /> {/* Name */}
              <Skeleton className="h-4 w-1/4 mt-1" /> {/* Score */}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" /> {/* Avatar */}
            <div className="flex-1">
              <Skeleton className="h-6 w-2/3" /> {/* Name */}
              <Skeleton className="h-4 w-1/4 mt-1" /> {/* Score */}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" /> {/* Avatar */}
            <div className="flex-1">
              <Skeleton className="h-6 w-2/3" /> {/* Name */}
              <Skeleton className="h-4 w-1/4 mt-1" /> {/* Score */}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
