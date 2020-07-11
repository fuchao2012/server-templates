import ReportWorkflowLinkAuditController from './controller/testflow-link-audit.controller';
import TestWorkflowController from './controller/testflow-upsert.controller';
import TestWorkflowNotifyController from './controller/testflow-notify.controller';
import { TgModule } from '@tiger/boot';

@TgModule({
    controllers: [TestWorkflowController,TestWorkflowNotifyController,ReportWorkflowLinkAuditController]
})
export class TestflowModule {

}
