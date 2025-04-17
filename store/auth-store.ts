// lib/auth-store.ts
import { create } from 'zustand';

type AuthState = {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
};

const getInitialLoginState = (): boolean => {
  if (typeof window !== 'undefined') {
    return document.cookie.includes('logged_in=true');
  }
  return false;
};

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: getInitialLoginState(),
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false })
}));
