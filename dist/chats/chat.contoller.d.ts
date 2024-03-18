import { Prisma } from '@prisma/client';
import { ChatService } from './chat.service';
import { JoinChatFields, RequestWithAuth } from 'src/types/types';
export declare class ChatController {
    private chatService;
    constructor(chatService: ChatService);
    initData(initData: string): Promise<{
        validate: boolean;
        UserData: import("src/types/types").responseUserData;
    }>;
    messages(chat: number): Promise<{
        id: number;
        user: number;
        chat: number;
        text: string;
    }[]>;
    users(id: number): Promise<{
        id: number;
        tgid: bigint;
        type: number;
        name: string;
    }>;
    create(createPollDto: Prisma.chatCreateInput): Promise<{
        chat: {
            id: number;
            name: string;
            admin: number;
            type: number;
            title: string;
        };
        accessToken: string;
    }>;
    join(joinPollDto: JoinChatFields): Promise<{
        chat: {
            id: number;
            name: string;
            admin: number;
            type: number;
            title: string;
        };
        accessToken: string;
    }>;
    rejoin(request: RequestWithAuth): Promise<{
        id: number;
        name: string;
        admin: number;
        type: number;
        title: string;
    }>;
}
