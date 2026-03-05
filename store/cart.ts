"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
    id: string;
    slug: string;
    name: string;
    price: number;
    image: string;
    variant: string;
    quantity: number;
}

interface CartStore {
    items: CartItem[];
    isOpen: boolean;
    addItem: (item: Omit<CartItem, "quantity">) => void;
    removeItem: (id: string, variant: string) => void;
    updateQuantity: (id: string, variant: string, quantity: number) => void;
    clearCart: () => void;
    openCart: () => void;
    closeCart: () => void;
    totalItems: () => number;
    totalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,

            addItem: (newItem) => {
                set((state) => {
                    const existing = state.items.find(
                        (i) => i.id === newItem.id && i.variant === newItem.variant
                    );
                    if (existing) {
                        return {
                            items: state.items.map((i) =>
                                i.id === newItem.id && i.variant === newItem.variant
                                    ? { ...i, quantity: i.quantity + 1 }
                                    : i
                            ),
                        };
                    }
                    return { items: [...state.items, { ...newItem, quantity: 1 }] };
                });
            },

            removeItem: (id, variant) => {
                set((state) => ({
                    items: state.items.filter(
                        (i) => !(i.id === id && i.variant === variant)
                    ),
                }));
            },

            updateQuantity: (id, variant, quantity) => {
                if (quantity <= 0) {
                    get().removeItem(id, variant);
                    return;
                }
                set((state) => ({
                    items: state.items.map((i) =>
                        i.id === id && i.variant === variant ? { ...i, quantity } : i
                    ),
                }));
            },

            clearCart: () => set({ items: [] }),
            openCart: () => set({ isOpen: true }),
            closeCart: () => set({ isOpen: false }),

            totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
            totalPrice: () =>
                get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
        }),
        {
            name: "vibrant-cart",
            partialize: (state) => ({ items: state.items }),
        }
    )
);
