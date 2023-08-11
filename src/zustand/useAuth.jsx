import { create } from "zustand";

export const useAuth = create((set) => ({
  user: false,
  setUser: (user) => set({ user }),
  logout: () => set({ user: false }),
}));
