// Skincare/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { ProductService } from '../../../lib/api/products';
import ProductDetailClient from './ProductDetailClient';

// تولید متادیتا داینامیک
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  try {
    const product = await ProductService.getProduct(slug);

    return {
      title: `${product.name} - Shan Loray`,
      description: product.short_description,
    };
  } catch (error) {
    return {
      title: 'Product Not Found - Shan Loray',
      description: 'The product you are looking for could not be found.',
    };
  }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  try {
    const product = await ProductService.getProduct(slug);
    return <ProductDetailClient product={product} />;
  } catch (error) {
    notFound();
  }
}