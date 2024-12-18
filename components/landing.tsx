import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function ChessLanding() {
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
          <span className="font-medium">Google Labs</span>
          <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
            EXPERIMENT
          </span>
        </div>
        <div className="flex gap-4">
          <button className="p-2" aria-label="Share">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
              <polyline points="16 6 12 2 8 6" />
              <line x1="12" y1="2" x2="12" y2="15" />
            </svg>
          </button>
          <button className="p-2" aria-label="Help">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <path d="M12 17h.01" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12 relative z-10">
        <div className="flex flex-col items-center text-center gap-8">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif tracking-tight">
            Make Your Next Move a Masterpiece
          </h1>
          <h2 className="text-8xl md:text-9xl font-serif">GenChess</h2>
          <Button className="rounded-none px-12 py-6 text-lg">
            Get Started
          </Button>
        </div>
      </main>

      {/* Chess Pieces */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/download.png"
          width={150}
          height={150}
          alt="Skyscraper chess piece"
          className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 floating"
        />
        <Image
          src="/placeholder.svg?height=100&width=100"
          width={100}
          height={100}
          alt="Water effect chess piece"
          className="absolute top-3/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 floating"
        />
        <Image
          src="/placeholder.svg?height=120&width=120"
          width={120}
          height={120}
          alt="Rainbow knight chess piece"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 floating"
        />
        <Image
          src="/placeholder.svg?height=130&width=130"
          width={130}
          height={130}
          alt="Green rook chess piece"
          className="absolute top-1/3 right-1/4 transform translate-x-1/2 -translate-y-1/2 floating"
        />
        <Image
          src="/placeholder.svg?height=110&width=110"
          width={110}
          height={110}
          alt="Yellow pawn chess piece"
          className="absolute bottom-1/4 right-1/3 transform translate-x-1/2 translate-y-1/2 floating"
        />
        <Image
          src="/placeholder.svg?height=140&width=140"
          width={140}
          height={140}
          alt="Pink pawn chess piece"
          className="absolute top-1/4 right-1/5 transform translate-x-1/2 -translate-y-1/2 floating"
        />
        <Image
          src="/placeholder.svg?height=160&width=160"
          width={160}
          height={160}
          alt="Blue bell chess piece"
          className="absolute bottom-1/3 left-1/3 transform -translate-x-1/2 translate-y-1/2 floating"
        />
        <Image
          src="/placeholder.svg?height=90&width=90"
          width={90}
          height={90}
          alt="Cat chess piece"
          className="absolute bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2 floating"
        />
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 w-full p-4 flex justify-between text-sm text-gray-600 bg-transparent z-10">
        <p>AI outputs may sometimes be offensive or inaccurate.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:underline">
            Privacy
          </a>
          <a href="#" className="hover:underline">
            Terms of Service
          </a>
        </div>
      </footer>
    </div>
  );
}
