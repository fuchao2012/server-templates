import { Component } from '@angular/core';
import { PlainObject } from '@shark/core';
import { Ajax, SharkBaseModal, SharkModalParams, SharkToastrService } from '@shark/shark-angularX';
import { AjaxUrlService } from '../../../shared/shared.module';

@Component({
    selector: 'user-lock',
    templateUrl: './lock.dialog.html'
})
export class LockDialog extends SharkBaseModal {
    user: PlainObject;

    constructor(
        private toastr: SharkToastrService,
        private params: SharkModalParams,
        private ajax: Ajax,
        private ajaxUrl: AjaxUrlService
    ) {
        super();
        this.user = this.params.data.user;
    }

    ok() {
        this.ajax.postByJson(this.ajaxUrl.user.lock, {
            id: this.user.id
        }).then(() => {
            this.toastr.success('锁定成功！');
            this.close();
        }, (error) => {
            this.toastr.error(error.message);
        });
    }
}
