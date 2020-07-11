import {
    GetMapping,
    PostMapping,
    RequestMapping,
    RestController
} from '@tiger/boot';
import {AjaxResult, QueryContext, RequestContext} from '@tiger/core';
import {valid} from '@tiger/validator';
import {GoodsCategoryService} from './goods-category.service';
import {CategoryInfoPO} from './po/category-info.po';
import {GoodsInfoPO} from './po/goods-info.po';
import {ParamsVO} from './vo/params.vo';

/**
 * 类目查询
 * @data: 2018-10-28 19:21:52
 */
@RestController
@RequestMapping('/category', [])
export class CategoryController {
    constructor(private goodsCategoryService: GoodsCategoryService) {}

    /** 查询yx类目 */
    @PostMapping('/getYxCategorys.json', [])
    async getYxCategorys(
        ctx: RequestContext<null, AjaxResult<CategoryInfoPO[]>>
    ) {
        const categoryList = await this.goodsCategoryService.getYxCategorys();
        ctx.body = AjaxResult.success(categoryList);
    }

    /** 查询yx产品列表 */
    @PostMapping('/product-select/queryYxProductList.json')
    async queryYxProductList(
        ctx: RequestContext<null, AjaxResult<GoodsInfoPO[]>>
    ) {
        const goodsList = await this.goodsCategoryService.queryYxProductList();
        ctx.body = AjaxResult.success(goodsList);
    }

    @GetMapping('/params.do', [valid(ParamsVO)])
    async params(ctx: QueryContext<ParamsVO, AjaxResult<any>>) {
        ctx.body = AjaxResult.success('hello world');
    }
}
