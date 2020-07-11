import TestflowConfig from './testflow-config';
import {
    BaseWorkflow,
    FlowMetaData,
    FlowNodeMessage,
    SkipParam
    } from '@eagle/workflow-node';
import { Service } from '@tiger/boot';

@Service
export default class TestWorkflow extends BaseWorkflow {
    constructor(config: TestflowConfig) {
        super(config);
    }
    /**
     * @description 获取节点的审批人信息。处理各个节点
     * @param flowMetaData 工单元数据
     * @param flowNodeMessage 工单业务数据
     * @returns string[] 审批人uid列表
     */
    async getApproverList(flowMetaData: FlowMetaData, flowNodeMessage: FlowNodeMessage): Promise<string[]> {
        const currentNodeId = flowMetaData.currentNodeId;
        let approverUsers: string[] = [];
        switch (currentNodeId) {
            // 产品经理审批
            case '30019902':
            // 申请人
            case '30019901':
            // 反馈人确认
            case '30019903':
            // 拒绝节点
            case '30019904':
                approverUsers = [flowNodeMessage.createUser];
                break;
            default:
                break;
        }
        return approverUsers;
    }

    /**
     * @description 流程跳转条件, 如果有多条件的跳转，需要用户进行重写实现，处理各个节点的跳转条件设置
     * @param flowMetaData
     * @param flowNodeMessage
     */
    async getCustomSkipParam(flowMetaData: FlowMetaData, flowNodeMessage: FlowNodeMessage): Promise<SkipParam> {
        const skipParam: SkipParam = { approved: !!flowNodeMessage.approved, paramMap: {} };

        // 更多的跳转条件设置
        return skipParam;
    }
}
