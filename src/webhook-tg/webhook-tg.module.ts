import { Module } from '@nestjs/common';

import { WebhookTgController } from './webhook-tg.controller';

import { WebhookTgService } from './webhook-tg.service';
import { CallbackQueryService } from './callbackQuery.service';
import { ChatService } from 'src/chats/chat.service';

@Module({
  imports: [],
  controllers: [WebhookTgController],
  providers: [WebhookTgService, CallbackQueryService, ChatService],
  exports: [WebhookTgService],
})
export class WebhookTgModule {}
