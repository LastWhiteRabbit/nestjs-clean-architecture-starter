import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
// import { GetTodoUseCases } from '../../../usecases/todo/getTodo.usecases';
import { ProductPresenter } from './product.presenter';
import { ApiResponseType } from '../../common/swagger/response.decorator';
// import { getTodosUseCases } from '../../../usecases/todo/getTodos.usecases';
// import { updateTodoUseCases } from '../../../usecases/todo/updateTodo.usecases';
// import { AddTodoDto, UpdateTodoDto } from './todo.dto';
import { AddProductDto } from './product.dto';
// import { deleteTodoUseCases } from '../../../usecases/todo/deleteTodo.usecases';
import { addProductUseCases } from 'src/useCases/product/addProduct.useCases';

@Controller('product')
@ApiTags('product')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(ProductPresenter)
export class ProductController {
  constructor(
    // @Inject(UsecasesProxyModule.GET_PRODUCT_USECASES_PROXY)
    // private readonly getProductUsecaseProxy: UseCaseProxy<GetProductUseCases>,
    // @Inject(UsecasesProxyModule.GET_PRODUCTS_USECASES_PROXY)
    // private readonly getAllProductUsecaseProxy: UseCaseProxy<getProductsUseCases>,
    // @Inject(UsecasesProxyModule.PUT_PRODUCT_USECASES_PROXY)
    // private readonly updateProductUsecaseProxy: UseCaseProxy<updateProductUseCases>,
    // @Inject(UsecasesProxyModule.DELETE_PRODUCT_USECASES_PROXY)
    // private readonly deleteProductUsecaseProxy: UseCaseProxy<deleteProductUseCases>,
    @Inject(UsecasesProxyModule.POST_PRODUCT_USECASES_PROXY)
    private readonly addProductUsecaseProxy: UseCaseProxy<addProductUseCases>,
  ) {}

  //   @Get('todo')
  //   @ApiResponseType(ProductPresenter, false)
  //   async getTodo(@Query('id', ParseIntPipe) id: number) {
  //     const todo = await this.getTodoUsecaseProxy.getInstance().execute(id);
  //     return new ProductPresenter(todo);
  //   }

  //   @Get('todos')
  //   @ApiResponseType(ProductPresenter, true)
  //   async getTodos() {
  //     const todos = await this.getAllTodoUsecaseProxy.getInstance().execute();
  //     return todos.map((todo) => new ProductPresenter(todo));
  //   }

  //   @Put('todo')
  //   @ApiResponseType(ProductPresenter, true)
  //   async updateTodo(@Body() updateTodoDto: UpdateTodoDto) {
  //     const { id, isDone } = updateTodoDto;
  //     await this.updateTodoUsecaseProxy.getInstance().execute(id, isDone);
  //     return 'success';
  //   }

  //   @Delete('todo')
  //   @ApiResponseType(ProductPresenter, true)
  //   async deleteTodo(@Query('id', ParseIntPipe) id: number) {
  //     await this.deleteTodoUsecaseProxy.getInstance().execute(id);
  //     return 'success';
  //   }

  @Post('product')
  @ApiResponseType(ProductPresenter, true)
  async addProduct(@Body() addProductDto: AddProductDto) {
    const productCreated = await this.addProductUsecaseProxy
      .getInstance()
      .execute(addProductDto);
    return new ProductPresenter(productCreated);
  }
}
