import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DemoStore {
  remainingDemos: number | null;
  setRemainingDemos: (count: number) => void;
  fetchRemainingDemos: () => Promise<void>;
  tryOnResults: TryOnResult[];
  addTryOnResult: (result: TryOnResult) => void;
}

interface TryOnResult {
  outputUrl: string;
  modelPreview: string;
  apparelPreview: string;
  timestamp: string;
}

export const useDemoStore = create<DemoStore>()(
  persist(
    (set) => ({
      remainingDemos: null,
      tryOnResults: [],
      setRemainingDemos: (count: number) => set({ remainingDemos: count }),
      addTryOnResult: (result: TryOnResult) =>
        set((state) => ({
          tryOnResults: [result, ...state.tryOnResults].slice(0, 10),
        })),
      fetchRemainingDemos: async () => {
        try {
          const response = await fetch("/api/demo-count");
          const data = await response.json();
          set({ remainingDemos: data.remaining });
        } catch (error) {
          console.error("Failed to fetch remaining demos:", error);
        }
      },
    }),
    {
      name: "demo-storage", // unique name for localStorage key
      partialize: (state) => ({ tryOnResults: state.tryOnResults }), // only persist tryOnResults
    }
  )
);
