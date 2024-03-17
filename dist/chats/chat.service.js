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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const db_service_1 = require("../db/db.service");
const event_emitter_1 = require("@nestjs/event-emitter");
const types_1 = require("../types/types");
const crypto_1 = require("crypto");
let ChatService = class ChatService {
    constructor(jwtService, eventEmitter, dbService) {
        this.jwtService = jwtService;
        this.eventEmitter = eventEmitter;
        this.dbService = dbService;
    }
    async createUser(fields) {
        return await this.dbService.user.create({
            data: {
                tgid: fields.tgid,
                type: fields.type,
                name: fields.name,
            },
        });
    }
    async createChat(fields) {
        const chat = await this.dbService.chat.create({
            data: {
                name: fields.name,
                admin: fields.admin,
                type: fields.type,
            },
        });
        const signedString = this.jwtService.sign({
            chat: chat.id,
            user: fields.admin,
        }, {
            subject: fields.name,
        });
        return {
            chat: chat,
            accessToken: signedString,
        };
    }
    async joinChat(fields) {
        const chat = await this.dbService.chat.findUnique({
            where: {
                id: fields.chat,
            },
        });
        const signedString = this.jwtService.sign({
            chat: fields.chat,
            user: fields.user,
        }, {
            subject: chat.name,
        });
        return {
            chat: chat,
            accessToken: signedString,
        };
    }
    async rejoinChat(fields) {
        return await this.dbService.chat.findUnique({
            where: {
                id: fields.chat,
            },
        });
    }
    async addParticipant(addParticipant) {
        return await this.dbService.participant.create({ data: addParticipant });
    }
    async removeParticipant(from, user) {
        const res = await this.dbService.participant.deleteMany({
            where: {
                chat: from,
                user: user,
            },
        });
        return res;
    }
    async getChat(id) {
        return this.dbService.chat.findUnique({
            where: {
                id,
            },
        });
    }
    async addMessage(fields) {
        return this.dbService.message.create({
            data: {
                user: fields.user,
                chat: fields.chat,
                text: fields.text,
            },
        });
    }
    async verificationExistenceUser(from) {
        const checkUser = await this.userFindByTgid(from.id);
        if (!checkUser) {
            const appId = await this.createUser({
                tgid: from.id,
                type: 1,
                name: from.username,
            });
            const event = new types_1.EventClass();
            event.name = 'newUser';
            event.description = `chat: #id${from.id}\nusername: @${from.username}`;
            this.eventEmitter.emit('event', event);
            return appId;
        }
        return checkUser;
    }
    async userFindByTgid(tgid) {
        return await this.dbService.user.findUnique({
            where: {
                tgid,
            },
        });
    }
    async userUpdateByTgid(tgid, updateChatDto) {
        return await this.dbService.user.update({
            where: {
                tgid,
            },
            data: updateChatDto,
        });
    }
    async validateUser(initData) {
        var _a;
        const urlParams = new URLSearchParams(initData);
        const hash = urlParams.get('hash');
        urlParams.delete('hash');
        urlParams.sort();
        const UserData = {
            appUser: null,
            query_id: urlParams.get('query_id'),
            user: JSON.parse(urlParams.get('user')),
            auth_date: urlParams.get('auth_date'),
        };
        let dataCheckString = '';
        for (const [key, value] of urlParams.entries()) {
            dataCheckString += `${key}=${value}\n`;
        }
        dataCheckString = dataCheckString.slice(0, -1);
        const secret = (0, crypto_1.createHmac)('sha256', 'WebAppData').update((_a = process.env.TOKEN) !== null && _a !== void 0 ? _a : '');
        const calculatedHash = (0, crypto_1.createHmac)('sha256', secret.digest())
            .update(dataCheckString)
            .digest('hex');
        const validate = calculatedHash === hash;
        let response;
        const event = new types_1.EventClass();
        event.name = 'webAppValidate';
        event.description = `chat: #id${UserData.user.id}\nvalidate: #${String(validate)}`;
        this.eventEmitter.emit('event', event);
        const appId = await this.verificationExistenceUser(UserData.user);
        UserData.appUser = appId.id;
        return (response = { validate, UserData });
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        event_emitter_1.EventEmitter2,
        db_service_1.DbService])
], ChatService);
//# sourceMappingURL=chat.service.js.map