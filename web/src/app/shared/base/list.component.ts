import { OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Pagination, PlainObject } from '@shark/core';
import { Ajax, SharkToastrService, SharkUI } from '@shark/shark-angularX';

export class BaseListComponent implements OnInit {
    listUrl: string = '';
    formData: PlainObject = {};
    pagination: Pagination = {
        page: 1,
        size: 10,
        totalPage: 1
    };
    itemList: any[] = [];
    constructor(
        protected router: Router,
        protected activatedRoute: ActivatedRoute,
        protected ajax: Ajax,
        protected toastr: SharkToastrService
    ) { }

    numberLike(v: any) {
        // tslint:disable-next-line:triple-equals
        return Number(v) == v;
    }

    booleanFalseLike(v: any) {
        return v === 'false';
    }

    booleanTrueLike(v: any) {
        return v === 'true';
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            // 从url中获取参数
            for (const p in params) {
                if (params.hasOwnProperty(p)) {
                    if (p === '_timestamp') {
                        continue;
                    } else if (p === 'page') {
                        if (!SharkUI.isEmpty(params[p])) {
                            this.pagination.page = parseInt(params[p], 10);
                        }
                    } else if (p === 'size') {
                        if (!SharkUI.isEmpty(params[p])) {
                            this.pagination.size = parseInt(params[p], 10);
                        }
                    } else {
                        if (this.booleanFalseLike(params[p])) {
                            this.formData[p] = false;
                        } else if (this.booleanTrueLike(params[p])) {
                            this.formData[p] = true;
                        } else if (this.numberLike(params[p])) {
                            this.formData[p] = Number(params[p]);
                        } else {
                            this.formData[p] = params[p];
                        }
                    }
                }
            }
            this.getList();
        });
    }

    search() {
        this.refresh();
    }

    onPageChanged(e: any) {
        this.pagination.page = e.data.page;
        this.refresh();
    }

    onSizeChanged(e: any) {
        this.pagination.page = 1;
        this.pagination.size = e.data.size;
        this.refresh();
    }

    refresh() {
        const requestParams = this.createRequestParams();
        this.router.navigate([this.router.url.split(';')[0].split('?')[0], { ...requestParams, _timestamp: Date.now() }], { replaceUrl: true });
    }

    createRequestParams() {
        const requestParams: PlainObject = {
            page: this.pagination.page,
            size: this.pagination.size
        };
        for (const p in this.formData) {
            if (this.formData.hasOwnProperty(p)) {
                if (!SharkUI.isEmpty(this.formData[p])) {
                    requestParams[p] = this.formData[p];
                }
            }
        }
        return requestParams;
    }

    getList() {
        const requestParams = this.createRequestParams();
        this.ajax.postByJson(this.listUrl, requestParams).then((response) => {
            this.pagination.page = response.data.pagination.page;
            this.pagination.totalPage = response.data.pagination.totalPage;
            this.pagination.size = response.data.pagination.size;
            this.itemList = response.data.result;
        }).catch((error) => {
            this.toastr.error(error.message);
        });
    }
}
