import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  // Enable CORS for all origins
  app.enableCors({
    origin: ['http://localhost:3002', 'http://localhost:3001', 'http://localhost:3000'],
    credentials: true,
  });
  try {
    await app.listen(process.env.PORT);
    console.log(`Running on PORT ${process.env.PORT}`);
  } catch (err) {
    console.log(err);
  }
}
bootstrap();
