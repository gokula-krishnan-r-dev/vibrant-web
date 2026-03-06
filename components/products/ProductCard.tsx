"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Star, Check } from "lucide-react";
import { Product } from "@/lib/products";
import { useCartStore } from "@/store/cart";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn, formatPrice } from "@/lib/utils";

interface ProductCardProps {
    product: Product;
    className?: string;
    /** When set, show leader price (price - discount) and a leader badge */
    leaderDiscount?: number;
}

// Color map for category-based accent colors
const categoryColors: Record<string, string> = {
    "Skin Care": "var(--brand-pink)",
    Supplements: "#2dd4bf",
    "Body Care": "hsl(var(--brand-purple))",
    Wellness: "#60a5fa",
};

export default function ProductCard({ product, className, leaderDiscount }: ProductCardProps) {
    const [added, setAdded] = useState(false);
    const addItem = useCartStore((s) => s.addItem);
    const openCart = useCartStore((s) => s.openCart);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        addItem({
            id: product.id,
            slug: product.slug,
            name: product.name,
            price: product.price,
            image: product.image,
            variant: product.variants[0]?.value ?? "",
        });
        openCart();
        setAdded(true);
        setTimeout(() => setAdded(false), 1800);
    };

    const discount = product.originalPrice
        ? Math.round((1 - product.price / product.originalPrice) * 100)
        : null;

    return (
        <Link href={`/products/${product.slug}`} className="group block">
            <div
                className={cn(
                    "product-card relative rounded-2xl overflow-hidden border bg-[hsl(var(--card))] shadow-sm hover:shadow-xl",
                    className
                )}
            >
                {/* Badges */}
                <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
                    {leaderDiscount !== undefined && (
                        <Badge className="text-[10px] px-2 py-0.5 font-semibold shadow-sm bg-amber-500 text-white border-0">
                            Leader −₹{leaderDiscount}
                        </Badge>
                    )}
                    {product.badge && (
                        <Badge className="text-[10px] px-2 py-0.5 font-semibold shadow-sm">
                            {product.badge}
                        </Badge>
                    )}
                    {discount && (
                        <Badge variant="destructive" className="text-[10px] px-2 py-0.5 shadow-sm">
                            -{discount}%
                        </Badge>
                    )}
                </div>

                {/* Image */}
                <div className="relative w-full bg-[hsl(var(--muted))] overflow-hidden" style={{ aspectRatio: "4/3" }}>
                    <div
                        className="absolute inset-0 opacity-10 transition-opacity group-hover:opacity-20"
                        style={{
                            background: `radial-gradient(circle at 60% 40%, ${categoryColors[product.category] || "hsl(var(--primary))"
                                }, transparent 70%)`,
                        }}
                    />
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                </div>

                {/* Content */}
                <div className="p-4">
                    <p className="text-xs text-[hsl(var(--muted-foreground))] mb-1 uppercase tracking-wider font-medium">
                        {product.category}
                    </p>
                    <h3 className="font-bold text-base mb-1 text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--primary))] transition-colors line-clamp-1">
                        {product.name}
                    </h3>
                    <p className="text-xs text-[hsl(var(--muted-foreground))] mb-3 line-clamp-2 leading-relaxed">
                        {product.tagline}
                    </p>

                    {/* Rating placeholder */}
                    <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={cn(
                                    "w-3 h-3",
                                    i < 4 ? "fill-amber-400 text-amber-400" : "fill-[hsl(var(--muted))] text-[hsl(var(--muted))]"
                                )}
                            />
                        ))}
                        <span className="text-xs text-[hsl(var(--muted-foreground))] ml-1">(4.0)</span>
                    </div>

                    {/* Price + CTA */}
                    <div className="flex items-center justify-between gap-2">
                        <div>
                            {leaderDiscount !== undefined ? (
                                <>
                                    <span className="font-bold text-lg text-amber-600 dark:text-amber-400">
                                        {formatPrice(product.price - leaderDiscount)}
                                    </span>
                                    <span className="text-xs text-[hsl(var(--muted-foreground))] line-through ml-1.5">
                                        {formatPrice(product.price)}
                                    </span>
                                </>
                            ) : (
                                <>
                                    <span className="font-bold text-lg text-[hsl(var(--foreground))]">
                                        {formatPrice(product.price)}
                                    </span>
                                    {product.originalPrice && (
                                        <span className="text-xs text-[hsl(var(--muted-foreground))] line-through ml-1.5">
                                            {formatPrice(product.originalPrice)}
                                        </span>
                                    )}
                                </>
                            )}
                        </div>
                        <Button
                            size="sm"
                            onClick={handleAddToCart}
                            className={cn(
                                "shrink-0 gap-1 transition-all duration-300",
                                added && "bg-emerald-600 hover:bg-emerald-600"
                            )}
                        >
                            {added ? (
                                <>
                                    <Check className="w-3.5 h-3.5" />
                                    Added
                                </>
                            ) : (
                                <>
                                    <ShoppingCart className="w-3.5 h-3.5" />
                                    Add
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </Link>
    );
}
