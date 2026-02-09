import { ProductService } from '../../lib/api/products';
import { Category, Product, PaginatedResponse } from '../../lib/api/config';
import MakeupClient from './MakeupClient';

export default async function ShanLorayMakeupPage() {
  // Try to get makeup data on server side
  let products: PaginatedResponse<Product> | undefined = undefined;
  let categories: Category[] = [];
  try {
    products = await ProductService.getMakeupProducts();
    categories = await ProductService.getMakeupCategories();
  } catch (error) {
    // Handle error gracefully
    console.log('Error fetching makeup data');
  }

  return <MakeupClient initialProducts={products?.data} initialCategories={categories} />;
}



