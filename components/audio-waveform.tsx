import React from "react";

interface AudioWaveformProps {
  duration: number;
  currentTime: number;
}

export function AudioWaveform({ duration, currentTime }: AudioWaveformProps) {
  const waveformPoints = 100;
  const waveform = Array.from({ length: waveformPoints }, () => Math.random());

  return (
    <div className="relative w-full h-16">
      <svg width="100%" height="100%" preserveAspectRatio="none">
        <defs>
          <linearGradient
            id="waveformGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--primary) / 0.5)" />
          </linearGradient>
        </defs>
        {waveform.map((point, index) => {
          const x = (index / waveformPoints) * 100;
          const height = point * 100;
          const y = 50 - height / 2;
          return (
            <rect
              key={index}
              x={`${x}%`}
              y={`${y}%`}
              rx={10}
              ry={10}
              width={`${100 / waveformPoints}%`}
              height={`${height}%`}
              fill={
                x < (currentTime / duration) * 100
                  ? "url(#waveformGradient)"
                  : "hsl(var(--muted))"
              }
            />
          );
        })}
      </svg>
    </div>
  );
}
