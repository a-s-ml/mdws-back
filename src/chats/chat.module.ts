import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { jwtModule } from 'src/modules.config';
import { ChatService } from './chat.service';
import { DbService } from 'src/db/db.service';
import { ChatController } from './chat.contoller';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [ConfigModule, jwtModule],
  controllers: [ChatController],
  providers: [ChatService, ChatGateway, DbService],
})
export class ChatModule {}
