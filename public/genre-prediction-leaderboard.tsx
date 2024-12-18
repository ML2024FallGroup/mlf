import React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Prediction {
  genre: string;
  probability: number;
}

interface GenrePredictionLeaderboardProps {
  predictions: Prediction[];
}

export function GenrePredictionLeaderboard({
  predictions,
}: GenrePredictionLeaderboardProps) {
  const sortedPredictions = [...predictions].sort(
    (a, b) => b.probability - a.probability
  );
  const [second, first, third] = sortedPredictions;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Genre Prediction Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-end h-64">
          {second && (
            <div className="flex flex-col items-center w-1/3">
              <div className="h-40 w-full bg-primary/20 relative">
                <div
                  className="absolute bottom-0 w-full bg-primary"
                  style={{ height: `${second.probability * 100}%` }}
                ></div>
              </div>
              <p className="mt-2 font-semibold">{second.genre}</p>
              <p className="text-sm text-muted-foreground">
                {(second.probability * 100).toFixed(2)}%
              </p>
            </div>
          )}
          {first && (
            <div className="flex flex-col items-center w-1/3">
              <div className="relative">
                <Image
                  src="/crown.png"
                  alt="Crown"
                  width={40}
                  height={40}
                  className="absolute -top-10 left-1/2 transform -translate-x-1/2 border-2 border-white rounded-full"
                />
              </div>
              <div className="h-48 w-full bg-primary/20 relative">
                <div
                  className="absolute bottom-0 w-full bg-primary"
                  style={{ height: `${first.probability * 100}%` }}
                ></div>
              </div>
              <p className="mt-2 font-semibold">{first.genre}</p>
              <p className="text-sm text-muted-foreground">
                {(first.probability * 100).toFixed(2)}%
              </p>
            </div>
          )}
          {third && (
            <div className="flex flex-col items-center w-1/3">
              <div className="h-32 w-full bg-primary/20 relative">
                <div
                  className="absolute bottom-0 w-full bg-primary"
                  style={{ height: `${third.probability * 100}%` }}
                ></div>
              </div>
              <p className="mt-2 font-semibold">{third.genre}</p>
              <p className="text-sm text-muted-foreground">
                {(third.probability * 100).toFixed(2)}%
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
