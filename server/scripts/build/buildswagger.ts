import { join } from 'path';
import { AppConfig } from '@tiger/core';
import BaseConfig from '../../src/conf/config.base';
import { swaggerDoc } from '@tiger/swagger';
import { writeFileSync, mkdirSync } from 'fs';

AppConfig.init<BaseConfig>({
    configPath: join(__dirname, '../../src/conf')
});

const swaggerDocs = swaggerDoc({
    appModule: join(__dirname, '../../src/modules/index.ts')
});

const outputPath = join(__dirname, '../../build/src/swagger');
mkdirSync(outputPath);
writeFileSync(
    join(__dirname, '../../build/src/swagger/swagger.json'),
    JSON.stringify(swaggerDocs),
    { encoding: 'utf-8' }
);
