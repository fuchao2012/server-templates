/**
 * @description
 * 此文件主要用于配置基础的转发代理服务
 */
import proxy from '@tiger/proxy';
import { Middleware } from 'koa';
import Router from 'koa-router';
import * as config from '../conf';

const router = new Router({
    prefix: config.contextPath
});

// 权限中心的转发配置
router.all('/xhr/userCenterManage/*', proxy('*', config.umcProxyOptions));

// 配置需要直接转发的应用模块 TODO
router.all('/xhr/proxy-module1/*', proxy('*', config.appProxyOptions));

const middleware: Middleware = router.routes();
export default middleware;
