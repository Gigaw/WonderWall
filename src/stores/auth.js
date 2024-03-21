import { create } from "zustand";

const useAuthStore = create((set) => ({
  isAuth: false,
  setIsAuth: (isAuth) => set({ isAuth }),
}));

export default useAuthStore;
