import { ILogger } from '../../domain/logger/logger.interface';
import { ProductModel } from '../../domain/model/product.model';
import { IProductService } from '../../domain/interfaces/IProductService.interface';

export class addProductUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly _productService: IProductService,
  ) {}

  async execute(product: ProductModel): Promise<ProductModel> {
    const result = await this._productService.insert(product);
    this.logger.log(
      'addProductUseCases execute',
      'New product has been inserted',
    );
    return result;
  }
}
