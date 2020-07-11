import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-notfound/page-notfound.component';

const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'pageNotFound',
        component: PageNotFoundComponent
    }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [HomeComponent, PageNotFoundComponent]
})
export class NavModule{}
