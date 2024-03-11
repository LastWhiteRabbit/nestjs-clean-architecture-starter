import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { getProductUseCases } from '../../../usecases/product/getproduct.usecases';
import { ProductPresenter } from './product.presenter';
import { ApiResponseType } from '../../common/swagger/response.decorator';
import { getProductsUseCases } from '../../../usecases/product/getProducts.usecases';
import { updateProductUseCases } from '../../../usecases/product/updateProduct.useCases';
import { AddProductDto, UpdateProductDto } from './product.dto';
import { deleteProductUseCases } from '../../../usecases/product/deleteProduct.usecases';
import { addProductUseCases } from '../../../useCases/product/addProduct.useCases';

@Controller('product')
@ApiTags('product')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(ProductPresenter)
export class ProductController {
  constructor(
    @Inject(UsecasesProxyModule.GET_PRODUCT_USECASES_PROXY)
    private readonly getProductUsecaseProxy: UseCaseProxy<getProductUseCases>,
    @Inject(UsecasesProxyModule.GET_PRODUCTS_USECASES_PROXY)
    private readonly getAllProductUsecaseProxy: UseCaseProxy<getProductsUseCases>,
    @Inject(UsecasesProxyModule.PUT_PRODUCT_USECASES_PROXY)
    private readonly updateProductUsecaseProxy: UseCaseProxy<updateProductUseCases>,
    @Inject(UsecasesProxyModule.DELETE_PRODUCT_USECASES_PROXY)
    private readonly deleteProductUsecaseProxy: UseCaseProxy<deleteProductUseCases>,
    @Inject(UsecasesProxyModule.POST_PRODUCT_USECASES_PROXY)
    private readonly addProductUsecaseProxy: UseCaseProxy<addProductUseCases>,
  ) {}

  @Get('product')
  @ApiResponseType(ProductPresenter, false)
  async getProduct(@Query('id', ParseIntPipe) id: number) {
    const product = await this.getProductUsecaseProxy.getInstance().execute(id);
    return new ProductPresenter(product);
  }

  @Get('products')
  @ApiResponseType(ProductPresenter, true)
  async getProducts() {
    const products = await this.getAllProductUsecaseProxy
      .getInstance()
      .execute();
    return products.map((product) => new ProductPresenter(product));
  }

  @Put('product')
  @ApiResponseType(ProductPresenter, true)
  async updateProduct(@Body() updateProductDto: UpdateProductDto) {
    await this.updateProductUsecaseProxy
      .getInstance()
      .execute(updateProductDto);
    return 'success';
  }

  @Delete('product')
  @ApiResponseType(ProductPresenter, true)
  async deleteProduct(@Query('id', ParseIntPipe) id: number) {
    await this.deleteProductUsecaseProxy.getInstance().execute(id);
    return 'success';
  }

  @Post('product')
  @ApiResponseType(ProductPresenter, true)
  async addProduct(@Body() addProductDto: AddProductDto) {
    const productCreated = await this.addProductUsecaseProxy
      .getInstance()
      .execute(addProductDto);
    return new ProductPresenter(productCreated);
  }
}
