import Image from "next/image";
import Upload from "@/components/upload";
import WSStatus from "@/components/ws-status";

export default function Landing() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* 3D Slanted Grid Background */}
      <div
        className="absolute inset-0 z-0 overflow-hidden"
        style={{
          perspective: "1000px",
        }}
      >
        <div
          className="absolute inset-0 origin-center"
          style={{
            backgroundImage: `
              linear-gradient(to right, #e0e0e0 1px, transparent 1px),
              linear-gradient(to bottom, #e0e0e0 1px, transparent 1px)
            `,
            backgroundSize: "120px 120px",
            transform: "rotateX(60deg) scale(2)",
            transformOrigin: "center center",
          }}
        />
      </div>

      {/* Header */}
      <header className="p-4 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2">
          <span className="font-medium">Machine Learning</span>
          <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
            EXPERIMENT
          </span>
        </div>
        <div className="flex gap-4">
          <WSStatus />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12 relative z-10">
        <div className="flex flex-col items-center text-center gap-8">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif tracking-tight">
            Make Your Next Genre Prediction
          </h1>

          <Upload />
        </div>
      </main>

      {/* Chess Pieces */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src={"/10.png"}
          width={310}
          height={310}
          alt="musical instrument"
          className="absolute top-3/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 animate-floating"
        />

        <Image
          src={"/2.png"}
          width={310}
          height={310}
          alt="musical instrument"
          className="absolute top-[60%] right-1/4 transform -translate-x-1/2 -translate-y-1/2 animate-floating"
        />

        {/* right */}
        <Image
          src={"/15.png"}
          width={310}
          height={310}
          alt="musical instrument"
          className="absolute top-10 left-56 transform translate-x-1/2 -translate-y-1/2 animate-floating"
        />
        {/* left */}
        <Image
          src={"/4.png"}
          width={310}
          height={310}
          alt="musical instrument"
          className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 animate-floating"
        />
        {/* closer right */}
        <Image
          src={"/14.png"}
          width={310}
          height={310}
          alt="musical instrument"
          className="absolute top-72 right-56 transform -translate-x-1/2 -translate-y-1/2 animate-floating"
        />

        <Image
          src={"/5.png"}
          width={310}
          height={310}
          alt="musical instrument"
          className="absolute top-24 right-1/3 transform translate-x-1/2 translate-y-1/2 animate-floating"
        />
        <Image
          src={"/9.png"}
          width={310}
          height={310}
          alt="musical instrument"
          className="absolute top-2/4 left-56 transform translate-x-1/2 -translate-y-1/2 animate-floating"
        />

        <Image
          src={"/13.png"}
          width={310}
          height={310}
          alt="Yellow pawn chess piece"
          className="absolute bottom-[32rem] left-[62rem] transform translate-x-1/2 translate-y-1/2 animate-floating"
        />
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 w-full text-center text-gray-500 py-4">
        © 2024 Junior David Mikyas.
      </footer>
    </div>
  );
}
