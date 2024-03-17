import { Logger, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  OnGatewayInit,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Namespace } from 'socket.io';
import { WsCatchAllFilter } from 'src/exceptions/ws-catch-all-filter';
import { ChatService } from './chat.service';
import { SocketWithAuth, UpdatedPoll } from 'src/types/types';
import { Prisma } from '@prisma/client';

@UsePipes(new ValidationPipe())
@UseFilters(new WsCatchAllFilter())
@WebSocketGateway({
  namespace: 'chat',
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(ChatGateway.name);
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer() io: Namespace;

  afterInit(): void {
    this.logger.log(`Websocket Gateway initialized.`);
  }

  async handleConnection(client: SocketWithAuth) {
    const sockets = this.io.sockets;
    this.logger.debug(
      `Socket connected with userID: ${client.user}, pollID: ${client.chat}, and name: "${client.name}"`,
    );

    this.logger.log(`WS Client with id: ${client.id} connected!`);
    this.logger.debug(`Number of connected sockets: ${sockets.size}`);

    const roomName = client.name;
    await client.join(roomName);

    const connectedClients = this.io.adapter.rooms?.get(roomName)?.size ?? 0;

    this.logger.debug(
      `userID: ${client.user} joined room with name: ${roomName}`,
    );
    this.logger.debug(
      `Total clients connected to room '${roomName}': ${connectedClients}`,
    );

    const addParticipant = await this.chatService.addParticipant({
      chat: client.chat,
      user: client.user,
    });

    let updatedPoll: UpdatedPoll;
    const dbchat = await this.chatService.getChat(client.chat);
    const dbuser = await this.chatService.userFindByTgid(client.user);

    updatedPoll.type = 'connect';
    updatedPoll.chat = dbchat;
    updatedPoll.user = dbuser;
    updatedPoll.text = null;

    this.io.to(String(roomName)).emit('chat_updated', updatedPoll);
  }

  async handleDisconnect(client: SocketWithAuth) {
    const { chat, user } = client;
    const removeParticipant: Prisma.BatchPayload =
      await this.chatService.removeParticipant(chat, user);

    const roomName = client.name;

    if (removeParticipant) {
      let updatedPoll: UpdatedPoll;
      const dbchat = await this.chatService.getChat(chat);
      const dbuser = await this.chatService.userFindByTgid(user);
  
      updatedPoll.type = 'disconnect';
      updatedPoll.chat = dbchat;
      updatedPoll.user = dbuser;
      updatedPoll.text = null;
      
      this.io.to(roomName).emit('chat_updated', updatedPoll);
    }
  }

  @SubscribeMessage('remove_participant')
  async removeParticipant(
    @MessageBody('id') id: string,
    @ConnectedSocket() client: SocketWithAuth,
  ) {
    const updatedPoll = await this.chatService.removeParticipant(
      client.chat,
      client.user,
    );

    if (updatedPoll) {
      this.io.to(String(client.chat)).emit('chat_updated', {});
    }
  }

  @SubscribeMessage('message')
  async message(
    @MessageBody() text: string,
    @ConnectedSocket() client: SocketWithAuth,
  ): Promise<void> {
    const addMessage = await this.chatService.addMessage({
      chat: client.chat,
      user: client.user,
      text,
    });

    const roomName = client.name;

    let updatedPoll: UpdatedPoll;
    const dbchat = await this.chatService.getChat(client.chat);
    const dbuser = await this.chatService.userFindByTgid(client.user);

    updatedPoll.type = 'message';
    updatedPoll.chat = dbchat;
    updatedPoll.user = dbuser;
    updatedPoll.text = addMessage;

    this.io.to(roomName).emit('chat_updated', updatedPoll);
  }
}
