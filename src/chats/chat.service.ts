import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DbService } from 'src/db/db.service';
import { Prisma } from '@prisma/client';
import { Chat, JoinChatFields, User } from './types';

@Injectable()
export class ChatService {
  constructor(
    private readonly jwtService: JwtService,
    private dbService: DbService,
  ) {}
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
}
