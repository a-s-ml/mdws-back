import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SocketIOAdapter } from './socket-io-adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('mdws');
  const configService = app.get(ConfigService);
  const port = parseInt(configService.get('PORT'));
  app.useWebSocketAdapter(new SocketIOAdapter(app, configService));

  await app.listen(port);
}
bootstrap();
