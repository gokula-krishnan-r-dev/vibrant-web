export interface ProductVariant {
    id: string;
    name: string;
    value: string;
}

export interface Product {
    id: string;
    slug: string;
    name: string;
    tagline: string;
    description: string;
    longDescription: string;
    price: number;
    originalPrice?: number;
    category: string;
    badge?: string;
    image: string;
    images: string[];
    variants: ProductVariant[];
    ingredients?: string[];
    howToUse?: string[];
    benefits?: string[];
    inStock: boolean;
}

export const products: Product[] = [
    {
        id: "1",
        slug: "golden-glow-face-care",
        name: "Golden Glow",
        tagline: "Premium Face Care Formula",
        description: "Non-comedogenic face care with liposomal technology for radiant, glowing skin.",
        longDescription:
            "Golden Glow Face Care is a premium skincare product crafted with advanced Liposomal Technology for deep skin nourishment. It is non-comedogenic, free from artificial colours and preservatives, and contains no parabens. Designed to give you a naturally radiant and glowing complexion.",
        price: 999,
        originalPrice: 1299,
        category: "Skin Care",
        badge: "Bestseller",
        image: "/images/golden-glow.jpg",
        images: ["/images/golden-glow.jpg"],
        variants: [
            { id: "v1", name: "Size", value: "50g" },
            { id: "v2", name: "Size", value: "100g" },
        ],
        ingredients: [
            "Liposomal Complex",
            "Vitamin C",
            "Hyaluronic Acid",
            "Niacinamide",
            "Aloe Vera Extract",
        ],
        howToUse: [
            "Cleanse your face thoroughly",
            "Apply a small amount to face and neck",
            "Massage gently in circular motions",
            "Use twice daily for best results",
        ],
        benefits: [
            "Non-comedogenic formula",
            "No artificial colours",
            "No artificial preservatives",
            "No parabens",
            "Advanced Liposomal Technology",
        ],
        inStock: true,
    },
    {
        id: "2",
        slug: "dp-555",
        name: "DP 555",
        tagline: "Advanced Wellness Supplement",
        description: "A powerful daily supplement for enhanced vitality and overall wellness.",
        longDescription:
            "DP 555 is an advanced wellness supplement designed to support your daily health regimen. Formulated with a blend of essential nutrients and natural extracts, it promotes energy, vitality, and overall well-being.",
        price: 849,
        originalPrice: 999,
        category: "Supplements",
        badge: "New",
        image: "/images/dp-555.jpg",
        images: ["/images/dp-555.jpg"],
        variants: [
            { id: "v1", name: "Pack", value: "30 Tablets" },
            { id: "v2", name: "Pack", value: "60 Tablets" },
        ],
        ingredients: [
            "Vitamin D3",
            "Zinc",
            "Magnesium",
            "Vitamin B Complex",
            "Natural Extracts",
        ],
        howToUse: [
            "Take 1 tablet daily with water",
            "Best taken after meals",
            "Consult a physician for personalized guidance",
        ],
        benefits: [
            "Boosts energy and vitality",
            "Supports immune function",
            "Promotes overall wellness",
            "Natural ingredients",
        ],
        inStock: true,
    },
    {
        id: "3",
        slug: "essentia-of-life",
        name: "Essentia of Life",
        tagline: "Anti-Oxidant Liquid",
        description: "A powerful antioxidant liquid with CO Q10, Pine Bark Extract, and Liposomal Technology.",
        longDescription:
            "Essentia of Life is a premium anti-oxidant liquid supplement powered by Liposomal Technology for superior bioavailability. It contains CoQ10, Vitamin C, Curcumin, Pine Bark Extract, Saw Palmetto, and Astaxanthin — a comprehensive formula for cellular protection and longevity.",
        price: 1145.55,
        originalPrice: 1499,
        category: "Supplements",
        badge: "Premium",
        image: "/images/essentia-of-life.jpg",
        images: ["/images/essentia-of-life.jpg"],
        variants: [
            { id: "v1", name: "Size", value: "100ml" },
            { id: "v2", name: "Size", value: "200ml" },
        ],
        ingredients: [
            "CoQ10",
            "Vitamin C",
            "Curcumin",
            "Pine Bark Extract",
            "Saw Palmetto",
            "Astaxanthin",
        ],
        howToUse: [
            "Take 10ml daily",
            "Mix with water or juice",
            "Best consumed in the morning",
            "Shake well before use",
        ],
        benefits: [
            "Powerful antioxidant protection",
            "Superior bioavailability via liposomal delivery",
            "Supports cellular health",
            "Anti-aging properties",
        ],
        inStock: true,
    },
    {
        id: "4",
        slug: "relax-rubb",
        name: "Relax Rubb",
        tagline: "Foot Massage Cream",
        description: "Natural, safe & easy to use foot massage cream for deep relaxation.",
        longDescription:
            "Relax Rubb is a soothing foot massage cream that combines natural ingredients to relieve tired, aching feet. Its unique formula penetrates deep into the skin to provide lasting comfort and relaxation. Natural, safe, and easy to use for everyday foot care.",
        price: 525,
        originalPrice: 699,
        category: "Body Care",
        badge: "Natural",
        image: "/images/relax-rubb.jpg",
        images: ["/images/relax-rubb.jpg"],
        variants: [
            { id: "v1", name: "Size", value: "50g" },
            { id: "v2", name: "Size", value: "100g" },
        ],
        ingredients: [
            "Peppermint Oil",
            "Eucalyptus Extract",
            "Shea Butter",
            "Menthol",
            "Vitamin E",
        ],
        howToUse: [
            "Apply generously to clean feet",
            "Massage in circular motions",
            "Focus on heels and pressure points",
            "Use nightly before sleep",
        ],
        benefits: [
            "Relieves tired feet",
            "Deep moisturization",
            "Cooling sensation",
            "Natural ingredients",
            "Long-lasting comfort",
        ],
        inStock: true,
    },
    {
        id: "5",
        slug: "d-fume",
        name: "D Fume",
        tagline: "Vitamin D3 Cream",
        description: "Natural, safe & easy to use Vitamin D3 cream for skin health and vitality.",
        longDescription:
            "D Fume is an innovative Vitamin D3 cream designed to supplement daily Vitamin D needs through transdermal absorption. This natural, safe, and easy-to-use cream helps maintain healthy skin, supports bone health, and boosts immune function.",
        price: 525,
        originalPrice: 699,
        category: "Skin Care",
        badge: "Essential",
        image: "/images/d-fume.jpg",
        images: ["/images/d-fume.jpg"],
        variants: [
            { id: "v1", name: "Size", value: "30ml" },
            { id: "v2", name: "Size", value: "60ml" },
        ],
        ingredients: [
            "Vitamin D3 (Cholecalciferol)",
            "Aloe Vera",
            "Coconut Oil",
            "Vitamin E",
            "Natural Emollients",
        ],
        howToUse: [
            "Apply a small amount to skin",
            "Massage until fully absorbed",
            "Use daily on arms or legs",
            "Best applied after shower",
        ],
        benefits: [
            "Vitamin D3 supplementation",
            "Improves skin health",
            "Supports immune system",
            "Natural transdermal delivery",
        ],
        inStock: true,
    },
    {
        id: "6",
        slug: "sleep-button",
        name: "Sleep Button",
        tagline: "Daily Oral Spray",
        description: "A premium daily oral spray to help you achieve deep, restful sleep naturally.",
        longDescription:
            "Sleep Button is a revolutionary daily oral spray formulated to promote natural, restful sleep. With a blend of melatonin and calming botanicals, it helps you fall asleep faster, stay asleep longer, and wake up refreshed. Fast-acting sublingual delivery ensures quick results.",
        price: 1593,
        originalPrice: 1999,
        category: "Wellness",
        badge: "Popular",
        image: "/images/sleep-button.jpg",
        images: ["/images/sleep-button.jpg"],
        variants: [
            { id: "v1", name: "Size", value: "30ml" },
            { id: "v2", name: "Size", value: "60ml" },
        ],
        ingredients: [
            "Melatonin",
            "Ashwagandha Extract",
            "Chamomile",
            "L-Theanine",
            "Passionflower",
        ],
        howToUse: [
            "Spray 2-3 times under tongue",
            "Use 30 minutes before bedtime",
            "Do not exceed recommended dose",
            "Not suitable for children under 12",
        ],
        benefits: [
            "Promotes natural sleep",
            "Fast-acting sublingual delivery",
            "Wake up refreshed",
            "Non-habit forming",
            "Natural ingredients",
        ],
        inStock: true,
    },
];

export function getProductBySlug(slug: string): Product | undefined {
    return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
    return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(count = 3): Product[] {
    return products.slice(0, count);
}
