import { create } from 'zustand';

type GlobalState = {
  isLoading: boolean;
  setLoading: (value: boolean) => void;
};

export const useGlobalStore = create<GlobalState>((set) => ({
  isLoading: false,
  setLoading: (value) => set({ isLoading: value })
}));
