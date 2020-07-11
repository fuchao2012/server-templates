/**
 * @description
 *  module 目录下放置业务相关的代码。按业务模块组织代码格式
 *  例如：有一个用户管理模块,对应的目录结构为
 *  user
 *  |__user.controller.ts  //放置路由映射处理，做为controller
 *  |__user.service.ts  //业务处理逻辑代码
 *  |__user.module.ts    // module是一个模块的概念
 *  |__vo               // 这个文件放跟前端接口的类型
 *  |__po               // 这个文件放跟数据层的类型
 */
import { BaseModule, TgModule } from '@tiger/boot';
import { securityMiddlewares } from '@tiger/security';
import { Middleware } from 'koa';
import { StaticModule } from './static/static.module';
import * as config from '../conf';
import { XhrModule } from './xhr/xhr.module';
import { SharedModule } from './shared/shared.module';

// middlware是有先后顺序的
const middlewares: Middleware[] = [
    securityMiddlewares // 负责安全的，关于那些过安全这块，接口的话，是${contextPath}/xhr/*这种都会过
];

@TgModule({
    prefix: config.contextPath,
    imports: [StaticModule, XhrModule, SharedModule],
    controllers: [],
    middlewares: [...middlewares]
})
export class AppModule extends BaseModule { }
