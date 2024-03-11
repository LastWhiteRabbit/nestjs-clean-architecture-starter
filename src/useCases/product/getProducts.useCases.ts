import { ILogger } from '../../domain/logger/logger.interface';
import { ProductModel } from '../../domain/model/product.model';
import { IProductService } from '../../domain/interfaces/IProductService.interface';

export class getProductsUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly _productService: IProductService,
  ) {}

  async execute(): Promise<ProductModel[]> {
    const result = await this._productService.findAll();
    this.logger.log(
      'getProductsUseCases execute',
      'Products have been fetched',
    );
    return result;
  }
}
