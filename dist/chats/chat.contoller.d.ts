import { Prisma } from '@prisma/client';
import { ChatService } from './chat.service';
import { JoinChatFields, RequestWithAuth } from 'src/types/types';
export declare class ChatController {
    private chatService;
    constructor(chatService: ChatService);
    create(createPollDto: Prisma.chatCreateInput): Promise<{
        chat: {
            id: number;
            name: string;
            admin: number;
            type: number;
        };
        accessToken: string;
    }>;
    join(joinPollDto: JoinChatFields): Promise<{
        chat: {
            id: number;
            name: string;
            admin: number;
            type: number;
        };
        accessToken: string;
    }>;
    rejoin(request: RequestWithAuth): Promise<{
        id: number;
        name: string;
        admin: number;
        type: number;
    }>;
}
