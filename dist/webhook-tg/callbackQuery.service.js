"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallbackQueryService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const responses_service_1 = require("./responses.service");
const chat_service_1 = require("../chats/chat.service");
const types_1 = require("../types/types");
let CallbackQueryService = class CallbackQueryService {
    constructor(eventEmitter, chatService, responsesService) {
        this.eventEmitter = eventEmitter;
        this.chatService = chatService;
        this.responsesService = responsesService;
    }
    async update(callbackQuery) {
        const data = callbackQuery.data.split('_');
        switch (data[0]) {
            default:
                break;
        }
    }
    async message(message) {
        if (message.text === '/account' || message.text === '/start') {
            const event = new types_1.EventClass();
            event.name = 'messageToBot';
            event.description = `chat: #id${message.from.id}\n@${message.from.username}\ntext: #${String(message.text).slice(1)}`;
            this.eventEmitter.emit('event', event);
            await this.chatService.verificationExistenceUser(message.from);
            const replyMarkup = {
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
};
exports.CallbackQueryService = CallbackQueryService;
exports.CallbackQueryService = CallbackQueryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_emitter_1.EventEmitter2,
        chat_service_1.ChatService,
        responses_service_1.ResponsesService])
], CallbackQueryService);
//# sourceMappingURL=callbackQuery.service.js.map