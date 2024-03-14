import { Request } from 'express';
import { Socket } from 'socket.io';

export type JoinChatFields = {
  chat: number;
  user: number;
};

export type Chat = {
  id: number;
  name: string;
  admin: number;
  type: number;
};

export type User = {
  id: number;
  tgid: number;
  name: string;
  type: number;
};

export type Message = {
  id: number;
  user: number;
  chat: number;
};

export type Participant = {
  id: number;
  user: number;
  chat: number;
};

export type AuthPayload = {
  user: number;
  chat: number;
  name: string;
};

export type RequestWithAuth = Request & AuthPayload;
export type SocketWithAuth = Socket & AuthPayload;
