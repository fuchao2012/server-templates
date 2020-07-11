import {TgModule} from '@tiger/boot';
import {InfoModule} from '@tiger/info';
import {EjsModule} from '@tiger/ejs';

@TgModule({
    imports: [InfoModule, EjsModule],
    controllers: []
})
export class SharedModule {}
