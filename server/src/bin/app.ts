import { BaseApplication, TgApp } from '@tiger/boot';
import { loadEagleMiddleware } from '../middlewares/global.middleware';
import { AppModule } from '../modules';
import Application from 'koa';
import * as config from '../conf';
import { appLogger } from '@tiger/logger';

@TgApp
class MainApplication extends BaseApplication {
    public async beforeLoadRoutes(app: Application) {
        // 引入常用的全局app middleware
        loadEagleMiddleware(app);
    }
}

async function bootstrap() {
    const app = await new MainApplication().start<AppModule>(
        AppModule.getInstance()
    );
    app.listen(config.port).addListener('listening', () => {
        appLogger.info('server is started on port: ' + config.port);
    });
}

bootstrap();
