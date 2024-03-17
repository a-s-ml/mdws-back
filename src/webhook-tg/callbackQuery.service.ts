import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ResponsesService } from './responses.service';
import { ChatService } from 'src/chats/chat.service';
import {
  CallbackQuery,
  InlineKeyboardMarkup,
  Message,
} from 'src/types/tg-types';
import { EventClass } from 'src/types/types';

@Injectable()
export class CallbackQueryService {
  constructor(
    private eventEmitter: EventEmitter2,
    private chatService: ChatService,
    private responsesService: ResponsesService,
  ) {}

  async update(callbackQuery: CallbackQuery) {
    const data = callbackQuery.data.split('_');
    switch (data[0]) {
      default:
        break;
    }
  }

  async message(message: Message) {
    if (message.text === '/account' || message.text === '/start') {
      const event = new EventClass();
      event.name = 'messageToBot';
      event.description = `chat: #id${message.from.id}\n@${message.from.username}\ntext: #${String(message.text).slice(1)}`;
      this.eventEmitter.emit('event', event);
      await this.chatService.verificationExistenceUser({
        id: message.from.id,
        first_name: message.from.first_name,
        last_name: message.from.last_name,
        username: message.from.username,
        language_code: message.from.language_code,
        allows_write_to_pm: true,
      });
      const replyMarkup: InlineKeyboardMarkup = {
        inline_keyboard: [
          [
            {
              text: 'Настройки ViktorinaOnlineBot',
              web_app: {
                url: `https://80q.ru/viktorinaonlinebot`,
              },
            },
          ],
        ],
      };
      const text = `
			<b>Здравствуйте!</b>\n\nСейчас проходит оптимизация и глобальное обновление бота.\nСвои пожелания по функционалу бота Вы можете отправить разработчику через приложение...
			`;
      await this.responsesService.sendMessage({
        chat_id: message.from.id,
        text: encodeURI(text),
        reply_markup: replyMarkup,
      });
    }
  }
}
