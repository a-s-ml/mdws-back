"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const socket_io_adapter_1 = require("./socket-io-adapter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    app.setGlobalPrefix('mdws');
    const configService = app.get(config_1.ConfigService);
    const port = parseInt(configService.get('PORT'));
    app.useWebSocketAdapter(new socket_io_adapter_1.SocketIOAdapter(app, configService));
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map