import { DynamicModule, Module } from '@nestjs/common';
import { addProductUseCases } from 'src/useCases/product/addProduct.useCases';
// import { deleteTodoUseCases } from '../../usecases/todo/deleteTodo.usecases';
// import { GetTodoUseCases } from '../../usecases/todo/getTodo.usecases';
// import { getTodosUseCases } from '../../usecases/todo/getTodos.usecases';
// import { updateTodoUseCases } from '../../usecases/todo/updateTodo.usecases';
import { IsAuthenticatedUseCases } from '../../usecases/auth/isAuthenticated.usecases';
import { LoginUseCases } from '../../usecases/auth/login.usecases';
import { LogoutUseCases } from '../../usecases/auth/logout.usecases';

import { ExceptionsModule } from '../exceptions/exceptions.module';
import { LoggerModule } from '../logger/logger.module';
import { LoggerService } from '../logger/logger.service';

import { BcryptModule } from '../services/bcrypt/bcrypt.module';
import { BcryptService } from '../services/bcrypt/bcrypt.service';
import { JwtModule } from '../services/jwt/jwt.module';
import { JwtTokenService } from '../services/jwt/jwt.service';
import { RepositoriesModule } from '../repositories/repositories.module';

import { DatabaseProductRepository } from '../repositories/product.repository';
import { DatabaseUserRepository } from '../repositories/user.repository';

import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';
import { EnvironmentConfigService } from '../config/environment-config/environment-config.service';
import { UseCaseProxy } from './usecases-proxy';

@Module({
  imports: [LoggerModule, JwtModule, BcryptModule, EnvironmentConfigModule, RepositoriesModule, ExceptionsModule],
})
export class UsecasesProxyModule {
  // Auth
  static LOGIN_USECASES_PROXY = 'LoginUseCasesProxy';
  static IS_AUTHENTICATED_USECASES_PROXY = 'IsAuthenticatedUseCasesProxy';
  static LOGOUT_USECASES_PROXY = 'LogoutUseCasesProxy';

  static GET_PRODUCT_USECASES_PROXY = 'getProductUsecasesProxy';
  static GET_PRODUCTS_USECASES_PROXY = 'getProductsUsecasesProxy';
  static POST_PRODUCT_USECASES_PROXY = 'postProductUsecasesProxy';
  static DELETE_PRODUCT_USECASES_PROXY = 'deleteProductUsecasesProxy';
  static PUT_PRODUCT_USECASES_PROXY = 'putProductUsecasesProxy';

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [LoggerService, JwtTokenService, EnvironmentConfigService, DatabaseUserRepository, BcryptService],
          provide: UsecasesProxyModule.LOGIN_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            jwtTokenService: JwtTokenService,
            config: EnvironmentConfigService,
            userRepo: DatabaseUserRepository,
            bcryptService: BcryptService,
          ) => new UseCaseProxy(new LoginUseCases(logger, jwtTokenService, config, userRepo, bcryptService)),
        },
        {
          inject: [DatabaseUserRepository],
          provide: UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY,
          useFactory: (userRepo: DatabaseUserRepository) => new UseCaseProxy(new IsAuthenticatedUseCases(userRepo)),
        },
        {
          inject: [],
          provide: UsecasesProxyModule.LOGOUT_USECASES_PROXY,
          useFactory: () => new UseCaseProxy(new LogoutUseCases()),
        },
        // {
        //   inject: [DatabaseProductRepository],
        //   provide: UsecasesProxyModule.GET_PRODUCT_USECASES_PROXY,
        //   useFactory: (todoRepository: DatabaseProductRepository) => new UseCaseProxy(new GetTodoUseCases(todoRepository)),
        // },
        // {
        //   inject: [DatabaseProductRepository],
        //   provide: UsecasesProxyModule.GET_PRODUCTS_USECASES_PROXY,
        //   useFactory: (todoRepository: DatabaseProductRepository) => new UseCaseProxy(new getTodosUseCases(todoRepository)),
        // },
        {
          inject: [LoggerService, DatabaseProductRepository],
          provide: UsecasesProxyModule.POST_PRODUCT_USECASES_PROXY,
          useFactory: (logger: LoggerService, todoRepository: DatabaseProductRepository) =>
            new UseCaseProxy(new addProductUseCases(logger, todoRepository)),
        },
        // {
        //   inject: [LoggerService, DatabaseProductRepository],
        //   provide: UsecasesProxyModule.PUT_PRODUCT_USECASES_PROXY,
        //   useFactory: (logger: LoggerService, todoRepository: DatabaseProductRepository) =>
        //     new UseCaseProxy(new updateTodoUseCases(logger, todoRepository)),
        // },
        // {
        //   inject: [LoggerService, DatabaseProductRepository],
        //   provide: UsecasesProxyModule.DELETE_PRODUCT_USECASES_PROXY,
        //   useFactory: (logger: LoggerService, todoRepository: DatabaseProductRepository) =>
        //     new UseCaseProxy(new deleteTodoUseCases(logger, todoRepository)),
        // },
      ],
      exports: [
        // UsecasesProxyModule.GET_PRODUCT_USECASES_PROXY,
        // UsecasesProxyModule.GET_PRODUCTS_USECASES_PROXY,
        UsecasesProxyModule.POST_PRODUCT_USECASES_PROXY,
        // UsecasesProxyModule.PUT_PRODUCT_USECASES_PROXY,
        // UsecasesProxyModule.DELETE_PRODUCT_USECASES_PROXY,
        UsecasesProxyModule.LOGIN_USECASES_PROXY,
        UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY,
        UsecasesProxyModule.LOGOUT_USECASES_PROXY,
      ],
    };
  }
}