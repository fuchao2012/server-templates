import {TgModule} from '@tiger/boot';
import {UserModule} from './user/user.module';
import {CategoryModule} from './goodscategory/goods-category.module';
import {WorkflowModule} from './workflow/workflow.module';

@TgModule({
    prefix: '/xhr',
    imports: [UserModule, CategoryModule, WorkflowModule],
    controllers: []
})
export class XhrModule {}
