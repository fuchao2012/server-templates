import WorkflowQueryController from './workflow-query.controller';
import {TestflowModule} from './testflow/testflow.module';
import {TgModule} from '@tiger/boot';

@TgModule({
    imports: [TestflowModule],
    controllers: [WorkflowQueryController]
})
export class WorkflowModule {}
