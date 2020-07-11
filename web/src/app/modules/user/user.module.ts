import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { DetailComponent } from './detail/detail.component';
import { LockDialog } from './dialogs/lock.dialog';
import { ListComponent } from './list/list.component';

const routes: Routes = [
    {
        path: 'user-list',
        component: ListComponent
    },
    {
        path: 'user-detail',
        component: DetailComponent
    }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [ListComponent, DetailComponent, LockDialog],
    entryComponents: [LockDialog]
})
export class UserModule { }
