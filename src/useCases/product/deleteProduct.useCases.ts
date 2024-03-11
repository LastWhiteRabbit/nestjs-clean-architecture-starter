import { ILogger } from '../../domain/logger/logger.interface';
import { IProductService } from '../../domain/interfaces/IProductService.interface';

export class deleteProductUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly _productService: IProductService,
  ) {}

  async execute(id: number): Promise<void> {
    await this._productService.deleteById(id);
    this.logger.log(
      'deleteProductUseCases execute',
      `Product ${id} have been deleted`,
    );
  }
}
