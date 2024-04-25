import { create } from "zustand";

const useToursStore = create((set) => ({
  tours: [],
  isLoading: false,
  setTours: async (tours) => set({ tours }),
  setIsLoading: async (isLoading) => set({ isLoading }),
}));

export default useToursStore;
