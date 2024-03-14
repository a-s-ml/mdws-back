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

export type responseUserData = {
  query_id?: string | null;
  user: responseUser;
  auth_date: string;
};

export type responseValidate = {
  validate: boolean;
  UserData: responseUserData;
};

export type responseUser = {
  id: bigint;
  first_name: string;
  last_name: string;
  username: string;
  language_code: string;
  allows_write_to_pm: boolean;
};

export type AuthPayload = {
  user: number;
  chat: number;
  name: string;
};

export class EventClass {
  name: string;
  description: string;
}

export type RequestWithAuth = Request & AuthPayload;
export type SocketWithAuth = Socket & AuthPayload;
