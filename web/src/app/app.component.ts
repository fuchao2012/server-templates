import { Component, OnInit } from '@angular/core';
import { Watermark } from '@shark/secure';
import { Subscription } from 'rxjs';
import { User } from './shared/interfaces/shard.interface';
import { UserService } from './shared/shared.module';

@Component({
    // tslint:disable-next-line:component-selector
    selector: '#root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    user: User;
    subscription: Subscription;
    constructor(
        private userService: UserService
    ) { }

    async ngOnInit(): Promise<void> {
        this.user = await this.userService.getUser();
        Watermark.init({
            text: this.user.email.split('@')[0]
        });
    }

    goLogout(): void {
        window.location.href = 'https://yx.mail.netease.com/openid/logout?url=' + encodeURIComponent(window.location.href);
    }
}
