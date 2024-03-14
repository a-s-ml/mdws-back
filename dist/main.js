"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const socket_io_adapter_1 = require("./socket-io-adapter");
async function bootstrap() {
    const logger = new common_1.Logger('Main (main.ts)');
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const port = parseInt(configService.get('PORT'));
    const clientPort = parseInt(configService.get('CLIENT_PORT'));
    app.enableCors({
        origin: [
            `http://localhost:${clientPort}`,
            new RegExp(`/^http:\/\/192\.168\.1\.([1-9]|[1-9]\d):${clientPort}$/`),
        ],
    });
    app.useWebSocketAdapter(new socket_io_adapter_1.SocketIOAdapter(app, configService));
    await app.listen(port);
    logger.log(`Server running on port ${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map