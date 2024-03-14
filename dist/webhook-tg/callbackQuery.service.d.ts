import { EventEmitter2 } from '@nestjs/event-emitter';
import { ResponsesService } from './responses.service';
import { ChatService } from 'src/chats/chat.service';
import { CallbackQuery, Message } from 'src/types/tg-types';
export declare class CallbackQueryService {
    private eventEmitter;
    private chatService;
    private responsesService;
    constructor(eventEmitter: EventEmitter2, chatService: ChatService, responsesService: ResponsesService);
    update(callbackQuery: CallbackQuery): Promise<void>;
    message(message: Message): Promise<void>;
}
