import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface Prediction {
  genre: string;
  probability: number;
  avatar?: string;
}

interface GenreScore {
  [key: string]: number;
}

export interface LeaderboardProps {
  predictions: Prediction[];
}

export function transformGenreScores(scores: GenreScore): Prediction[] {
  return Object.entries(scores).map(([genre, probability]) => ({
    genre,
    probability,
  }));
}

export default function Leaderboard({ predictions }: LeaderboardProps) {
  const sortedPredictions = [...predictions].sort(
    (a, b) => b.probability - a.probability
  );
  const [first, second, third] = sortedPredictions;

  return (
    <div className="relative pt-16">
      <div className="flex justify-center items-end gap-4">
        {/* Second Place */}
        <div className="flex flex-col items-center">
          <Avatar className="w-16 h-16 border-4 border-white shadow-lg absolute -top-8 left-[calc(50%-6rem)]">
            <AvatarImage
              src={
                `/${second.genre}.png` || "/placeholder.svg?height=64&width=64"
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
                `/${first.genre}.png` || "/placeholder.svg?height=80&width=80"
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
                `/${third.genre}.png` || "/placeholder.svg?height=64&width=64"
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
  );
}
