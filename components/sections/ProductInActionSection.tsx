"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const GOLDEN_GLOW_JAR = "/images/golden-glow-jar.png";
const GOLDEN_GLOW_IN_USE = "/images/golden-glow-in-use.png";

interface ProductInActionSectionProps {
    variant?: "page" | "home";
    productSlug?: string;
    productName?: string;
}

/** One section that combines product shot + in-use shot with copy. Optimized: lazy images, responsive sizes. */
export default function ProductInActionSection({
    variant = "page",
    productSlug = "golden-glow-face-care",
    productName = "Golden Glow",
}: ProductInActionSectionProps) {
    const isHome = variant === "home";

    return (
        <section
            className={isHome ? "section-padding bg-[hsl(var(--surface-2))]" : "py-16 border-t"}
            aria-labelledby="in-action-heading"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 id="in-action-heading" className="text-2xl font-black tracking-tight mb-2">
                    {isHome ? "See it in action" : "The Golden Glow experience"}
                </h2>
                <p className="text-sm text-[hsl(var(--muted-foreground))] mb-8 max-w-xl">
                    {isHome
                        ? "Premium face care with Liposomal Technology — the product and the glow."
                        : "The product in your hand and the moment you apply it for a naturally radiant look."}
                </p>

                <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                    <div className="relative rounded-2xl overflow-hidden bg-[hsl(var(--muted))] border aspect-[4/3] min-h-[240px]">
                        <Image
                            src={GOLDEN_GLOW_JAR}
                            alt={`${productName} — product`}
                            fill
                            className="object-contain p-6"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            loading="lazy"
                            fetchPriority="low"
                        />
                        <span className="absolute bottom-3 left-3 text-xs font-semibold text-[hsl(var(--muted-foreground))] bg-[hsl(var(--card)/0.9)] backdrop-blur px-2 py-1 rounded">
                            The product
                        </span>
                    </div>
                    <div className="relative rounded-2xl overflow-hidden bg-[hsl(var(--muted))] border aspect-[4/3] min-h-[240px]">
                        <Image
                            src={GOLDEN_GLOW_IN_USE}
                            alt={`${productName} — in use`}
                            fill
                            className="object-contain p-4 object-top"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            loading="lazy"
                            fetchPriority="low"
                        />
                        <span className="absolute bottom-3 left-3 text-xs font-semibold text-[hsl(var(--muted-foreground))] bg-[hsl(var(--card)/0.9)] backdrop-blur px-2 py-1 rounded">
                            In use
                        </span>
                    </div>
                </div>

                {isHome && (
                    <div className="mt-6 text-center">
                        <Link
                            href={`/products/${productSlug}`}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-[hsl(var(--primary))] hover:underline"
                        >
                            Shop {productName} <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
