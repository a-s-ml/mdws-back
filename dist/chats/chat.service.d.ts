import { JwtService } from '@nestjs/jwt';
import { DbService } from 'src/db/db.service';
import { Prisma } from '@prisma/client';
import { Chat, JoinChatFields } from './types';
export declare class ChatService {
    private readonly jwtService;
    private dbService;
    constructor(jwtService: JwtService, dbService: DbService);
    createChat(fields: Prisma.chatCreateInput): Promise<{
        chat: {
            id: number;
            name: string;
            admin: number;
            type: number;
        };
        accessToken: string;
    }>;
    joinChat(fields: JoinChatFields): Promise<{
        chat: {
            id: number;
            name: string;
            admin: number;
            type: number;
        };
        accessToken: string;
    }>;
    rejoinChat(fields: JoinChatFields): Promise<{
        id: number;
        name: string;
        admin: number;
        type: number;
    }>;
    addParticipant(addParticipant: Prisma.participantCreateInput): Promise<{
        id: number;
        user: number;
        chat: number;
    }>;
    removeParticipant(from: number, user: number): Promise<Prisma.BatchPayload>;
    getChat(id: number): Promise<Chat>;
    addMessage(fields: Prisma.messageCreateInput): Promise<{
        id: number;
        user: number;
        chat: number;
        text: string;
    }>;
}
