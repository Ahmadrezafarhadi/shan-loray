// data/products.ts

export interface Product {
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
}

export const products: Product[] = [
  {
    slug: 'botanical-renewal-serum',
    name: 'Botanical Renewal Serum',
    description: 'Advanced age-defying formula',
    price: '$185',
    priceNumeric: 185,
    rating: 5,
    reviews: 248,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=360&h=360&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1160&h=1360&fit=crop',
    collection: 'Advanced Skincare Collection',
    shortDescription: 'A revolutionary peptide-rich formula that visibly reduces fine lines and wrinkles while boosting skin\'s natural collagen production. Experience transformative results with our most potent anti-aging serum.',
    fullDescription: [
      'Our Botanical Renewal Serum represents the pinnacle of skincare science, combining cutting-edge peptide technology with time-tested botanical extracts. This luxurious formula penetrates deeply into the skin\'s layers to target multiple signs of aging simultaneously.',
      'Developed in collaboration with leading dermatologists and backed by clinical studies, this powerful serum delivers visible results within just four weeks of consistent use.',
      'Suitable for all skin types, this transformative formula is particularly effective for mature skin showing signs of aging. Free from parabens, sulfates, and synthetic fragrances.'
    ],
    thumbnailImages: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=212&h=212&fit=crop',
      'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=212&h=212&fit=crop',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=212&h=212&fit=crop',
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=212&h=212&fit=crop',
      'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=212&h=212&fit=crop'
    ],
    sizes: [
      { size: '30ml', price: '$185', selected: true, badge: null },
      { size: '50ml', price: '$280', selected: false, badge: 'Best Value' },
      { size: '100ml', price: '$480', selected: false, badge: null }
    ],
    keyBenefits: [
      'Reduces fine lines by 47% in 4 weeks',
      'Boosts collagen production naturally',
      'Improves skin elasticity and firmness',
      'Hydrates deeply for 24-hour moisture',
      'Brightens and evens skin tone',
      'Minimizes appearance of pores'
    ],
    applicationSteps: [
      { step: '1', instruction: 'Cleanse and tone your face thoroughly', timing: 'Morning & Evening' },
      { step: '2', instruction: 'Apply 3-4 drops to fingertips and warm between hands', timing: null },
      { step: '3', instruction: 'Gently press into face, neck, and décolletage', timing: 'Use upward motions' },
      { step: '4', instruction: 'Follow with your favorite moisturizer', timing: 'Allow 60 seconds to absorb' }
    ],
    keyIngredients: [
      { name: 'Palmitoyl Tripeptide-38', scientific: 'Matrixyl synthe\'6', benefit: 'Stimulates six major components of the skin matrix for comprehensive anti-aging benefits', concentration: '8%' },
      { name: 'Hyaluronic Acid Complex', scientific: 'Sodium Hyaluronate', benefit: 'Multi-molecular weight formula provides deep and surface hydration', concentration: '2%' },
      { name: 'Niacinamide', scientific: 'Vitamin B3', benefit: 'Improves skin barrier function and reduces inflammation', concentration: '5%' },
      { name: 'Retinol Encapsulate', scientific: 'Microencapsulated Retinol', benefit: 'Time-released delivery minimizes irritation while maximizing efficacy', concentration: '0.5%' }
    ],
    ingredientsList: 'Water, Palmitoyl Tripeptide-38, Glycerin, Sodium Hyaluronate, Niacinamide, Butylene Glycol, Retinol, Polysorbate 20, Carbomer, Phenoxyethanol, Caprylyl Glycol, Disodium EDTA, Tocopherol, Green Tea Extract, Resveratrol, Ascorbyl Glucoside',
    expertTips: [
      'For best results, use consistently twice daily for at least 4 weeks',
      'Always apply to damp skin for enhanced absorption',
      'Layer under SPF during daytime use to protect your investment',
      'Store in a cool, dry place away from direct sunlight'
    ],
    specialFeatures: [
      { title: 'Advanced Peptide Complex', desc: 'Proprietary blend of six different peptides works synergistically to boost collagen and elastin production' },
      { title: 'Botanical Antioxidants', desc: 'Green tea, vitamin C, and resveratrol protect against environmental damage and free radicals' },
      { title: 'Time-Release Technology', desc: 'Microencapsulation ensures active ingredients are delivered gradually for maximum efficacy' },
      { title: 'Clinically Proven', desc: 'Backed by independent clinical studies showing significant improvement in skin firmness and texture' }
    ]
  },
  {
    slug: 'hydrating-face-cleanser',
    name: 'Hydrating Face Cleanser',
    description: 'Gentle foaming gel cleanser',
    price: '$58',
    priceNumeric: 58,
    rating: 5,
    reviews: 312,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=360&h=360&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1160&h=1360&fit=crop',
    collection: 'Daily Essentials Collection',
    shortDescription: 'A gentle yet effective foaming cleanser that removes impurities without stripping skin of its natural moisture. Infused with botanical extracts for a refreshing cleanse.',
    fullDescription: [
      'Our Hydrating Face Cleanser is designed to deliver a thorough yet gentle cleanse that respects your skin\'s natural barrier.',
      'Formulated with a blend of amino acid-based surfactants, this cleanser creates a luxurious foam that effortlessly dissolves makeup, sunscreen, and daily impurities.',
      'Perfect for all skin types, especially those with dry or sensitive skin looking for a cleanser that won\'t leave their skin feeling tight or stripped.'
    ],
    thumbnailImages: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=212&h=212&fit=crop',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=212&h=212&fit=crop',
      'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=212&h=212&fit=crop',
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=212&h=212&fit=crop',
      'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=212&h=212&fit=crop'
    ],
    sizes: [
      { size: '150ml', price: '$58', selected: true, badge: null },
      { size: '250ml', price: '$88', selected: false, badge: 'Best Value' },
      { size: '400ml', price: '$125', selected: false, badge: null }
    ],
    keyBenefits: [
      'Removes 99% of impurities gently',
      'Maintains skin\'s natural moisture barrier',
      'Soothes and calms sensitive skin',
      'pH-balanced formula (5.5)',
      'Leaves skin feeling soft and hydrated',
      'Suitable for morning and evening use'
    ],
    applicationSteps: [
      { step: '1', instruction: 'Wet your face with lukewarm water', timing: 'Morning & Evening' },
      { step: '2', instruction: 'Pump a small amount into hands and create a lather', timing: null },
      { step: '3', instruction: 'Massage gently onto face in circular motions', timing: '30-60 seconds' },
      { step: '4', instruction: 'Rinse thoroughly and pat dry', timing: 'Follow with toner' }
    ],
    keyIngredients: [
      { name: 'Centella Asiatica', scientific: 'Cica Extract', benefit: 'Soothes and repairs the skin barrier while reducing redness', concentration: '3%' },
      { name: 'Ceramide Complex', scientific: 'Ceramide NP, AP, EOP', benefit: 'Strengthens the skin barrier and locks in moisture', concentration: '1%' },
      { name: 'Aloe Vera', scientific: 'Aloe Barbadensis', benefit: 'Provides natural hydration and calming properties', concentration: '5%' },
      { name: 'Green Tea Extract', scientific: 'Camellia Sinensis', benefit: 'Rich in antioxidants to protect against environmental damage', concentration: '2%' }
    ],
    ingredientsList: 'Water, Cocamidopropyl Betaine, Glycerin, Centella Asiatica Extract, Ceramide NP, Aloe Barbadensis Leaf Juice, Camellia Sinensis Leaf Extract, Sodium Cocoyl Isethionate, Phenoxyethanol, Citric Acid',
    expertTips: [
      'Use lukewarm water — hot water can strip natural oils',
      'Double cleanse in the evening for thorough removal of sunscreen and makeup',
      'Pat dry instead of rubbing to minimize irritation',
      'Follow immediately with toner while skin is still slightly damp'
    ],
    specialFeatures: [
      { title: 'Amino Acid Surfactants', desc: 'Gentle cleansing agents derived from amino acids that cleanse without disrupting the skin barrier' },
      { title: 'pH-Balanced Formula', desc: 'Maintains the skin\'s ideal pH of 5.5 for optimal barrier function' },
      { title: 'Botanical Infusion', desc: 'Enriched with soothing botanicals including chamomile and green tea' },
      { title: 'Dermatologist Tested', desc: 'Tested and approved for sensitive skin by board-certified dermatologists' }
    ]
  },
  {
    slug: 'radiant-eye-complex',
    name: 'Radiant Eye Complex',
    description: 'Reduces dark circles & puffiness',
    price: '$145',
    priceNumeric: 145,
    rating: 5,
    reviews: 189,
    image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=360&h=360&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=1160&h=1360&fit=crop',
    collection: 'Advanced Skincare Collection',
    shortDescription: 'A targeted eye treatment that visibly reduces dark circles, puffiness, and fine lines around the delicate eye area. Formulated with caffeine and peptides.',
    fullDescription: [
      'The Radiant Eye Complex is specifically designed for the delicate skin around the eyes, addressing the most common concerns including dark circles, puffiness, and crow\'s feet.',
      'Our advanced formula combines caffeine for de-puffing, vitamin K for dark circles, and peptides for wrinkle reduction in one powerful treatment.',
      'The lightweight gel-cream texture absorbs instantly without migrating into the eyes, making it perfect for use under concealer and throughout the day.'
    ],
    thumbnailImages: [
      'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=212&h=212&fit=crop',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=212&h=212&fit=crop',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=212&h=212&fit=crop',
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=212&h=212&fit=crop',
      'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=212&h=212&fit=crop'
    ],
    sizes: [
      { size: '15ml', price: '$145', selected: true, badge: null },
      { size: '30ml', price: '$240', selected: false, badge: 'Best Value' }
    ],
    keyBenefits: [
      'Reduces dark circles by 60% in 6 weeks',
      'Minimizes under-eye puffiness',
      'Smooths fine lines and crow\'s feet',
      'Firms and tightens eye area skin',
      'Hydrates without causing milia',
      'Works under makeup seamlessly'
    ],
    applicationSteps: [
      { step: '1', instruction: 'Cleanse and apply your serum first', timing: 'Morning & Evening' },
      { step: '2', instruction: 'Dispense a pea-sized amount on ring finger', timing: null },
      { step: '3', instruction: 'Gently tap around the orbital bone', timing: 'Never pull or drag' },
      { step: '4', instruction: 'Allow to absorb before applying moisturizer', timing: 'Wait 30 seconds' }
    ],
    keyIngredients: [
      { name: 'Caffeine', scientific: '1,3,7-Trimethylxanthine', benefit: 'Constricts blood vessels to reduce puffiness and dark circles', concentration: '5%' },
      { name: 'Vitamin K Complex', scientific: 'Phytonadione', benefit: 'Helps reduce the appearance of dark circles by supporting healthy blood circulation', concentration: '1%' },
      { name: 'Matrixyl 3000', scientific: 'Palmitoyl Tetrapeptide-7', benefit: 'Stimulates collagen production to smooth fine lines around the eyes', concentration: '4%' },
      { name: 'Squalane', scientific: 'Hydrogenated Polyisobutene', benefit: 'Provides lightweight, non-comedogenic moisture perfect for the eye area', concentration: '3%' }
    ],
    ingredientsList: 'Water, Caffeine, Squalane, Palmitoyl Tetrapeptide-7, Phytonadione, Glycerin, Dimethicone, Sodium Hyaluronate, Phenoxyethanol, Carbomer, Tocopherol',
    expertTips: [
      'Use your ring finger — it applies the least pressure',
      'Store in the fridge for an extra de-puffing effect',
      'Apply to the orbital bone, not directly on the eyelid',
      'Use morning and night for best results'
    ],
    specialFeatures: [
      { title: 'Cooling Application', desc: 'Ceramic applicator tip provides a cooling effect that helps reduce puffiness on contact' },
      { title: 'Ophthalmologist Tested', desc: 'Safe for use around the eyes and for contact lens wearers' },
      { title: 'Multi-Action Formula', desc: 'Addresses dark circles, puffiness, and wrinkles in one product' },
      { title: 'Fast Absorbing', desc: 'Lightweight gel-cream texture absorbs in seconds without residue' }
    ]
  },
  {
    slug: 'supreme-moisture-cream',
    name: 'Supreme Moisture Cream',
    description: '24-hour deep hydration',
    price: '$165',
    priceNumeric: 165,
    rating: 5,
    reviews: 421,
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=360&h=360&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=1160&h=1360&fit=crop',
    collection: 'Hydration Collection',
    shortDescription: 'An ultra-rich moisturizer that provides 24-hour deep hydration while strengthening the skin barrier. Perfect for dry and mature skin types.',
    fullDescription: [
      'Our Supreme Moisture Cream is the ultimate in deep hydration, designed for skin that craves lasting moisture and nourishment.',
      'Infused with a triple ceramide complex and hyaluronic acid at three molecular weights, this cream delivers hydration at every level of the skin.',
      'The rich yet non-greasy texture melts into skin, creating a protective barrier that locks in moisture for a full 24 hours.'
    ],
    thumbnailImages: [
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=212&h=212&fit=crop',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=212&h=212&fit=crop',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=212&h=212&fit=crop',
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=212&h=212&fit=crop',
      'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=212&h=212&fit=crop'
    ],
    sizes: [
      { size: '30ml', price: '$165', selected: true, badge: null },
      { size: '50ml', price: '$245', selected: false, badge: 'Best Value' },
      { size: '75ml', price: '$340', selected: false, badge: null }
    ],
    keyBenefits: [
      'Provides 24-hour deep hydration',
      'Strengthens skin barrier with ceramides',
      'Reduces trans-epidermal water loss',
      'Plumps and firms the skin',
      'Non-greasy, luxurious texture',
      'Suitable for day and night use'
    ],
    applicationSteps: [
      { step: '1', instruction: 'Apply after cleansing and serum', timing: 'Morning & Evening' },
      { step: '2', instruction: 'Scoop a pearl-sized amount with the spatula provided', timing: null },
      { step: '3', instruction: 'Warm between palms and press into skin', timing: 'Use gentle pressing motions' },
      { step: '4', instruction: 'Extend to neck and décolletage', timing: 'Don\'t forget these areas' }
    ],
    keyIngredients: [
      { name: 'Triple Ceramide Complex', scientific: 'Ceramide NP, AP, EOP', benefit: 'Restores and strengthens the skin\'s natural barrier for lasting protection', concentration: '3%' },
      { name: 'Hyaluronic Acid (3 weights)', scientific: 'Sodium Hyaluronate', benefit: 'Delivers hydration at surface, mid, and deep levels of the skin', concentration: '2%' },
      { name: 'Shea Butter', scientific: 'Butyrospermum Parkii', benefit: 'Rich in fatty acids and vitamins for deep nourishment', concentration: '10%' },
      { name: 'Squalane', scientific: 'Hydrogenated Polyisobutene', benefit: 'Mimics skin\'s natural oils for seamless moisture delivery', concentration: '5%' }
    ],
    ingredientsList: 'Water, Butyrospermum Parkii Butter, Squalane, Glycerin, Ceramide NP, Ceramide AP, Ceramide EOP, Sodium Hyaluronate, Dimethicone, Cetearyl Alcohol, Phenoxyethanol, Tocopherol, Cholesterol',
    expertTips: [
      'Apply to slightly damp skin to lock in extra moisture',
      'Use as an overnight mask by applying a thicker layer before bed',
      'Mix a small amount with foundation for a dewy finish',
      'Keep the jar closed tightly to maintain product integrity'
    ],
    specialFeatures: [
      { title: 'Triple Barrier Technology', desc: 'Three types of ceramides work together to rebuild and maintain the skin\'s protective barrier' },
      { title: 'Multi-Depth Hydration', desc: 'Three molecular weights of hyaluronic acid hydrate at every level of the skin' },
      { title: 'Clean Formulation', desc: 'Free from parabens, mineral oil, and synthetic fragrances' },
      { title: 'Clinically Tested', desc: '98% of users reported improved hydration after 2 weeks of use' }
    ]
  },
  {
    slug: 'brightening-face-mask',
    name: 'Brightening Face Mask',
    description: 'Illuminating overnight treatment',
    price: '$88',
    priceNumeric: 88,
    rating: 5,
    reviews: 267,
    image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=360&h=360&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=1160&h=1360&fit=crop',
    collection: 'Brightening Collection',
    shortDescription: 'An overnight illuminating mask that works while you sleep to brighten, even skin tone, and reveal radiant skin by morning.',
    fullDescription: [
      'Wake up to visibly brighter, more radiant skin with our Brightening Face Mask, an overnight treatment that transforms dull, uneven skin.',
      'Powered by a potent blend of vitamin C, alpha arbutin, and tranexamic acid, this mask targets dark spots and hyperpigmentation while you sleep.',
      'The silky gel texture creates a breathable film that delivers active ingredients throughout the night without transferring to your pillow.'
    ],
    thumbnailImages: [
      'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=212&h=212&fit=crop',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=212&h=212&fit=crop',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=212&h=212&fit=crop',
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=212&h=212&fit=crop',
      'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=212&h=212&fit=crop'
    ],
    sizes: [
      { size: '50ml', price: '$88', selected: true, badge: null },
      { size: '100ml', price: '$150', selected: false, badge: 'Best Value' }
    ],
    keyBenefits: [
      'Brightens skin tone overnight',
      'Fades dark spots and hyperpigmentation',
      'Evens out skin tone',
      'Provides antioxidant protection',
      'Non-transferable gel formula',
      'Visible results in 7 days'
    ],
    applicationSteps: [
      { step: '1', instruction: 'Apply as the last step in your evening routine', timing: 'Evening only' },
      { step: '2', instruction: 'Apply a thin, even layer to clean, dry skin', timing: null },
      { step: '3', instruction: 'Allow 2-3 minutes to set before bed', timing: 'Will not transfer' },
      { step: '4', instruction: 'Rinse off in the morning and follow with SPF', timing: 'SPF is essential' }
    ],
    keyIngredients: [
      { name: 'Vitamin C', scientific: 'Ascorbyl Glucoside', benefit: 'Stable form of vitamin C that brightens and provides antioxidant protection', concentration: '10%' },
      { name: 'Alpha Arbutin', scientific: '4-Hydroxyphenyl α-D-glucopyranoside', benefit: 'Inhibits melanin production to fade dark spots and prevent new ones', concentration: '2%' },
      { name: 'Tranexamic Acid', scientific: 'Trans-4-aminomethylcyclohexane', benefit: 'Reduces hyperpigmentation and evens skin tone', concentration: '3%' },
      { name: 'Licorice Root', scientific: 'Glycyrrhiza Glabra', benefit: 'Natural brightening agent that soothes and calms the skin', concentration: '2%' }
    ],
    ingredientsList: 'Water, Ascorbyl Glucoside, Alpha Arbutin, Tranexamic Acid, Glycyrrhiza Glabra Root Extract, Glycerin, Niacinamide, Carbomer, Phenoxyethanol, Sodium Hydroxide, Tocopherol',
    expertTips: [
      'Always follow with SPF in the morning — brightening ingredients increase sun sensitivity',
      'Use 3-4 times per week for best results',
      'Can be used as a 15-minute wash-off mask for a quick brightening boost',
      'Pair with our Botanical Renewal Serum for enhanced anti-aging benefits'
    ],
    specialFeatures: [
      { title: 'Overnight Active Delivery', desc: 'Gel matrix slowly releases active ingredients throughout the 8-hour sleep cycle' },
      { title: 'No-Transfer Formula', desc: 'Sets to a breathable film that won\'t stain pillowcases' },
      { title: 'Triple Brightening Complex', desc: 'Three clinically proven brightening agents work synergistically' },
      { title: 'Gentle Formula', desc: 'Suitable for sensitive skin — no AHAs or harsh exfoliants' }
    ]
  },
  {
    slug: 'daily-defense-spf-50',
    name: 'Daily Defense SPF 50',
    description: 'Broad spectrum protection',
    price: '$72',
    priceNumeric: 72,
    rating: 5,
    reviews: 534,
    image: '/images/Shop/Defense.jpeg',
    heroImage: '/images/Shop/Defense.jpeg',
    collection: 'Sun Protection Collection',
    shortDescription: 'A lightweight, invisible sunscreen that provides broad spectrum SPF 50 protection while hydrating and priming skin for makeup.',
    fullDescription: [
      'Our Daily Defense SPF 50 redefines what sun protection can be. This weightless formula provides the highest level of broad spectrum protection while feeling like a luxurious moisturizer.',
      'No white cast, no heavy feeling, no pilling — just invisible protection that works beautifully under makeup or on its own.',
      'Enriched with antioxidants and hydrating ingredients, this sunscreen actively cares for your skin while shielding it from UVA and UVB rays.'
    ],
    thumbnailImages: [
      '/images/Shop/Defense.jpeg',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=212&h=212&fit=crop',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=212&h=212&fit=crop',
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=212&h=212&fit=crop',
      'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=212&h=212&fit=crop'
    ],
    sizes: [
      { size: '30ml', price: '$72', selected: true, badge: null },
      { size: '50ml', price: '$98', selected: false, badge: 'Best Value' }
    ],
    keyBenefits: [
      'SPF 50 broad spectrum UVA/UVB protection',
      'Zero white cast on all skin tones',
      'Lightweight, invisible finish',
      'Works as a makeup primer',
      'Hydrates while protecting',
      'Water-resistant for 80 minutes'
    ],
    applicationSteps: [
      { step: '1', instruction: 'Apply as the last step of your morning skincare', timing: 'Morning only' },
      { step: '2', instruction: 'Use two finger-lengths of product', timing: 'Generous application is key' },
      { step: '3', instruction: 'Apply evenly to face, neck, and ears', timing: null },
      { step: '4', instruction: 'Reapply every 2 hours when outdoors', timing: 'Or after swimming/sweating' }
    ],
    keyIngredients: [
      { name: 'Zinc Oxide', scientific: 'ZnO', benefit: 'Mineral UV filter providing broad spectrum protection without irritation', concentration: '15%' },
      { name: 'Niacinamide', scientific: 'Vitamin B3', benefit: 'Strengthens skin barrier and helps prevent sun-induced pigmentation', concentration: '3%' },
      { name: 'Vitamin E', scientific: 'Tocopherol', benefit: 'Powerful antioxidant that enhances sun protection and fights free radicals', concentration: '1%' },
      { name: 'Hyaluronic Acid', scientific: 'Sodium Hyaluronate', benefit: 'Provides lightweight hydration without heaviness', concentration: '1%' }
    ],
    ingredientsList: 'Zinc Oxide 15%, Water, Cyclopentasiloxane, Niacinamide, Glycerin, Sodium Hyaluronate, Tocopherol, Titanium Dioxide, Dimethicone, Phenoxyethanol, Iron Oxides',
    expertTips: [
      'Apply generously — most people use too little sunscreen',
      'Wait 15 minutes before sun exposure for the formula to set',
      'Reapply throughout the day, even indoors near windows',
      'Use year-round, not just in summer'
    ],
    specialFeatures: [
      { title: 'Invisible Protection', desc: 'Advanced micro-encapsulation technology ensures zero white cast on all skin tones' },
      { title: 'Hybrid Formula', desc: 'Combines the best of mineral and chemical filters for superior protection' },
      { title: 'Makeup Friendly', desc: 'Creates the perfect canvas for makeup application — no pilling or separation' },
      { title: 'Reef Safe', desc: 'Formulated without oxybenzone and octinoxate to protect marine ecosystems' }
    ]
  },
  {
    slug: 'essential-skincare-set',
    name: 'Essential Skincare Set',
    description: 'Complete 4-step routine',
    price: '$380',
    priceNumeric: 380,
    rating: 5,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=360&h=360&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1160&h=1360&fit=crop',
    collection: 'Gift Sets Collection',
    shortDescription: 'Everything you need for a complete luxury skincare routine. Includes cleanser, serum, moisturizer, and eye cream at a special set price.',
    fullDescription: [
      'The Essential Skincare Set brings together four of our most beloved products in one beautifully curated collection.',
      'Designed to work synergistically, this complete routine takes the guesswork out of skincare while delivering professional-grade results at home.',
      'Save 20% compared to purchasing each product individually, all presented in our signature gift packaging.'
    ],
    thumbnailImages: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=212&h=212&fit=crop',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=212&h=212&fit=crop',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=212&h=212&fit=crop',
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=212&h=212&fit=crop',
      'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=212&h=212&fit=crop'
    ],
    sizes: [
      { size: 'Standard', price: '$380', selected: true, badge: 'Save 20%' },
      { size: 'Deluxe', price: '$520', selected: false, badge: 'Full Sizes' }
    ],
    keyBenefits: [
      'Complete 4-step skincare routine',
      'Products work synergistically together',
      'Save 20% vs individual purchase',
      'Perfect gift for skincare lovers',
      'Suitable for all skin types',
      'Includes luxury gift packaging'
    ],
    applicationSteps: [
      { step: '1', instruction: 'Cleanse with the Hydrating Face Cleanser', timing: 'Morning & Evening' },
      { step: '2', instruction: 'Apply 3-4 drops of the Botanical Renewal Serum', timing: null },
      { step: '3', instruction: 'Gently pat Radiant Eye Complex around the eye area', timing: 'Use ring finger' },
      { step: '4', instruction: 'Finish with the Supreme Moisture Cream', timing: 'Lock everything in' }
    ],
    keyIngredients: [
      { name: 'Peptide Complex', scientific: 'Multiple Peptides', benefit: 'Found in the serum, stimulates collagen for anti-aging benefits', concentration: '8%' },
      { name: 'Ceramide Blend', scientific: 'Ceramide NP, AP, EOP', benefit: 'In the moisturizer, strengthens and repairs the skin barrier', concentration: '3%' },
      { name: 'Caffeine', scientific: '1,3,7-Trimethylxanthine', benefit: 'In the eye cream, reduces puffiness and dark circles', concentration: '5%' },
      { name: 'Centella Asiatica', scientific: 'Cica Extract', benefit: 'In the cleanser, soothes and calms during cleansing', concentration: '3%' }
    ],
    ingredientsList: 'See individual product pages for complete ingredient listings',
    expertTips: [
      'Follow the numbered steps in order for best results',
      'Allow 30-60 seconds between each step for absorption',
      'Use both morning and evening for maximum benefits',
      'Results are typically visible within 2-4 weeks of consistent use'
    ],
    specialFeatures: [
      { title: 'Curated Synergy', desc: 'Each product is formulated to enhance the efficacy of the others in the routine' },
      { title: 'Value Bundle', desc: 'Save 20% compared to purchasing each product separately' },
      { title: 'Gift Ready', desc: 'Arrives in our signature luxury packaging, perfect for gifting' },
      { title: 'Expert Designed', desc: 'Routine designed by dermatologists for comprehensive skin health' }
    ]
  },
  {
    slug: 'purifying-clay-mask',
    name: 'Purifying Clay Mask',
    description: 'Deep cleansing & refining',
    price: '$68',
    priceNumeric: 68,
    rating: 5,
    reviews: 298,
    image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=360&h=360&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=1160&h=1360&fit=crop',
    collection: 'Treatment Collection',
    shortDescription: 'A deep-cleansing clay mask that draws out impurities, minimizes pores, and refines skin texture without over-drying.',
    fullDescription: [
      'Our Purifying Clay Mask harnesses the power of kaolin and bentonite clays to deliver a deep yet gentle cleanse that leaves skin perfectly clear and refined.',
      'Unlike harsh clay masks that strip the skin, our formula is enriched with hydrating ingredients that maintain moisture balance while detoxifying.',
      'Perfect for weekly use as part of your skincare routine, or as a targeted treatment on oily areas for combination skin types.'
    ],
    thumbnailImages: [
      'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=212&h=212&fit=crop',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=212&h=212&fit=crop',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=212&h=212&fit=crop',
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=212&h=212&fit=crop',
      'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=212&h=212&fit=crop'
    ],
    sizes: [
      { size: '50ml', price: '$68', selected: true, badge: null },
      { size: '100ml', price: '$115', selected: false, badge: 'Best Value' }
    ],
    keyBenefits: [
      'Draws out impurities and toxins',
      'Minimizes the appearance of pores',
      'Controls excess oil production',
      'Refines skin texture',
      'Maintains moisture balance',
      'Leaves skin smooth and refreshed'
    ],
    applicationSteps: [
      { step: '1', instruction: 'Apply an even layer to clean, dry skin', timing: '1-2 times per week' },
      { step: '2', instruction: 'Avoid the eye and lip area', timing: null },
      { step: '3', instruction: 'Leave on for 10-15 minutes until slightly dry', timing: 'Don\'t let it fully crack' },
      { step: '4', instruction: 'Remove with warm water and a soft cloth', timing: 'Follow with moisturizer' }
    ],
    keyIngredients: [
      { name: 'Kaolin Clay', scientific: 'Kaolin', benefit: 'Gentle clay that absorbs excess oil without stripping moisture', concentration: '20%' },
      { name: 'Bentonite', scientific: 'Montmorillonite', benefit: 'Powerful detoxifying clay that draws out deep-seated impurities', concentration: '10%' },
      { name: 'Tea Tree Oil', scientific: 'Melaleuca Alternifolia', benefit: 'Natural antibacterial properties help prevent breakouts', concentration: '1%' },
      { name: 'Aloe Vera', scientific: 'Aloe Barbadensis', benefit: 'Soothes and hydrates to prevent the tight, dry feeling', concentration: '5%' }
    ],
    ingredientsList: 'Kaolin, Water, Bentonite, Glycerin, Aloe Barbadensis Leaf Juice, Melaleuca Alternifolia Leaf Oil, Witch Hazel, Phenoxyethanol, Tocopherol, Charcoal Powder',
    expertTips: [
      'Don\'t let the mask dry completely — remove while still slightly damp for best results',
      'Use as a spot treatment on the T-zone for combination skin',
      'Follow with a hydrating serum to replenish moisture',
      'Store in a cool place and close the jar tightly after each use'
    ],
    specialFeatures: [
      { title: 'Dual Clay Formula', desc: 'Kaolin and bentonite work together for gentle yet thorough deep cleansing' },
      { title: 'Hydration Balance', desc: 'Added humectants prevent the drying effect common with clay masks' },
      { title: 'Antibacterial Protection', desc: 'Tea tree and witch hazel provide natural antibacterial benefits' },
      { title: 'Multi-Use Design', desc: 'Can be used as a full face mask, spot treatment, or T-zone only treatment' }
    ]
  },
  {
    slug: 'night-recovery-serum',
    name: 'Night Recovery Serum',
    description: 'Overnight renewal treatment',
    price: '$198',
    priceNumeric: 198,
    rating: 5,
    reviews: 387,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=360&h=360&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1160&h=1360&fit=crop',
    collection: 'Night Care Collection',
    shortDescription: 'A potent overnight serum that works with your skin\'s natural renewal cycle to repair, regenerate, and rejuvenate while you sleep.',
    fullDescription: [
      'Our Night Recovery Serum is designed to maximize your skin\'s natural nighttime repair process with a concentrated blend of retinol, bakuchiol, and growth factors.',
      'While you sleep, this powerful serum works to accelerate cell turnover, repair daily environmental damage, and boost collagen synthesis.',
      'Wake up to visibly smoother, firmer, and more youthful-looking skin with consistent use.'
    ],
    thumbnailImages: [
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=212&h=212&fit=crop',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=212&h=212&fit=crop',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=212&h=212&fit=crop',
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=212&h=212&fit=crop',
      'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=212&h=212&fit=crop'
    ],
    sizes: [
      { size: '30ml', price: '$198', selected: true, badge: null },
      { size: '50ml', price: '$298', selected: false, badge: 'Best Value' },
      { size: '100ml', price: '$520', selected: false, badge: null }
    ],
    keyBenefits: [
      'Accelerates nighttime skin repair',
      'Boosts collagen synthesis by 35%',
      'Reduces fine lines and wrinkles',
      'Improves skin texture and smoothness',
      'Repairs environmental damage',
      'Strengthens skin barrier overnight'
    ],
    applicationSteps: [
      { step: '1', instruction: 'Cleanse thoroughly before bed', timing: 'Evening only' },
      { step: '2', instruction: 'Apply 4-5 drops to fingertips', timing: null },
      { step: '3', instruction: 'Press gently into face and neck', timing: 'Avoid eye area' },
      { step: '4', instruction: 'Follow with night cream if desired', timing: 'Allow 1 minute to absorb' }
    ],
    keyIngredients: [
      { name: 'Encapsulated Retinol', scientific: 'Microencapsulated Retinol', benefit: 'Slow-release retinol minimizes irritation while maximizing overnight renewal', concentration: '1%' },
      { name: 'Bakuchiol', scientific: 'Psoralea Corylifolia', benefit: 'Natural retinol alternative that enhances results without sensitization', concentration: '2%' },
      { name: 'Peptide Complex', scientific: 'Multiple Peptides', benefit: 'Signals skin to produce more collagen and elastin during sleep', concentration: '6%' },
      { name: 'Rosehip Oil', scientific: 'Rosa Canina', benefit: 'Rich in vitamins A and C for natural skin renewal and brightening', concentration: '3%' }
    ],
    ingredientsList: 'Water, Retinol, Bakuchiol, Palmitoyl Tripeptide-38, Rosa Canina Seed Oil, Squalane, Glycerin, Niacinamide, Tocopherol, Phenoxyethanol, Carbomer, Sodium Hyaluronate',
    expertTips: [
      'Start with every other night if you\'re new to retinol, then build up to nightly use',
      'Always use SPF the morning after — retinol increases sun sensitivity',
      'If you experience any tingling, it\'s normal and should subside within a week',
      'For best results, use consistently for at least 8 weeks'
    ],
    specialFeatures: [
      { title: 'Chronobiology Formula', desc: 'Designed to work in sync with your skin\'s natural circadian rhythm for maximum repair' },
      { title: 'Dual Retinoid System', desc: 'Combines retinol and bakuchiol for enhanced efficacy with minimal irritation' },
      { title: 'Time-Release Capsules', desc: 'Microencapsulated actives release gradually throughout the night' },
      { title: 'Clinically Validated', desc: '89% of users reported smoother skin after 4 weeks in clinical trials' }
    ]
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return products.map(p => p.slug);
}