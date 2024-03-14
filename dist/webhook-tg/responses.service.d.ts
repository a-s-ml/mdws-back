import 'dotenv/config';
import { AnswerCallbackQueryMethod, EditMessageCaptionMethod, EditMessageTextMethod, SendMessageMethod, SendPhotoMethod, SendPollMethod, editMessageReplyMarkupMethod } from 'src/types/tg-types';
export declare class ResponsesService {
    sendMessage(message: SendMessageMethod): Promise<any>;
    editMessageText(message: EditMessageTextMethod): Promise<any>;
    sendPoll(message: SendPollMethod): Promise<any>;
    editMessageCaption(message: EditMessageCaptionMethod): Promise<any>;
    sendPhoto(message: SendPhotoMethod): Promise<any>;
    editMessageReplyMarkup(message: editMessageReplyMarkupMethod): Promise<any>;
    answerCallbackQuery(answerCallbackQuery: AnswerCallbackQueryMethod): Promise<any>;
    sendChatAction(chat: bigint, action: string): Promise<any>;
}
