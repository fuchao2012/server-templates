import { TgModule } from '@tiger/boot';
import { UserController } from './user.controller';

@TgModule({
    controllers: [UserController]
})
export class UserModule {

}
