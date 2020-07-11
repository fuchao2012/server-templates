import { FlowData, FlowNodeMessage, FlowSubmitData, FlowSubmitNodeMessage } from '@eagle/workflow-node';
import { PostMapping, RequestMapping, RestController } from '@tiger/boot';
import { AjaxResult, AppConfig, RequestContext } from '@tiger/core';
import openid from '@tiger/openid';
import { isNullOrUndefined } from 'util';
import TestWorkflowService from '../testflow.service';

type SubmitResult = AjaxResult<string[]>;
type UpsertResult = AjaxResult<string>;

interface TestFlowSubmitNodeMessage extends FlowSubmitNodeMessage {
    /** 报告标题 */
    reportTitle?: string;
    /** 报告内容 */
    reportContent?: string;
}
interface TestFlowUpsertNodeMessage extends FlowNodeMessage {
     /** 报告标题 */
     reportTitle?: string;
     /** 报告内容 */
     reportContent?: string;
}

interface TestFlowSubmitData extends FlowSubmitData {
    flowNodeMessage: TestFlowSubmitNodeMessage;
}

interface TestFlowUpsertData extends FlowData {
    flowNodeMessage: TestFlowUpsertNodeMessage;
}
/**
 * 工单创建与提交
 */
@RestController
@RequestMapping('/workflow/workflow_test')
export default class TestWorkflowController {

    constructor(private workflow: TestWorkflowService) {
    }

    /**
     * 工单创建并提交，触发流程流转
     * {"flowMetaData":{},"flowNodeMessage":{}}
     */
    @PostMapping('/submit.do', [openid()()])
    async submit(ctx: RequestContext<TestFlowSubmitData, SubmitResult>) {
        if (isNullOrUndefined(ctx.request.body)) {
            return ctx.body = AjaxResult.badRequest('参数错误');
        }
        const { flowMetaData, flowNodeMessage } = ctx.request.body;
        // 0表示流程在处理中
        flowNodeMessage.businessStatus = 0;
        const userInfo = ctx.openIDInfo;
        try {
            const nextNodeIds = await this.workflow.submit(userInfo, flowMetaData, flowNodeMessage);
            ctx.body = AjaxResult.success(nextNodeIds);
        } catch (e) {
            console.error('工单提交失败:', e);
            ctx.body = AjaxResult.internal('工单提交失败');
        }
    }

    /**
     * 工单创建与保存草稿，不提交，不触发流转
     * {"flowMetaData":{},"flowNodeMessage":{}}
     */
    @PostMapping('/upsert.do', [openid()()])
    async upsert(ctx: RequestContext<TestFlowUpsertData, UpsertResult>) {
        if (isNullOrUndefined(ctx.request.body)) {
            return ctx.body = AjaxResult.badRequest('参数错误');
        }
        const { flowMetaData, flowNodeMessage } = ctx.request.body;
        // 0表示流程在处理中
        flowNodeMessage.businessStatus = 0;
        const userInfo = ctx.openIDInfo;
        try {
            const flowId = await this.workflow.upsert(userInfo, flowMetaData, flowNodeMessage);
            ctx.body = AjaxResult.success(flowId);
        } catch (e) {
            console.error('工单保存失败:', e);
            ctx.body = AjaxResult.internal('工单保存失败');
        }
    }
}
