"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowLeft, ChevronRight, Sparkles, Star, ShoppingCart, Check, Shield, Leaf, FlaskConical, Zap } from "lucide-react";
import { useState } from "react";
import { products } from "@/lib/products";
import { useCartStore } from "@/store/cart";
import { cn, formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ProductInActionSection from "@/components/sections/ProductInActionSection";

// ─── Testimonials data ────────────────────────────────────────────
const testimonials = [
  { name: "Priya Sharma", role: "Wellness Enthusiast", quote: "Essentia of Life has completely transformed how I feel every morning. The results are incredible!", rating: 5, avatar: "PS" },
  { name: "Arjun Mehta", role: "Fitness Coach", quote: "Sleep Button is a game-changer. I fall asleep faster and wake up completely refreshed.", rating: 5, avatar: "AM" },
  { name: "Deepa Rajan", role: "Skincare Blogger", quote: "Golden Glow gave me the most radiant skin. I love that it's completely natural and non-comedogenic!", rating: 5, avatar: "DR" },
  { name: "Suresh Kumar", role: "Health Professional", quote: "DP 555 is my go-to daily supplement. Great quality, delivers what it promises.", rating: 4, avatar: "SK" },
];

// Brand stats
const stats = [
  { value: "50K+", label: "Happy Customers" },
  { value: "6", label: "Premium Products" },
  { value: "100%", label: "Natural" },
  { value: "4.8★", label: "Rating" },
];

// ─── Mini ProductCard (for carousel) ─────────────────────────────
function CarouselCard({ product }: { product: (typeof products)[0] }) {
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({ id: product.id, slug: product.slug, name: product.name, price: product.price, image: product.image, variant: product.variants[0]?.value ?? "" });
    setAdded(true);
    openCart();
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Link href={`/products/${product.slug}`} className="group block w-[260px] shrink-0">
      <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] overflow-hidden transition-colors duration-200 hover:border-[hsl(var(--border)/0.6)]">
        {/* Image zone */}
        <div className="relative bg-[hsl(var(--secondary))] overflow-hidden flex items-center justify-center" style={{ height: 210 }}>
          {product.badge && (
            <div className="absolute top-3 left-3 z-10">
              <Badge className="text-[10px] px-2 py-0.5 font-semibold">{product.badge}</Badge>
            </div>
          )}
          {product.originalPrice && (
            <div className="absolute top-3 right-3 z-10">
              <Badge variant="destructive" className="text-[10px] px-2 py-0.5">
                -{Math.round((1 - product.price / product.originalPrice) * 100)}%
              </Badge>
            </div>
          )}
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain object-center p-6"
            sizes="260px"
          />
        </div>

        {/* Content */}
        <div className="p-4 border-t border-[hsl(var(--border))]">
          <p className="text-[10px] uppercase tracking-widest text-[hsl(var(--muted-foreground))] font-semibold mb-1">{product.category}</p>
          <h3 className="font-bold text-sm mb-0.5 line-clamp-1">{product.name}</h3>
          <p className="text-xs text-[hsl(var(--muted-foreground))] mb-4 line-clamp-1">{product.tagline}</p>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-baseline gap-1.5">
              <span className="font-bold text-sm">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-xs text-[hsl(var(--muted-foreground))] line-through">{formatPrice(product.originalPrice)}</span>
              )}
            </div>
            <button
              onClick={handleAdd}
              className={cn(
                "flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-lg transition-all duration-200",
                added
                  ? "bg-emerald-500 text-white"
                  : "bg-[hsl(var(--primary))] text-white hover:opacity-90 active:scale-95"
              )}
            >
              {added ? <Check className="w-3 h-3" /> : <ShoppingCart className="w-3 h-3" />}
              {added ? "Added" : "Cart"}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ─── HomePage ─────────────────────────────────────────────────────
