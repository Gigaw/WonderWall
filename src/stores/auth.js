import { create } from "zustand";

const useAuthStore = create((set) => ({
  isAuth: false,
  user: null,
  setIsAuth: (isAuth) => set({ isAuth }),
}));

export default useAuthStore;
