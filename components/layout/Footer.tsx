import Link from "next/link";
import { Leaf, Instagram, Twitter, Facebook, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
    Products: [
        { label: "Golden Glow Face Care", href: "/products/golden-glow-face-care" },
        { label: "Essentia of Life", href: "/products/essentia-of-life" },
        { label: "Relax Rubb", href: "/products/relax-rubb" },
        { label: "D Fume", href: "/products/d-fume" },
        { label: "Sleep Button", href: "/products/sleep-button" },
    ],
    Company: [
        { label: "About Us", href: "#about" },
        { label: "Our Story", href: "#story" },
        { label: "Blog", href: "#blog" },
        { label: "Careers", href: "#careers" },
    ],
    Support: [
        { label: "FAQ", href: "#faq" },
        { label: "Shipping Policy", href: "#shipping" },
        { label: "Return Policy", href: "#returns" },
        { label: "Contact Us", href: "#contact" },
    ],
};

export default function Footer() {
    return (
        <footer className="border-t bg-[hsl(var(--surface-2))]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-[hsl(var(--primary))] flex items-center justify-center">
                                <Leaf className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-bold text-xl">Vibrant</span>
                        </Link>
                        <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed max-w-xs mb-6">
                            Crafting premium wellness and beauty products with advanced Liposomal Technology
                            for your healthiest, most radiant self.
                        </p>
                        <div className="flex flex-col gap-3 text-sm text-[hsl(var(--muted-foreground))]">
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 shrink-0 text-[hsl(var(--primary))]" />
                                <span>hello@vibrant.in</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 shrink-0 text-[hsl(var(--primary))]" />
                                <span>+91 98765 43210</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 shrink-0 text-[hsl(var(--primary))]" />
                                <span>Mumbai, India</span>
                            </div>
                        </div>
                    </div>

                    {/* Links */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h3 className="font-semibold text-sm mb-4 text-[hsl(var(--foreground))]">{title}</h3>
                            <ul className="flex flex-col gap-2.5">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom */}
                <div className="border-t mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">
                        © 2026 Vibrant. All rights reserved. Made with ❤️ in India.
                    </p>
                    <div className="flex items-center gap-4">
                        {[Instagram, Twitter, Facebook].map((Icon, i) => (
                            <a
                                key={i}
                                href="#"
                                className="w-8 h-8 rounded-lg bg-[hsl(var(--muted))] flex items-center justify-center text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary)/0.1)] transition-colors"
                            >
                                <Icon className="w-4 h-4" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
