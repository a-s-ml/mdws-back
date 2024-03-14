"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtModule = void 0;
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
exports.jwtModule = jwt_1.JwtModule.registerAsync({
    imports: [config_1.ConfigModule],
    useFactory: async (configService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
            expiresIn: parseInt(configService.get('POLL_DURATION')),
        },
    }),
    inject: [config_1.ConfigService],
});
//# sourceMappingURL=modules.config.js.map