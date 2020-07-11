import { Injectable } from '@angular/core';

export interface UserUrl {
    list: string;
    detail: string;
    create: string;
    update: string;
    lock: string;
    getUserInfo: string;
}

@Injectable({
    providedIn: 'root'
})
export class AjaxUrlService {
    user: UserUrl = {
        list: '/xhr/user/list.json',
        detail: '/xhr/user/detail.json',
        create: '/xhr/user/create.json',
        update: '/xhr/user/update.json',
        lock: '/xhr/user/lock.json',
        getUserInfo: '/xhr/user/getUserInfo.json'
    };
}
