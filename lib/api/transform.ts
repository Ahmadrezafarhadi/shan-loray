import {
  Address,
  Cart,
  CartItem,
  Order,
  PaymentMethod,
  Product,
  User
} from './config';

const toNumber = (value: any, fallback: number = 0): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const toString = (value: any, fallback: string = ''): string => {
  if (value === null || value === undefined) return fallback;
  return String(value);
};

export const normalizeUser = (raw: any): User => {
  const firstName = raw?.first_name ?? raw?.firstName ?? '';
  const lastName = raw?.last_name ?? raw?.lastName ?? '';
  const name = raw?.name ?? `${firstName} ${lastName}`.trim();

  return {
    id: toNumber(raw?.id),
    name: name || 'User',
    email: toString(raw?.email),
    email_verified_at: raw?.email_verified_at ?? undefined,
    created_at: raw?.created_at ?? new Date().toISOString(),
    updated_at: raw?.updated_at ?? new Date().toISOString(),
    first_name: firstName,
    last_name: lastName,
    phone: raw?.phone ?? undefined,
    avatar: raw?.avatar ?? undefined
  };
};

export const normalizeProduct = (raw: any): Product => {
  const price = raw?.sale_price ?? raw?.price ?? 0;
  const image = raw?.image ?? '';
  const images = Array.isArray(raw?.images)
    ? raw.images
    : Array.isArray(raw?.images?.data)
    ? raw.images.data
    : [];
  const thumbnailImages = images
    .map((img: any) => img?.image)
    .filter((img: any) => typeof img === 'string' && img.length > 0);

  return {
    id: toNumber(raw?.id),
    slug: toString(raw?.slug),
    name: toString(raw?.name),
    description: raw?.description ?? '',
    price: toNumber(price),
    price_numeric: toNumber(price),
    rating: toNumber(raw?.rating),
    reviews: toNumber(raw?.reviews ?? raw?.reviews_count),
    image,
    hero_image: raw?.hero_image ?? image,
    collection: raw?.collection ?? raw?.category ?? '',
    short_description: raw?.short_description ?? raw?.description ?? '',
    full_description: Array.isArray(raw?.full_description)
      ? raw.full_description
      : raw?.description
      ? [raw.description]
      : [],
    thumbnail_images: thumbnailImages.length > 0 ? thumbnailImages : image ? [image] : [],
    sizes: Array.isArray(raw?.sizes)
      ? raw.sizes.map((size: any, index: number) => ({
          size: toString(size?.size ?? size ?? 'Standard'),
          price: toString(size?.price ?? price),
          selected: index === 0,
          badge: size?.badge ?? null
        }))
      : [
          {
            size: 'Standard',
            price: toString(price),
            selected: true,
            badge: null
          }
        ],
    key_benefits: Array.isArray(raw?.key_benefits) ? raw.key_benefits : [],
    application_steps: Array.isArray(raw?.application_steps) ? raw.application_steps : [],
    key_ingredients: Array.isArray(raw?.key_ingredients) ? raw.key_ingredients : [],
    ingredients_list: raw?.ingredients_list ?? '',
    expert_tips: Array.isArray(raw?.expert_tips) ? raw.expert_tips : [],
    special_features: Array.isArray(raw?.special_features) ? raw.special_features : [],
    badge: raw?.badge ?? undefined,
    featured: raw?.featured ?? raw?.is_featured ?? false,
    created_at: raw?.created_at ?? new Date().toISOString(),
    updated_at: raw?.updated_at ?? new Date().toISOString()
  };
};

export const normalizeCartItem = (raw: any): CartItem => {
  const product = normalizeProduct(raw?.product ?? {});
  return {
    id: toNumber(raw?.id),
    product_id: product.id,
    quantity: toNumber(raw?.quantity, 1),
    price: toNumber(raw?.unit_price ?? raw?.price ?? product.price),
    product,
    created_at: raw?.created_at ?? new Date().toISOString(),
    updated_at: raw?.updated_at ?? new Date().toISOString()
  };
};

export const normalizeCart = (raw: any): Cart => {
  const items = Array.isArray(raw?.items) ? raw.items.map(normalizeCartItem) : [];
  const subtotal = toNumber(raw?.subtotal ?? 0);

  return {
    id: toNumber(raw?.id),
    user_id: toNumber(raw?.user_id ?? 0),
    items,
    total: subtotal,
    item_count: toNumber(raw?.items_count ?? raw?.item_count ?? items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0)),
    created_at: raw?.created_at ?? new Date().toISOString(),
    updated_at: raw?.updated_at ?? new Date().toISOString()
  };
};

