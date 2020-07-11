import { Injectable } from '@angular/core';
import { Ajax } from '@shark/shark-angularX';
import { User } from '../interfaces/shard.interface';
import { AjaxUrlService } from './ajax-url.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    public userInfo: Promise<User>;
    constructor(
        private ajax: Ajax,
        private ajaxUrl: AjaxUrlService
    ) {
        this.getUser();
    }

    public getUser(): Promise<User> {
        if (!this.userInfo) {
            this.userInfo = new Promise((resolve, reject) => {
                this.ajax.get(this.ajaxUrl.user.getUserInfo)
                    .then(result => {
                        const user: User = result.data;
                        resolve(user);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        }

        return this.userInfo;
    }
}
