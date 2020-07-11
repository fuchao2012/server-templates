import {
    AllFlowData,
    FlowData,
    IPageSearch,
    OpLogPo,
    TopoGraph
} from '@eagle/workflow-node';
import {PostMapping, RequestMapping, RestController} from '@tiger/boot';
import {AjaxResult, AjaxSearchResult, RequestContext} from '@tiger/core';
import openid from '@tiger/openid';
import {isNullOrUndefined} from 'util';
import WorkflowQuery from './workflow-query.service';

interface QueryDetail {
    flowId: string;
}

interface QueryGraph {
    topologyId: string;
}

interface QueryAll extends QueryDetail, QueryGraph {}
/**
 * 工单查询
 */
@RestController
@RequestMapping('/workflow', [openid()()])
export default class WorkflowQueryController {
    constructor(private query: WorkflowQuery) {}

    /** 查询工单聚合信息 */
    @PostMapping('/get.json')
    async queryAll(ctx: RequestContext<QueryAll, AjaxResult<AllFlowData>>) {
        if (isNullOrUndefined(ctx.request.body)) {
            return (ctx.body = AjaxResult.badRequest('参数错误'));
        }
        const {flowId, topologyId} = ctx.request.body;
        try {
            const allData = await this.query.getAll(topologyId, flowId);
            ctx.body = AjaxResult.success(allData);
        } catch (e) {
            console.error('查询工单聚合信息失败:', e);
            ctx.body = AjaxResult.internal('查询工单聚合信息失败');
        }
    }
    /**
     * 查询工单详情
     */
    @PostMapping('/queryFlowDetail.json')
    async queryDetail(ctx: RequestContext<QueryDetail, AjaxResult<FlowData>>) {
        if (isNullOrUndefined(ctx.request.body)) {
            return (ctx.body = AjaxResult.badRequest('参数错误'));
        }
        const userInfo = ctx.openIDInfo;
        const {flowId} = ctx.request.body;
        try {
            const rst = await this.query.detailQuery(
                flowId,
                '',
                userInfo.email
            );

            const observerList = rst.flowNodeMessage.observerList;
            if (observerList && !observerList.includes(userInfo.email)) {
                // if (!ctx.session.permission.permExps.includes('monitor-flows')) {
                return (ctx.body = AjaxResult.forbidden('权限不够'));
                // }
            }
            ctx.body = AjaxResult.success(rst);
        } catch (e) {
            console.error('查询工单详情失败:', e);
            ctx.body = AjaxResult.internal('查询工单详情失败');
        }
    }

    /**
     * 查询工单历史
     */
    @PostMapping('/queryHistory.json')
    async queryHistory(
        ctx: RequestContext<QueryDetail, AjaxResult<OpLogPo[]>>
    ) {
        if (isNullOrUndefined(ctx.request.body)) {
            return (ctx.body = AjaxResult.badRequest('参数错误'));
        }
        const userInfo = ctx.openIDInfo;
        const {flowId} = ctx.request.body;
        try {
            const rst = await this.query.detailQuery(
                flowId,
                '',
                userInfo.email
            );

            const observerList = rst.flowNodeMessage.observerList;
            if (observerList && !observerList.includes(userInfo.email)) {
                // if (!ctx.session.permission.permExps.includes('monitor-flows')) {
                return (ctx.body = AjaxResult.forbidden('权限不够'));
                // }
            }
            const history = await this.query.historyQuery(flowId);

            ctx.body = AjaxResult.success(history);
        } catch (e) {
            console.error('查询工单操作历史失败:', e);
            ctx.body = AjaxResult.internal('查询工单操作历史失败');
        }
    }

    /**
     * 查询拓扑图
     */
    @PostMapping('/queryFlowMap.json')
    async queryFlowMap(ctx: RequestContext<QueryGraph, AjaxResult<TopoGraph>>) {
        if (isNullOrUndefined(ctx.request.body)) {
            return (ctx.body = AjaxResult.badRequest('参数错误'));
        }
        const {topologyId} = ctx.request.body;
        try {
            const graph = await this.query.getBpmFlowMap(topologyId);

            ctx.body = AjaxResult.success(graph);
        } catch (e) {
            console.error('查询拓扑图失败:', e);
            ctx.body = AjaxResult.internal('查询拓扑图失败');
        }
    }

