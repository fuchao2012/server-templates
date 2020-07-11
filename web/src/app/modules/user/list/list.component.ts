import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlainObject } from '@shark/core';
import { Ajax, SharkModalService, SharkPreviewService, SharkToastrService } from '@shark/shark-angularX';
import { AjaxUrlService, BaseListComponent } from '../../../shared/shared.module';
import { LockDialog } from '../dialogs/lock.dialog';

@Component({
    selector: 'user-list',
    templateUrl: './list.component.html'
})
export class ListComponent extends BaseListComponent {
    listUrl: string = this.ajaxUrl.user.list;
    formData: PlainObject = {};
    constructor(
        protected router: Router,
        protected activatedRoute: ActivatedRoute,
        protected ajax: Ajax,
        protected toastr: SharkToastrService,
        protected ajaxUrl: AjaxUrlService,
        protected modal: SharkModalService,
        protected preview: SharkPreviewService
    ) {
        super(router, activatedRoute, ajax, toastr);
    }

    lock(item: PlainObject) {
        this.modal.open({
            type: 'dialog',
            backdrop: 'static',
            size: 'md',
            component: LockDialog,
            data: {
                user: item
            }
        }).then(() => {
            this.refresh();
        }, () => { });
    }

    add() {
        this.router.navigate(['user-detail']);
    }

    detail(item: PlainObject) {
        this.router.navigate(['user-detail', { id: item.id }]);
    }

}
