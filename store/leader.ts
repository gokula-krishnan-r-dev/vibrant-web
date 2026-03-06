"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export const LEADER_DISCOUNT = 100;

interface LeaderUser {
  name: string;
  email: string;
}

interface LeaderStore {
  isLeader: boolean;
  user: LeaderUser | null;
  setLeader: (user: LeaderUser) => void;
  logout: () => void;
}

export const useLeaderStore = create<LeaderStore>()(
  persist(
    (set) => ({
      isLeader: false,
      user: null,
      setLeader: (user) => set({ isLeader: true, user }),
      logout: () => set({ isLeader: false, user: null }),
    }),
    { name: "vibrant-leader" }
  )
);
