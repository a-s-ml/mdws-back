import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from './chats/chat.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [ConfigModule.forRoot(), EventEmitterModule.forRoot(), ChatModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
