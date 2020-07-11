import {IAppModuleConfig} from '@tiger/core';
import {SwaggerConfig} from '@tiger/swagger';
export interface AppModuleConfig {
    '@tiger/security': IAppModuleConfig<{
        csrf: boolean;
        'Strict-Transport-Security': boolean;
        'X-Frame-Options': boolean;
    }>;
    '@tiger/swagger': IAppModuleConfig<SwaggerConfig>;
    [key: string]: IAppModuleConfig;
}
