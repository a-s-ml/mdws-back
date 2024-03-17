"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ChatGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const ws_catch_all_filter_1 = require("../exceptions/ws-catch-all-filter");
const chat_service_1 = require("./chat.service");
const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();
let ChatGateway = ChatGateway_1 = class ChatGateway {
    constructor(chatService) {
        this.chatService = chatService;
        this.logger = new common_1.Logger(ChatGateway_1.name);
    }
    afterInit() {
        this.logger.log(`Websocket Gateway initialized.`);
    }
    async handleConnection(client) {
        var _a, _b, _c;
        const sockets = this.io.sockets;
        this.logger.debug(`Socket connected with userID: ${client.user}, pollID: ${client.chat}, and name: "${client.name}"`);
        this.logger.log(`WS Client with id: ${client.id} connected!`);
        this.logger.debug(`Number of connected sockets: ${sockets.size}`);
        const roomName = client.name;
        await client.join(roomName);
        const connectedClients = (_c = (_b = (_a = this.io.adapter.rooms) === null || _a === void 0 ? void 0 : _a.get(roomName)) === null || _b === void 0 ? void 0 : _b.size) !== null && _c !== void 0 ? _c : 0;
        this.logger.debug(`userID: ${client.user} joined room with name: ${roomName}`);
        this.logger.debug(`Total clients connected to room '${roomName}': ${connectedClients}`);
        const addParticipant = await this.chatService.addParticipant({
            chat: client.chat,
            user: client.user,
        });
        const dbchat = await this.chatService.getChat(client.chat);
        const dbuser = await this.chatService.userFindById(client.user);
        const updatedPoll = {
            type: 'connect',
            chat: dbchat,
            user: dbuser,
            text: null,
        };
        this.io.to(String(roomName)).emit('chat_updated', updatedPoll);
    }
    async handleDisconnect(client) {
        const { chat, user } = client;
        const removeParticipant = await this.chatService.removeParticipant(chat, user);
        const roomName = client.name;
        if (removeParticipant) {
            const dbchat = await this.chatService.getChat(chat);
            const dbuser = await this.chatService.userFindById(user);
            const updatedPoll = {
                type: 'disconnect',
                chat: dbchat,
                user: dbuser,
                text: null,
            };
            this.io.to(roomName).emit('chat_updated', updatedPoll);
        }
    }
    async removeParticipant(id, client) {
        const updatedPoll = await this.chatService.removeParticipant(client.chat, client.user);
        if (updatedPoll) {
            this.io.to(String(client.chat)).emit('chat_updated', {});
        }
    }
    async message(text, client) {
        const addMessage = await this.chatService.addMessage({
            chat: client.chat,
            user: client.user,
            text,
        });
        const roomName = client.name;
        const dbchat = await this.chatService.getChat(client.chat);
        const dbuser = await this.chatService.userFindById(client.user);
        const updatedPoll = {
            type: 'message',
            chat: dbchat,
            user: dbuser,
            text: addMessage,
        };
        this.io.to(roomName).emit('chat_updated', updatedPoll);
    }
    async roomjoin(data, client) {
        const { email, room } = data;
        emailToSocketIdMap.set(email, client.id);
        socketidToEmailMap.set(client.id, email);
        this.io.to(room).emit('user:joined', { email, id: client.id });
        client.join(room);
        this.io.to(client.id).emit('room:join', data);
    }
    async usercall(data, client) {
        const { to, offer } = data;
        this.io.to(to).emit('incomming:call', { from: client.id, offer });
    }
    async callaccepted(data, client) {
        const { to, ans } = data;
        this.io.to(to).emit('call:accepted', { from: client.id, ans });
    }
    async peernegoneeded(data, client) {
        const { to, offer } = data;
        console.log('peer:nego:needed', offer);
        this.io.to(to).emit('peer:nego:needed', { from: client.id, offer });
    }
    async peernegodone(data, client) {
        const { to, ans } = data;
        console.log('peer:nego:done', ans);
        this.io.to(to).emit('peer:nego:final', { from: client.id, ans });
    }
};
exports.ChatGateway = ChatGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Namespace)
], ChatGateway.prototype, "io", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('remove_participant'),
    __param(0, (0, websockets_1.MessageBody)('id')),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "removeParticipant", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('message'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "message", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('room:join'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "roomjoin", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('user:call'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "usercall", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('call:accepted'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "callaccepted", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('peer:nego:needed'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "peernegoneeded", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('peer:nego:done'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "peernegodone", null);
exports.ChatGateway = ChatGateway = ChatGateway_1 = __decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.UseFilters)(new ws_catch_all_filter_1.WsCatchAllFilter()),
    (0, websockets_1.WebSocketGateway)({
        namespace: 'chat',
    }),
    __metadata("design:paramtypes", [chat_service_1.ChatService])
], ChatGateway);
//# sourceMappingURL=chat.gateway.js.map