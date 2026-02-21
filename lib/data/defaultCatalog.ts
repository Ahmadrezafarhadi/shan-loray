import { Category, Collection, PaginatedResponse, Product, ProductFilters } from '../api/config';

const DEFAULT_TIMESTAMP = '2026-02-21T00:00:00.000Z';

const buildProduct = (input: {
  id: number;
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  image: string;
  collection: string;
  featured?: boolean;
  reviews?: number;
  rating?: number;
  badge?: string;
}): Product => ({
  id: input.id,
  slug: input.slug,
  name: input.name,
  description: input.description,
  price: input.price,
  price_numeric: input.price,
  rating: input.rating ?? 5,
  reviews: input.reviews ?? 120,
  image: input.image,
  hero_image: input.image,
  collection: input.collection,
  short_description: input.shortDescription,
  full_description: [
    `${input.name} is part of our ${input.collection}.`,
    'Crafted with premium ingredients and designed for daily luxury use.'
  ],
  thumbnail_images: [input.image],
  sizes: [{ size: 'Standard', price: `$${input.price}`, selected: true, badge: null }],
  key_benefits: [
    'Visible results with consistent use',
    'Premium formulation quality',
    'Suitable for modern daily routines'
  ],
  application_steps: [
    { step: '1', instruction: 'Apply a suitable amount on clean skin.', timing: 'Morning or evening' },
    { step: '2', instruction: 'Allow the product to absorb completely.', timing: null }
  ],
  key_ingredients: [
    { name: 'Niacinamide', scientific: 'Vitamin B3', benefit: 'Supports smoother and brighter skin.', concentration: '2%' },
    { name: 'Hyaluronic Acid', scientific: 'Sodium Hyaluronate', benefit: 'Helps maintain hydration.', concentration: '1%' }
  ],
  ingredients_list: 'Water, Glycerin, Niacinamide, Sodium Hyaluronate',
  expert_tips: ['Use daily for best results.', 'Pair with SPF during daytime.'],
  special_features: [
    { title: 'Luxury Finish', desc: 'Elegant texture and refined performance.' },
    { title: 'Daily Friendly', desc: 'Designed for effortless everyday use.' }
  ],
  badge: input.badge,
  featured: input.featured,
  created_at: DEFAULT_TIMESTAMP,
  updated_at: DEFAULT_TIMESTAMP
});

