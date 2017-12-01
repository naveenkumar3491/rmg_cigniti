import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {DataTableModule, SharedModule} from 'primeng/primeng';


import { RmgAppComponent } from './rmg-app.component';
import { AppMenuComponent, AppSubMenuComponent } from "../common/side-nav/app.menu.component";
import { AppTopbarComponent } from "../common/topbar/app.topbar.component";
import { AppFooterComponent } from "../common/footer/app.footer.component";
import { AppRightpanelComponent } from "../common/right-panel/app.rightpanel.component";
import { AppInlineProfileComponent } from "../common/side-nav-profile/app.profile.component";
import { RmgAppRoutes } from "./rmg-app-routes";
import { PersonalAndDudetailsComponent } from "./employee/personal-and-dudetails/personal-and-dudetails.component";
import { DashboardComponent } from "./rmg/components/dashboard/dashboard.component";
import { ContactAndExperienceDetailsComponent } from './employee/contact-and-experience-details/contact-and-experience-details.component';
import { EmployeeComponent } from "./employee/employee.component";
@NgModule({
  imports: [
    CommonModule,
    RmgAppRoutes,
    DataTableModule,
    SharedModule
  ],
  declarations: [
    RmgAppComponent,
    EmployeeComponent,
    AppMenuComponent,
    AppSubMenuComponent,
    AppTopbarComponent,
    AppFooterComponent,
    AppRightpanelComponent,
    AppInlineProfileComponent,
    PersonalAndDudetailsComponent,
    DashboardComponent,
    ContactAndExperienceDetailsComponent
    ]
})
export class RmgAppModule { }
