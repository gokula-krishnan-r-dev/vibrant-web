"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Crown, Sparkles, Leaf, ArrowRight, BadgeCheck } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLeaderStore } from "@/store/leader";
import { cn } from "@/lib/utils";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

export default function VibrantLeadersPage() {
  const router = useRouter();
  const setLeader = useLeaderStore((s) => s.setLeader);
  const [mode, setMode] = useState<"signin" | "signup">("signup");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleGoogleSignIn = () => {
    setLoading(true);
    // Simulate Google sign-in — in production, use NextAuth or Firebase
    setTimeout(() => {
      setLeader({ name: name || "Vibrant Leader", email: email || "leader@vibrant.in" });
      setLoading(false);
      router.push("/vibrant-leaders/products");
    }, 600);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLeader({ name: name || "Vibrant Leader", email: email || "leader@vibrant.in" });
      setLoading(false);
      router.push("/vibrant-leaders/products");
    }, 500);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex">
      {/* Left: Leaders benefits panel */}
      <div className="hidden lg:flex lg:flex-1 relative overflow-hidden bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, #fcd34d, transparent 50%), radial-gradient(circle at 80% 70%, #f59e0b, transparent 50%)" }} />
        <div className="relative z-10 flex flex-col justify-center items-center text-center p-16 text-white">
          <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-8 border border-white/30">
            <Crown className="w-10 h-10 text-amber-200" />
          </div>
          <h2 className="text-4xl font-black mb-3">Vibrant Leaders</h2>
          <p className="text-amber-100 text-lg font-medium mb-8 max-w-sm">
            Exclusive member pricing — ₹100 off every order. Join our community of wellness leaders.
          </p>
          <ul className="space-y-4 text-left max-w-xs">
            {[
              { icon: BadgeCheck, text: "₹100 discount on every purchase" },
              { icon: Sparkles, text: "Early access to new products" },
              { icon: Leaf, text: "Member-only offers & tips" },
            ].map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-white/95">
                <Icon className="w-5 h-5 text-amber-200 shrink-0" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right: Auth form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-16 bg-[hsl(var(--background))]">
        <div className="w-full max-w-md">
          <Link href="/" className="inline-flex items-center gap-2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] mb-8 transition-colors">
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to home
          </Link>

          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
              <Crown className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <span className="font-black text-xl">Vibrant Leaders</span>
          </div>
          <h1 className="text-3xl font-black mb-2">
            {mode === "signin" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="text-[hsl(var(--muted-foreground))] mb-8">
            Sign in to get ₹100 off every order. No credit card required.
          </p>

          {/* Google Sign-in */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className={cn(
              "w-full flex items-center justify-center gap-3 px-5 py-4 rounded-2xl border-2 font-semibold text-sm",
              "bg-white dark:bg-[hsl(var(--card))] border-[hsl(var(--border))]",
              "hover:bg-[hsl(var(--muted))] hover:border-amber-500/40 transition-all duration-200 hover:-translate-y-0.5",
              "disabled:opacity-60 disabled:pointer-events-none disabled:translate-y-0"
            )}
          >
            <GoogleIcon />
            {loading ? "Signing you in…" : "Continue with Google"}
          </button>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs text-[hsl(var(--muted-foreground))] bg-[hsl(var(--background))] px-3">
              or sign up with email
            </div>
          </div>

          <form onSubmit={handleEmailSubmit} className="space-y-4">
            {mode === "signup" && (
              <div>
                <label className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wide mb-1.5 block">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border bg-[hsl(var(--card))] text-sm outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all"
                />
              </div>
            )}
            <div>
              <label className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wide mb-1.5 block">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border bg-[hsl(var(--card))] text-sm outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl"
            >
              {loading ? "Creating account…" : mode === "signin" ? "Sign In" : "Create account & get ₹100 off"}
            </Button>
          </form>

          <p className="text-center text-sm text-[hsl(var(--muted-foreground))] mt-6">
            {mode === "signin" ? "Don't have an account?" : "Already a leader?"}{" "}
            <button
              type="button"
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className="text-amber-600 dark:text-amber-400 font-semibold hover:underline"
            >
              {mode === "signin" ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
