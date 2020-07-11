// tslint:disable-next-line:file-name-casing

/*
如果使用apollo配置中心的话，需要使用下面的代码
import Apollo from '@tiger/apolloy';
Apollo.appId = 'yanxuan-guards-web';
Apollo.baseCachePath = './dist';
Apollo.initConfigurations();
Apollo.listenNotifications('default', ['application']);
*/

import { Monitor } from '@tiger/monitor';
import { serviceCode } from '../conf';

Monitor.init({ product: serviceCode });
