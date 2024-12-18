import useWeightedPredictionsStore from "@/lib/predictionStore";
import useStemStore from "@/lib/stemStore";
import { create } from "zustand";

type AudioMetadata = {
  title: string;
  artist: string;
  genre: string;
};

type MainAudioData = {
  type: "chat";
  item_type: "main_audio_data";
  detail: {
    metadata: AudioMetadata;
    spectrogram: string;
    audio_path: string;
    cover: string;
  };
};

interface MainAudioState {
  audioData: MainAudioData | null;

  setAudioData: (data: MainAudioData) => void;

  resetStore: () => void;
}

const DEFAULT_STATE = {
  audioData: null,
};

const useMainAudioStore = create<MainAudioState>()((set) => ({
  ...DEFAULT_STATE,

  setAudioData: (data) =>
    set({
      audioData: data,
    }),

  resetStore: () => set(DEFAULT_STATE),
}));

// Helper function to reset all stores
export const resetAllStores = () => {
  useMainAudioStore.getState().resetStore();
  useWeightedPredictionsStore.getState().resetStore();
  useStemStore.getState().clearStems();
};

export default useMainAudioStore;
