// Skincare/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { getProductBySlug, products } from '../data/products';
import ProductDetailClient from './ProductDetailClient';

// برای Static Generation (اختیاری)
export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

// تولید متادیتا داینامیک
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  
  if (!product) {
    return { title: 'Product Not Found' };
  }
  
  return {
    title: `${product.name} - Shan Loray`,
    description: product.shortDescription,
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}