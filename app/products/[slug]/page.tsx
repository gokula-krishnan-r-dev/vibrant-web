import { notFound } from "next/navigation";
import { products, getProductBySlug } from "@/lib/products";
import ProductDetailClient from "./ProductDetailClient";

export function generateStaticParams() {
    return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const product = getProductBySlug(slug);
    if (!product) notFound();
    const related = products.filter((p) => p.id !== product.id).slice(0, 3);
    return <ProductDetailClient product={product} related={related} />;
}
