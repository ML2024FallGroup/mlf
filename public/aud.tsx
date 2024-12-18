"use client";

// types.ts
export interface ProcessingUpdate {
  message: string;
  status: "processing" | "completed" | "error";
  feature?: string;
  prediction?: {
    class: string;
    confidence: number;
  };
}

export interface UploadResponse {
  status: string;
  channel_name: string;
  websocket_url: string;
}

// AudioProcessor.tsx
import React, { useState, useCallback, useRef } from "react";

const AudioProcessor: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [updates, setUpdates] = useState<ProcessingUpdate[]>([]);
  const [error, setError] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
      setUpdates([]);
    }
  };

  // Handle file upload
  const handleUpload = useCallback(async () => {
    if (!file) {
      setError("Please select an audio file");
      return;
    }

    setIsUploading(true);
    setError(null);
    setUpdates([]);

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

      const data: UploadResponse = await response.json();

      // Clean up existing WebSocket connection
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred during upload"
      );
    } finally {
      setIsUploading(false);
    }
  }, [file]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="mb-4">
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
        />
      </div>

      <button
        onClick={handleUpload}
        disabled={!file || isUploading}
        className={`px-4 py-2 rounded ${
          !file || isUploading
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-violet-600 hover:bg-violet-700 text-white"
        }`}
      >
        {isUploading ? "Uploading..." : "Process Audio"}
      </button>

      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="mt-4 space-y-2">
        {updates.map((update, index) => (
          <div
            key={index}
            className={`p-4 rounded ${
              update.status === "completed"
                ? "bg-green-100 border border-green-400"
                : "bg-blue-100 border border-blue-400"
            }`}
          >
            <p className="text-sm">{update.message}</p>
            {update.prediction && (
              <div className="mt-2">
                <p className="font-semibold">
                  Prediction: Class {update.prediction.class}
                </p>
                <p className="text-sm">
                  Confidence: {(update.prediction.confidence * 100).toFixed(1)}%
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AudioProcessor;
