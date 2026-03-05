"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    ShoppingCart, Zap, Check, Star, Shield, Leaf, ChevronRight, Minus, Plus
} from "lucide-react";
import { Product } from "@/lib/products";
import { useCartStore } from "@/store/cart";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn, formatPrice } from "@/lib/utils";
import ProductCard from "@/components/products/ProductCard";

const tabs = ["Description", "Ingredients", "How to Use", "Benefits"] as const;
type Tab = (typeof tabs)[number];

interface Props {
    product: Product;
    related: Product[];
}

export default function ProductDetailClient({ product, related }: Props) {
    const [selectedVariant, setSelectedVariant] = useState(product.variants[0]?.value ?? "");
    const [qty, setQty] = useState(1);
    const [activeTab, setActiveTab] = useState<Tab>("Description");
    const [added, setAdded] = useState(false);

    const addItem = useCartStore((s) => s.addItem);

    const handleAddToCart = () => {
        for (let i = 0; i < qty; i++) {
            addItem({
                id: product.id,
                slug: product.slug,
                name: product.name,
                price: product.price,
                image: product.image,
                variant: selectedVariant,
            });
        }
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    const discount = product.originalPrice
        ? Math.round((1 - product.price / product.originalPrice) * 100)
        : null;

    return (
        <div>
            {/* Breadcrumb */}
            <div className="border-b bg-[hsl(var(--surface-2))]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <nav className="flex items-center gap-2 text-xs text-[hsl(var(--muted-foreground))]">
                        <Link href="/" className="hover:text-[hsl(var(--primary))]">Home</Link>
                        <ChevronRight className="w-3 h-3" />
                        <Link href="/products" className="hover:text-[hsl(var(--primary))]">Products</Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-[hsl(var(--foreground))] font-medium">{product.name}</span>
                    </nav>
                </div>
            </div>

            {/* Main product section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Product image */}
                    <div className="lg:sticky lg:top-28">
                        <div className="relative rounded-3xl overflow-hidden bg-[hsl(var(--muted))] aspect-square border">
                            <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary)/0.05)] to-transparent" />
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-contain p-12"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                priority
                            />
                            {discount && (
                                <div className="absolute top-4 left-4">
                                    <Badge variant="destructive" className="text-sm px-3 py-1">
                                        -{discount}% OFF
                                    </Badge>
                                </div>
                            )}
                        </div>

                        {/* Trust badges */}
                        <div className="grid grid-cols-3 gap-3 mt-4">
                            {[
                                { icon: Shield, text: "Clinically Tested" },
                                { icon: Leaf, text: "100% Natural" },
                                { icon: Zap, text: "Fast Delivery" },
                            ].map(({ icon: Icon, text }) => (
                                <div
                                    key={text}
                                    className="flex flex-col items-center gap-1 p-3 rounded-xl border bg-[hsl(var(--card))] text-center"
                                >
                                    <Icon className="w-5 h-5 text-[hsl(var(--primary))]" />
                                    <span className="text-[10px] text-[hsl(var(--muted-foreground))] font-medium">{text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product info */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <Badge variant="secondary">{product.category}</Badge>
                            {product.badge && <Badge>{product.badge}</Badge>}
                        </div>

                        <h1 className="text-3xl lg:text-4xl font-black tracking-tight mb-2">
                            {product.name}
                        </h1>
                        <p className="text-[hsl(var(--muted-foreground))] font-medium mb-4">
                            {product.tagline}
                        </p>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-6">
                            <div className="flex items-center gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={cn("w-4 h-4", i < 4 ? "fill-amber-400 text-amber-400" : "fill-[hsl(var(--muted))] text-[hsl(var(--muted))]")} />
                                ))}
                            </div>
                            <span className="text-sm text-[hsl(var(--muted-foreground))]">4.0 · 128 reviews</span>
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline gap-3 mb-8">
                            <span className="text-4xl font-black">{formatPrice(product.price)}</span>
                            {product.originalPrice && (
                                <>
                                    <span className="text-xl text-[hsl(var(--muted-foreground))] line-through">
                                        {formatPrice(product.originalPrice)}
                                    </span>
                                    <Badge variant="success">Save {discount}%</Badge>
                                </>
                            )}
                        </div>

                        {/* Variant selector */}
                        {product.variants.length > 0 && (
                            <div className="mb-6">
                                <p className="text-sm font-semibold mb-3">
                                    {product.variants[0].name}:{" "}
                                    <span className="text-[hsl(var(--primary))]">{selectedVariant}</span>
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {product.variants.map((v) => (
                                        <button
                                            key={v.id}
                                            onClick={() => setSelectedVariant(v.value)}
                                            className={cn(
                                                "px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-200",
                                                selectedVariant === v.value
                                                    ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.08)] text-[hsl(var(--primary))] ring-2 ring-[hsl(var(--primary)/0.3)]"
                                                    : "border-[hsl(var(--border))] hover:border-[hsl(var(--primary)/0.4)] text-[hsl(var(--muted-foreground))]"
                                            )}
                                        >
                                            {v.value}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quantity */}
                        <div className="mb-8">
                            <p className="text-sm font-semibold mb-3">Quantity</p>
                            <div className="flex items-center gap-2 w-fit">
                                <button
                                    onClick={() => setQty(Math.max(1, qty - 1))}
                                    className="w-10 h-10 rounded-lg border flex items-center justify-center hover:bg-[hsl(var(--muted))] transition-colors"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-12 text-center font-bold text-lg">{qty}</span>
                                <button
                                    onClick={() => setQty(qty + 1)}
                                    className="w-10 h-10 rounded-lg border flex items-center justify-center hover:bg-[hsl(var(--muted))] transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* CTA buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 mb-10">
                            <Button
                                size="lg"
                                className={cn("flex-1 gap-2 transition-all duration-300", added && "bg-emerald-600 hover:bg-emerald-600")}
                                onClick={handleAddToCart}
                            >
                                {added ? (
                                    <><Check className="w-4 h-4" /> Added to Cart</>
                                ) : (
                                    <><ShoppingCart className="w-4 h-4" /> Add to Cart</>
                                )}
                            </Button>
                            <Button size="lg" variant="outline" className="flex-1 gap-2" asChild>
                                <Link href="/cart">
                                    <Zap className="w-4 h-4" /> Buy Now
                                </Link>
                            </Button>
                        </div>

                        {/* Tabs */}
                        <div className="border-t pt-8">
                            <div className="flex gap-1 mb-6 bg-[hsl(var(--muted))] rounded-xl p-1">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={cn(
                                            "flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200",
                                            activeTab === tab
                                                ? "bg-[hsl(var(--card))] text-[hsl(var(--foreground))] shadow-sm"
                                                : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                                        )}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            <div className="min-h-[100px]">
                                {activeTab === "Description" && (
                                    <p className="text-[hsl(var(--muted-foreground))] leading-relaxed text-sm">
                                        {product.longDescription}
                                    </p>
                                )}
                                {activeTab === "Ingredients" && (
                                    <ul className="grid grid-cols-2 gap-2">
                                        {product.ingredients?.map((ing) => (
                                            <li key={ing} className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--primary))] shrink-0" />
                                                {ing}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                {activeTab === "How to Use" && (
                                    <ol className="space-y-3">
                                        {product.howToUse?.map((step, i) => (
                                            <li key={i} className="flex items-start gap-3 text-sm text-[hsl(var(--muted-foreground))]">
                                                <span className="w-6 h-6 rounded-full bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                                                    {i + 1}
                                                </span>
                                                {step}
                                            </li>
                                        ))}
                                    </ol>
                                )}
                                {activeTab === "Benefits" && (
                                    <ul className="space-y-2">
                                        {product.benefits?.map((b) => (
                                            <li key={b} className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
                                                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                                                {b}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related products */}
                <div className="mt-20 pt-12 border-t">
                    <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {related.map((p) => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
