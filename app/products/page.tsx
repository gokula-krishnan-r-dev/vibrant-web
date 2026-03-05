import type { Metadata } from "next";
import { products } from "@/lib/products";
import ProductCard from "@/components/products/ProductCard";

export const metadata: Metadata = {
    title: "Products",
    description:
        "Browse Vibrant's full range of premium wellness and skincare products.",
};

const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

export default function ProductsPage() {
    return (
        <div className="min-h-screen">
            {/* Page header */}
            <div className="bg-[hsl(var(--surface-2))] border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <p className="text-sm font-semibold text-[hsl(var(--primary))] uppercase tracking-widest mb-2">
                        Our Products
                    </p>
                    <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-3">
                        Shop All Products
                    </h1>
                    <p className="text-[hsl(var(--muted-foreground))] max-w-lg">
                        Premium wellness, skincare, and supplement products crafted with advanced
                        Liposomal Technology for superior results.
                    </p>
                </div>
            </div>

            {/* Filter bar */}
            <div className="sticky top-16 lg:top-20 z-30 bg-[hsl(var(--background)/0.9)] backdrop-blur-md border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                className={
                                    "shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors border " +
                                    (cat === "All"
                                        ? "bg-[hsl(var(--primary))] text-white border-transparent"
                                        : "border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:border-[hsl(var(--primary)/0.4)] hover:text-[hsl(var(--foreground))]")
                                }
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Products grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex items-center justify-between mb-8">
                    <p className="text-sm text-[hsl(var(--muted-foreground))]">
                        Showing <span className="font-semibold text-[hsl(var(--foreground))]">{products.length}</span> products
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
}
