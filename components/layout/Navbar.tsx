"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { ShoppingCart, Sun, Moon, Menu, X, Search, ArrowRight, Command, MapPin, Loader2 } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { useLocationStore } from "@/store/location";
import { cn } from "@/lib/utils";
import { products } from "@/lib/products";
import { formatPrice } from "@/lib/utils";

// ─── Location Selector (deliver to / current location + edit) ─────
function LocationSelector() {
    const { city, fullAddress, displayMode, setLocation, setDisplayMode } = useLocationStore();
    const [open, setOpen] = useState(false);
    const [editCity, setEditCity] = useState("");
    const [detecting, setDetecting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Header display: full address or city only
    const displayText =
        displayMode === "full" && fullAddress
            ? fullAddress
            : city || "Select location";

    useEffect(() => {
        if (open) setEditCity(city);
    }, [open, city]);

    useEffect(() => {
        if (!open) return;
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open]);

    const handleUseMyLocation = useCallback(() => {
        setError(null);
        setDetecting(true);
        if (!navigator.geolocation) {
            setError("Geolocation not supported");
            setDetecting(false);
            return;
        }
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                try {
                    const { latitude, longitude } = pos.coords;
                    const res = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
                        { headers: { Accept: "application/json" } }
                    );
                    const data = await res.json();
                    const cityName = data.address?.city || data.address?.town || data.address?.state_district || data.address?.state || "Your location";
                    const pincode = data.address?.postcode || "";
                    setLocation({ city: cityName, pincode, fullAddress: data.display_name || null });
                    setEditCity(cityName);
                    setOpen(false);
                } catch {
                    setError("Could not get address");
                } finally {
                    setDetecting(false);
                }
            },
            () => {
                setError("Location access denied");
                setDetecting(false);
            },
            { timeout: 10000 }
        );
    }, [setLocation]);

    const handleSaveEdit = useCallback(() => {
        const trimmed = editCity.trim();
        if (trimmed) {
            setLocation({ city: trimmed, fullAddress: trimmed });
            setOpen(false);
        }
    }, [editCity, setLocation]);

    return (
        <div className="relative" ref={containerRef}>
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-left text-xs font-medium text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] transition-all max-w-[140px] sm:max-w-[200px] truncate"
                aria-label="Delivery location"
            >
                <MapPin className="w-3.5 h-3.5 shrink-0 text-[hsl(var(--primary))]" />
                <span className="truncate" title={fullAddress || displayText}>{displayText}</span>
            </button>

            {open && (
                <div className="absolute top-full left-0 mt-1 w-72 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-xl z-50 p-3">
                    <p className="text-[10px] uppercase tracking-wider text-[hsl(var(--muted-foreground))] font-semibold mb-2">Deliver to</p>
                    <div className="flex gap-2 mb-2">
                        <input
                            type="text"
                            value={editCity}
                            onChange={(e) => setEditCity(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSaveEdit()}
                            placeholder="City or pincode"
                            className="flex-1 px-3 py-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-sm outline-none focus:ring-2 focus:ring-[hsl(var(--primary)/0.3)]"
                        />
                        <button
                            type="button"
                            onClick={handleSaveEdit}
                            className="px-3 py-2 rounded-lg bg-[hsl(var(--primary))] text-white text-xs font-semibold hover:opacity-90 shrink-0"
                        >
                            Save
                        </button>
                    </div>
                    <button
                        type="button"
                        onClick={handleUseMyLocation}
                        disabled={detecting}
                        className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-[hsl(var(--border))] text-xs font-medium hover:bg-[hsl(var(--muted))] transition-colors disabled:opacity-60"
                    >
                        {detecting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <MapPin className="w-3.5 h-3.5" />}
                        {detecting ? "Detecting…" : "Use my current location"}
                    </button>
                    {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
                    {fullAddress && city && (
                        <p className="mt-2 text-[10px] text-[hsl(var(--muted-foreground))] line-clamp-2">{fullAddress}</p>
                    )}
                    {/* Show city only vs full address in header */}
                    {city && (
                        <div className="mt-3 pt-3 border-t border-[hsl(var(--border))]">
                            <p className="text-[10px] uppercase tracking-wider text-[hsl(var(--muted-foreground))] font-semibold mb-1.5">Show in header</p>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => setDisplayMode("city")}
                                    className={cn(
                                        "flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors",
                                        displayMode === "city"
                                            ? "bg-[hsl(var(--primary))] text-white"
                                            : "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted)/0.8)]"
                                    )}
                                >
                                    City only
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setDisplayMode("full")}
                                    className={cn(
                                        "flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors",
                                        displayMode === "full"
                                            ? "bg-[hsl(var(--primary))] text-white"
                                            : "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted)/0.8)]"
                                    )}
                                >
                                    Full address
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "#about", label: "About" },
];

// ─── Command Palette ────────────────────────────────────────────────
function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
    const [query, setQuery] = useState("");
    const [activeIndex, setActiveIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const filtered = query.trim() === ""
        ? products
        : products.filter((p) =>
            [p.name, p.category, p.tagline, p.description]
                .join(" ")
                .toLowerCase()
                .includes(query.toLowerCase())
        );

    // Reset on open
    useEffect(() => {
        if (open) {
            setQuery("");
            setActiveIndex(0);
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    }, [open]);

    // Keyboard navigation
    useEffect(() => {
        if (!open) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === "ArrowDown") {
                e.preventDefault();
                setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActiveIndex((i) => Math.max(i - 1, 0));
            } else if (e.key === "Enter" && filtered[activeIndex]) {
                router.push(`/products/${filtered[activeIndex].slug}`);
                onClose();
            } else if (e.key === "Escape") {
                onClose();
            }
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [open, filtered, activeIndex, router, onClose]);

    // Reset active on query change
    useEffect(() => setActiveIndex(0), [query]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh] px-4" onClick={onClose}>
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

            {/* Modal */}
            <div
                className="relative w-full max-w-xl bg-[hsl(var(--card))] rounded-2xl border border-[hsl(var(--border))] shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Search input row */}
                <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[hsl(var(--border))]">
                    <Search className="w-4 h-4 text-[hsl(var(--muted-foreground))] shrink-0" />
                    <input
                        ref={inputRef}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search products…"
                        className="flex-1 bg-transparent text-sm outline-none placeholder:text-[hsl(var(--muted-foreground))] text-[hsl(var(--foreground))]"
                    />
                    {query && (
                        <button onClick={() => setQuery("")} className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">
                            <X className="w-3.5 h-3.5" />
                        </button>
                    )}
                    <kbd className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 rounded-md border text-[10px] font-mono text-[hsl(var(--muted-foreground))] bg-[hsl(var(--muted))] shrink-0">
                        ESC
                    </kbd>
                </div>

                {/* Results */}
                <div className="max-h-[360px] overflow-y-auto overscroll-contain">
                    {filtered.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-[hsl(var(--muted-foreground))]">
                            <Search className="w-8 h-8 mb-3 opacity-30" />
                            <p className="text-sm font-medium">No products found</p>
                            <p className="text-xs mt-1 opacity-70">Try a different keyword</p>
                        </div>
                    ) : (
                        <ul className="py-2">
                            {filtered.map((product, i) => (
                                <li key={product.id}>
                                    <button
                                        className={cn(
                                            "w-full flex items-center gap-3.5 px-4 py-2.5 text-left transition-colors",
                                            i === activeIndex
                                                ? "bg-[hsl(var(--primary)/0.08)]"
                                                : "hover:bg-[hsl(var(--muted))]"
                                        )}
                                        onMouseEnter={() => setActiveIndex(i)}
                                        onClick={() => {
                                            router.push(`/products/${product.slug}`);
                                            onClose();
                                        }}
                                    >
                                        {/* Thumbnail */}
                                        <div className="w-10 h-10 rounded-lg bg-[hsl(var(--secondary))] flex items-center justify-center shrink-0 overflow-hidden border border-[hsl(var(--border))]">
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                width={40}
                                                height={40}
                                                className="object-contain p-1"
                                            />
                                        </div>
                                        {/* Info */}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-[hsl(var(--foreground))] truncate">{product.name}</p>
                                            <p className="text-xs text-[hsl(var(--muted-foreground))] truncate">{product.category} · {product.tagline}</p>
                                        </div>
                                        {/* Price + arrow */}
                                        <div className="flex items-center gap-2 shrink-0">
                                            <span className="text-sm font-bold text-[hsl(var(--primary))]">{formatPrice(product.price)}</span>
                                            <ArrowRight className={cn("w-3.5 h-3.5 transition-opacity", i === activeIndex ? "opacity-60" : "opacity-0")} />
                                        </div>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Footer hint */}
                <div className="flex items-center gap-4 px-4 py-2.5 border-t border-[hsl(var(--border))] bg-[hsl(var(--muted)/0.4)]">
                    <span className="flex items-center gap-1.5 text-[10px] text-[hsl(var(--muted-foreground))]">
                        <kbd className="px-1 py-0.5 rounded border text-[9px] font-mono bg-[hsl(var(--card))]">↑↓</kbd>
                        Navigate
                    </span>
                    <span className="flex items-center gap-1.5 text-[10px] text-[hsl(var(--muted-foreground))]">
                        <kbd className="px-1 py-0.5 rounded border text-[9px] font-mono bg-[hsl(var(--card))]">↵</kbd>
                        Open
                    </span>
                    <span className="flex items-center gap-1.5 text-[10px] text-[hsl(var(--muted-foreground))]">
                        <kbd className="px-1 py-0.5 rounded border text-[9px] font-mono bg-[hsl(var(--card))]">ESC</kbd>
                        Close
                    </span>
                    <span className="ml-auto text-[10px] text-[hsl(var(--muted-foreground))]">
                        {filtered.length} result{filtered.length !== 1 ? "s" : ""}
                    </span>
                </div>
            </div>
        </div>
    );
}

// ─── Navbar ─────────────────────────────────────────────────────────
export default function Navbar() {
    const [mounted, setMounted] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [cmdOpen, setCmdOpen] = useState(false);
    const { theme, setTheme } = useTheme();
    const pathname = usePathname();
    const totalItems = useCartStore((s) => s.totalItems());
    const openCart = useCartStore((s) => s.openCart);

    const openCmd = useCallback(() => setCmdOpen(true), []);
    const closeCmd = useCallback(() => setCmdOpen(false), []);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Global ⌘K / Ctrl+K shortcut
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setCmdOpen((v) => !v);
            }
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, []);

    return (
        <>
            <CommandPalette open={cmdOpen} onClose={closeCmd} />

            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-40 transition-all duration-200",
                    scrolled
                        ? "bg-[hsl(var(--background)/0.92)] backdrop-blur-xl border-b border-[hsl(var(--border))] shadow-sm"
                        : "bg-transparent"
                )}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center justify-between h-12">

                        {/* Logo */}
                        <div className="flex-1">
                            <Link href="/" className="inline-flex items-center">
                                <Image
                                    src="/vibrant-logo.png"
                                    alt="Vibrant"
                                    width={96}
                                    height={44}
                                    className="h-9 w-auto invert dark:invert-0"
                                    priority
                                />
                            </Link>
                        </div>

                        {/* Desktop Nav links — centered */}
                        <div className="hidden md:flex items-center gap-7">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "text-[13px] font-medium transition-colors",
                                        pathname === link.href
                                            ? "text-[hsl(var(--foreground))]"
                                            : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                                    )}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        {/* Right Actions */}
                        <div className="flex-1 flex items-center justify-end gap-1">
                            {/* Delivery location */}
                            <LocationSelector />

                            {/* ⌘K Search trigger */}
                            <button
                                onClick={openCmd}
                                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--muted)/0.6)] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--foreground))] transition-all text-xs font-medium"
                                aria-label="Search products"
                            >
                                <Search className="w-3.5 h-3.5" />
                                <span className="hidden lg:inline">Search…</span>
                                <kbd className="hidden lg:flex items-center gap-0.5 text-[10px] font-mono opacity-60">
                                    <Command className="w-2.5 h-2.5" />K
                                </kbd>
                            </button>

                            {/* Mobile search icon */}
                            <button
                                onClick={openCmd}
                                className="sm:hidden w-8 h-8 flex items-center justify-center rounded-lg text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] transition-all"
                                aria-label="Search"
                            >
                                <Search className="w-4 h-4" />
                            </button>

                            {/* Theme Toggle */}
                            {mounted && (
                                <button
                                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                    className="w-8 h-8 flex items-center justify-center rounded-lg text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] transition-all"
                                    aria-label="Toggle theme"
                                >
                                    {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                                </button>
                            )}

                            {/* Cart */}
                            <button
                                onClick={openCart}
                                className="w-8 h-8 flex items-center justify-center rounded-lg relative text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] transition-all"
                                aria-label="Shopping cart"
                            >
                                <ShoppingCart className="w-4 h-4" />
                                {totalItems > 0 && (
                                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[hsl(var(--primary))] text-white text-[9px] font-bold flex items-center justify-center">
                                        {totalItems > 9 ? "9+" : totalItems}
                                    </span>
                                )}
                            </button>

                            {/* Sign In */}
                            <Link
                                href="/login"
                                className="hidden md:flex items-center px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[hsl(var(--primary))] text-white hover:opacity-90 transition-all ml-1"
                            >
                                Sign In
                            </Link>

                            {/* Hamburger */}
                            <button
                                className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[hsl(var(--muted))] transition-all"
                                onClick={() => setMobileOpen(!mobileOpen)}
                                aria-label="Menu"
                            >
                                {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                            </button>
                        </div>
                    </nav>
                </div>
            </header>

            {/* Mobile Menu */}
            <div className={cn("fixed inset-0 z-40 md:hidden transition-all duration-200", mobileOpen ? "pointer-events-auto" : "pointer-events-none")}>
                <div
                    className={cn("absolute inset-0 bg-black/40 transition-opacity duration-200", mobileOpen ? "opacity-100" : "opacity-0")}
                    onClick={() => setMobileOpen(false)}
                />
                <div className={cn(
                    "absolute top-0 right-0 bottom-0 w-64 bg-[hsl(var(--card))] border-l border-[hsl(var(--border))] transition-transform duration-200 pt-16 px-5",
                    mobileOpen ? "translate-x-0" : "translate-x-full"
                )}>
                    <div className="flex flex-col gap-1">
                        {navLinks.map((link) => (
                            <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                                className={cn("px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                                    pathname === link.href
                                        ? "bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))]"
                                        : "hover:bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]"
                                )}
                            >{link.label}</Link>
                        ))}
                        <Link href="/login" onClick={() => setMobileOpen(false)}
                            className="mt-3 px-3 py-2.5 rounded-lg text-sm font-semibold bg-[hsl(var(--primary))] text-white text-center"
                        >Sign In</Link>
                    </div>
                </div>
            </div>

            {/* Spacer */}
            <div className="h-12" />
        </>
    );
}
