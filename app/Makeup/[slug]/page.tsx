// Makeup/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { getMakeupProductBySlug, makeupProducts } from '../data/makeupProducts';
import MakeupProductDetailClient from './MakeupProductDetailClient';

export async function generateStaticParams() {
  return makeupProducts.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getMakeupProductBySlug(slug);
  
  if (!product) {
    return { title: 'Product Not Found' };
  }
  
  return {
    title: `${product.name} - Shan Loray Makeup`,
    description: product.shortDescription,
  };
}

export default async function MakeupProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getMakeupProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <MakeupProductDetailClient product={product} />;
}