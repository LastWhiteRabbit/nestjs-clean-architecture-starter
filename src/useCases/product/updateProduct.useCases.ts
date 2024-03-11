import { ILogger } from '../../domain/logger/logger.interface';
import { ProductUpdateModel } from '../../domain/model/product.model';
import { IProductService } from '../../domain/interfaces/IProductService.interface';

export class updateProductUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly _productService: IProductService,
  ) {}

  async execute(id: ProductUpdateModel): Promise<void> {
    await this._productService.updateContent(id);
    this.logger.log(
      'updateProductUseCases execute',
      `Product ${id} have been updated`,
    );
  }
}
