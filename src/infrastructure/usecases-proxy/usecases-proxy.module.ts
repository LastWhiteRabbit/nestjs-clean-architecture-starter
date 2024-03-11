import { DynamicModule, Module } from '@nestjs/common';
import { addProductUseCases } from '../../useCases/product/addProduct.useCases';
import { deleteProductUseCases } from '../../usecases/product/deleteProduct.usecases';
import { getProductUseCases } from '../../usecases/product/getProduct.usecases';
import { getProductsUseCases } from '../../usecases/product/getProducts.usecases';
import { updateProductUseCases } from '../../usecases/product/updateProduct.usecases';
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
import { RegisterUseCases } from '../../useCases/auth/register.useCases';

@Module({
  imports: [
    LoggerModule,
    JwtModule,
    BcryptModule,
    EnvironmentConfigModule,
    RepositoriesModule,
    ExceptionsModule,
  ],
})
export class UsecasesProxyModule {
  // Auth
  static LOGIN_USECASES_PROXY = 'LoginUseCasesProxy';
  static IS_AUTHENTICATED_USECASES_PROXY = 'IsAuthenticatedUseCasesProxy';
  static LOGOUT_USECASES_PROXY = 'LogoutUseCasesProxy';

  static REGISTER_USECASES_PROXY = 'RegisterUseCasesProxy';

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
          inject: [
            LoggerService,
            JwtTokenService,
            EnvironmentConfigService,
            DatabaseUserRepository,
            BcryptService,
          ],
          provide: UsecasesProxyModule.LOGIN_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            jwtTokenService: JwtTokenService,
            config: EnvironmentConfigService,
            userRepo: DatabaseUserRepository,
            bcryptService: BcryptService,
          ) =>
            new UseCaseProxy(
              new LoginUseCases(
                logger,
                jwtTokenService,
                config,
                userRepo,
                bcryptService,
              ),
            ),
        },
        {
          inject: [DatabaseUserRepository],
          provide: UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY,
          useFactory: (userRepo: DatabaseUserRepository) =>
            new UseCaseProxy(new IsAuthenticatedUseCases(userRepo)),
        },
        {
          inject: [],
          provide: UsecasesProxyModule.LOGOUT_USECASES_PROXY,
          useFactory: () => new UseCaseProxy(new LogoutUseCases()),
        },
        {
          inject: [LoggerService, DatabaseUserRepository, BcryptService],
          provide: UsecasesProxyModule.REGISTER_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            userRepo: DatabaseUserRepository,
            bcryptService: BcryptService,
          ) =>
            new UseCaseProxy(
              new RegisterUseCases(logger, userRepo, bcryptService),
            ),
        },
        {
          inject: [DatabaseProductRepository],
          provide: UsecasesProxyModule.GET_PRODUCT_USECASES_PROXY,
          useFactory: (productService: DatabaseProductRepository) =>
            new UseCaseProxy(new getProductUseCases(productService)),
        },
        {
          inject: [LoggerService, DatabaseProductRepository],
          provide: UsecasesProxyModule.GET_PRODUCTS_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            productService: DatabaseProductRepository,
          ) =>
            new UseCaseProxy(new getProductsUseCases(logger, productService)),
        },
        {
          inject: [LoggerService, DatabaseProductRepository],
          provide: UsecasesProxyModule.POST_PRODUCT_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            productService: DatabaseProductRepository,
          ) => new UseCaseProxy(new addProductUseCases(logger, productService)),
        },
        {
          inject: [LoggerService, DatabaseProductRepository],
          provide: UsecasesProxyModule.PUT_PRODUCT_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            productService: DatabaseProductRepository,
          ) =>
            new UseCaseProxy(new updateProductUseCases(logger, productService)),
        },
        {
          inject: [LoggerService, DatabaseProductRepository],
          provide: UsecasesProxyModule.DELETE_PRODUCT_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            productService: DatabaseProductRepository,
          ) =>
            new UseCaseProxy(new deleteProductUseCases(logger, productService)),
        },
      ],
      exports: [
        UsecasesProxyModule.GET_PRODUCT_USECASES_PROXY,
        UsecasesProxyModule.GET_PRODUCTS_USECASES_PROXY,
        UsecasesProxyModule.POST_PRODUCT_USECASES_PROXY,
        UsecasesProxyModule.PUT_PRODUCT_USECASES_PROXY,
        UsecasesProxyModule.DELETE_PRODUCT_USECASES_PROXY,
        UsecasesProxyModule.LOGIN_USECASES_PROXY,
        UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY,
        UsecasesProxyModule.LOGOUT_USECASES_PROXY,
        UsecasesProxyModule.REGISTER_USECASES_PROXY,
      ],
    };
  }
}
