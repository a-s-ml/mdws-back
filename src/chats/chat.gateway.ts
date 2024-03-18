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

const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();

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

    const roomName = client.name;
    await client.join(roomName);

    const connectedClients = this.io.adapter.rooms?.get(roomName)?.size ?? 0;

    const addParticipant = await this.chatService.addParticipant({
      chat: client.chat,
      user: client.user,
    });

    const dbchat = await this.chatService.getChat(client.chat);
    const dbuser = await this.chatService.userFindById(client.user);

    const updatedPoll: UpdatedPoll = {
      size: connectedClients,
      type: 'connect',
      chat: dbchat,
      user: dbuser,
      text: null,
    };

    this.io.to(String(roomName)).emit('chat_updated', updatedPoll);
  }

  async handleDisconnect(client: SocketWithAuth) {
    const { chat, user } = client;
    const removeParticipant: Prisma.BatchPayload =
      await this.chatService.removeParticipant(chat, user);

    const roomName = client.name;

    if (removeParticipant) {
      const dbchat = await this.chatService.getChat(chat);
      const dbuser = await this.chatService.userFindById(user);
      const connectedClients = this.io.adapter.rooms?.get(roomName)?.size ?? 0;

      const updatedPoll: UpdatedPoll = {
        size: connectedClients,
        type: 'disconnect',
        chat: dbchat,
        user: dbuser,
        text: null,
      };

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

    const dbchat = await this.chatService.getChat(client.chat);
    const dbuser = await this.chatService.userFindById(client.user);
    const connectedClients = this.io.adapter.rooms?.get(roomName)?.size ?? 0;

    const updatedPoll: UpdatedPoll = {
      size: connectedClients,
      type: 'message',
      chat: dbchat,
      user: dbuser,
      text: addMessage,
    };

    this.io.to(roomName).emit('chat_updated', updatedPoll);
  }

  @SubscribeMessage('room:join')
  async roomjoin(
    @MessageBody() data: any,
    @ConnectedSocket() client: SocketWithAuth,
  ): Promise<void> {
    const { email, room } = data;
    emailToSocketIdMap.set(email, client.id);
    socketidToEmailMap.set(client.id, email);
    this.io.to(room).emit('user:joined', { email, id: client.id });
    client.join(room);
    this.io.to(client.id).emit('room:join', data);
  }

  @SubscribeMessage('user:call')
  async usercall(
    @MessageBody() data: any,
    @ConnectedSocket() client: SocketWithAuth,
  ): Promise<void> {
    const { to, offer }: any = data;
    this.io.to(to).emit('incomming:call', { from: client.id, offer });
  }

  @SubscribeMessage('call:accepted')
  async callaccepted(
    @MessageBody() data: any,
    @ConnectedSocket() client: SocketWithAuth,
  ): Promise<void> {
    const { to, ans }: any = data;
    this.io.to(to).emit('call:accepted', { from: client.id, ans });
  }

  @SubscribeMessage('peer:nego:needed')
  async peernegoneeded(
    @MessageBody() data: any,
    @ConnectedSocket() client: SocketWithAuth,
  ): Promise<void> {
    const { to, offer }: any = data;
    console.log('peer:nego:needed', offer);
    this.io.to(to).emit('peer:nego:needed', { from: client.id, offer });
  }

  @SubscribeMessage('peer:nego:done')
  async peernegodone(
    @MessageBody() data: any,
    @ConnectedSocket() client: SocketWithAuth,
  ): Promise<void> {
    const { to, ans }: any = data;
    console.log('peer:nego:done', ans);
    this.io.to(to).emit('peer:nego:final', { from: client.id, ans });
  }
}
