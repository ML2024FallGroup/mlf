import { create } from "zustand";

// Types for the prediction data
export type GenrePredictions = {
  blues: number;
  classical: number;
  country: number;
  disco: number;
  hiphop: number;
  jazz: number;
  metal: number;
  pop: number;
  reggae: number;
  rock: number;
};

// Type for the segment data
type SegmentData = {
  stem_director: string;
  segment_spec: string;
  segment_path: string;
  stem_specs: string[];
  dnn_pred: GenrePredictions;
  cnn_prediction: GenrePredictions;
};

// Type for the chat item
export type StemDataItem = {
  type: "chat";
  item_type: "stem_data";
  detail: {
    segment_data: SegmentData;
  };
};

// Store state interface
interface StemStoreState {
  stems: StemDataItem[];
  currentStemIndex: number;
  addStem: (stem: StemDataItem) => void;
  setCurrentStemIndex: (index: number) => void;
  clearStems: () => void;
  removeStem: (index: number) => void;
  getCurrentStem: () => StemDataItem | null;
}

// Create the store
const useStemStore = create<StemStoreState>()((set, get) => ({
  stems: [],
  currentStemIndex: -1,

  addStem: (stem) =>
    set((state) => ({
      stems: [...state.stems, stem],
      currentStemIndex:
        state.currentStemIndex === -1 ? 0 : state.currentStemIndex,
    })),

  setCurrentStemIndex: (index) =>
    set((state) => ({
      currentStemIndex: Math.min(Math.max(index, 0), state.stems.length - 1),
    })),

  clearStems: () =>
    set(() => ({
      stems: [],
      currentStemIndex: -1,
    })),

  removeStem: (index) =>
    set((state) => {
      const newStems = [...state.stems];
      newStems.splice(index, 1);
      return {
        stems: newStems,
        currentStemIndex:
          state.currentStemIndex >= index
            ? Math.max(0, state.currentStemIndex - 1)
            : state.currentStemIndex,
      };
    }),

  getCurrentStem: () => {
    const { stems, currentStemIndex } = get();
    return currentStemIndex >= 0 ? stems[currentStemIndex] : null;
  },
}));

export default useStemStore;
