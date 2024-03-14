import { EventEmitter2 } from '@nestjs/event-emitter';
import { responseUserData } from 'src/types/types';
export declare class ValidateService {
    private eventEmitter;
    constructor(eventEmitter: EventEmitter2);
    validateUser(initData: string): Promise<{
        validate: boolean;
        UserData: responseUserData;
    }>;
}
