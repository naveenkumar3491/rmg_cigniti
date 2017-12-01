import {Routes, RouterModule} from '@angular/router';
import { RmgAppComponent } from "./rmg-app.component";
import { PersonalAndDudetailsComponent } from "./employee/personal-and-dudetails/personal-and-dudetails.component";
import { DashboardComponent } from "./rmg/components/dashboard/dashboard.component";
import { ContactAndExperienceDetailsComponent } from "./employee/contact-and-experience-details/contact-and-experience-details.component";
import { EmployeeComponent } from "./employee/employee.component";
export const routes: Routes = [
    {path: 'app', component: RmgAppComponent,children:[
        { path: 'employee', component: EmployeeComponent, children: [
            {path:'personal-du', component: PersonalAndDudetailsComponent},
            {path:'contact-experience', component: ContactAndExperienceDetailsComponent},
            {path:'', redirectTo:'personal-du', pathMatch: 'full'}
        ]},
        { path: 'rmg', children: [
            {path: 'dashboard', component: DashboardComponent},
            {path:'', redirectTo:'dashboard', pathMatch: 'full'}
        ]},
        {path:'', redirectTo:'employee', pathMatch: 'full'}
    ]}
];

export const RmgAppRoutes = RouterModule.forChild(routes);
