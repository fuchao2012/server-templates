import {
    GetMapping,
    PostMapping,
    RequestMapping,
    RestController
} from '@tiger/boot';
import {AjaxResult, AppConfig, QueryContext} from '@tiger/core';
import {valid} from '@tiger/validator';
import {NameVO} from './vo/name.vo';
import {UserResultVO} from './vo/user-result.vo';

/**
 * 用户管理
 */
@RestController
@RequestMapping(
    '/user',
    []
)
export class UserController {
    /**
     * 查询当前用户信息
     */
    @GetMapping('/getUserInfo.json')
    getUserInfo(ctx: QueryContext<null, AjaxResult<UserResultVO>>) {
        ctx.body = AjaxResult.success(ctx.openIDInfo);
    }

    @PostMapping('/valid.do', [valid(NameVO)])
    getHello(ctx: QueryContext<NameVO, AjaxResult<NameVO>>) {
        ctx.body = AjaxResult.success(ctx.query);
    }
}
