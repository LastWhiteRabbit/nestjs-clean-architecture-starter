import { ProductModel } from '../../domain/model/product.model';
import { IProductService } from '../../domain/interfaces/IProductService.interface';

export class getProductUseCases {
  constructor(private readonly _productService: IProductService) {}

  async execute(id: number): Promise<ProductModel> {
    return await this._productService.findById(id);
  }
}
