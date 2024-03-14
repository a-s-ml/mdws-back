import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from './chats/chat.module';

@Module({
  imports: [ConfigModule.forRoot(), ChatModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
