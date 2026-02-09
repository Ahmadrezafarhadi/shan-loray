import { ProductService } from '../../lib/api/products';
import { Category, Product, PaginatedResponse } from '../../lib/api/config';
import SkincareClient from './SkincareClient';

export default async function ShanLoraySkincarePage() {
  // Try to get skincare data on server side
  let products: PaginatedResponse<Product> | undefined = undefined;
  let categories: Category[] = [];
  try {
    products = await ProductService.getSkincareProducts();
    categories = await ProductService.getSkincareCategories();
  } catch (error) {
    // Handle error gracefully
    console.log('Error fetching skincare data');
  }

  return <SkincareClient initialProducts={products} initialCategories={categories} />;
}

