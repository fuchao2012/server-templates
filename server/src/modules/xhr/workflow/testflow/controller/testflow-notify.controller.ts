import TestWorkflowService from '../testflow.service';
import { AjaxResult, RequestContext } from '@tiger/core';
import { isNullOrUndefined } from 'util';
import { MpsPayload } from '@eagle/workflow-node';
import { PostMapping, RequestMapping, RestController } from '@tiger/boot';

export interface Notify {
    payload: string;
}
/**
 * [{"payload": "{\"flowId\":\"4392104\",\"nodeId\":\"30010301\"}"}]
 */
export type NotifyBody = Notify[];

export type NotifyResult = AjaxResult<string>;
/**
 * 工单通知接口
 */
@RestController
@RequestMapping('/workflow/workflow_test')
export default class TestWorkflowNotifyController {

    constructor(private workflow: TestWorkflowService) { }

    /**
     * 流程流转通知
     * [{"payload":"{\"flowId\": \"4668724\",\"nodeId\":\"30019902\"}"}]
     */
    @PostMapping('/notify.json')
    async notify(ctx: RequestContext<NotifyBody, NotifyResult>) {
        if (isNullOrUndefined(ctx.request.body)) {
            return ctx.body = AjaxResult.badRequest('参数错误');
        }

        const messages = ctx.request.body;
        for (const message of messages) {
            const payload: MpsPayload = JSON.parse(message.payload);

            const { flowMetaData, flowNodeMessage } = await this.workflow.getFlowDataTriggerByMps(payload);

            //  TODO 这里可以做些什么
            // 更新工单数据
            await this.workflow.update(flowMetaData, flowNodeMessage);

            const createrKeywords = '您的工单状态发生变更';

            await this.workflow.notifyCreater(flowMetaData, flowNodeMessage, createrKeywords);

            const keywords = '测试工单';
            // 否则，通知审批人
            await this.workflow.notifyApprover(flowMetaData, flowNodeMessage, keywords);

        }
        return ctx.body = AjaxResult.success();

    }

    /**
     * 流程结束通知
     * [{"payload": "{\"flowId\":\"4392104\",\"nodeId\":\"30010301\"}"}]
     */
    @PostMapping('/notifyEnd.json')
    async notifyEnd(ctx: RequestContext<NotifyBody, NotifyResult>) {
        if (isNullOrUndefined(ctx.request.body)) {
            return ctx.body = AjaxResult.badRequest('参数错误');
        }

        const messages = ctx.request.body[0];
        const payload: MpsPayload = JSON.parse(messages.payload);
        let flowMetaData = null;
        let flowNodeMessage = null;
        try {
            const flowData = await this.workflow.getFlowDataTriggerByMps(payload);
            flowMetaData = flowData.flowMetaData;
            flowNodeMessage = flowData.flowNodeMessage;
            // 更新业务状态
            flowNodeMessage.businessStatus = 1;
            await this.workflow.update(flowMetaData, flowNodeMessage);
        } catch (e) {
            console.error('测试工单，结束节点数据更新失败', e);
            return ctx.body = AjaxResult.internal('工单更新失败');
        }

        const keywords = '审批结束';
        await this.workflow.notifyCreater(flowMetaData, flowNodeMessage, keywords);
        // 通知跟踪人
        await this.workflow.notifyTrailer(flowMetaData, flowNodeMessage, '工单已经结束');
        ctx.body = AjaxResult.success();
    }

}
