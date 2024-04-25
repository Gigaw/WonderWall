import { create } from "zustand";

const useAuthStore = create((set) => ({
  isAuth: false,
  user: null,
  token: null,
  setIsAuth: async (isAuth) => set({ isAuth }),
  // setUser: (user) => set({ user }),
  logIn: async (user, token) => set({ user, token, isAuth: true }),
  logOut: async () => set({ user: null, token: null, isAuth: false }),
}));

export default useAuthStore;
