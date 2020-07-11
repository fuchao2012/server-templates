import { Service } from '@tiger/boot';

@Service
export default class TestflowConfig {
    /**
     * 应用名称
     */
    appName: string = '模板工程';
    /**
     * 流程拓扑ID
     */
    topologyName: string = 'workflow_test';
    /**
     * 邮件链接审批的节点
     */
    linkApproveNodeIds: string[] = ['30019903'];
    /**
     * 链接审批加密密码
     */
    linkApprovePassword: string = 'approveemailpassword';
}
