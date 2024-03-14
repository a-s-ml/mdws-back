import { Injectable } from '@nestjs/common';
import { createHmac } from 'crypto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  EventClass,
  responseUserData,
  responseValidate,
} from 'src/types/types';

@Injectable()
export class ValidateService {
  constructor(private eventEmitter: EventEmitter2) {}

  async validateUser(initData: string) {
    const urlParams = new URLSearchParams(initData);
    const hash = urlParams.get('hash');
    urlParams.delete('hash');
    urlParams.sort();

    const UserData: responseUserData = {
      query_id: urlParams.get('query_id'),
      user: JSON.parse(urlParams.get('user')),
      auth_date: urlParams.get('auth_date'),
    };

    let dataCheckString = '';
    for (const [key, value] of urlParams.entries()) {
      dataCheckString += `${key}=${value}\n`;
    }
    dataCheckString = dataCheckString.slice(0, -1);

    const secret = createHmac('sha256', 'WebAppData').update(
      process.env.TOKEN ?? '',
    );
    const calculatedHash = createHmac('sha256', secret.digest())
      .update(dataCheckString)
      .digest('hex');

    const validate = calculatedHash === hash;

    let response: responseValidate;

    const event = new EventClass();
    event.name = 'webAppValidate';
    event.description = `chat: #id${UserData.user.id}\nvalidate: #${String(
      validate,
    )}`;
    this.eventEmitter.emit('event', event);

    return (response = { validate, UserData });
  }
}
