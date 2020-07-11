import { BaseWorkflowQuery } from '@eagle/workflow-node';
import { Service } from '@tiger/boot';
import * as config from '../../../conf';

@Service
export default class WorkflowQuery extends BaseWorkflowQuery {
    constructor() {
        super(config.productCode);
    }
}
