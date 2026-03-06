"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Crown, ArrowRight, LogOut } from "lucide-react";
import { products } from "@/lib/products";
import ProductCard from "@/components/products/ProductCard";
import { useLeaderStore, LEADER_DISCOUNT } from "@/store/leader";

export default function VibrantLeadersProductsPage() {
  const { isLeader, user, logout } = useLeaderStore();

  useEffect(() => {
    if (typeof window !== "undefined" && !isLeader) {
      window.location.href = "/vibrant-leaders";
      return;
    }
  }, [isLeader]);

  if (!isLeader) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-[hsl(var(--muted-foreground))]">Redirecting to login…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header with leader badge */}
      <div className="bg-gradient-to-br from-amber-500/10 via-amber-600/5 to-transparent border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center border border-amber-500/30">
                <Crown className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-black tracking-tight">
                  Leader <span className="text-amber-600 dark:text-amber-400">Products</span>
                </h1>
                <p className="text-sm text-[hsl(var(--muted-foreground))] mt-0.5">
                  Welcome back{user?.name ? `, ${user.name}` : ""} — ₹{LEADER_DISCOUNT} off every order
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/cart"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 text-white font-semibold text-sm hover:bg-amber-700 transition-colors"
              >
                View Cart <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={logout}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--foreground))] transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Exit
              </button>
            </div>
          </div>
          <div className="mt-4 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-sm text-amber-800 dark:text-amber-200">
            <strong>Leader benefit:</strong> All prices below show your exclusive ₹{LEADER_DISCOUNT} discount. The same discount is applied at checkout.
          </div>
        </div>
      </div>

      {/* Products grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              leaderDiscount={LEADER_DISCOUNT}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
