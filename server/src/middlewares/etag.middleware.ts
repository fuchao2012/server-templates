import {Context} from 'koa';
import compose from 'koa-compose';
import etag from 'koa-etag';

const conditional = async (ctx: Context, next: any) => {
    await next();
    if (ctx.fresh) {
        ctx.status = 304;
        // tslint:disable-next-line:no-null-keyword
        ctx.body = null;
    }
};

export default compose([conditional, etag()]);
