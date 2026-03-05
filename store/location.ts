"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type LocationDisplayMode = "city" | "full";

export interface LocationState {
    city: string;
    pincode: string;
    fullAddress: string | null;
    displayMode: LocationDisplayMode;
}

interface LocationStore extends LocationState {
    setLocation: (location: Partial<LocationState>) => void;
    setDisplayMode: (mode: LocationDisplayMode) => void;
    clearLocation: () => void;
}

const defaultState: LocationState = {
    city: "",
    pincode: "",
    fullAddress: null,
    displayMode: "city",
};

export const useLocationStore = create<LocationStore>()(
    persist(
        (set) => ({
            ...defaultState,
            setLocation: (location) =>
                set((state) => ({ ...state, ...location })),
            setDisplayMode: (displayMode) => set({ displayMode }),
            clearLocation: () => set(defaultState),
        }),
        {
            name: "vibrant-location",
            partialize: (s) => ({ city: s.city, pincode: s.pincode, fullAddress: s.fullAddress, displayMode: s.displayMode }),
        }
    )
);
