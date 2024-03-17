import { JwtService } from '@nestjs/jwt';
import { DbService } from 'src/db/db.service';
import { Prisma } from '@prisma/client';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { JoinChatFields, Chat, responseUserData, responseUser } from 'src/types/types';
export declare class ChatService {
    private readonly jwtService;
    private eventEmitter;
    private dbService;
    constructor(jwtService: JwtService, eventEmitter: EventEmitter2, dbService: DbService);
    createUser(fields: Prisma.userCreateInput): Promise<{
        id: number;
        tgid: bigint;
        type: number;
        name: string;
    }>;
    createChat(fields: Prisma.chatCreateInput): Promise<{
        chat: {
            id: number;
            name: string;
            admin: number;
            type: number;
            title: string;
        };
        accessToken: string;
    }>;
    joinChat(fields: JoinChatFields): Promise<{
        chat: {
            id: number;
            name: string;
            admin: number;
            type: number;
            title: string;
        };
        accessToken: string;
    }>;
    rejoinChat(fields: JoinChatFields): Promise<{
        id: number;
        name: string;
        admin: number;
        type: number;
        title: string;
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
    verificationExistenceUser(from: responseUser): Promise<{
        id: number;
        tgid: bigint;
        type: number;
        name: string;
    }>;
    userFindByTgid(tgid: number): Promise<{
        id: number;
        tgid: bigint;
        type: number;
        name: string;
    }>;
    userFindById(id: number): Promise<{
        id: number;
        tgid: bigint;
        type: number;
        name: string;
    }>;
    userUpdateByTgid(tgid: number, updateChatDto: Prisma.chatUpdateInput): Promise<{
        id: number;
        tgid: bigint;
        type: number;
        name: string;
    }>;
    validateUser(initData: string): Promise<{
        validate: boolean;
        UserData: responseUserData;
    }>;
}
