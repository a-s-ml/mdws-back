import { CallbackQueryService } from './callbackQuery.service';
import { Update } from 'src/types/tg-types';
export declare class WebhookTgService {
    private callbackQueryService;
    constructor(callbackQueryService: CallbackQueryService);
    update(updateDto: Update): Promise<void>;
}
