import tigerCache from '@tiger/cache';
import tigerError from '@tiger/error';
import { HealthModule } from '@tiger/health';
import tigerLogger from '@tiger/logger';
import tigerOpenid from '@tiger/openid';
import tigerPermission from '@tiger/permission';
import tigerSession from '@tiger/session';
import swagger from '@tiger/swagger';
import Application, { Context } from 'koa';
import * as config from '../conf';
import etag from './etag.middleware';
import proxyRoutes from '../proxy';
import { bodyParser } from '@tiger/core';

export function loadEagleMiddleware(app: Application) {
    const contextPath = config.contextPath;
    const userPaths = [`${contextPath}/xhr/(.*)`];
    // swagger 生成
    // 允许代理模式
    app.proxy = true;

    // 异常处理中间件
    app.use(tigerError());

    // HTTP 日志中间件
    app.use(tigerLogger());

    // consul心跳检查
    app.use((HealthModule as any).routes());

    // 缓存这块
    app.use(etag);

    // openid
    app.use(tigerOpenid({})({
        include: [`${contextPath}/`, `${contextPath}/*.html`, ...userPaths]
    }));

    // 负责转发部分
    app.use(proxyRoutes);

    // session
    // 配置session中间件的缓存
    const cacheStore = tigerCache('memory', {});

    // session 中间件
    app.use(
        tigerSession(
            {
                cacheStore,
                getUid: (ctx: Context): string => {
                    // 获取email作为存储的key
                    return ctx.openIDInfo.email;
                },
                // 10秒缓存
                ttl: 10000
            },
            app
        )(userPaths)
    );

    // 权限中心
    app.use(tigerPermission({})(userPaths));

    // bodyparser中间件
    app.use(
        bodyParser({
            formLimit: '100mb',
            formidable: {
                maxFileSize: 200 * 1024 * 1024 // 设置上传文件大小最大限制，默认200M
            },
            jsonLimit: '100mb',
            multipart: true,
            patchKoa: true,
            textLimit: '100mb'
        }) // 设置 body 大小限制
    );

    app.use(swagger());
}
