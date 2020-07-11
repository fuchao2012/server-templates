const fs = require('fs');
const path = require('path');
const opn = require('opn');
const argv = require('yargs').argv;
const chalk = require('chalk');
const getPort = require('get-port');
//webpack 配置
const sharkAngularXWebpack = require('@shark/shark-angularX-webpack');
const sw = new sharkAngularXWebpack(require('../../shark-conf'));
const webpack = sw.getModule('webpack');
const sharkConf = sw.config;
const webpackConfig = sw.getDevConfig();
//use koa
const koa = require('koa');
const koaBody = require("koa-body");
const koaSend = require('koa-send');
const koaWebpackMiddleware = require('koa-webpack-middleware');
const koaProxies = require('koa-proxies');
const app = new koa();

let devMiddleware;
if (argv.target === 'build') {
    app.use(async (ctx, next) => {
        const reqPath = ctx.path;
        const omitContextPath = reqPath.replace(`${sharkConf.contextPath}`, '');
        if (fs.existsSync(sharkConf.buildStatics + omitContextPath)) {
            await koaSend(ctx, omitContextPath, {
                root: sharkConf.buildStatics
            });
        } else if (fs.existsSync(sharkConf.buildWebapp + omitContextPath)) {
            await koaSend(ctx, omitContextPath, {
                root: sharkConf.buildWebapp
            });
        } else {
            await next();
        }
    });
} else {
    let compiler = webpack(webpackConfig);
    devMiddleware = koaWebpackMiddleware.devMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
        logTime: true,
        stats: {
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false,
            cachedAssets: false
        }
    });
    app.use(devMiddleware);
    app.use(koaWebpackMiddleware.hotMiddleware(compiler));
}

//根据host区分转发
app.use(async (ctx, next) => {
    // remote模式
    if (ctx.host.indexOf("remote.yx.mail.netease.com") > -1) {
        koaProxies(`${sharkConf.contextPath}${sharkConf.xhrPrefix}`, {
            target: sharkConf.remote.url,
            changeOrigin: true,
            logs: true
        })(ctx, next);
    } else {
        // local模式
        await next();
    }
})

// 权限中心与人员选择器的转发
app.use(
    koaProxies(`${sharkConf.contextPath}/xhr/userCenterManage`, {
        target: 'http://yxius.you.163.com',
        changeOrigin: true,
        rewrite: path =>
            path.replace(`${sharkConf.contextPath}/xhr/userCenterManage`, ''),
        logs: true,
    })
);
app.use(koaBody({ textLimit: "100mb", jsonLimit: "100mb", formLimit: "100mb" }));
// eagle业务组件本地转发到node_modules中的mock文件
app.use(async (ctx, next) => {
    const eagleReg = /eagle\/(\w+)\//;
    const matcher = ctx.path.match(eagleReg);
    if (matcher) {
        const eagleName = matcher[1];
        const emitContentPath = ctx.path.replace(`${sharkConf.contextPath}/`, '').replace(`eagle/${eagleName}/`, '');
        const mockFilePath = path.join(sharkConf.root, `node_modules/@eagle/${eagleName}/docs/mock`, emitContentPath);
        if (fs.existsSync(mockFilePath)) {
            ctx.set('Content-Type', 'application/json; charset=UTF-8');
            ctx.body = fs.readFileSync(mockFilePath, 'utf-8');
        } else {
            await next();
        }
    } else {
        await next();
    }
})
//本地mock
app.use(async (ctx, next) => {
    const reg = new RegExp(`${sharkConf.contextPath}${sharkConf.xhrPrefix}`);
    if (!reg.test(ctx.path)) {
        await next();
    } else {
        const emitContentPath = ctx.path.replace(`${sharkConf.contextPath}/`, '');
        const mockFilePath = path.join(sharkConf.mockPath, emitContentPath);
        if (fs.existsSync(mockFilePath)) {
            ctx.set('Content-Type', 'application/json; charset=UTF-8');
            ctx.body = fs.readFileSync(mockFilePath, 'utf-8');
        } else {
            await next();
        }
    }
});

//not found
app.use(async (ctx) => {
    ctx.status = 404;
    ctx.body = {
        code: 404
    };
});

//open url
getPort({ port: sharkConf.port }).then((port) => {
    console.log(chalk.green('port is :' + port));
    const clientUrl = `http://local.yx.mail.netease.com:${port}${sharkConf.contextPath}/index.html`;
    if (devMiddleware) {
        devMiddleware.waitUntilValid(() => {
            console.log(chalk.green('\nLive Development Server is listening on '), chalk.blue.underline(clientUrl));
            opn(clientUrl);
        })
    } else {
        console.log(chalk.green('\nStatic Build Server is starting on '), chalk.blue.underline(clientUrl));
        opn(clientUrl);
    }
    app.listen(port);
}).catch((err) => {
    console.error(err);
});