export const normalizeOrder = (raw: any): Order => {
  const splitName = (fullName: string) => {
    const parts = toString(fullName).trim().split(/\s+/).filter(Boolean);
    const first = parts.shift() ?? '';
    const last = parts.join(' ');
    return { first, last };
  };

  const buildAddress = (payload: any, type: 'shipping' | 'billing'): Address => {
    const nameSource = payload?.shipping_name ?? payload?.billing_name ?? '';
    const { first, last } = splitName(nameSource);
    const formatted = toString(
      type === 'shipping' ? payload?.shipping_address : payload?.billing_address
    );

    return {
      id: toNumber(payload?.[`${type}_address_id`] ?? 0),
      user_id: toNumber(payload?.user_id ?? 0),
      type,
      first_name: first,
      last_name: last,
      company: undefined,
      address_line_1: formatted,
      address_line_2: undefined,
      city: '',
      state: '',
      postal_code: '',
      country: '',
      phone: toString(payload?.shipping_phone ?? ''),
      is_default: false,
      created_at: payload?.created_at ?? new Date().toISOString(),
      updated_at: payload?.updated_at ?? new Date().toISOString()
    };
  };

  const normalizeOrderItemProduct = (item: any): Product => {
    const image = toString(item?.product_image);
    const price = toNumber(item?.unit_price ?? item?.price ?? 0);
    return {
      id: toNumber(item?.product_id ?? 0),
      slug: toString(item?.product_slug),
      name: toString(item?.product_name),
      description: '',
      price,
      price_numeric: price,
      rating: 0,
      reviews: 0,
      image,
      hero_image: image,
      collection: '',
      short_description: toString(item?.product_name),
      full_description: [],
      thumbnail_images: image ? [image] : [],
      sizes: [
        {
          size: toString(item?.size ?? 'Standard'),
          price: toString(price),
          selected: true,
          badge: null
        }
      ],
      key_benefits: [],
      application_steps: [],
      key_ingredients: [],
      ingredients_list: '',
      expert_tips: [],
      special_features: [],
      featured: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  };

  const paymentMethod: PaymentMethod = {
    id: toNumber(raw?.payment_method_id ?? 0),
    user_id: toNumber(raw?.user_id ?? 0),
    type: raw?.payment_method ?? 'card',
    last_four: toString(raw?.payment_last_four ?? ''),
    brand: toString(raw?.payment_method ?? raw?.payment_brand ?? ''),
    expiry_month: 0,
    expiry_year: 0,
    is_default: false,
    created_at: raw?.created_at ?? new Date().toISOString(),
    updated_at: raw?.updated_at ?? new Date().toISOString()
  };

  const shippingAddress = raw?.shipping_address && typeof raw.shipping_address === 'object'
    ? raw.shipping_address
    : buildAddress(raw, 'shipping');
  const billingAddress = raw?.billing_address && typeof raw.billing_address === 'object'
    ? raw.billing_address
    : buildAddress(raw, 'billing');

  return {
    id: toNumber(raw?.id),
    user_id: toNumber(raw?.user_id ?? 0),
    order_number: toString(raw?.order_number),
    status: toString(raw?.status ?? 'pending'),
    total: toNumber(raw?.total),
    subtotal: toNumber(raw?.subtotal),
    tax: toNumber(raw?.tax),
    shipping: toNumber(raw?.shipping_cost ?? raw?.shipping ?? 0),
    discount: toNumber(raw?.discount ?? 0),
    currency: raw?.currency ?? 'USD',
    shipping_address: shippingAddress,
    billing_address: billingAddress,
    payment_method: typeof raw?.payment_method === 'object' ? raw.payment_method : paymentMethod,
    items: Array.isArray(raw?.items)
      ? raw.items.map((item: any) => ({
          id: toNumber(item?.id),
          order_id: toNumber(item?.order_id ?? raw?.id),
          product_id: toNumber(item?.product_id ?? item?.product?.id ?? 0),
          quantity: toNumber(item?.quantity, 1),
          price: toNumber(item?.unit_price ?? item?.price ?? 0),
          product: item?.product ? normalizeProduct(item.product) : normalizeOrderItemProduct(item),
          created_at: item?.created_at ?? new Date().toISOString(),
          updated_at: item?.updated_at ?? new Date().toISOString()
        }))
      : [],
    created_at: raw?.created_at ?? new Date().toISOString(),
    updated_at: raw?.updated_at ?? new Date().toISOString()
  };
};

export const normalizeAddress = (raw: any): Address => {
  const type = raw?.is_billing ? 'billing' : 'shipping';
  return {
    id: toNumber(raw?.id),
    user_id: toNumber(raw?.user_id ?? 0),
    type,
    first_name: raw?.first_name ?? '',
    last_name: raw?.last_name ?? '',
    company: raw?.company ?? undefined,
    address_line_1: raw?.address_line_1 ?? '',
    address_line_2: raw?.address_line_2 ?? undefined,
    city: raw?.city ?? '',
    state: raw?.state ?? '',
    postal_code: raw?.postal_code ?? '',
    country: raw?.country ?? '',
    phone: raw?.phone ?? undefined,
    is_default: !!raw?.is_default,
    created_at: raw?.created_at ?? new Date().toISOString(),
    updated_at: raw?.updated_at ?? new Date().toISOString()
  };
};

export const normalizePaymentMethod = (raw: any): PaymentMethod => {
  const expiry = toString(raw?.expiry_date, '');
  const [expiryMonth, expiryYear] = expiry.includes('/')
    ? expiry.split('/').map((part: string) => part.trim())
    : ['', ''];

  return {
    id: toNumber(raw?.id),
    user_id: toNumber(raw?.user_id ?? 0),
    type: raw?.type ?? raw?.card_brand ?? 'card',
    last_four: raw?.card_last_four ?? raw?.last_four ?? '',
    brand: raw?.card_brand ?? raw?.brand ?? '',
    expiry_month: toNumber(expiryMonth),
    expiry_year: toNumber(expiryYear),
    is_default: !!raw?.is_default,
    created_at: raw?.created_at ?? new Date().toISOString(),
    updated_at: raw?.updated_at ?? new Date().toISOString()
  };
};

