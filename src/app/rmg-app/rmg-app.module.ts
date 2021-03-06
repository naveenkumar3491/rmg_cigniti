import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {DataTableModule} from 'primeng/primeng';
import {ChartModule} from 'primeng/primeng';
import {TabViewModule} from 'primeng/primeng';
import {DropdownModule} from 'primeng/primeng';
import {RatingModule} from 'primeng/primeng';
import {GrowlModule} from 'primeng/primeng';
import {ProgressBarModule} from 'primeng/primeng';
import {AccordionModule} from 'primeng/primeng';
import {CalendarModule} from 'primeng/primeng';
import {ConfirmDialogModule, ConfirmationService} from 'primeng/primeng';
import {SharedModule} from 'primeng/primeng';
import {TooltipModule} from 'primeng/primeng';
import {MultiSelectModule} from 'primeng/primeng';
import {OverlayPanelModule} from 'primeng/primeng';
import {BusyModule} from 'angular2-busy';

import {OnlyNumber} from '../common/directives/only-number.directive';
import { OnlyAlphabets } from "../common/directives/only-alphabets.directive";

import { RmgAppComponent } from './rmg-app.component';
import { AppMenuComponent, AppSubMenuComponent } from '../common/side-nav/app.menu.component';
import { AppTopbarComponent } from '../common/topbar/app.topbar.component';
import { AppFooterComponent } from '../common/footer/app.footer.component';
import { AppRightpanelComponent } from '../common/right-panel/app.rightpanel.component';
import { AppInlineProfileComponent } from '../common/side-nav-profile/app.profile.component';
import { RmgAppRoutes } from './rmg-app-routes';
import { PersonalDetailsComponent } from './employee/personal-details/personal-details.component';
import { DashboardComponent } from './rmg/dashboard/dashboard.component';
import { EmployeeComponent } from './employee/employee.component';
import { ExperienceDetailsComponent } from './employee/experience-details/experience-details.component';
import { SkillDetailsComponent } from './employee/skill-details/skill-details.component';
import { ContactDetailsComponent } from './employee/contact-details/contact-details.component';
import { CertificationDetailsComponent } from './employee/certification-details/certification-details.component';
import { ProjectDetailsComponent } from './employee/project-details/project-details.component';
import { BUDetailsComponent } from './employee/bu-details/bu-details.component';
import { RmgComponent } from './rmg/rmg.component';
import { VisaDetailsComponent } from './employee/visa-details/visa-details.component';
import { DomainDetailsComponent } from './employee/domain-details/domain-details.component';
import { DateFormatPipe } from "../common/pipes/dateFormat.pipe";
import { EmployeeDetailsComponent } from "./rmg/employee-details/employee-details.component";
import { PassportDetailsComponent } from "./employee/passport-details/passport-details.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RmgAppRoutes,
    DataTableModule,
    SharedModule,
    ChartModule,
    TabViewModule,
    DropdownModule,
    RatingModule,
    GrowlModule,
    ProgressBarModule,
    AccordionModule,
    CalendarModule,
    ConfirmDialogModule,
    TooltipModule,
    MultiSelectModule,
    OverlayPanelModule,
    BusyModule
  ],
  declarations: [
    RmgAppComponent,
    EmployeeComponent,
    RmgComponent,
    AppMenuComponent,
    AppSubMenuComponent,
    AppTopbarComponent,
    AppFooterComponent,
    AppRightpanelComponent,
    AppInlineProfileComponent,
    PersonalDetailsComponent,
    DashboardComponent,
    ExperienceDetailsComponent,
    SkillDetailsComponent,
    ContactDetailsComponent,
    CertificationDetailsComponent,
    ProjectDetailsComponent,
    BUDetailsComponent,
    VisaDetailsComponent,
    DomainDetailsComponent,
    EmployeeDetailsComponent,
    PassportDetailsComponent,
    OnlyNumber,
    OnlyAlphabets
    ],
    providers: [ConfirmationService, DateFormatPipe, DatePipe]
})
export class RmgAppModule { }
