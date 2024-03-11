import { ProductModel, ProductUpdateModel } from '../model/product.model';
export interface IProductService {
  insert(product: ProductModel): Promise<ProductModel>;
  findAll(): Promise<ProductModel[]>;
  findById(id: number): Promise<ProductModel>;
  updateContent(id: ProductUpdateModel): Promise<void>;
  deleteById(id: number): Promise<void>;
}