const defaultProductsWithCategory: Array<{ category: 'skincare' | 'makeup' | 'fragrance'; product: Product }> = [
  {
    category: 'skincare',
    product: buildProduct({
      id: 1001,
      slug: 'botanical-renewal-serum',
      name: 'Botanical Renewal Serum',
      description: 'Advanced age-defying formula',
      shortDescription: 'A concentrated serum for smoother and brighter skin.',
      price: 185,
      image: '/images/remote/569fb12ea069.jpg',
      collection: 'Advanced Skincare Collection',
      featured: true,
      reviews: 248
    })
  },
  {
    category: 'skincare',
    product: buildProduct({
      id: 1002,
      slug: 'supreme-moisture-cream',
      name: 'Supreme Moisture Cream',
      description: '24-hour deep hydration',
      shortDescription: 'A rich moisturizer that locks in long-lasting hydration.',
      price: 165,
      image: '/images/remote/74573eb84eab.jpg',
      collection: 'Hydration Collection',
      reviews: 321
    })
  },
  {
    category: 'skincare',
    product: buildProduct({
      id: 1003,
      slug: 'daily-defense-spf-50',
      name: 'Daily Defense SPF 50',
      description: 'Broad spectrum protection',
      shortDescription: 'Lightweight sunscreen with no white cast.',
      price: 72,
      image: '/images/Shop/Defense.jpeg',
      collection: 'Sun Protection Collection',
      reviews: 534
    })
  },
  {
    category: 'makeup',
    product: buildProduct({
      id: 2001,
      slug: 'luxe-velvet-lipstick-collection',
      name: 'Luxe Velvet Lipstick Collection',
      description: 'Rich color with long-lasting comfort',
      shortDescription: 'Signature lipstick shades with soft matte finish.',
      price: 245,
      image: '/images/remote/f0047a5d6f22.jpg',
      collection: 'Luxe Lips Collection',
      featured: true,
      badge: 'BESTSELLER',
      reviews: 412
    })
  },
  {
    category: 'makeup',
    product: buildProduct({
      id: 2002,
      slug: 'luminous-foundation',
      name: 'Luminous Foundation',
      description: 'Buildable coverage with skin-like finish',
      shortDescription: 'Flexible coverage with radiant texture.',
      price: 78,
      image: '/images/remote/75c1ce0f610a.jpg',
      collection: 'Complexion Perfection',
      reviews: 534
    })
  },
  {
    category: 'makeup',
    product: buildProduct({
      id: 2003,
      slug: 'glow-highlighter',
      name: 'Glow Highlighter',
      description: 'Multi-dimensional shimmer',
      shortDescription: 'Soft-focus glow for face and body.',
      price: 58,
      image: '/images/remote/8e7cdb4e3135.jpg',
      collection: 'Glow Collection',
      reviews: 789
    })
  },
  {
    category: 'makeup',
    product: buildProduct({
      id: 2004,
      slug: 'silk-touch-concealer',
      name: 'Silk Touch Concealer',
      description: 'Full coverage brightening formula',
      shortDescription: 'Concealer with smooth finish and long wear.',
      price: 52,
      image: '/images/remote/d6bda3da6218.jpg',
      collection: 'Complexion Perfection',
      reviews: 621
    })
  },
  {
    category: 'makeup',
    product: buildProduct({
      id: 2005,
      slug: 'radiant-blush-duo',
      name: 'Radiant Blush Duo',
      description: 'Buildable color with luminous finish',
      shortDescription: 'Dual-tone blush for natural or bold looks.',
      price: 68,
      image: '/images/remote/09be4fda1ead.jpg',
      collection: 'Cheek Glow Collection',
      reviews: 445
    })
  },
  {
    category: 'makeup',
    product: buildProduct({
      id: 2006,
      slug: 'nude-eyeshadow-palette',
      name: 'Nude Eyeshadow Palette',
      description: 'Ten versatile shades for every look',
      shortDescription: 'Matte and shimmer shades for day-to-night looks.',
      price: 145,
      image: '/images/remote/8332ed61ec25.jpg',
      collection: 'Eye Artistry Collection',
      reviews: 298
    })
  },
  {
    category: 'makeup',
    product: buildProduct({
      id: 2007,
      slug: 'complete-makeup-artist-set',
      name: 'Complete Makeup Artist Set',
      description: 'Professional face, eye, and lip essentials',
      shortDescription: 'All-in-one makeup bundle for complete looks.',
      price: 395,
      image: '/images/remote/f2c18d05be14.jpg',
      collection: 'Professional Collection',
      badge: 'LIMITED EDITION',
      reviews: 203
    })
  },
  {
    category: 'makeup',
    product: buildProduct({
      id: 2008,
      slug: 'travel-glam-collection',
      name: 'Travel Glam Collection',
      description: 'Travel-friendly makeup essentials',
      shortDescription: 'Portable mini-size beauty kit for daily use.',
      price: 185,
      image: '/images/remote/85194cecef30.jpg',
      collection: 'Travel Collection',
      reviews: 167
    })
  },
  {
    category: 'fragrance',
    product: buildProduct({
      id: 3001,
      slug: 'amber-rose-eau-de-parfum',
      name: 'Amber Rose Eau de Parfum',
      description: 'Warm floral signature scent',
      shortDescription: 'A refined scent blending rose, amber, and musk.',
      price: 140,
      image: '/images/remote/4327d93a39db.jpg',
      collection: 'Signature Fragrance Collection',
      featured: true,
      reviews: 198
    })
  },
  {
    category: 'fragrance',
    product: buildProduct({
      id: 3002,
      slug: 'velvet-oud-noir',
      name: 'Velvet Oud Noir',
      description: 'Deep woody oriental perfume',
      shortDescription: 'An evening fragrance with oud and spice notes.',
      price: 175,
      image: '/images/remote/af7971c9074f.jpg',
      collection: 'Evening Fragrance Collection',
      reviews: 154
    })
  },
  {
    category: 'fragrance',
    product: buildProduct({
      id: 3003,
      slug: 'citrus-bloom-mist',
      name: 'Citrus Bloom Mist',
      description: 'Fresh citrus daytime mist',
      shortDescription: 'A bright and fresh daily fragrance mist.',
      price: 68,
      image: '/images/remote/8c89d76a84cb.jpg',
      collection: 'Fresh Fragrance Collection',
      reviews: 131
    })
  },
  {
    category: 'fragrance',
    product: buildProduct({
      id: 3004,
      slug: 'midnight-oud-elixir',
      name: 'Midnight Oud Elixir',
      description: 'Intense woody and amber blend',
      shortDescription: 'A deep evening perfume with bold projection.',
      price: 190,
      image: '/images/remote/77bda6b42082.jpg',
      collection: 'Evening Fragrance Collection',
      reviews: 172
    })
  },
  {
    category: 'fragrance',
    product: buildProduct({
      id: 3005,
      slug: 'white-jasmine-veil',
      name: 'White Jasmine Veil',
      description: 'Elegant floral daytime fragrance',
      shortDescription: 'Soft jasmine blend with a clean powdery trail.',
      price: 128,
      image: '/images/remote/eef2299a9d9e.jpg',
      collection: 'Signature Fragrance Collection',
      reviews: 147
    })
  },
  {
    category: 'fragrance',
    product: buildProduct({
      id: 3006,
      slug: 'amber-vanilla-reserve',
      name: 'Amber Vanilla Reserve',
      description: 'Sweet warm scent with rich depth',
      shortDescription: 'Amber and vanilla composition for nightly wear.',
      price: 158,
      image: '/images/remote/ac4ae4b25b25.jpg',
      collection: 'Evening Fragrance Collection',
      reviews: 166
    })
  },
  {
    category: 'fragrance',
    product: buildProduct({
      id: 3007,
      slug: 'ocean-citrus-splash',
      name: 'Ocean Citrus Splash',
      description: 'Refreshing aquatic citrus fragrance',
      shortDescription: 'Fresh and uplifting profile for everyday use.',
      price: 86,
      image: '/images/remote/90689dbddd6d.jpg',
      collection: 'Fresh Fragrance Collection',
      reviews: 122
    })
  },
  {
    category: 'fragrance',
    product: buildProduct({
      id: 3008,
      slug: 'rose-saffron-signature',
      name: 'Rose Saffron Signature',
      description: 'Floral spicy long-lasting perfume',
      shortDescription: 'Rose and saffron accord with modern character.',
      price: 168,
      image: '/images/remote/df635b7884b7.jpg',
      collection: 'Signature Fragrance Collection',
      reviews: 139
    })
  }
];

