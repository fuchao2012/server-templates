import { join } from 'path';
import { IAppConfig, IPlugin, NodeEnv } from '@tiger/core';
import { ITigerProxyOption } from '@tiger/proxy';
import { AppModuleConfig } from './types';

const rootPath = join(__dirname, '../../');
const contextPath = '/eagle-template';
const xhrPrefix = '/xhr';
// 需要修改CMDB上面自己的productCode
const productCode = 'navAdmin';
// 需要修改CMDB上面自己的serviceCode
const serviceCode = 'eagle-template';
const productId = 3001;
const appName = '业务门户';
const port = 8080;
// 当测试机部署多个实例的时候，为了区分日志，则在deploy文件里面的设置LOGPATH=1这样，最终生成的日志文件夹 ${productCode}-1
const logPathSuffix = process.env.LOGPATH ? ("-" + process.env.LOGPATH) : '';

export default abstract class BaseConfig implements IAppConfig {
    // 应用的名字
    appName: string = appName;
    // contextPath，一般表示应用域名的后面一位，比如,yx.mail.netease.com/ape，contextPath就是ape
    contextPath: string = contextPath;
    // 一般将接口进行前缀区分，一般是/xhr
    xhrPrefix: string = xhrPrefix;
    // 应用研发工作台申请的productCode，申请地址：http://yx.mail.netease.com/ape/#/edit/project?from=new
    productCode: string = productCode;
    //  应用研发工作台申请的productId，申请地址：http://yx.mail.netease.com/ape/#/edit/project?from=new
    productId: number = productId;
    // cmdb service Code
    serviceCode: string = serviceCode;

    plugins: IPlugin[] = [];

    logPathSuffix: string = logPathSuffix;

    // 使用apollo配置中心的时候用
    // @Value('logPath', '/home')
    // logPath!: string;

    // 应用的根目录
    rootPath: string = rootPath;
    // 日志的目录
    abstract loggerPath: string;
    // 服务端模版目录
    viewPath: string = join(rootPath, 'views');
    // 前端index.html,ico,fonts等资源目录
    webAppPath: string = join(rootPath, 'web/app');
    // 前端静态资源的存放目录
    webStaticPath: string = join(rootPath, 'mimg');
    // server监听端口
    port: number = process.env.PORT ? parseInt(process.env.PORT) : port;
    // 环境
    env: string = NodeEnv.Current.env.code;

    // app自己的转发配置，需要开发自己改成自己应用的 TODO
    abstract appProxyOptions: ITigerProxyOption;
    // 权限中心的转发配置
    abstract umcProxyOptions: ITigerProxyOption;

    // 外部模块配置
    modules: AppModuleConfig = {
        '@tiger/security': {
            enable: true,
            options: {
                csrf: true,
                'Strict-Transport-Security': true,
                'X-Frame-Options': true
            }
        },
        '@tiger/swagger': {
            enable: true,
            options: {
                appModule: join(__dirname, '../modules/index.ts'),
                swaggerDefinition: {
                    host: 'local.yx.mail.netease.com'
                }
            }
        }
    };
}
