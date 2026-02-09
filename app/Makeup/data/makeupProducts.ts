// data/makeupProducts.ts

export interface MakeupProduct {
  slug: string;
  name: string;
  description: string;
  price: string;
  priceNumeric: number;
  rating: number;
  reviews: number;
  image: string;
  heroImage: string;
  collection: string;
  badge?: string;
  shades?: string[];
  shortDescription: string;
  fullDescription: string[];
  thumbnailImages: string[];
  sizes: { size: string; price: string; selected: boolean; badge: string | null }[];
  keyBenefits: string[];
  applicationSteps: { step: string; instruction: string; timing: string | null }[];
  keyIngredients: {
    name: string;
    scientific: string;
    benefit: string;
    concentration: string;
  }[];
  ingredientsList: string;
  expertTips: string[];
  specialFeatures: {
    title: string;
    desc: string;
  }[];
  category: 'featured' | 'horizontal' | 'square' | 'rectangular';
}

export const makeupProducts: MakeupProduct[] = [
  // ─── Featured Product ────────────────────────────────
  {
    slug: 'luxe-velvet-lipstick-collection',
    name: 'Luxe Velvet Lipstick Collection',
    description: 'Twelve signature shades in rich, long-lasting formula',
    price: '$245',
    priceNumeric: 245,
    rating: 5,
    reviews: 412,
    image: '/images/remote/f0047a5d6f22.jpg',
    heroImage: '/images/remote/28e0a1717981.jpg',
    collection: 'Luxe Lips Collection',
    badge: 'BESTSELLER',
    category: 'featured',
    shortDescription: 'Our most coveted lip collection featuring twelve universally flattering shades. Each lipstick delivers rich, velvety color with a comfortable long-wearing finish that lasts up to 12 hours.',
    fullDescription: [
      'The Luxe Velvet Lipstick Collection represents the pinnacle of lip color artistry. Each of the twelve shades has been carefully curated to complement every skin tone, from the shearest nudes to the boldest reds.',
      'Formulated with a proprietary blend of micro-fine pigments suspended in a nourishing base of jojoba oil and vitamin E, these lipsticks glide on effortlessly and stay put without drying or feathering.',
      'The magnetic closure case is crafted from weighted metal with a satin-gold finish, making each application feel like a luxury experience. Whether you\'re going for a natural everyday look or a dramatic evening statement, this collection has you covered.'
    ],
    thumbnailImages: [
      '/images/remote/75c1ce0f610a.jpg',
      '/images/remote/651bed8c8afe.jpg',
      '/images/remote/c3eba2f21b0b.jpg',
      '/images/remote/d6bda3da6218.jpg',
      '/images/remote/8332ed61ec25.jpg'
    ],
    sizes: [
      { size: 'Full Set (12)', price: '$245', selected: true, badge: 'Best Value' },
      { size: 'Mini Set (6)', price: '$135', selected: false, badge: null },
      { size: 'Single', price: '$32', selected: false, badge: null }
    ],
    keyBenefits: [
      '12 universally flattering shades',
      'Up to 12-hour long-lasting wear',
      'Velvety smooth, non-drying formula',
      'Enriched with jojoba oil & vitamin E',
      'No feathering or bleeding',
      'Luxurious weighted metal case'
    ],
    applicationSteps: [
      { step: '1', instruction: 'Exfoliate and moisturize lips before application', timing: 'Prep is key' },
      { step: '2', instruction: 'Line lips with a matching lip liner for precision', timing: 'Optional but recommended' },
      { step: '3', instruction: 'Apply directly from the bullet or with a lip brush', timing: 'Start from the center' },
      { step: '4', instruction: 'Blot with tissue and reapply for extra intensity', timing: 'For fuller coverage' }
    ],
    keyIngredients: [
      { name: 'Jojoba Oil', scientific: 'Simmondsia Chinensis', benefit: 'Provides lasting moisture and prevents lips from drying throughout the day', concentration: '5%' },
      { name: 'Vitamin E', scientific: 'Tocopherol', benefit: 'Antioxidant protection that keeps lips soft, smooth, and youthful', concentration: '2%' },
      { name: 'Shea Butter', scientific: 'Butyrospermum Parkii', benefit: 'Creates a protective barrier while delivering intense nourishment', concentration: '3%' },
      { name: 'Micro-Fine Pigments', scientific: 'CI 77891, CI 15850', benefit: 'Ultra-fine color particles for smooth, even application and true color payoff', concentration: '15%' }
    ],
    ingredientsList: 'Ricinus Communis Seed Oil, Caprylic/Capric Triglyceride, Simmondsia Chinensis Seed Oil, Butyrospermum Parkii Butter, Candelilla Cera, Tocopherol, Silica, CI 77891, CI 15850, CI 77491, Phenoxyethanol, Fragrance',
    expertTips: [
      'For a matte finish, blot with tissue after application',
      'Mix two shades together to create your own custom color',
      'Apply a thin layer for a stain effect, or build up for full opacity',
      'Use a concealer brush around the edges for a crisp lip line'
    ],
    specialFeatures: [
      { title: 'True Color Technology', desc: 'What you see in the tube is exactly what you get on your lips — no color shift' },
      { title: 'Comfort Wear Formula', desc: 'Feels like a balm, performs like a long-wear lipstick with zero dryness' },
      { title: 'Inclusive Shade Range', desc: 'Each shade is tested on 50+ skin tones to ensure universal flattery' },
      { title: 'Sustainable Packaging', desc: 'Refillable metal cases reduce waste while maintaining luxury feel' }
    ]
  },

  // ─── Horizontal Products ────────────────────────────
  {
    slug: 'luminous-foundation',
    name: 'Luminous Foundation',
    description: 'Buildable coverage with 24-hour wear',
    price: '$78',
    priceNumeric: 78,
    rating: 5,
    reviews: 534,
    image: '/images/remote/75c1ce0f610a.jpg',
    heroImage: '/images/remote/c3eba2f21b0b.jpg',
    collection: 'Complexion Perfection',
    shades: ['#F5D4C4', '#E8C4B4', '#D4A894', '#C08874', '#A86854', '#8E5844'],
    category: 'horizontal',
    shortDescription: 'A weightless, buildable foundation that delivers a luminous, skin-like finish with 24-hour wear. Available in 40 shades with warm, cool, and neutral undertones.',
    fullDescription: [
      'Our Luminous Foundation is the result of three years of development, designed to deliver the perfect balance between coverage and a natural, skin-like finish.',
      'The innovative water-gel formula melts into the skin on contact, creating a seamless, second-skin effect that never looks cakey or heavy. Build from sheer to medium coverage with ease.',
      'Formulated with light-reflecting micro-pearls and skin-loving ingredients like hyaluronic acid and niacinamide, this foundation not only perfects your complexion but actively improves your skin over time.'
    ],
    thumbnailImages: [
      '/images/remote/d6bda3da6218.jpg',
      '/images/remote/8332ed61ec25.jpg',
      '/images/remote/1a2b6924ff80.jpg',
      '/images/remote/ff1ce4f4bab6.jpg',
      '/images/remote/d6bda3da6218.jpg'
    ],
    sizes: [
      { size: '30ml', price: '$78', selected: true, badge: null },
      { size: '50ml', price: '$110', selected: false, badge: 'Best Value' }
    ],
    keyBenefits: [
      '40 shades with warm, cool & neutral undertones',
      'Buildable sheer to medium coverage',
      '24-hour long-lasting wear',
      'Light-reflecting luminous finish',
      'Non-comedogenic & oil-free',
      'Contains skincare ingredients'
    ],
    applicationSteps: [
      { step: '1', instruction: 'Start with moisturizer and primer on clean skin', timing: 'Wait 2 minutes for primer to set' },
      { step: '2', instruction: 'Shake the bottle and dispense one pump onto the back of your hand', timing: null },
      { step: '3', instruction: 'Apply with a damp beauty sponge, brush, or fingertips', timing: 'Bounce, don\'t drag' },
      { step: '4', instruction: 'Build coverage where needed with thin layers', timing: 'Less is more' }
    ],
    keyIngredients: [
      { name: 'Hyaluronic Acid', scientific: 'Sodium Hyaluronate', benefit: 'Draws moisture to the skin for a plump, dewy finish all day', concentration: '1%' },
      { name: 'Niacinamide', scientific: 'Vitamin B3', benefit: 'Improves skin texture and minimizes the appearance of pores over time', concentration: '2%' },
      { name: 'Micro-Pearls', scientific: 'Synthetic Fluorophlogopite', benefit: 'Light-reflecting particles create a soft-focus, luminous glow', concentration: '3%' },
      { name: 'Squalane', scientific: 'Hydrogenated Polyisobutene', benefit: 'Mimics skin\'s natural oils for a comfortable, never-greasy wear', concentration: '2%' }
    ],
    ingredientsList: 'Water, Cyclopentasiloxane, Titanium Dioxide, Glycerin, Sodium Hyaluronate, Niacinamide, Squalane, Synthetic Fluorophlogopite, Dimethicone, Phenoxyethanol, Iron Oxides, Fragrance',
    expertTips: [
      'Mix with a drop of facial oil for an extra dewy finish',
      'Apply with a damp sponge for the most natural, skin-like result',
      'Set with a light dusting of translucent powder on oily areas only',
      'Shade match on your jawline in natural daylight for the most accurate match'
    ],
    specialFeatures: [
      { title: '40-Shade Range', desc: 'Inclusive shade range with precise undertone matching for every skin tone' },
      { title: 'Skincare-Infused', desc: 'Active skincare ingredients improve your complexion while you wear it' },
      { title: 'Transfer-Resistant', desc: 'Sets to a comfortable finish that won\'t transfer to clothes or masks' },
      { title: 'Blue Light Protection', desc: 'Contains antioxidants that shield skin from digital device blue light' }
    ]
  },
  {
    slug: 'nude-eyeshadow-palette',
    name: 'Nude Eyeshadow Palette',
    description: 'Ten versatile shades for every look',
    price: '$145',
    priceNumeric: 145,
    rating: 5,
    reviews: 298,
    image: '/images/remote/75c1ce0f610a.jpg',
    heroImage: '/images/remote/c3eba2f21b0b.jpg',
    collection: 'Eye Artistry Collection',
    badge: 'NEW',
    category: 'horizontal',
    shortDescription: 'A curated palette of ten versatile nude shades in matte, satin, and shimmer finishes. From subtle everyday looks to dramatic smoky eyes, this palette does it all.',
    fullDescription: [
      'The Nude Eyeshadow Palette is the ultimate neutral palette, featuring ten meticulously curated shades that range from soft ivory to deep espresso.',
      'Each shade is formulated with our proprietary Silk-Touch technology, delivering rich, blendable color that adheres seamlessly to the lids without creasing or fading for up to 16 hours.',
      'The mix of matte, satin, and shimmer finishes allows you to create everything from a natural "no-makeup" look to a sultry evening eye with just one palette.'
    ],
    thumbnailImages: [
      '/images/remote/8332ed61ec25.jpg',
      '/images/remote/34ecc717ec77.jpg',
      '/images/remote/00dce48204c3.jpg',
      '/images/remote/c3eba2f21b0b.jpg',
      '/images/remote/75c1ce0f610a.jpg'
    ],
    sizes: [
      { size: 'Full Size (10 pans)', price: '$145', selected: true, badge: null },
      { size: 'Travel Size (5 pans)', price: '$82', selected: false, badge: null }
    ],
    keyBenefits: [
      '10 versatile nude shades',
      'Matte, satin & shimmer finishes',
      'Up to 16-hour crease-free wear',
      'Highly pigmented & blendable',
      'Includes dual-ended brush',
      'Large mirror included'
    ],
    applicationSteps: [
      { step: '1', instruction: 'Apply an eyeshadow primer to clean lids', timing: 'Essential for longevity' },
      { step: '2', instruction: 'Use a matte shade as your transition color in the crease', timing: null },
      { step: '3', instruction: 'Pack shimmer shades onto the lid with a flat brush', timing: 'Use a pressing motion' },
      { step: '4', instruction: 'Blend edges with a fluffy brush for a seamless finish', timing: 'Blend, blend, blend' }
    ],
    keyIngredients: [
      { name: 'Silk Powder', scientific: 'Hydrolyzed Silk', benefit: 'Creates a silky-smooth texture that blends effortlessly on the lids', concentration: '8%' },
      { name: 'Vitamin E', scientific: 'Tocopherol', benefit: 'Conditions and protects the delicate eye area during wear', concentration: '1%' },
      { name: 'Diamond Powder', scientific: 'Diamond Powder', benefit: 'Ultra-fine particles create multidimensional shimmer and light reflection', concentration: '2%' },
      { name: 'Jojoba Esters', scientific: 'Jojoba Esters', benefit: 'Ensures smooth application and prevents fallout', concentration: '3%' }
    ],
    ingredientsList: 'Talc, Mica, Dimethicone, Hydrolyzed Silk, Tocopherol, Diamond Powder, Jojoba Esters, Caprylic/Capric Triglyceride, Phenoxyethanol, CI 77891, CI 77491, CI 77499, Fragrance',
    expertTips: [
      'Wet your brush for a more intense shimmer payoff',
      'Use the lightest shade as a brow bone highlight',
      'The darkest shade doubles as an eyeliner when applied with an angled brush',
      'Layer shimmer over matte shades for a dimensional, multi-toned effect'
    ],
    specialFeatures: [
      { title: 'Silk-Touch Formula', desc: 'Proprietary technology for ultra-smooth, blendable color that never looks patchy' },
      { title: 'Zero Fallout', desc: 'Advanced pressing technique ensures pigment stays on the lid, not under your eyes' },
      { title: 'Crease-Proof', desc: 'Long-wearing formula resists creasing even in humid conditions' },
      { title: 'Eco-Friendly Palette', desc: 'Bamboo packaging with recyclable metal pans that can be depotted' }
    ]
  },

  // ─── Square Products ────────────────────────────────
  {
    slug: 'silk-touch-concealer',
    name: 'Silk Touch Concealer',
    description: 'Full coverage brightening formula',
    price: '$52',
    priceNumeric: 52,
    rating: 5,
    reviews: 621,
    image: '/images/remote/d6bda3da6218.jpg',
    heroImage: '/images/remote/8332ed61ec25.jpg',
    collection: 'Complexion Perfection',
    shades: ['#FADCC4', '#E8C8B0', '#D4A890', '#B88868', '#9C6848', '#7E5438'],
    category: 'square',
    shortDescription: 'A full-coverage concealer with a brightening effect that erases dark circles, blemishes, and imperfections while looking completely natural on the skin.',
    fullDescription: [
      'The Silk Touch Concealer delivers the coverage of a traditional concealer with the feel of a lightweight serum. The doe-foot applicator allows for precise placement exactly where you need it.',
      'Infused with light-reflecting pigments and caffeine, this concealer not only covers but actively brightens the under-eye area. The crease-proof formula stays smooth for up to 16 hours.',
      'Available in 30 shades across warm, cool, and neutral undertones, with dedicated corrector shades for targeted color correction.'
    ],
    thumbnailImages: [
      '/images/remote/faa8f7a34d25.jpg',
      '/images/remote/83a0156e8e9e.jpg',
      '/images/remote/8332ed61ec25.jpg',
      '/images/remote/75c1ce0f610a.jpg',
      '/images/remote/c3eba2f21b0b.jpg'
    ],
    sizes: [
      { size: '8ml', price: '$52', selected: true, badge: null },
      { size: '15ml', price: '$82', selected: false, badge: 'Best Value' }
    ],
    keyBenefits: [
      '30 shades with undertone options',
      'Full coverage with natural finish',
      'Brightening light-reflect technology',
      'Crease-proof for 16 hours',
      'Infused with caffeine for de-puffing',
      'Works on face and under-eye'
    ],
    applicationSteps: [
      { step: '1', instruction: 'Apply concealer in an inverted triangle under the eye', timing: 'After foundation' },
      { step: '2', instruction: 'Dot onto blemishes or areas that need extra coverage', timing: null },
      { step: '3', instruction: 'Blend with a damp sponge or concealer brush', timing: 'Tap, don\'t swipe' },
      { step: '4', instruction: 'Set with a light dusting of translucent powder', timing: 'Under-eye area only' }
    ],
    keyIngredients: [
      { name: 'Caffeine', scientific: '1,3,7-Trimethylxanthine', benefit: 'Reduces puffiness and dark circles by constricting blood vessels under the eyes', concentration: '3%' },
      { name: 'Light-Reflecting Pigments', scientific: 'Synthetic Fluorophlogopite', benefit: 'Creates a soft-focus effect that optically blurs imperfections', concentration: '5%' },
      { name: 'Hyaluronic Acid', scientific: 'Sodium Hyaluronate', benefit: 'Prevents the concealer from settling into fine lines throughout the day', concentration: '1%' },
      { name: 'Vitamin C', scientific: 'Ascorbyl Glucoside', benefit: 'Gradually brightens the under-eye area with consistent use', concentration: '2%' }
    ],
    ingredientsList: 'Water, Cyclopentasiloxane, Titanium Dioxide, Glycerin, Caffeine, Sodium Hyaluronate, Ascorbyl Glucoside, Synthetic Fluorophlogopite, Dimethicone, Phenoxyethanol, Iron Oxides',
    expertTips: [
      'Use a shade lighter than your foundation for under-eye brightening',
      'Match your skin tone exactly for spot concealing blemishes',
      'Apply after foundation for the most seamless finish',
      'The warmest shades work great for color correcting dark circles'
    ],
    specialFeatures: [
      { title: 'Brightening Complex', desc: 'Caffeine and vitamin C work together to visibly brighten dark circles over time' },
      { title: 'Crease-Proof Lock', desc: 'Unique flexible film technology prevents creasing in fine lines and wrinkles' },
      { title: 'Multi-Use Formula', desc: 'Works as under-eye concealer, spot concealer, and contour/highlight tool' },
      { title: 'Sensitive Skin Safe', desc: 'Ophthalmologist tested and safe for sensitive eyes and contact lens wearers' }
    ]
  },
  {
    slug: 'radiant-blush-duo',
    name: 'Radiant Blush Duo',
    description: 'Buildable color with luminous finish',
    price: '$68',
    priceNumeric: 68,
    rating: 5,
    reviews: 445,
    image: '/images/remote/09be4fda1ead.jpg',
    heroImage: '/images/remote/9d0bdf0ddfcf.jpg',
    collection: 'Cheek Glow Collection',
    category: 'square',
    shortDescription: 'A dual-pan blush compact featuring complementary shades that can be worn alone or blended together for a customized flush of color with a luminous, healthy glow.',
    fullDescription: [
      'The Radiant Blush Duo combines two perfectly paired shades in one sleek compact — a matte base color and a luminous highlight shade that work together to create a multi-dimensional flush.',
      'The ultra-fine powder formula is buildable from a subtle hint of color to a vibrant statement, blending seamlessly into the skin without ever looking powdery or sitting on the surface.',
      'Each duo is thoughtfully curated for different skin tones, ensuring that every shade combination looks naturally beautiful and never ashy or chalky.'
    ],
    thumbnailImages: [
      '/images/remote/1aa04a87ab6f.jpg',
      '/images/remote/09be4fda1ead.jpg',
      '/images/remote/75c1ce0f610a.jpg',
      '/images/remote/8332ed61ec25.jpg',
      '/images/remote/c3eba2f21b0b.jpg'
    ],
    sizes: [
      { size: 'Duo Compact', price: '$68', selected: true, badge: null },
      { size: 'Refill Pan', price: '$38', selected: false, badge: null }
    ],
    keyBenefits: [
      'Two complementary shades in one compact',
      'Matte + luminous finish combination',
      'Ultra-fine, blendable powder formula',
      'Buildable from sheer to vibrant',
      'Suitable for all skin types',
      '8-hour fade-resistant wear'
    ],
    applicationSteps: [
      { step: '1', instruction: 'Smile and apply the matte shade to the apples of your cheeks', timing: 'Use a fluffy blush brush' },
      { step: '2', instruction: 'Sweep upward toward your temples for a lifted effect', timing: null },
      { step: '3', instruction: 'Apply the luminous shade on top of the cheekbones', timing: 'For dimension' },
      { step: '4', instruction: 'Blend the two shades together where they meet', timing: 'Seamless is the goal' }
    ],
    keyIngredients: [
      { name: 'Silk Microspheres', scientific: 'Hydrolyzed Silk', benefit: 'Creates a soft-focus effect that makes skin look airbrushed', concentration: '5%' },
      { name: 'Rose Hip Extract', scientific: 'Rosa Canina', benefit: 'Nourishes and conditions the skin beneath the pigment', concentration: '2%' },
      { name: 'Mica', scientific: 'CI 77019', benefit: 'Provides a natural, light-catching luminosity without chunky glitter', concentration: '8%' },
      { name: 'Vitamin E', scientific: 'Tocopherol', benefit: 'Antioxidant protection that keeps the formula fresh and stable', concentration: '1%' }
    ],
    ingredientsList: 'Talc, Mica, Hydrolyzed Silk, Rosa Canina Fruit Extract, Tocopherol, Dimethicone, Caprylic/Capric Triglyceride, Phenoxyethanol, CI 77891, CI 77491, CI 15850, Fragrance',
    expertTips: [
      'For a cream-to-powder effect, spray your brush with setting spray before picking up the blush',
      'Use the luminous shade alone as a subtle highlighter',
      'Apply before setting powder for a more natural, skin-like finish',
      'Tap off excess powder from your brush to avoid over-application'
    ],
    specialFeatures: [
      { title: 'Duo Design', desc: 'Perfectly paired shades take the guesswork out of creating a dimensional flush' },
      { title: 'Skin-Fusion Technology', desc: 'Powder melts into the skin for a seamless, second-skin finish' },
      { title: 'Refillable Compact', desc: 'Magnetic pans can be replaced individually, reducing waste' },
      { title: 'Clean Pigments', desc: 'Uses only clean, non-toxic pigments that are safe for sensitive skin' }
    ]
  },
  {
    slug: 'glow-highlighter',
    name: 'Glow Highlighter',
    description: 'Multi-dimensional shimmer',
    price: '$58',
    priceNumeric: 58,
    rating: 5,
    reviews: 789,
    image: '/images/remote/8e7cdb4e3135.jpg',
    heroImage: '/images/remote/00dce48204c3.jpg',
    collection: 'Glow Collection',
    category: 'square',
    shortDescription: 'A multi-dimensional powder highlighter that catches and reflects light for a natural, lit-from-within glow. Buildable from a subtle sheen to a blinding highlight.',
    fullDescription: [
      'The Glow Highlighter is our most-loved complexion product, delivering a breathtaking luminosity that looks like natural, radiant skin rather than a stripe of shimmer.',
      'Formulated with micro-milled particles in varying sizes, this highlighter creates a multi-dimensional light effect that moves with you — catching light from every angle.',
      'The baked formula means each pan is unique, with a marbled pattern that\'s as beautiful to look at as it is to wear. The silky-smooth texture melts onto the skin for a truly seamless glow.'
    ],
    thumbnailImages: [
      '/images/remote/c3eba2f21b0b.jpg',
      '/images/remote/75c1ce0f610a.jpg',
      '/images/remote/d6bda3da6218.jpg',
      '/images/remote/8332ed61ec25.jpg',
      '/images/remote/0c470a657c15.jpg'
    ],
    sizes: [
      { size: '8g', price: '$58', selected: true, badge: null },
      { size: '12g', price: '$78', selected: false, badge: 'Best Value' }
    ],
    keyBenefits: [
      'Multi-dimensional light reflection',
      'Buildable from subtle to blinding',
      'No visible glitter particles',
      'Works on face, body & décolletage',
      'Baked formula for extra smoothness',
      'Pairs beautifully with all skin tones'
    ],
    applicationSteps: [
      { step: '1', instruction: 'Apply to the high points of your face where light naturally hits', timing: 'Cheekbones, nose bridge, cupid\'s bow' },
      { step: '2', instruction: 'Use a fan brush for a diffused glow or a tapered brush for intensity', timing: null },
      { step: '3', instruction: 'Lightly sweep across collarbones and shoulders for a body glow', timing: 'Perfect for evening' },
      { step: '4', instruction: 'Layer over or under foundation for different effects', timing: 'Under = lit-from-within' }
    ],
    keyIngredients: [
      { name: 'Pearl Powder', scientific: 'Conchiolin Powder', benefit: 'Natural pearl extract creates an ethereal, skin-like glow that mimics youthful radiance', concentration: '5%' },
      { name: 'Micro-Milled Mica', scientific: 'CI 77019', benefit: 'Ultra-fine particles ensure a smooth, non-gritty finish with maximum light reflection', concentration: '15%' },
      { name: 'Rose Quartz Powder', scientific: 'Silica', benefit: 'Adds a subtle warm pink undertone that flatters all skin tones', concentration: '3%' },
      { name: 'Coconut Oil', scientific: 'Cocos Nucifera', benefit: 'Provides a smooth, creamy texture that melts into the skin seamlessly', concentration: '2%' }
    ],
    ingredientsList: 'Talc, Mica, Conchiolin Powder, Silica, Cocos Nucifera Oil, Dimethicone, Tocopherol, Caprylic/Capric Triglyceride, Phenoxyethanol, CI 77891, CI 77019, Tin Oxide, Fragrance',
    expertTips: [
      'Apply with a wet brush for an intense, foil-like finish',
      'Mix a small amount with body lotion for an all-over body glow',
      'Dab onto the inner corners of the eyes to make them look bigger and brighter',
      'Use as an eyeshadow topper for extra dimension on the lids'
    ],
    specialFeatures: [
      { title: 'Baked Italian Formula', desc: 'Each pan is baked on terracotta tiles for 24 hours, creating a uniquely smooth and luminous texture' },
      { title: 'No Chunky Glitter', desc: 'Micro-milled particles ensure a refined, sophisticated glow without any visible sparkle pieces' },
      { title: 'Multi-Use Versatility', desc: 'Works as a face highlighter, eyeshadow topper, body luminizer, and mixing medium' },
      { title: 'Universally Flattering', desc: 'The multi-toned marbled formula adapts to complement every skin tone beautifully' }
    ]
  },

  // ─── Rectangular Products ────────────────────────────
  {
    slug: 'complete-makeup-artist-set',
    name: 'Complete Makeup Artist Set',
    description: 'Professional collection with face, eyes, and lips essentials for flawless artistry',
    price: '$395',
    priceNumeric: 395,
    rating: 5,
    reviews: 203,
    image: '/images/remote/f2c18d05be14.jpg',
    heroImage: '/images/remote/651bed8c8afe.jpg',
    collection: 'Professional Collection',
    badge: 'LIMITED EDITION',
    category: 'rectangular',
    shortDescription: 'The ultimate professional makeup collection featuring our most iconic face, eye, and lip products. Everything a makeup artist needs in one luxurious set, saving 30% versus individual purchase.',
    fullDescription: [
      'The Complete Makeup Artist Set is the definitive collection for beauty professionals and enthusiasts alike. This meticulously curated set includes our best-selling foundation, concealer, eyeshadow palette, blush duo, highlighter, and three lipstick shades.',
      'Each product in the set has been selected to work harmoniously together, ensuring a cohesive and professional result every time. The set comes in a custom-designed luxury case with magnetic closures.',
      'Whether you\'re a professional makeup artist building your kit or a beauty lover who wants the complete Shan Loray experience, this set delivers exceptional value at 30% off the individual retail price.'
    ],
    thumbnailImages: [
      '/images/remote/75c1ce0f610a.jpg',
      '/images/remote/c3eba2f21b0b.jpg',
      '/images/remote/d6bda3da6218.jpg',
      '/images/remote/8332ed61ec25.jpg',
      '/images/remote/e9ecdbb6aaef.jpg'
    ],
    sizes: [
      { size: 'Complete Set', price: '$395', selected: true, badge: 'Save 30%' },
      { size: 'Essentials Set', price: '$245', selected: false, badge: null }
    ],
    keyBenefits: [
      'Complete face, eye & lip collection',
      'Save 30% vs individual purchase',
      'Professional-grade quality products',
      'Luxury presentation case included',
      'All products work harmoniously together',
      'Perfect gift for makeup lovers'
    ],
    applicationSteps: [
      { step: '1', instruction: 'Start with foundation and concealer for a flawless base', timing: 'Complexion first' },
      { step: '2', instruction: 'Add dimension with blush and highlighter on the cheeks', timing: null },
      { step: '3', instruction: 'Create your eye look using the eyeshadow palette', timing: 'Endless possibilities' },
      { step: '4', instruction: 'Complete the look with your choice of lipstick shade', timing: 'The finishing touch' }
    ],
    keyIngredients: [
      { name: 'Multi-Product Complex', scientific: 'Various', benefit: 'Each product features its own targeted formula — see individual products for details', concentration: 'Varies' },
      { name: 'Vitamin E Complex', scientific: 'Tocopherol', benefit: 'Present across all products for antioxidant protection and formula stability', concentration: '1-2%' },
      { name: 'Hyaluronic Acid', scientific: 'Sodium Hyaluronate', benefit: 'Included in base products for hydration that lasts throughout the day', concentration: '1%' },
      { name: 'Natural Pigments', scientific: 'Various CI Numbers', benefit: 'Clean, highly pigmented colors that deliver true-to-pan payoff', concentration: 'Varies' }
    ],
    ingredientsList: 'See individual product pages for complete ingredient listings of each included product',
    expertTips: [
      'Follow the numbered application order for the most professional-looking result',
      'The foundation and concealer shades in this set are designed to work together',
      'Use the eyeshadow palette to create at least 20 different eye looks',
      'This set makes an incredible gift for weddings, birthdays, or holidays'
    ],
    specialFeatures: [
      { title: 'Curated Collection', desc: 'Every product is hand-selected to work in perfect harmony with the others' },
      { title: 'Professional Case', desc: 'Custom-designed luxury case with magnetic closures and built-in mirror' },
      { title: 'Exceptional Value', desc: 'Save 30% compared to purchasing each product separately' },
      { title: 'Gift Ready', desc: 'Arrives in signature gift packaging with a personalization option' }
    ]
  },
  {
    slug: 'travel-glam-collection',
    name: 'Travel Glam Collection',
    description: 'Your complete makeup routine in luxurious travel-friendly sizes',
    price: '$185',
    priceNumeric: 185,
    rating: 5,
    reviews: 167,
    image: '/images/remote/85194cecef30.jpg',
    heroImage: '/images/remote/4ad7a1397422.jpg',
    collection: 'Travel Collection',
    category: 'rectangular',
    shortDescription: 'A perfectly curated travel-size collection that ensures you never compromise on beauty while on the go. Includes mini versions of our best-selling makeup essentials in a chic travel pouch.',
    fullDescription: [
      'The Travel Glam Collection proves that luxury doesn\'t have to stay at home. This thoughtfully curated set includes travel-size versions of our most essential makeup products, all perfectly sized to comply with airline regulations.',
      'From a mini foundation and concealer to a travel eyeshadow quad and two lipstick minis, this collection has everything you need for a complete makeup look while traveling.',
      'The set comes in an elegant vegan leather travel pouch with individual compartments to keep everything organized and protected during transit.'
    ],
    thumbnailImages: [
      '/images/remote/a87a243c1f49.jpg',
      '/images/remote/e6005a77cb30.jpg',
      '/images/remote/377524dcab3b.jpg',
      '/images/remote/fb78e59ef955.jpg',
      '/images/remote/0e4f0530e857.jpg'
    ],
    sizes: [
      { size: 'Complete Travel Set', price: '$185', selected: true, badge: null },
      { size: 'Mini Essentials', price: '$110', selected: false, badge: null }
    ],
    keyBenefits: [
      'TSA/airline compliant sizes',
      'Complete makeup routine in one set',
      'Luxury vegan leather travel pouch',
      'Perfect for weekends & vacations',
      'Try before committing to full sizes',
      'Great value for first-time buyers'
    ],
    applicationSteps: [
      { step: '1', instruction: 'Apply the mini foundation with fingertips for a quick, natural base', timing: 'Perfect for on-the-go' },
      { step: '2', instruction: 'Conceal any imperfections with the mini concealer', timing: null },
      { step: '3', instruction: 'Use the eyeshadow quad for a quick eye look', timing: 'Two shades are enough' },
      { step: '4', instruction: 'Finish with a swipe of mini lipstick', timing: 'Instant polish' }
    ],
    keyIngredients: [
      { name: 'Travel-Stable Formulas', scientific: 'Various', benefit: 'All products are formulated to remain stable across temperature and humidity changes', concentration: 'Varies' },
      { name: 'Vitamin E', scientific: 'Tocopherol', benefit: 'Preserves formula integrity and provides skin conditioning benefits', concentration: '1%' },
      { name: 'Jojoba Oil', scientific: 'Simmondsia Chinensis', benefit: 'Present in lip products for comfortable, non-drying wear during travel', concentration: '3%' },
      { name: 'Hyaluronic Acid', scientific: 'Sodium Hyaluronate', benefit: 'Keeps skin hydrated even in dry airplane cabins', concentration: '1%' }
    ],
    ingredientsList: 'See individual product pages for complete ingredient listings. All travel sizes contain the same formulas as full-size products.',
    expertTips: [
      'The travel pouch doubles as a cute clutch for evenings out',
      'These sizes are perfect for trying products before committing to full sizes',
      'Keep one set in your gym bag or desk drawer for touch-ups',
      'The mini lipsticks fit perfectly in even the smallest evening bags'
    ],
    specialFeatures: [
      { title: 'Travel Optimized', desc: 'Every product meets international airline liquid and size regulations' },
      { title: 'Same Full-Size Formulas', desc: 'Mini sizes contain the exact same formulas — no compromises in quality' },
      { title: 'Luxury Travel Pouch', desc: 'Vegan leather pouch with individual slots keeps everything organized and protected' },
      { title: 'Discovery Set', desc: 'Perfect for trying the Shan Loray range before investing in full sizes' }
    ]
  }
];

export function getMakeupProductBySlug(slug: string): MakeupProduct | undefined {
  return makeupProducts.find(p => p.slug === slug);
}

export function getAllMakeupSlugs(): string[] {
  return makeupProducts.map(p => p.slug);
}




