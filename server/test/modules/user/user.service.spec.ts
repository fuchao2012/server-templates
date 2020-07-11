import {Service, Test} from '@tiger/boot';
import {expect} from 'chai';
import {UserService} from '../../../src/modules/xhr/user/user.service';

@Service
class UserServiceTest {
    constructor(private userService: UserService) {}

    /**
     * 测试获取名字的接口
     * @author: 金炳
     * @date: 2019-03-27 11:55:19
     */
    @Test
    getName() {
        expect(this.userService.getName()).to.be.equal('jinbing');
    }
}
