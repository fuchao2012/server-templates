import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PlainObject } from '@shark/core';
import { Ajax, SharkToastrService, SharkUI, SharkValidForm } from '@shark/shark-angularX';
import { AjaxUrlService, UserService } from '../../../shared/shared.module';

@Component({
    selector: 'material-detail',
    templateUrl: './detail.component.html'
})
export class DetailComponent implements OnInit {
    formData: PlainObject = {
        id: undefined,
        name: undefined,
        phone: undefined
    };
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private ajax: Ajax,
        private toastr: SharkToastrService,
        private ajaxUrl: AjaxUrlService,
        protected userService: UserService
    ) { }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            // 从url中获取参数
            const id = params.id;
            if (!SharkUI.isEmpty(id)) {
                this.formData.id = parseInt(id, 10);
                this.getDetail(this.formData.id);
            }
        });
    }

    // 组织提交参数
    createRequestParams() {
        const requestParams: PlainObject = {
            id: this.formData.id,
            name: this.formData.name,
            phone: this.formData.phone
        };
        return requestParams;
    }

    save(form: SharkValidForm) {
        form.submit().then(() => {
            const requestParams = this.createRequestParams();
            const url = this.formData.id ? this.ajaxUrl.user.update : this.ajaxUrl.user.create;
            this.ajax.postByJson(url, requestParams).then(() => {
                this.goPageList();
                this.toastr.success('保存成功！');
            }).catch((error) => {
                this.toastr.error(error.message);
            });
        }).catch(() => { });
    }

    // 格式化获取的数据
    formatData(data: PlainObject) {
        this.formData.id = data.id;
        this.formData.name = data.name;
        this.formData.phone = data.phone;
    }

    getDetail(id: number) {
        this.ajax.postByJson(this.ajaxUrl.user.detail, { id: id }).then((response) => {
            this.formatData(response.data);
        }, (error) => {
            this.toastr.error(error.message);
        });
    }

    goPageList() {
        this.router.navigate(['user-list']);
    }
}
