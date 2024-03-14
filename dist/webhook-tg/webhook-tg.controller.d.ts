import { WebhookTgService } from './webhook-tg.service';
import { Update } from 'src/types/tg-types';
export declare class WebhookTgController {
    private webhookTg;
    constructor(webhookTg: WebhookTgService);
    update(updateDto: Update): Promise<void>;
}