export default function HomePage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const heroCtaRef = useRef<HTMLDivElement>(null);
  const heroBadgeRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);

  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);
  };

  const scrollCarousel = (dir: "left" | "right") => {
    carouselRef.current?.scrollBy({ left: dir === "right" ? 300 : -300, behavior: "smooth" });
  };

  useEffect(() => {
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        // Hero entrance
        const heroTl = gsap.timeline({ defaults: { ease: "power4.out" } });
        heroTl
          .fromTo(heroBadgeRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 })
          .fromTo(heroTitleRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.9 }, "-=0.3")
          .fromTo(heroSubRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.5")
          .fromTo(heroCtaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
          .fromTo(heroImageRef.current, { opacity: 0, scale: 0.92, x: 30 }, { opacity: 1, scale: 1, x: 0, duration: 1.1 }, "-=0.9");

        // Scroll-triggered reveals
        gsap.utils.toArray<HTMLElement>(".reveal-up").forEach((el, i) => {
          gsap.fromTo(el,
            { opacity: 0, y: 50 },
            {
              opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
              delay: i * 0.05,
            }
          );
        });

        // Stagger card reveals
        gsap.utils.toArray<HTMLElement>(".stagger-card").forEach((el, i) => {
          gsap.fromTo(el,
            { opacity: 0, y: 40, scale: 0.95 },
            {
              opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "back.out(1.2)",
              scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" },
              delay: i * 0.1,
            }
          );
        });

        // Horizontal parallax on hero blobs
        gsap.to(".hero-blob-1", {
          x: 60, y: -30, scrollTrigger: { trigger: pageRef.current, start: "top top", end: "bottom top", scrub: 1.5 }
        });
        gsap.to(".hero-blob-2", {
          x: -40, y: 50, scrollTrigger: { trigger: pageRef.current, start: "top top", end: "bottom top", scrub: 2 }
        });
      }, pageRef);

      return () => ctx.revert();
    })();
  }, []);

  // Marquee text items
  const marquee = ["Golden Glow", "Essentia of Life", "Relax Rubb", "D Fume", "Sleep Button", "DP 555", "Premium Wellness", "Liposomal Technology", "100% Natural"];

  return (
    <div ref={pageRef} className="overflow-hidden">

      {/* ── HERO SECTION ─────────────────────────────────── */}
      <section className="relative min-h-[calc(100vh-80px)] flex items-center overflow-hidden bg-[hsl(var(--background))]">
        {/* Mesh background blobs */}
        <div className="hero-blob-1 absolute top-[-15%] right-[-8%] w-[700px] h-[700px] rounded-full bg-[hsl(152_60%_28%/0.10)] blur-[100px] pointer-events-none" />
        <div className="hero-blob-2 absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[hsl(230_75%_35%/0.08)] blur-[120px] pointer-events-none" />
        <div className="absolute top-[30%] left-[40%] w-[400px] h-[400px] rounded-full bg-[hsl(270_65%_45%/0.05)] blur-[80px] pointer-events-none" />

        {/* Subtle grid overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(hsl(var(--border)/0.4) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)/0.4) 1px, transparent 1px)", backgroundSize: "60px 60px", maskImage: "radial-gradient(ellipse at center, transparent 20%, black 100%)" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-20">
          <div className="grid lg:grid-cols-[55%_45%] gap-10 xl:gap-16 items-center">

            {/* ── Left Copy ── */}
            <div className="relative z-10">
              {/* Eyebrow badge */}
              <div ref={heroBadgeRef} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[hsl(var(--primary)/0.3)] bg-[hsl(152_60%_28%/0.08)] text-xs font-semibold text-[hsl(var(--primary))] mb-6 opacity-0">
                <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--primary))] animate-pulse" />
                Trusted by 50,000+ Customers Across India
              </div>

              {/* Main headline */}
              <h1 ref={heroTitleRef} className="text-[clamp(2.6rem,5.5vw,5rem)] font-black leading-[1.05] tracking-tight mb-6 opacity-0">
                Your Daily Dose of{" "}
                <span className="relative inline-block">
                  <span className="gradient-text">Wellness</span>
                  <svg className="absolute -bottom-1 left-0 w-full" height="6" viewBox="0 0 200 6" fill="none" preserveAspectRatio="none">
                    <path d="M0 5 Q50 0 100 4 Q150 8 200 3" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6" />
                  </svg>
                </span>,{" "}<br />
                <span className="text-[hsl(var(--muted-foreground))] font-light italic">Backed by Science.</span>
              </h1>

              {/* Sub copy */}
              <p ref={heroSubRef} className="text-base lg:text-lg text-[hsl(var(--muted-foreground))] leading-relaxed max-w-xl mb-8 opacity-0">
                Advanced Liposomal Technology for superior bioavailability — premium wellness and beauty products crafted to make you feel the difference from day one.
              </p>

              {/* CTAs */}
              <div ref={heroCtaRef} className="flex flex-wrap items-center gap-3 mb-10 opacity-0">
                <Link href="/products"
                  className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-[hsl(var(--primary))] text-white font-bold text-sm hover:-translate-y-1 active:translate-y-0 transition-all duration-200 shadow-xl shadow-[hsl(152_60%_28%/0.35)]">
                  Shop the Collection
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link href="#bestsellers"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border-2 font-bold text-sm hover:bg-[hsl(var(--muted))] hover:border-[hsl(var(--primary)/0.3)] transition-all duration-200">
                  <Sparkles className="w-3.5 h-3.5 text-[hsl(var(--primary))]" />
                  View Bestsellers
                </Link>
              </div>

              {/* Trust bar */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                {[
                  { icon: <Shield className="w-4 h-4" />, label: "100% Natural" },
                  { icon: <FlaskConical className="w-4 h-4" />, label: "Clinically Tested" },
                  { icon: <Leaf className="w-4 h-4" />, label: "No Harmful Chemicals" },
                  { icon: <Zap className="w-4 h-4" />, label: "Fast Absorption" },
                ].map((t) => (
                  <div key={t.label} className="flex items-center gap-1.5 text-xs font-semibold text-[hsl(var(--muted-foreground))]">
                    <span className="text-[hsl(var(--primary))]">{t.icon}</span>
                    {t.label}
                  </div>
                ))}
              </div>

              {/* Social proof strip */}
              <div className="mt-8 flex items-center gap-4 pt-6 border-t">
                <div className="flex -space-x-2">
                  {["PS", "AM", "DR", "SK", "VR"].map((av) => (
                    <div key={av} className="w-8 h-8 rounded-full bg-gradient-to-br from-[hsl(152_60%_35%)] to-[hsl(152_60%_22%)] border-2 border-[hsl(var(--background))] flex items-center justify-center text-white text-[9px] font-bold shrink-0">
                      {av}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-0.5 mb-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
                    <span className="text-xs font-bold ml-1">4.9</span>
                  </div>
                  <p className="text-[11px] text-[hsl(var(--muted-foreground))]">from 2,400+ verified reviews</p>
                </div>
                <div className="ml-auto hidden sm:block">
                  <div className="text-right">
                    <p className="text-2xl font-black text-[hsl(var(--foreground))]">50K+</p>
                    <p className="text-[10px] text-[hsl(var(--muted-foreground))] uppercase tracking-wider">Happy Customers</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Right Product Visual Stack ── */}
            <div ref={heroImageRef} className="opacity-0 relative hidden lg:block">
              {/* Background decorative ring */}
              <div className="absolute inset-0 m-auto w-[85%] aspect-square rounded-full border border-[hsl(var(--primary)/0.1)] border-dashed" />
              <div className="absolute inset-0 m-auto w-[70%] aspect-square rounded-full border border-[hsl(var(--primary)/0.07)] border-dashed" />

              {/* Main hero product card */}
              <div className="relative mx-auto max-w-[380px]">
                <div className="relative rounded-[2rem] overflow-hidden border-2 border-[hsl(var(--border))] bg-gradient-to-b from-[hsl(152_60%_28%/0.06)] via-[hsl(var(--card))] to-[hsl(var(--card))] shadow-2xl shadow-[hsl(152_60%_28%/0.15)] p-6">
                  {/* Discount badge on card */}
                  <div className="absolute top-5 right-5 w-14 h-14 rounded-full bg-[hsl(var(--primary))] flex flex-col items-center justify-center shadow-lg">
                    <span className="text-white font-black text-sm leading-none">24%</span>
                    <span className="text-white/80 text-[9px] font-semibold">OFF</span>
                  </div>

                  {/* Tag */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[hsl(152_60%_28%/0.12)] text-[hsl(var(--primary))] text-[10px] font-bold uppercase tracking-wider mb-4">
                    <Sparkles className="w-3 h-3" /> #1 Bestseller
                  </div>

                  {/* Product image */}
                  <div className="relative aspect-[4/3.5] flex items-center justify-center">
                    <Image
                      src="/images/essentia-of-life.jpg"
                      alt="Essentia of Life"
                      fill
                      className="object-contain drop-shadow-2xl animate-float"
                      priority
                      sizes="380px"
                    />
                  </div>

                  {/* Product info */}
                  <div className="mt-4 flex items-end justify-between">
                    <div>
                      <p className="font-black text-base">Essentia of Life</p>
                      <p className="text-[hsl(var(--muted-foreground))] text-xs mb-2">Anti-Oxidant Liquid • 30ml</p>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
                        <span className="text-xs text-[hsl(var(--muted-foreground))] ml-1">(312)</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[hsl(var(--muted-foreground))] text-xs line-through">₹1,499</p>
                      <p className="font-black text-xl text-[hsl(var(--primary))]">₹1,145</p>
                    </div>
                  </div>
                </div>

                {/* Floating mini card — Sleep Button */}
                <div className="absolute -right-10 top-12 glass rounded-2xl p-3 border-2 shadow-xl w-[130px] hover:-translate-y-1 transition-transform duration-300">
                  <div className="relative h-14 mb-2">
                    <Image src="/images/sleep-button.jpg" alt="Sleep Button" fill className="object-contain" sizes="100px" />
                  </div>
                  <p className="font-bold text-[11px] leading-tight">Sleep Button</p>
                  <p className="text-[hsl(var(--primary))] font-black text-xs">₹1,593</p>
                  <div className="flex items-center gap-0.5 mt-1">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />)}
                  </div>
                </div>

                {/* Floating mini card — Golden Glow */}
                <div className="absolute -left-10 bottom-20 glass rounded-2xl p-3 border-2 shadow-xl w-[130px] hover:-translate-y-1 transition-transform duration-300">
                  <div className="relative h-14 mb-2">
                    <Image src="/images/golden-glow.jpg" alt="Golden Glow" fill className="object-contain" sizes="100px" />
                  </div>
                  <p className="font-bold text-[11px] leading-tight">Golden Glow</p>
                  <p className="text-[hsl(var(--primary))] font-black text-xs">₹999</p>
                  <div className="flex items-center gap-0.5 mt-1">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />)}
                  </div>
                </div>

                {/* Floating notification badge */}
                <div className="absolute -top-4 left-8 glass flex items-center gap-2.5 px-3 py-2 rounded-xl border shadow-lg">
                  <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold leading-none">Order Placed!</p>
                    <p className="text-[9px] text-[hsl(var(--muted-foreground))] mt-0.5">Priya just purchased</p>
                  </div>
                </div>

                {/* Floating ingredient badge */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 glass flex items-center gap-2 px-4 py-2.5 rounded-full border shadow-lg whitespace-nowrap">
                  <Leaf className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-[11px] font-bold">100% Natural Ingredients</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ──────────────────────────────────────── */}
      <div className="py-4 border-y bg-[hsl(var(--primary))] overflow-hidden">
        <div className="flex animate-[marquee_20s_linear_infinite] whitespace-nowrap gap-10 pr-10">
          {[...marquee, ...marquee].map((t, i) => (
            <span key={i} className="inline-flex items-center gap-3 text-white/90 text-sm font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-white/50 shrink-0" />
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ── BESTSELLERS CAROUSEL ─────────────────────────── */}
      <section id="bestsellers" className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-end justify-between mb-10 reveal-up">
            <div>
              <p className="text-xs font-bold text-[hsl(var(--primary))] uppercase tracking-[0.2em] mb-2">Our Collection</p>
              <h2 className="text-4xl lg:text-5xl font-black tracking-tight">
                Bestselling{" "}
                <span className="italic font-light text-[hsl(var(--muted-foreground))]">Products</span>
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollCarousel("left")}
                disabled={!canScrollLeft}
                className={cn("w-10 h-10 rounded-full border flex items-center justify-center transition-all",
                  canScrollLeft ? "hover:bg-[hsl(var(--primary))] hover:text-white hover:border-[hsl(var(--primary))]" : "opacity-30"
                )}
              ><ArrowLeft className="w-4 h-4" /></button>
              <button
                onClick={() => scrollCarousel("right")}
                disabled={!canScrollRight}
                className={cn("w-10 h-10 rounded-full border flex items-center justify-center transition-all",
                  canScrollRight ? "hover:bg-[hsl(var(--primary))] hover:text-white hover:border-[hsl(var(--primary))]" : "opacity-30"
                )}
              ><ArrowRight className="w-4 h-4" /></button>
              <Link href="/products" className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-[hsl(var(--primary))] hover:underline ml-3">
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Horizontal scroll carousel */}
          <div
            ref={carouselRef}
            onScroll={updateScrollState}
            className="flex gap-5 overflow-x-auto pb-4 scrollbar-none scroll-smooth"
            style={{ scrollbarWidth: "none" }}
          >
            {products.map((product, i) => (
              <div key={product.id} className={cn("stagger-card", i === 0 ? "" : "")}>
                <CarouselCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GOLDEN GLOW IN ACTION (two images in one section) ─ */}
      <section className="reveal-up">
        <ProductInActionSection variant="home" />
      </section>

      {/* ── FEATURED BANNER ──────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-6 reveal-up">
          {/* Big banner */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[hsl(270_65%_45%)] to-[hsl(270_65%_25%)] p-10 flex flex-col justify-between min-h-[400px] group">
            <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "radial-gradient(circle at 20% 80%, #e879f9, transparent 50%)" }} />
            <div className="relative z-10">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">New Arrival ✦</Badge>
              <h3 className="text-3xl font-black text-white leading-tight mb-3">Relax Rubb<br /><span className="font-light italic">Foot Massage</span></h3>
              <p className="text-white/70 text-sm max-w-xs mb-6">Natural, safe & easy to use foot massage cream for deep relaxation after a long day.</p>
              <Link href="/products/relax-rubb" className="inline-flex items-center gap-2 bg-white text-[hsl(270_65%_35%)] px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-white/90 transition-all">
                Shop Now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="absolute right-4 bottom-4 w-44 h-44 transition-transform duration-700 group-hover:scale-105 group-hover:-rotate-3">
              <Image src="/images/relax-rubb.jpg" alt="Relax Rubb" fill className="object-contain" />
            </div>
            <div className="absolute bottom-5 right-48 text-6xl font-black text-white/10 select-none">₹525</div>
          </div>

          {/* Stack of 2 smaller banners */}
          <div className="flex flex-col gap-6">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[hsl(22_90%_52%)] to-[hsl(22_90%_32%)] p-8 flex justify-between items-center min-h-[185px] group">
              <div className="relative z-10">
                <Badge className="mb-3 bg-white/20 text-white border-white/30">Skin Care</Badge>
                <h3 className="text-2xl font-black text-white leading-tight mb-2">D Fume<br /><span className="text-sm font-normal opacity-75">Vitamin D3 Cream</span></h3>
                <Link href="/products/d-fume" className="text-white font-semibold text-sm hover:underline flex items-center gap-1">₹525 — Shop <ArrowRight className="w-3 h-3" /></Link>
              </div>
              <div className="w-28 h-28 relative transition-transform duration-700 group-hover:scale-110">
                <Image src="/images/d-fume.jpg" alt="D Fume" fill className="object-contain" />
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[hsl(230_75%_35%)] to-[hsl(230_75%_20%)] p-8 flex justify-between items-center min-h-[185px] group">
              <div className="relative z-10">
                <Badge className="mb-3 bg-white/20 text-white border-white/30">Wellness</Badge>
                <h3 className="text-2xl font-black text-white leading-tight mb-2">Sleep Button<br /><span className="text-sm font-normal opacity-75">Daily Oral Spray</span></h3>
                <Link href="/products/sleep-button" className="text-white font-semibold text-sm hover:underline flex items-center gap-1">₹1,593 — Shop <ArrowRight className="w-3 h-3" /></Link>
              </div>
              <div className="w-28 h-28 relative transition-transform duration-700 group-hover:scale-110">
                <Image src="/images/sleep-button.jpg" alt="Sleep Button" fill className="object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GALLERY / INSPIRATION ────────────────────────── */}
      <section className="section-padding bg-[hsl(var(--surface-2))]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10 reveal-up">
            <div>
              <p className="text-xs font-bold text-[hsl(var(--primary))] uppercase tracking-[0.2em] mb-2">Inspiration</p>
              <h2 className="text-4xl lg:text-5xl font-black tracking-tight">Product <span className="italic font-light text-[hsl(var(--muted-foreground))]">Gallery</span></h2>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 reveal-up">
            {products.map((product, i) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className={cn(
                  "group relative rounded-2xl overflow-hidden border bg-[hsl(var(--card))] stagger-card h-full",
                  i === 0 || i === 4 ? "row-span-2" : ""
                )}
              >
                <div
                  className="relative w-full h-full overflow-hidden bg-[hsl(var(--muted))]"
                  style={{ minHeight: i === 0 || i === 4 ? 360 : 200 }}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-3 left-3 right-3 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-white font-semibold text-sm">{product.name}</p>
                    <p className="text-white/75 text-xs">{formatPrice(product.price)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRAND STORY ──────────────────────────────────── */}
      <section id="about" className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="reveal-up">
              <p className="text-xs font-bold text-[hsl(var(--primary))] uppercase tracking-[0.2em] mb-3">About Vibrant</p>
              <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-6">
                Where Science <br />Meets <span className="italic gradient-text">Nature.</span>
              </h2>
              <p className="text-[hsl(var(--muted-foreground))] leading-relaxed mb-5">
                At Vibrant, we believe that true wellness comes from the perfect harmony of science and nature.
                Our products are developed using advanced Liposomal Technology that dramatically enhances the
                bioavailability of key nutrients.
              </p>
              <p className="text-[hsl(var(--muted-foreground))] leading-relaxed mb-8">
                Every formula is rigorously tested, completely free from harmful chemicals, and crafted to
                deliver real, measurable results. Because you deserve nothing less than the best.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/products" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[hsl(var(--primary))] text-white font-semibold text-sm hover:-translate-y-0.5 transition-all shadow-md">
                  Explore Products <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Feature pills */}
            <div className="grid grid-cols-2 gap-4 reveal-up">
              {[
                { emoji: "🧪", title: "Liposomal Technology", desc: "Enhanced bioavailability for superior results" },
                { emoji: "🌿", title: "100% Natural", desc: "Pure ingredients, no harmful chemicals" },
                { emoji: "✅", title: "Clinically Tested", desc: "Rigorously tested for safety and efficacy" },
                { emoji: "🇮🇳", title: "Made in India", desc: "Proudly crafted for the Indian consumer" },
              ].map((f) => (
                <div key={f.title} className="stagger-card p-5 rounded-2xl border bg-[hsl(var(--card))] hover:border-[hsl(var(--primary)/0.4)] hover:shadow-md transition-all">
                  <div className="text-3xl mb-3">{f.emoji}</div>
                  <h4 className="font-bold text-sm mb-1">{f.title}</h4>
                  <p className="text-xs text-[hsl(var(--muted-foreground))] leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────── */}
      <section className="section-padding bg-[hsl(var(--surface-2))]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 reveal-up">
            <p className="text-xs font-bold text-[hsl(var(--primary))] uppercase tracking-[0.2em] mb-2">Reviews</p>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tight">
              What People <span className="italic gradient-text">Say</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {testimonials.map((t, i) => (
              <div key={i} className="stagger-card p-5 rounded-2xl border bg-[hsl(var(--card))] flex flex-col gap-4">
                <div className="flex items-center gap-0.5">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                  {t.rating < 5 && <Star className="w-3.5 h-3.5 text-[hsl(var(--muted))]" />}
                </div>
                <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-3 border-t">
                  <div className="w-8 h-8 rounded-full bg-[hsl(var(--primary))] flex items-center justify-center text-white text-xs font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-xs">{t.name}</p>
                    <p className="text-[10px] text-[hsl(var(--muted-foreground))]">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER CTA ───────────────────────────────── */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal-up relative rounded-3xl overflow-hidden p-12 lg:p-20 text-center bg-gradient-to-br from-[hsl(152_60%_28%)] to-[hsl(152_60%_18%)]">
            <div className="absolute inset-0 pointer-events-none opacity-20"
              style={{ backgroundImage: "radial-gradient(circle at 80% 20%, #90f0b0, transparent 50%), radial-gradient(circle at 20% 80%, #60d890, transparent 50%)" }} />
            <div className="relative z-10">
              <h2 className="text-3xl lg:text-5xl font-black text-white mb-4">Join the Vibrant Community</h2>
              <p className="text-white/75 mb-8 max-w-md mx-auto leading-relaxed">
                Get exclusive offers, wellness tips, and early access to new product launches.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 outline-none focus:ring-2 focus:ring-white/40 text-sm"
                />
                <Button className="w-full sm:w-auto bg-white text-[hsl(152_60%_28%)] hover:bg-white/90 font-semibold shrink-0">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
