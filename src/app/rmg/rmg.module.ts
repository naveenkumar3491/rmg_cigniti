import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {DataTableModule,SharedModule} from 'primeng/primeng';


import { RmgComponent } from './rmg.component';
import { AppMenuComponent, AppSubMenuComponent } from "../common/side-nav/app.menu.component";
import { AppTopbarComponent } from "../common/topbar/app.topbar.component";
import { AppFooterComponent } from "../common/footer/app.footer.component";
import { AppRightpanelComponent } from "../common/right-panel/app.rightpanel.component";
import { AppInlineProfileComponent } from "../common/side-nav-profile/app.profile.component";
import { RmgRoutes } from "./rmg.routes";
import { DashboardComponent } from "./components/dashboard/dashboard.component";



@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DataTableModule,
    RmgRoutes
  ],
  declarations: [
    RmgComponent,
    DashboardComponent,
    AppMenuComponent,
    AppSubMenuComponent,
    AppTopbarComponent,
    AppFooterComponent,
    AppRightpanelComponent,
    AppInlineProfileComponent]
})
export class RmgModule { }
