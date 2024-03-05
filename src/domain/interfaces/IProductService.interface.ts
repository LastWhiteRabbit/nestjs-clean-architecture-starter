import { ProductModel } from '../model/product.model';
export interface IProductService {
  insert(product: ProductModel): Promise<ProductModel>;
  findAll(): Promise<ProductModel[]>;
  findById(id: number): Promise<ProductModel>;
  updateContent(id: number): Promise<void>;
}
