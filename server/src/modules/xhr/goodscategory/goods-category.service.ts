import {CategoryInfoPO} from './po/category-info.po';
import {GoodsInfoPO} from './po/goods-info.po';
import {Service, Schedule} from '@tiger/boot';

@Service
export class GoodsCategoryService {
    async getYxCategorys(): Promise<CategoryInfoPO[]> {
        const list: CategoryInfoPO[] = [
            {
                id: 100,
                name: '居家',
                pid: 1
            },
            {
                id: 101,
                name: '懒人沙发',
                pid: 100
            }
        ];
        return list;
    }

    async queryYxProductList(): Promise<GoodsInfoPO[]> {
        const list: GoodsInfoPO[] = [
            {
                itemId: 1000,
                itemName: '记忆枕',
                skuList: [
                    {
                        skuId: 1001,
                        skuName: '白色'
                    },
                    {
                        skuId: 1002,
                        skuName: '红色'
                    },
                    {
                        skuId: 1003,
                        skuName: '蓝色'
                    }
                ]
            },
            {
                itemId: 2000,
                itemName: '抱枕',
                skuList: [
                    {
                        skuId: 2001,
                        skuName: '小号'
                    },
                    {
                        skuId: 2001,
                        skuName: '大号'
                    }
                ]
            }
        ];
        return list;
    }
}
