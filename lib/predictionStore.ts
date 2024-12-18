import { create } from "zustand";
import useStemStore, { GenrePredictions } from "@/lib/stemStore";

type PredictionWeights = {
  dnn: number;
  cnn: number;
};

interface WeightedPredictionsState {
  weights: PredictionWeights;
  combinedPredictions: GenrePredictions | null;
  setWeights: (weights: Partial<PredictionWeights>) => void;
  updateCombinedPredictions: () => void;
  getTopNPredictions: (
    n: number
  ) => Array<{ genre: string; probability: number }>;
  getTopNForStemAtIndex: (
    index: number,
    n: number,
    cnnWeight: number,
    dnnWeight: number
  ) => Array<{ genre: string; probability: number }>;
  resetStore: () => void;
}

const normalizeScores = (predictions: GenrePredictions): GenrePredictions => {
  const sum = Object.values(predictions).reduce((acc, val) => acc + val, 0);
  return Object.entries(predictions).reduce((acc, [genre, value]) => {
    acc[genre as keyof GenrePredictions] = value / sum;
    return acc;
  }, {} as GenrePredictions);
};

const validateWeights = (weights: PredictionWeights): PredictionWeights => {
  const sum = weights.dnn + weights.cnn;
  return {
    dnn: weights.dnn / sum,
    cnn: weights.cnn / sum,
  };
};

export const calculateWeightedPredictions = (
  dnnPred: GenrePredictions,
  cnnPred: GenrePredictions,
  weights: PredictionWeights
): GenrePredictions => {
  // First normalize individual predictions
  const normalizedDNN = normalizeScores(dnnPred);
  const normalizedCNN = normalizeScores(cnnPred);

  // Calculate weighted sum
  const genres = Object.keys(normalizedDNN) as (keyof GenrePredictions)[];
  const weightedPred = genres.reduce((acc, genre) => {
    acc[genre] =
      normalizedDNN[genre] * weights.dnn + normalizedCNN[genre] * weights.cnn;
    return acc;
  }, {} as GenrePredictions);

  // Normalize the final result
  return normalizeScores(weightedPred);
};

const DEFAULT_WEIGHTS: PredictionWeights = {
  dnn: 0.7,
  cnn: 0.3,
};

const useWeightedPredictionsStore = create<WeightedPredictionsState>(
  (set, get) => ({
    weights: DEFAULT_WEIGHTS,
    combinedPredictions: null,

    setWeights: (newWeights) =>
      set((state) => {
        const updatedWeights = { ...state.weights, ...newWeights };
        const normalizedWeights = validateWeights(updatedWeights);

        // Update predictions with new weights
        const currentStem = useStemStore.getState().getCurrentStem();
        let combinedPredictions = null;

        if (currentStem) {
          const { dnn_pred, cnn_prediction } = currentStem.detail.segment_data;
          combinedPredictions = calculateWeightedPredictions(
            dnn_pred,
            cnn_prediction,
            normalizedWeights
          );
        }

        return {
          weights: normalizedWeights,
          combinedPredictions,
        };
      }),

    getTopNPredictions: (n: number) => {
      const { combinedPredictions } = get();
      if (!combinedPredictions) return [];

      return Object.entries(combinedPredictions)
        .map(([genre, probability]) => ({
          genre,
          probability,
        }))
        .sort((a, b) => b.probability - a.probability)
        .slice(0, n);
    },

    resetStore: () => {
      set({
        weights: DEFAULT_WEIGHTS,
        combinedPredictions: null,
      });
    },
    getTopNForStemAtIndex: (
      index: number,
      n: number,
      cnnWeight: number,
      dnnWeight: number
    ) => {
      const stems = useStemStore.getState().stems;

      if (index < 0 || index >= stems.length) {
        return [];
      }

      const stem = stems[index];
      const { dnn_pred, cnn_prediction } = stem.detail.segment_data;

      // Normalize weights
      const totalWeight = cnnWeight + dnnWeight;
      const normalizedWeights = {
        cnn: cnnWeight / totalWeight,
        dnn: dnnWeight / totalWeight,
      };

      // Calculate weighted predictions for this specific stem
      const predictions = calculateWeightedPredictions(
        dnn_pred,
        cnn_prediction,
        normalizedWeights
      );

      // Sort and return top N
      return Object.entries(predictions)
        .map(([genre, probability]) => ({
          genre,
          probability,
        }))
        .sort((a, b) => b.probability - a.probability)
        .slice(0, n);
    },

    updateCombinedPredictions: () => {
      const currentStem = useStemStore.getState().getCurrentStem();
      const { weights } = get();

      if (currentStem) {
        const { dnn_pred, cnn_prediction } = currentStem.detail.segment_data;
        const combinedPredictions = calculateWeightedPredictions(
          dnn_pred,
          cnn_prediction,
          weights
        );
        set({ combinedPredictions });
      } else {
        set({ combinedPredictions: null });
      }
    },
  })
);

// Set up subscription to update combined predictions when stems change
useStemStore.subscribe((state) => {
  useWeightedPredictionsStore.getState().updateCombinedPredictions();
});

export default useWeightedPredictionsStore;
