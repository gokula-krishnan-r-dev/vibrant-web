"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, ShoppingBag, ArrowRight, Trash2, Tag } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { Button } from "@/components/ui/button";
import { cn, formatPrice } from "@/lib/utils";

const SHIPPING_THRESHOLD = 999;
const SHIPPING_COST = 99;

export default function CartSheet() {
    const isOpen = useCartStore((s) => s.isOpen);
    const closeCart = useCartStore((s) => s.closeCart);
    const items = useCartStore((s) => s.items);
    const removeItem = useCartStore((s) => s.removeItem);
    const updateQuantity = useCartStore((s) => s.updateQuantity);
    const totalPrice = useCartStore((s) => s.totalPrice());

    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    const shipping = totalPrice >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    const grandTotal = totalPrice + shipping;
    const freeShippingPct = Math.min(100, (totalPrice / SHIPPING_THRESHOLD) * 100);

    return (
        <>
            {/* Backdrop */}
            <div
                className={cn(
                    "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300",
                    isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}
                onClick={closeCart}
            />

            {/* Sheet */}
            <div
                className={cn(
                    "fixed top-0 right-0 bottom-0 z-50 w-full max-w-[420px] bg-[hsl(var(--background))] border-l shadow-2xl",
                    "flex flex-col transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    isOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b">
                    <div className="flex items-center gap-3">
                        <ShoppingBag className="w-5 h-5 text-[hsl(var(--primary))]" />
                        <h2 className="font-bold text-lg">Your Cart</h2>
                        {items.length > 0 && (
                            <span className="ml-1 w-6 h-6 rounded-full bg-[hsl(var(--primary))] text-white text-xs font-bold flex items-center justify-center">
                                {items.reduce((s, i) => s + i.quantity, 0)}
                            </span>
                        )}
                    </div>
                    <button
                        onClick={closeCart}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[hsl(var(--muted))] transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Empty State */}
                {items.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
                        <div className="w-20 h-20 rounded-full bg-[hsl(var(--muted))] flex items-center justify-center mb-4">
                            <ShoppingBag className="w-10 h-10 text-[hsl(var(--muted-foreground))]" />
                        </div>
                        <p className="font-semibold text-lg mb-1">Your cart is empty</p>
                        <p className="text-sm text-[hsl(var(--muted-foreground))] mb-6">
                            Add some products to get started
                        </p>
                        <Button onClick={closeCart} asChild>
                            <Link href="/products">Browse Products <ArrowRight className="w-4 h-4" /></Link>
                        </Button>
                    </div>
                ) : (
                    <>
                        {/* Free shipping bar */}
                        <div className="px-6 py-3 bg-[hsl(var(--surface-2))] border-b">
                            {totalPrice >= SHIPPING_THRESHOLD ? (
                                <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                                    🎉 You have free shipping!
                                </p>
                            ) : (
                                <p className="text-xs text-[hsl(var(--muted-foreground))] mb-1.5">
                                    Add <span className="font-bold text-[hsl(var(--primary))]">
                                        {formatPrice(SHIPPING_THRESHOLD - totalPrice)}
                                    </span> more for free shipping
                                </p>
                            )}
                            <div className="h-1.5 rounded-full bg-[hsl(var(--border))] overflow-hidden">
                                <div
                                    className="h-full rounded-full bg-[hsl(var(--primary))] transition-all duration-700"
                                    style={{ width: `${freeShippingPct}%` }}
                                />
                            </div>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                            {items.map((item) => (
                                <div
                                    key={`${item.id}-${item.variant}`}
                                    className="flex gap-3 p-3 rounded-2xl border bg-[hsl(var(--card))] group"
                                >
                                    <Link href={`/products/${item.slug}`} onClick={closeCart}>
                                        <div className="w-18 h-18 w-[72px] h-[72px] rounded-xl overflow-hidden bg-[hsl(var(--muted))] relative shrink-0">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-contain p-1.5"
                                                sizes="72px"
                                            />
                                        </div>
                                    </Link>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2">
                                            <div>
                                                <Link href={`/products/${item.slug}`} onClick={closeCart}>
                                                    <p className="font-semibold text-sm line-clamp-1 hover:text-[hsl(var(--primary))] transition-colors">
                                                        {item.name}
                                                    </p>
                                                </Link>
                                                {item.variant && (
                                                    <p className="text-xs text-[hsl(var(--muted-foreground))]">{item.variant}</p>
                                                )}
                                            </div>
                                            <button
                                                onClick={() => removeItem(item.id, item.variant)}
                                                className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:text-red-500"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-between mt-2">
                                            <div className="flex items-center gap-1.5">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.variant, item.quantity - 1)}
                                                    className="w-6 h-6 rounded border flex items-center justify-center hover:bg-[hsl(var(--muted))] transition-colors"
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </button>
                                                <span className="w-6 text-center text-sm font-bold">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.variant, item.quantity + 1)}
                                                    className="w-6 h-6 rounded border flex items-center justify-center hover:bg-[hsl(var(--muted))] transition-colors"
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
                        </div>

                        {/* Footer */}
                        <div className="border-t px-6 py-5 space-y-4 bg-[hsl(var(--surface-2))]">
                            {/* Coupon */}
                            <div className="flex gap-2">
                                <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg border bg-[hsl(var(--background))]">
                                    <Tag className="w-3.5 h-3.5 text-[hsl(var(--muted-foreground))] shrink-0" />
                                    <input
                                        type="text"
                                        placeholder="Coupon code"
                                        className="flex-1 text-xs bg-transparent outline-none"
                                    />
                                </div>
                                <Button size="sm" variant="outline" className="text-xs shrink-0">Apply</Button>
                            </div>

                            {/* Totals */}
                            <div className="space-y-1.5">
                                <div className="flex justify-between text-sm">
                                    <span className="text-[hsl(var(--muted-foreground))]">Subtotal</span>
                                    <span>{formatPrice(totalPrice)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-[hsl(var(--muted-foreground))]">Shipping</span>
                                    <span className={cn(shipping === 0 && "text-emerald-500 font-medium")}>
                                        {shipping === 0 ? "FREE" : formatPrice(shipping)}
                                    </span>
                                </div>
                                <div className="flex justify-between font-bold text-base border-t pt-2">
                                    <span>Total</span>
                                    <span>{formatPrice(grandTotal)}</span>
                                </div>
                            </div>

                            <Button size="lg" className="w-full gap-2">
                                Checkout <ArrowRight className="w-4 h-4" />
                            </Button>
                            <button
                                onClick={closeCart}
                                className="w-full text-xs text-center text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors py-1"
                            >
                                Continue Shopping →
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
