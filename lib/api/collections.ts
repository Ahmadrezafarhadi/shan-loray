import { apiClient } from './client';
import { Collection, Category, PaginatedResponse, ApiResponse } from './config';
import { defaultCategories, defaultCollections } from '../data/defaultCatalog';

/**
 * Get all collections with optional filtering
 */
export const getCollections = async (params?: {
  page?: number;
  per_page?: number;
  featured?: boolean;
  search?: string;
}): Promise<PaginatedResponse<Collection>> => {
  let data: Collection[] = [];
  try {
    const response = await apiClient.get<{ collections: any }>('/collections', params);
    data = Array.isArray(response.collections)
      ? response.collections
      : Array.isArray(response.collections?.data)
      ? response.collections.data
      : [];
  } catch {
    data = [];
  }
  if (data.length === 0) {
    data = defaultCollections;
  }
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
  let data: Collection[] = [];
  try {
    const response = await apiClient.get<{ collections: any }>('/collections/featured');
    data = Array.isArray(response.collections)
      ? response.collections
      : Array.isArray(response.collections?.data)
      ? response.collections.data
      : [];
  } catch {
    data = [];
  }
  if (data.length === 0) {
    data = defaultCollections.filter((item) => item.featured || item.is_featured);
  }
  return { data };
};

/**
 * Get a single collection by slug
 */
export const getCollection = async (slug: string): Promise<ApiResponse<Collection>> => {
  try {
    const response = await apiClient.get<{ collection: Collection }>(`/collections/${slug}`);
    return { data: response.collection };
  } catch {
    const found = defaultCollections.find((item) => item.slug === slug);
    if (!found) {
      throw new Error('Collection not found');
    }
    return { data: found };
  }
};

/**
 * Get all categories
 */
export const getCategories = async (): Promise<ApiResponse<Category[]>> => {
  let data: Category[] = [];
  try {
    const response = await apiClient.get<{ categories: any }>('/categories');
    data = Array.isArray(response.categories)
      ? response.categories
      : Array.isArray(response.categories?.data)
      ? response.categories.data
      : [];
  } catch {
    data = [];
  }
  if (data.length === 0) {
    data = defaultCategories;
  }
  return { data };
};

/**
 * Get a single category by slug
 */
export const getCategory = async (slug: string): Promise<ApiResponse<Category>> => {
  const response = await apiClient.get<{ category: Category }>(`/categories/${slug}`);
  return { data: response.category };
};