export const defaultProducts: Product[] = defaultProductsWithCategory.map((entry) => entry.product);

export const defaultCategories: Category[] = [
  { id: 1, name: 'Skincare', slug: 'skincare', created_at: DEFAULT_TIMESTAMP, updated_at: DEFAULT_TIMESTAMP },
  { id: 2, name: 'Makeup', slug: 'makeup', created_at: DEFAULT_TIMESTAMP, updated_at: DEFAULT_TIMESTAMP },
  { id: 3, name: 'Fragrance', slug: 'fragrance', created_at: DEFAULT_TIMESTAMP, updated_at: DEFAULT_TIMESTAMP },
  { id: 4, name: 'Serums', slug: 'serums', created_at: DEFAULT_TIMESTAMP, updated_at: DEFAULT_TIMESTAMP },
  { id: 5, name: 'Foundation', slug: 'foundation', created_at: DEFAULT_TIMESTAMP, updated_at: DEFAULT_TIMESTAMP },
  { id: 6, name: 'Eau de Parfum', slug: 'eau-de-parfum', created_at: DEFAULT_TIMESTAMP, updated_at: DEFAULT_TIMESTAMP },
  { id: 7, name: 'Treatments', slug: 'treatments', created_at: DEFAULT_TIMESTAMP, updated_at: DEFAULT_TIMESTAMP }
];

