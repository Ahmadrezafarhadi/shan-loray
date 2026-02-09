import { ProductService } from '../../lib/api/products';
import { Category, Product, PaginatedResponse } from '../../lib/api/config';
import FragranceClient from './FragranceClient';

export default async function ShanLorayFragrancePage() {
  // Try to get fragrance data on server side
  let products: PaginatedResponse<Product> | undefined = undefined;
  let categories: Category[] = [];
  try {
    products = await ProductService.getFragranceProducts();
    categories = await ProductService.getFragranceCategories();
  } catch (error) {
    // Handle error gracefully
    console.log('Error fetching fragrance data');
  }

  return <FragranceClient initialProducts={products} initialCategories={categories} />;
}



