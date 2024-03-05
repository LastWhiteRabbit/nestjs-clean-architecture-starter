import { Module } from '@nestjs/common';
import { UsecasesProxyModule } from '../usecases-proxy/usecases-proxy.module';
import { AuthController } from './auth/auth.controller';
import { ProductController } from './product/product.controller';

@Module({
  imports: [UsecasesProxyModule.register()],
  controllers: [ProductController, AuthController],
})
export class ControllersModule {}
