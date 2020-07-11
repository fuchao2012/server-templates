import {Service, Test} from '@tiger/boot';
import {expect} from 'chai';
import {GoodsCategoryService} from '../../../src/modules/xhr/goodscategory/goods-category.service';

@Service
class GoodsCategoryServiceTest {
    constructor(private goodsCategoryService: GoodsCategoryService) {}

    /**
     * 测试getYxCategorys的函数
     * @author: 金炳
     * @date: 2019-03-27 12:08:49
     */
    @Test
    async getYxCategorys() {
        expect(
            JSON.stringify(await this.goodsCategoryService.getYxCategorys())
        ).to.be.equal(
            JSON.stringify([
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
            ])
        );
    }

    /**
     * 测试访问productList的函数
     * @author: 金炳
     * @date: 2019-03-27 12:10:33
     */
    @Test
    async queryYxProductList() {
        const result = [
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
        expect(
            JSON.stringify(await this.goodsCategoryService.queryYxProductList())
        ).to.be.equal(JSON.stringify(result));
    }
}
