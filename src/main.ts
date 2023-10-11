import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';
import { BaseExceptionsFilter } from './common/exceptions/base.exceptions.filter';
import { HttpExceptionsFilter } from './common/exceptions/http.exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new BaseExceptionsFilter(), new HttpExceptionsFilter());
  await app.listen(3000);
}
bootstrap();
