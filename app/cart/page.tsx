"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag, BadgeCheck } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { useLeaderStore, LEADER_DISCOUNT } from "@/store/leader";
import { Button } from "@/components/ui/button";
import { cn, formatPrice } from "@/lib/utils";

const SHIPPING_THRESHOLD = 999;
const SHIPPING_COST = 99;

export default function CartPage() {
    const items = useCartStore((s) => s.items);
    const removeItem = useCartStore((s) => s.removeItem);
    const updateQuantity = useCartStore((s) => s.updateQuantity);
    const clearCart = useCartStore((s) => s.clearCart);
    const total = useCartStore((s) => s.totalPrice());
    const isLeader = useLeaderStore((s) => s.isLeader);

    const shipping = total >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    const leaderDiscount = isLeader ? LEADER_DISCOUNT : 0;
    const grandTotal = Math.max(0, total + shipping - leaderDiscount);
    const freeShippingRemaining = Math.max(0, SHIPPING_THRESHOLD - total);

    if (items.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
                <div className="w-24 h-24 rounded-full bg-[hsl(var(--muted))] flex items-center justify-center mb-6">
                    <ShoppingBag className="w-12 h-12 text-[hsl(var(--muted-foreground))]" />
                </div>
                <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
                <p className="text-[hsl(var(--muted-foreground))] mb-8 max-w-sm">
                    Looks like you haven't added any products yet. Start shopping and discover our premium wellness range.
                </p>
                <Button size="lg" asChild>
                    <Link href="/products">
                        Browse Products <ArrowRight className="w-4 h-4" />
                    </Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <div className="bg-[hsl(var(--surface-2))] border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-3xl font-black">Shopping Cart</h1>
                    <p className="text-[hsl(var(--muted-foreground))] mt-1">
                        {items.reduce((s, i) => s + i.quantity, 0)} items in your cart
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Free shipping progress */}
                {freeShippingRemaining > 0 && (
                    <div className="mb-6 p-4 rounded-xl border bg-[hsl(var(--primary)/0.05)] border-[hsl(var(--primary)/0.2)]">
                        <p className="text-sm text-[hsl(var(--muted-foreground))] mb-2">
                            Add <span className="font-bold text-[hsl(var(--primary))]">{formatPrice(freeShippingRemaining)}</span> more for free shipping!
                        </p>
                        <div className="h-2 rounded-full bg-[hsl(var(--muted))] overflow-hidden">
                            <div
                                className="h-full rounded-full bg-[hsl(var(--primary))] transition-all duration-500"
                                style={{ width: `${Math.min(100, (total / SHIPPING_THRESHOLD) * 100)}%` }}
                            />
                        </div>
                    </div>
                )}
                {freeShippingRemaining === 0 && (
                    <div className="mb-6 p-4 rounded-xl border border-emerald-500/30 bg-emerald-50 dark:bg-emerald-900/10 text-emerald-700 dark:text-emerald-400 text-sm font-medium flex items-center gap-2">
                        🎉 You qualify for free shipping!
                    </div>
                )}

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart items */}
                    <div className="lg:col-span-2 space-y-4">
                        {items.map((item) => (
                            <div
                                key={`${item.id}-${item.variant}`}
                                className="flex gap-4 p-4 rounded-2xl border bg-[hsl(var(--card))] group"
                            >
                                <Link href={`/products/${item.slug}`} className="shrink-0">
                                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-[hsl(var(--muted))] relative">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-contain p-2"
                                            sizes="96px"
                                        />
                                    </div>
                                </Link>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                        <div>
                                            <Link href={`/products/${item.slug}`}>
                                                <h3 className="font-semibold text-sm hover:text-[hsl(var(--primary))] transition-colors">
                                                    {item.name}
                                                </h3>
                                            </Link>
                                            {item.variant && (
                                                <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">
                                                    {item.variant}
                                                </p>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => removeItem(item.id, item.variant)}
                                            className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-[hsl(var(--destructive)/0.1)] hover:text-[hsl(var(--destructive))] text-[hsl(var(--muted-foreground))]"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between mt-3">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.variant, item.quantity - 1)}
                                                className="w-7 h-7 rounded-lg border flex items-center justify-center hover:bg-[hsl(var(--muted))] transition-colors"
                                            >
                                                <Minus className="w-3 h-3" />
                                            </button>
                                            <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.variant, item.quantity + 1)}
                                                className="w-7 h-7 rounded-lg border flex items-center justify-center hover:bg-[hsl(var(--muted))] transition-colors"
                                            >
                                                <Plus className="w-3 h-3" />
                                            </button>
                                        </div>
                                        <span className="font-bold text-sm">
                                            {formatPrice(item.price * item.quantity)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <button
                            onClick={clearCart}
                            className="text-xs text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--destructive))] transition-colors underline underline-offset-2"
                        >
                            Clear all items
                        </button>
                    </div>

                    {/* Order summary */}
                    <div className="lg:col-span-1">
                        <div className="rounded-2xl border bg-[hsl(var(--card))] p-6 sticky top-28">
                            <h2 className="font-bold text-lg mb-6">Order Summary</h2>

                            {/* Coupon code */}
                            <div className="mb-6">
                                <label className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wide mb-2 block">
                                    Coupon Code
                                </label>
                                <div className="flex gap-2">
                                    <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg border bg-[hsl(var(--surface-2))]">
                                        <Tag className="w-4 h-4 text-[hsl(var(--muted-foreground))]" />
                                        <input
                                            type="text"
                                            placeholder="Enter code"
                                            className="flex-1 text-sm bg-transparent outline-none"
                                        />
                                    </div>
                                    <Button size="sm" variant="outline">Apply</Button>
                                </div>
                            </div>

                            {/* Price breakdown */}
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-sm">
                                    <span className="text-[hsl(var(--muted-foreground))]">Subtotal</span>
                                    <span className="font-medium">{formatPrice(total)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-[hsl(var(--muted-foreground))]">Shipping</span>
                                    <span className={cn("font-medium", shipping === 0 && "text-emerald-600")}>
                                        {shipping === 0 ? "FREE" : formatPrice(shipping)}
                                    </span>
                                </div>
                                {isLeader && (
                                    <div className="flex justify-between text-sm text-amber-600 dark:text-amber-400">
                                        <span className="flex items-center gap-1.5">
                                            <BadgeCheck className="w-4 h-4" />
                                            Vibrant Leader discount
                                        </span>
                                        <span className="font-semibold">−{formatPrice(LEADER_DISCOUNT)}</span>
                                    </div>
                                )}
                                <div className="border-t pt-3 flex justify-between">
                                    <span className="font-bold">Total</span>
                                    <span className="font-black text-xl">{formatPrice(grandTotal)}</span>
                                </div>
                            </div>

                            <Button size="lg" className="w-full gap-2">
                                Proceed to Checkout <ArrowRight className="w-4 h-4" />
                            </Button>

                            <p className="text-[10px] text-center text-[hsl(var(--muted-foreground))] mt-3">
                                Secure checkout · Free returns · COD available
                            </p>

                            <div className="mt-6 pt-6 border-t">
                                <Button variant="ghost" size="sm" className="w-full" asChild>
                                    <Link href="/products">← Continue Shopping</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
