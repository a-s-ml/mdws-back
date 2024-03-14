"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const modules_config_1 = require("../modules.config");
const chat_service_1 = require("./chat.service");
const db_service_1 = require("../db/db.service");
const chat_contoller_1 = require("./chat.contoller");
const chat_gateway_1 = require("./chat.gateway");
let ChatModule = class ChatModule {
};
exports.ChatModule = ChatModule;
exports.ChatModule = ChatModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule, modules_config_1.jwtModule],
        controllers: [chat_contoller_1.ChatController],
        providers: [chat_service_1.ChatService, chat_gateway_1.ChatGateway, db_service_1.DbService],
    })
], ChatModule);
//# sourceMappingURL=chat.module.js.map