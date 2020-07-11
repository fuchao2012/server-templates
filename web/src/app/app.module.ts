import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppConfig } from '@shark/core';
import { Ajax, SharkActionToastrService } from '@shark/shark-angularX';
import { AppComponent } from './app.component';
import { NavModule } from './modules/nav/nav.module';
import { UserModule } from './modules/user/user.module';
import { SharedModule } from './shared/shared.module';

// 定义常量 路由
const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '/pageNotFound'
    }
];

@NgModule({
    imports: [
        BrowserModule,
        SharedModule,
        RouterModule.forRoot(appRoutes, {
            useHash: true,
            onSameUrlNavigation: 'reload'
        }),
        NavModule,
        UserModule
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(
        private ajax: Ajax,
        private actionToastr: SharkActionToastrService
    ) {
        this.ajax.setContextPath(AppConfig.contextPath);
        this.ajax.setFilterCodeError((result) => {
            if (result && result.code === 302) {
                if (window.location.host.indexOf('local.yx.mail.netease.com') > -1 || window.location.host.indexOf('remote.yx.mail.netease.com') > -1) {
                    // 本地调试时，不跳转到登录页
                    this.actionToastr.warning('已退出，请重新登录。', '关闭').then(() => {
                        window.open('https://yx.mail.netease.com');
                    });
                    return;
                }
                window.location.href = 'https://yx.mail.netease.com/openid/logout?url=' + encodeURIComponent(window.location.href);
            }
        });
    }
}
