import { StaticController } from './static.controller';
import { TgModule } from '@tiger/boot';

@TgModule({
    controllers: [StaticController]
})
export class StaticModule {}
