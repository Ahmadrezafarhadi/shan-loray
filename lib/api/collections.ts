import { apiClient } from './client';
import { Collection, Category, PaginatedResponse, ApiResponse } from './config';

/**
 * Get all collections with optional filtering
 */
export const getCollections = async (params?: {
  page?: number;
  per_page?: number;
  featured?: boolean;
  search?: string;
}): Promise<PaginatedResponse<Collection>> => {
  const response = await apiClient.get<{ collections: any }>('/collections', params);
  const data = Array.isArray(response.collections)
    ? response.collections
    : Array.isArray(response.collections?.data)
    ? response.collections.data
    : [];
  return {
    data,
    current_page: 1,
    last_page: 1,
    per_page: data.length,
    total: data.length,
    from: data.length ? 1 : 0,
    to: data.length
  };
};

/**
 * Get featured collections
 */
export const getFeaturedCollections = async (): Promise<ApiResponse<Collection[]>> => {
  const response = await apiClient.get<{ collections: any }>('/collections/featured');
  const data = Array.isArray(response.collections)
    ? response.collections
    : Array.isArray(response.collections?.data)
    ? response.collections.data
    : [];
  return { data };
};

/**
 * Get a single collection by slug
 */
export const getCollection = async (slug: string): Promise<ApiResponse<Collection>> => {
  const response = await apiClient.get<{ collection: Collection }>(`/collections/${slug}`);
  return { data: response.collection };
};

/**
 * Get all categories
 */
export const getCategories = async (): Promise<ApiResponse<Category[]>> => {
  const response = await apiClient.get<{ categories: any }>('/categories');
  const data = Array.isArray(response.categories)
    ? response.categories
    : Array.isArray(response.categories?.data)
    ? response.categories.data
    : [];
  return { data };
};

/**
 * Get a single category by slug
 */
export const getCategory = async (slug: string): Promise<ApiResponse<Category>> => {
  const response = await apiClient.get<{ category: Category }>(`/categories/${slug}`);
  return { data: response.category };
};

