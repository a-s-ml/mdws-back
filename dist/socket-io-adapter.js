"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketIOAdapter = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const platform_socket_io_1 = require("@nestjs/platform-socket.io");
class SocketIOAdapter extends platform_socket_io_1.IoAdapter {
    constructor(app, configService) {
        super(app);
        this.app = app;
        this.configService = configService;
        this.logger = new common_1.Logger(SocketIOAdapter.name);
    }
    createIOServer(port, options) {
        const jwtService = this.app.get(jwt_1.JwtService);
        const server = super.createIOServer(port);
        server.of('mdws/chat').use(createTokenMiddleware(jwtService, this.logger));
        return server;
    }
}
exports.SocketIOAdapter = SocketIOAdapter;
const createTokenMiddleware = (jwtService, logger) => (socket, next) => {
    const token = socket.handshake.auth.token || socket.handshake.headers['token'];
    logger.debug(`Validating auth token before connection: ${token}`);
    try {
        const payload = jwtService.verify(token);
        socket.name = payload.sub;
        socket.chat = payload.chat;
        socket.user = payload.user;
        next();
    }
    catch (_a) {
        next(new Error('FORBIDDEN'));
    }
};
//# sourceMappingURL=socket-io-adapter.js.map