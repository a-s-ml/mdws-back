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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatController = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const common_3 = require("@nestjs/common");
const controller_auth_guard_1 = require("./controller-auth.guard");
const client_1 = require("@prisma/client");
const chat_service_1 = require("./chat.service");
let ChatController = class ChatController {
    constructor(chatService) {
        this.chatService = chatService;
    }
    initData(initData) {
        return this.chatService.validateUser(initData);
    }
    messages(chat) {
        return this.chatService.getMessages(+chat);
    }
    users(id) {
        return this.chatService.userFindById(+id);
    }
    async create(createPollDto) {
        return await this.chatService.createChat(createPollDto);
    }
    async join(joinPollDto) {
        return await this.chatService.joinChat(joinPollDto);
    }
    async rejoin(request) {
        const { user, chat } = request;
        return await this.chatService.rejoinChat({
            chat,
            user,
        });
    }
};
exports.ChatController = ChatController;
__decorate([
    (0, common_1.Get)('validateUser/:initData'),
    __param(0, (0, common_1.Param)('initData')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "initData", null);
__decorate([
    (0, common_1.Get)('messages/:chat'),
    __param(0, (0, common_1.Param)('chat')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "messages", null);
__decorate([
    (0, common_1.Get)('users/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "users", null);
__decorate([
    (0, common_3.Post)(),
    __param(0, (0, common_3.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "create", null);
__decorate([
    (0, common_3.Post)('/join'),
    __param(0, (0, common_3.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "join", null);
__decorate([
    (0, common_2.UseGuards)(controller_auth_guard_1.ControllerAuthGuard),
    (0, common_3.Post)('/rejoin'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "rejoin", null);
exports.ChatController = ChatController = __decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_3.Controller)('chats'),
    __metadata("design:paramtypes", [chat_service_1.ChatService])
], ChatController);
//# sourceMappingURL=chat.contoller.js.map