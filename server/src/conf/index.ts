import {AppConfig} from '@tiger/core';
import BaseConfig from './config.base';

const config = AppConfig.init<BaseConfig>({
    configPath: __dirname,
    outputOnInit: false
});

export = config;
//
