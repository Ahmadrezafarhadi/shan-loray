// Makeup/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { ProductService } from '../../../lib/api/products';
import MakeupProductDetailClient from './MakeupProductDetailClient';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  try {
    const product = await ProductService.getProduct(slug);
    return {
      title: `${product.name} - Shan Loray Makeup`,
      description: product.short_description,
    };
  } catch (error) {
    return { title: 'Product Not Found - Shan Loray' };
  }
}

export default async function MakeupProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  try {
    const product = await ProductService.getProduct(slug);
    return <MakeupProductDetailClient product={product} />;
  } catch (error) {
    notFound();
  }
}
