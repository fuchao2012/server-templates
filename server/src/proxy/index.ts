/**
 * @description
 * node server层，比较大的一部分工作，是做转发服务器。将前端的请求转发到后端服务器。
 * 这个目录的作用就是用于配置请求的转发
 * proxy.base.ts中有一个简单的例子，用户可以根据自己的喜好，选择不同的转发组件或自己实现。
 * 例子中使用koa-proxies。文档：https://github.com/vagusX/koa-proxies
 */
import { Middleware } from 'koa';
import Router from 'koa-router';
import commonRouter from './proxy.common';

const router = new Router();

router.use(commonRouter);

// 往下添加开发环境下的转发配置项
const middleware: Middleware = router.routes();
export default middleware;