    /**
     * 查询创建的工单列表，分页
     */
    @PostMapping('/queryCreatedList.json')
    async queryCreatedList(
        ctx: RequestContext<IPageSearch, AjaxSearchResult<FlowData>>
    ) {
        if (isNullOrUndefined(ctx.request.body)) {
            return (ctx.body = AjaxResult.badRequest('参数错误'));
        }
        const queryParam = {
            sortBy: ['-updateTime'],
            ...ctx.request.body
        };
        const userInfo = ctx.openIDInfo;
        try {
            const list = await this.query.searchByCreator(
                userInfo.email,
                queryParam
            );

            ctx.body = AjaxResult.success(list);
        } catch (e) {
            console.error('查询创建的工单列表，失败:', e);
            ctx.body = AjaxResult.internal('查询创建的工单列表失败');
        }
    }

    /**
     * 查询待我审核的工单列表，分页
     */
    @PostMapping('/queryDealingList.json')
    async queryDealingList(
        ctx: RequestContext<IPageSearch, AjaxSearchResult<FlowData>>
    ) {
        if (isNullOrUndefined(ctx.request.body)) {
            return (ctx.body = AjaxResult.badRequest('参数错误'));
        }
        const queryParam = {
            sortBy: ['-updateTime'],
            ...ctx.request.body
        };
        const userInfo = ctx.openIDInfo;
        try {
            const list = await this.query.searchByAuditing(
                userInfo.email,
                queryParam
            );

            ctx.body = AjaxResult.success(list);
        } catch (e) {
            console.error('查询待我审核的工单列表，失败:', e);
            ctx.body = AjaxResult.internal('查询待我审核的工单列表失败');
        }
    }

    /**
     * 查询我处理过的工单列表，分页
     */
    @PostMapping('/queryDealedList.json')
    async queryDealedList(
        ctx: RequestContext<IPageSearch, AjaxSearchResult<FlowData>>
    ) {
        if (isNullOrUndefined(ctx.request.body)) {
            return (ctx.body = AjaxResult.badRequest('参数错误'));
        }
        const queryParam = {
            sortBy: ['-updateTime'],
            ...ctx.request.body
        };
        const userInfo = ctx.openIDInfo;
        try {
            const list = await this.query.searchByAudited(
                userInfo.email,
                queryParam
            );

            ctx.body = AjaxResult.success(list);
        } catch (e) {
            console.error('查询处理过的工单列表，失败:', e);
            ctx.body = AjaxResult.internal('查询处理过的工单列表失败');
        }
    }

    /**
     * 查询我跟踪的工单列表，分页
     */
    @PostMapping('/queryTrailedList.json')
    async queryTrailedList(
        ctx: RequestContext<IPageSearch, AjaxSearchResult<FlowData>>
    ) {
        if (isNullOrUndefined(ctx.request.body)) {
            return (ctx.body = AjaxResult.badRequest('参数错误'));
        }
        const queryParam = {
            sortBy: ['-updateTime'],
            ...ctx.request.body
        };
        const userInfo = ctx.openIDInfo;
        try {
            const list = await this.query.searchByTrailed(
                userInfo.email,
                queryParam
            );

            ctx.body = AjaxResult.success(list);
        } catch (e) {
            console.error('查询跟踪的工单列表，失败:', e);
            ctx.body = AjaxResult.internal('查询跟踪的工单列表失败');
        }
    }

    /**
     * 查询我监控的工单列表，分页
     */
    @PostMapping('/queryMonitorList.json')
    async queryMonitorList(
        ctx: RequestContext<IPageSearch, AjaxSearchResult<FlowData>>
    ) {
        // 判断权限
        // if (!ctx.session.permission.permExps.includes('monitor-flows')) {
        //     return ctx.body = AjaxResult.forbidden('对不起，您没有访问权限！');
        // }
        if (isNullOrUndefined(ctx.request.body)) {
            return (ctx.body = AjaxResult.badRequest('参数错误'));
        }
        const queryParam = {
            sortBy: ['-updateTime'],
            ...ctx.request.body
        };
        try {
            const list = await this.query.search(queryParam);

            ctx.body = AjaxResult.success(list);
        } catch (e) {
            console.error('查询监控的工单列表，失败:', e);
            ctx.body = AjaxResult.internal('查询监控的工单列表失败');
        }
    }
}
