import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExpansionModule } from '@shark/expansion';
import { SharkModule } from '@shark/shark-angularX';

/*********** components **************/
import { DevModeComponent } from './components/index';

const modules = [
    CommonModule,
    FormsModule,
    SharkModule,
    ExpansionModule
];

const components = [DevModeComponent];

@NgModule({
    imports: [...modules],
    declarations: [...components],
    exports: [...modules, ...components]
})
export class SharedModule { }
export { UserService } from './services/user.service';
export { AjaxUrlService } from './services/ajax-url.service';
export { BaseListComponent } from './base/list.component';
