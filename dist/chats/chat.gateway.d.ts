import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Namespace } from 'socket.io';
import { ChatService } from './chat.service';
import { SocketWithAuth } from 'src/types/types';
type joinRoomData = {
    email: string;
    room: string;
};
export declare class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly chatService;
    private readonly logger;
    constructor(chatService: ChatService);
    io: Namespace;
    afterInit(): void;
    handleConnection(client: SocketWithAuth): Promise<void>;
    handleDisconnect(client: SocketWithAuth): Promise<void>;
    removeParticipant(id: string, client: SocketWithAuth): Promise<void>;
    message(text: string, client: SocketWithAuth): Promise<void>;
    roomjoin(data: joinRoomData, client: SocketWithAuth): Promise<void>;
    usercall(data: joinRoomData, client: SocketWithAuth): Promise<void>;
    callaccepted(data: joinRoomData, client: SocketWithAuth): Promise<void>;
    peernegoneeded(data: joinRoomData, client: SocketWithAuth): Promise<void>;
    peernegodone(data: any, client: SocketWithAuth): Promise<void>;
}
export {};
