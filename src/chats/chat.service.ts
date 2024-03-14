import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DbService } from 'src/db/db.service';
import { Prisma } from '@prisma/client';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserTg } from 'src/types/tg-types';
import { JoinChatFields, Chat, EventClass } from 'src/types/types';

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
    return await this.dbService.participant.deleteMany({
      where: {
        chat: from,
        user: user,
      },
    });
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

  async verificationExistenceUser(from: UserTg) {
    const checkUser = await this.userFindByTgid(from.id);
    if (!checkUser) {
      await this.createUser({
        tgid: from.id,
        type: 1,
        name: from.username,
      });
      const event = new EventClass();
      event.name = 'newUser';
      event.description = `chat: #id${from.id}\nusername: @${from.username}`;
      this.eventEmitter.emit('event', event);
    }
  }

  async userFindByTgid(tgid: number) {
    return await this.dbService.user.findUnique({
      where: {
        tgid,
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
}
