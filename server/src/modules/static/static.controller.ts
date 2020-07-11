import { GetMapping, RequestMapping, RestController } from '@tiger/boot';
import { Context } from 'koa';
import send from 'koa-send';
import * as config from '../../conf';

@RestController
@RequestMapping('')
export class StaticController {
    
    @GetMapping('/')
    public async defaultPage(ctx: Context) {
        await send(ctx, 'index.html', {
            root: config.webAppPath
        });
    }

    
    @GetMapping('/index.html')
    public async indexPage(ctx: Context) {
        await send(ctx, 'index.html', {
            root: config.webAppPath
        });
    }

    
    @GetMapping('/(css|img|js)/*')
    public async staticResource(ctx: Context) {
        const contextPathReg = new RegExp(`^${config.contextPath}/`);
        const reqPath = ctx.path.replace(contextPathReg, '');
        await send(ctx, reqPath, {
            root: config.webStaticPath
        });
    }

    
    @GetMapping('/favicon.ico')
    public async favicon(ctx: Context) {
        await send(ctx, 'favicon.ico', {
            root: config.webAppPath
        });
    }

    
    @GetMapping('/fonts/*')
    public async fonts(ctx: Context) {
        const contextPathReg = new RegExp(`^${config.contextPath}/`);
        const reqPath = ctx.path.replace(contextPathReg, '');
        await send(ctx, reqPath, {
            root: config.webAppPath
        });
    }

    @GetMapping('/ejs/index.html')
    public async ejsPage(ctx: Context) {
        await ctx.render('index');
    }
}