export const defaultCollections: Collection[] = [
  {
    id: 1,
    name: 'Radiance Ritual',
    slug: 'radiance-ritual',
    description: 'A complete routine for hydrated and glowing skin.',
    image: '/images/remote/5a3c60cfa861.jpg',
    featured: true,
    is_featured: true,
    products_count: 4,
    created_at: DEFAULT_TIMESTAMP,
    updated_at: DEFAULT_TIMESTAMP
  },
  {
    id: 2,
    name: 'Velvet Makeup Set',
    slug: 'velvet-makeup-set',
    description: 'A curated mix of complexion and lip essentials.',
    image: '/images/remote/8c89d76a84cb.jpg',
    featured: true,
    is_featured: true,
    products_count: 3,
    created_at: DEFAULT_TIMESTAMP,
    updated_at: DEFAULT_TIMESTAMP
  },
  {
    id: 3,
    name: 'Signature Scent Box',
    slug: 'signature-scent-box',
    description: 'Three iconic scents for daily and evening wear.',
    image: '/images/remote/af7971c9074f.jpg',
    featured: false,
    is_featured: false,
    products_count: 3,
    created_at: DEFAULT_TIMESTAMP,
    updated_at: DEFAULT_TIMESTAMP
  },
  {
    id: 4,
    name: 'Daily Essentials',
    slug: 'daily-essentials',
    description: 'Reliable, high-performance daily products.',
    image: '/images/remote/4ad7a1397422.jpg',
    featured: false,
    is_featured: false,
    products_count: 5,
    created_at: DEFAULT_TIMESTAMP,
    updated_at: DEFAULT_TIMESTAMP
  }
];

const getProductCategory = (product: Product): 'skincare' | 'makeup' | 'fragrance' => {
  const entry = defaultProductsWithCategory.find((item) => item.product.slug === product.slug);
  return entry?.category ?? 'skincare';
};

const sortProducts = (items: Product[], sort?: ProductFilters['sort']): Product[] => {
  if (sort === 'price-low') {
    return [...items].sort((a, b) => a.price - b.price);
  }
  if (sort === 'price-high') {
    return [...items].sort((a, b) => b.price - a.price);
  }
  if (sort === 'newest') {
    return [...items].sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
  }
  return [...items].sort((a, b) => b.reviews - a.reviews);
};

export const getDefaultProducts = (filters?: ProductFilters): Product[] => {
  let items = [...defaultProducts];

  if (filters?.category) {
    const normalized = filters.category.toLowerCase();
    items = items.filter((item) => getProductCategory(item) === normalized);
  }

  if (filters?.collection) {
    const collectionQuery = filters.collection.toLowerCase();
    items = items.filter((item) => item.collection.toLowerCase().includes(collectionQuery));
  }

  if (filters?.search) {
    const search = filters.search.toLowerCase();
    items = items.filter(
      (item) =>
        item.name.toLowerCase().includes(search) ||
        item.description.toLowerCase().includes(search) ||
        item.short_description.toLowerCase().includes(search)
    );
  }

  if (typeof filters?.price_min === 'number') {
    items = items.filter((item) => item.price >= filters.price_min!);
  }

  if (typeof filters?.price_max === 'number') {
    items = items.filter((item) => item.price <= filters.price_max!);
  }

  if (typeof filters?.rating === 'number') {
    items = items.filter((item) => item.rating >= filters.rating!);
  }

  return sortProducts(items, filters?.sort);
};

export const toPaginatedProducts = (
  items: Product[],
  page: number = 1,
  perPage: number = 12
): PaginatedResponse<Product> => {
  const total = items.length;
  const start = (page - 1) * perPage;
  const paged = items.slice(start, start + perPage);
  return {
    data: paged,
    current_page: page,
    last_page: Math.max(1, Math.ceil(total / perPage)),
    per_page: perPage,
    total,
    from: total === 0 ? 0 : start + 1,
    to: start + paged.length
  };
};

export const getDefaultProductBySlug = (slug: string): Product | undefined =>
  defaultProducts.find((product) => product.slug === slug);

export const getDefaultFeaturedProducts = (): Product[] =>
  defaultProducts.filter((product) => product.featured).concat(defaultProducts.filter((product) => !product.featured)).slice(0, 8);

export const getDefaultBestsellers = (): Product[] => [...defaultProducts].sort((a, b) => b.reviews - a.reviews).slice(0, 8);

export const getDefaultNewArrivals = (): Product[] => [...defaultProducts].sort((a, b) => (a.created_at < b.created_at ? 1 : -1)).slice(0, 8);
