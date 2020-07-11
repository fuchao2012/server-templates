import TestflowConfig from '../testflow-config';
import TestWorkflowService from '../testflow.service';
import {
    FlowSubmitMetaData,
    MsgInfo,
    UserInfo,
    WorkflowCrypto
    } from '@eagle/workflow-node';
import { GetMapping, RequestMapping, RestController } from '@tiger/boot';
import { isNullOrUndefined } from 'util';
import { QueryContext } from '@tiger/core';

interface ApproveQuery {
    data: string;
}
/**
 * 链接审批
 */
@RestController
@RequestMapping('/workflow/workflow_test')
export default class ReportWorkflowLinkAuditController {
    constructor(private workflow: TestWorkflowService, private config: TestflowConfig) {
    }

    /**
     * 链接审批请求
     */
    @GetMapping('/approve')
    async approve(ctx: QueryContext<ApproveQuery, string>) {
        const crypto = new WorkflowCrypto(this.config.linkApprovePassword);
        const queryParam = ctx.query.data;

        if (isNullOrUndefined(queryParam)) {
            return ctx.body = '参数错误';
        }
        try {
            const msgInfo: MsgInfo = crypto.decipherMsg(queryParam);

            const userInfo: UserInfo = {
                fullname: msgInfo.fullname,
                email: msgInfo.email
            };
            const submitMetaData: FlowSubmitMetaData = {
                flowId: msgInfo.flowId,
                currentNodeId: msgInfo.nodeId,
                version: msgInfo.version
            };
            // 审批相关信息
            const flowNodeMessage = {
                approved: msgInfo.approved,
                operateRemark: msgInfo.approved ? '邮件审批通过' : '邮件审批拒绝',
                agency: false
            };

            await this.workflow.submit(userInfo, submitMetaData, flowNodeMessage);
            ctx.body = await this.workflow.getLinkApproveResult(true, '审批操作成功');

        } catch (e) {
            console.error('测试工单，审批失败', e);
            ctx.body = await this.workflow.getLinkApproveResult(false, '快捷审批链接已失败，请点击标题链接进行登录审批');

        }
    }

}
