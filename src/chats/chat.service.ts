import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DbService } from 'src/db/db.service';
import { Prisma } from '@prisma/client';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  JoinChatFields,
  Chat,
  EventClass,
  responseValidate,
  responseUserData,
  responseUser,
} from 'src/types/types';
import { createHmac } from 'crypto';

@Injectable()
export class ChatService {
  constructor(
    private readonly jwtService: JwtService,
    private eventEmitter: EventEmitter2,
    private dbService: DbService,
  ) {}

  async createUser(fields: Prisma.userCreateInput) {
    return await this.dbService.user.create({
      data: {
        tgid: fields.tgid,
        type: fields.type,
        name: fields.name,
      },
    });
  }

  async createChat(fields: Prisma.chatCreateInput) {
    const chat = await this.dbService.chat.create({
      data: {
        name: fields.name,
        admin: fields.admin,
        type: fields.type,
      },
    });

    const signedString = this.jwtService.sign(
      {
        chat: chat.id,
        user: fields.admin,
      },
      {
        subject: fields.name,
      },
    );

    return {
      chat: chat,
      accessToken: signedString,
    };
  }

  async joinChat(fields: JoinChatFields) {
    const chat = await this.dbService.chat.findUnique({
      where: {
        id: fields.chat,
      },
    });

    const signedString = this.jwtService.sign(
      {
        chat: fields.chat,
        user: fields.user,
      },
      {
        subject: chat.name,
      },
    );

    return {
      chat: chat,
      accessToken: signedString,
    };
  }

  async rejoinChat(fields: JoinChatFields) {
    return await this.dbService.chat.findUnique({
      where: {
        id: fields.chat,
      },
    });
  }

  async addParticipant(addParticipant: Prisma.participantCreateInput) {
    return await this.dbService.participant.create({ data: addParticipant });
  }

  async removeParticipant(from: number, user: number) {
    const res = await this.dbService.participant.deleteMany({
      where: {
        chat: from,
        user: user,
      },
    });
    return res;
  }

  async getChat(id: number): Promise<Chat> {
    return this.dbService.chat.findUnique({
      where: {
        id,
      },
    });
  }

  async addMessage(fields: Prisma.messageCreateInput) {
    return this.dbService.message.create({
      data: {
        user: fields.user,
        chat: fields.chat,
        text: fields.text,
      },
    });
  }

  async verificationExistenceUser(from: responseUser) {
    const checkUser = await this.userFindByTgid(from.id);
    if (!checkUser) {
      const appId = await this.createUser({
        tgid: from.id,
        type: 1,
        name: from.username,
      });
      const event = new EventClass();
      event.name = 'newUser';
      event.description = `chat: #id${from.id}\nusername: @${from.username}`;
      this.eventEmitter.emit('event', event);
      return appId;
    }
    return checkUser;
  }

  async userFindByTgid(tgid: number) {
    return await this.dbService.user.findUnique({
      where: {
        tgid,
      },
    });
  }

  async userFindById(id: number) {
    return await this.dbService.user.findUnique({
      where: {
        id,
      },
    });
  }

  async userUpdateByTgid(tgid: number, updateChatDto: Prisma.chatUpdateInput) {
    return await this.dbService.user.update({
      where: {
        tgid,
      },
      data: updateChatDto,
    });
  }

  async validateUser(initData: string) {
    const urlParams = new URLSearchParams(initData);
    const hash = urlParams.get('hash');
    urlParams.delete('hash');
    urlParams.sort();

    const UserData: responseUserData = {
      appUser: null,
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

    //    if (validate) {
    const appId = await this.verificationExistenceUser(UserData.user);
    UserData.appUser = appId.id;
    //    }

    return (response = { validate, UserData });
  }
}
