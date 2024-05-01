import { create } from "zustand";

const useToursStore = create((set) => ({
  tours: [],
  isLoading: false,
  setTours: async (tours) => set({ tours }),
  removeTour: async (id) =>
    set((state) => ({
      tours: state.tours.filter((el) => el.id !== id),
    })),
  setIsLoading: async (isLoading) => set({ isLoading }),
  addTour: async (tour) => set((state) => ({ tours: [tour, ...state.tours] })),
}));

export default useToursStore;
