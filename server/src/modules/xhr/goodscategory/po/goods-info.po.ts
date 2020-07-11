import { SkuInfoPO } from './sku-info.po';

export class GoodsInfoPO {
    /** 商品id */
    itemId: number;
    /** 商品名称 */
    itemName: string;
    /** sku列表 */
    skuList: SkuInfoPO[];
}
