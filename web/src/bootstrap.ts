declare const ENV: string;
declare const HOT: boolean;
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppConfig } from '@shark/core';
import { AppModule } from './app/app.module';

if (ENV === 'development' && HOT) {
    if ((module as any).hot) {
        (module as any).hot.accept();
    }
}
if (ENV === 'production') {
    enableProdMode();
}
AppConfig.configure({
    contextPath: '/eagle-template'
});
platformBrowserDynamic()
.bootstrapModule(AppModule);
