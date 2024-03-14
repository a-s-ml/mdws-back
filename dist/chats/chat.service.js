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
let ChatService = class ChatService {
    constructor(jwtService, dbService) {
        this.jwtService = jwtService;
        this.dbService = dbService;
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
        return await this.dbService.participant.deleteMany({
            where: {
                chat: from,
                user: user,
            },
        });
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
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        db_service_1.DbService])
], ChatService);
//# sourceMappingURL=chat.service.js.map