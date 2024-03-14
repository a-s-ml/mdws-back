import { Body, Controller, Post } from '@nestjs/common';
import { WebhookTgService } from './webhook-tg.service';
import { Update } from 'src/types/tg-types';

@Controller('webhook-tg')
export class WebhookTgController {
  constructor(private webhookTg: WebhookTgService) {}

  @Post()
  update(@Body() updateDto: Update) {
    return this.webhookTg.update(updateDto);
  }
}
