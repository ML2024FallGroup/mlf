"use client";

import { useCallback, useState } from "react";
import { Upload, CheckCircle, AlertCircle } from "lucide-react";
import Draw from "@/public/demo2";
import useMainAudioStore from "@/lib/audioStore";

// const store = useMainAudioStore();

export default function HomePage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [open, setOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  // const [updates, setUpdates] = useState<ProcessingUpdate[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith("audio/")) {
      setFile(selectedFile);
      setUploadStatus("idle");
    } else {
      setFile(null);
      setUploadStatus("error");
    }
  };

  // Handle file upload
  const handleUpload = useCallback(
    async (event: any) => {
      event.preventDefault();
      if (!file) {
        // setError("Please select an audio file");
        return;
      }

      // setIsUploading(true);
      // setError(null);
      // setUpdates([]);

      const formData = new FormData();
      formData.append("audio", file);

      try {
        const response = await fetch("http://localhost:8000/upload/", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Upload failed: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data);
        // const audio = new Audio("http://localhost:8000" + data.location);
        // addMeta({ songUrl: "http://localhost:8000" + data.location });
        setOpen(true);

        // Clean up existing WebSocket connection
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An error occurred during upload"
        );
      } finally {
        setIsUploading(false);
      }
    },
    [file]
  );

  return (
    <main className="text-center">
      <h1 className="text-4xl font-bold mb-4">Share Your Sound</h1>
      <p className="text-xl mb-8">
        Upload your audio and let the world hear your creation.
      </p>
      <form onSubmit={handleUpload} className="space-y-4">
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="audio-upload"
            className="flex flex-col items-center justify-center w-64 h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:backdrop-blur-md"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-10 h-10 mb-3 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500">
                MP3, WAV, or OGG (MAX. 10MB)
              </p>
            </div>
            <input
              id="audio-upload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept="audio/*"
            />
          </label>
        </div>
        {file && (
          <div className="text-sm text-gray-600">
            Selected file: {file.name}
          </div>
        )}
        <button
          type="submit"
          disabled={!file || uploadStatus === "success"}
          className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploadStatus === "success" ? "Uploaded!" : "Upload Audio"}
          {uploadStatus === "success" && (
            <CheckCircle className="ml-2 h-5 w-5" />
          )}
        </button>
      </form>
      {uploadStatus === "error" && (
        <div className="mt-4 text-red-500 flex items-center justify-center">
          <AlertCircle className="mr-2 h-5 w-5" />
          Error uploading file. Please try again.
        </div>
      )}

      <Draw open={open} setOpen={setOpen} />
    </main>
  );
}
