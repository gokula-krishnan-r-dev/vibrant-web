"use client";

import { useEffect, useRef } from "react";

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<InstanceType<typeof import("lenis").default> | null>(null);

    useEffect(() => {
        (async () => {
            const Lenis = (await import("lenis")).default;
            lenisRef.current = new Lenis({
                duration: 1.2,
                easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                smoothWheel: true,
            });

            const { gsap } = await import("gsap");
            const { ScrollTrigger } = await import("gsap/ScrollTrigger");
            gsap.registerPlugin(ScrollTrigger);

            lenisRef.current.on("scroll", ScrollTrigger.update);

            gsap.ticker.add((time) => {
                lenisRef.current?.raf(time * 1000);
            });
            gsap.ticker.lagSmoothing(0);
        })();

        return () => {
            lenisRef.current?.destroy();
        };
    }, []);

    return <>{children}</>;
}
