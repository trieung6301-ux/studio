import api from '@/lib/axios'

/**
 * Định nghĩa cấu trúc dữ liệu sản phẩm từ API
 */
export interface ProductResponse {
  id: number
  product_name: string
  product_desc: string
  product_type: string
  product_price: number
  deleted: boolean
  product_image: string
}

/**
 * Định nghĩa cấu trúc dữ liệu sản phẩm đã xử lý để hiển thị
 */
export interface Product {
  id: number
  name: string
  description: string
  type: string
  price: number
  deleted: boolean
  imageBase64: string
  imageUrl: string
}

/**
 * Giải mã hình ảnh base64 và tạo URL để hiển thị
 * @param base64String Chuỗi base64 của hình ảnh
 * @returns URL để hiển thị hình ảnh
 */
export function decodeProductImage(base64String: string): string {
  // Kiểm tra xem chuỗi base64 đã có tiền tố data URL chưa
  if (!base64String) return '';
  
  if (base64String.startsWith('data:image')) {
    return base64String;
  }
  
  // Thêm tiền tố data URL cho hình ảnh
  return `data:image/jpeg;base64,${base64String}`;
}

/**
 * Chuyển đổi dữ liệu sản phẩm từ API sang định dạng hiển thị
 * @param product Dữ liệu sản phẩm từ API
 * @returns Dữ liệu sản phẩm đã xử lý
 */
export function transformProduct(product: ProductResponse): Product {
  return {
    id: product.id,
    name: product.product_name,
    description: product.product_desc,
    type: product.product_type,
    price: product.product_price,
    deleted: product.deleted,
    imageBase64: product.product_image,
    imageUrl: decodeProductImage(product.product_image)
  };
}

/**
 * Lấy danh sách sản phẩm từ API
 * @param params Tham số tùy chọn để lọc sản phẩm
 * @returns Promise chứa danh sách sản phẩm đã xử lý
 */
export async function getProducts(params?: {
  type?: string
  minPrice?: number
  maxPrice?: number
  limit?: number
  page?: number
}): Promise<{ products: Product[]; total: number }> {
  try {
    const response = await api.get('/products', { params });
    const productsData = response.data;
        
    // Chuyển đổi dữ liệu sản phẩm
    const transformedProducts = Array.isArray(productsData) 
      ? productsData.map(transformProduct)
      : [];
    
    return {
      products: transformedProducts,
      total: productsData.total || transformedProducts.length
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

/**
 * Lấy thông tin chi tiết của một sản phẩm theo ID
 * @param id ID của sản phẩm
 * @returns Promise chứa thông tin chi tiết sản phẩm đã xử lý
 */
export async function getProductById(id: number | string): Promise<Product> {
  try {
    const response = await api.get(`/products/${id}`);
    return transformProduct(response.data);
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw error;
  }
}