import { Component } from '@angular/core';

@Component({
    templateUrl: './dev-mode.component.html',
    selector: 'dev-mode',
    styles: ['i {font-size: 20px; cursor: pointer}']
})
export class DevModeComponent{

    mode: string = '';

    constructor(){
        this.mode = window.location.hostname.split('.')[0];
    }

    toggle(){
        const url: string = window.location.href;
        if (this.mode === 'local'){
            window.location.href = url.replace('local.yx', 'remote.yx');
        }else if (this.mode === 'remote'){
            window.location.href = url.replace('remote.yx', 'local.yx');
        }
    }
}
