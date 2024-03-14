import { Injectable } from '@nestjs/common';
import { CallbackQueryService } from './callbackQuery.service';
import { Update } from 'src/types/tg-types';

@Injectable()
export class WebhookTgService {
  constructor(private callbackQueryService: CallbackQueryService) {}

  update(updateDto: Update) {
    if (updateDto.callback_query) {
      return this.callbackQueryService.update(updateDto.callback_query);
    }
    if (updateDto.message?.text) {
      return this.callbackQueryService.message(updateDto.message);
    }
  }
}
