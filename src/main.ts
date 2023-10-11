import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';
import { BaseExceptionsFilter } from './common/exceptions/base.exceptions.filter';
import { HttpExceptionsFilter } from './common/exceptions/http.exceptions.filter';
import { generateDocument } from './helper';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 启动 CORS
  app.enableCors();
  // 全局数据转换
  app.useGlobalInterceptors(new TransformInterceptor());
  // 全局错误拦截
  app.useGlobalFilters(new BaseExceptionsFilter(), new HttpExceptionsFilter());
  // 启动全局 DTO 参数检查
  app.useGlobalPipes(new ValidationPipe());
  // swagger 文档
  generateDocument(app);
  await app.listen(3000);
}
bootstrap();
