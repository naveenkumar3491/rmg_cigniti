import {Routes, RouterModule} from '@angular/router';
import { RmgAppComponent } from "./rmg-app.component";
import { PersonalDetailsComponent } from "./employee/personal-details/personal-details.component";
import { DashboardComponent } from "./rmg/components/dashboard/dashboard.component";
import { ContactAndExperienceDetailsComponent } from "./employee/contact-and-experience-details/contact-and-experience-details.component";
import { EmployeeComponent } from "./employee/employee.component";
import { ProjectDetailsComponent } from "./employee/project-details/project-details.component";
import { SkillDetailsComponent } from "./employee/skill-details/skill-details.component";
import { CertificationDetailsComponent } from "./employee/certification-details/certification-details.component";
export const routes: Routes = [
    {path: 'app', component: RmgAppComponent,children:[
        { path: 'employee', component: EmployeeComponent, children: [
            {path:'personal-details', component: PersonalDetailsComponent},
            {path:'project-details', component: ProjectDetailsComponent},
            {path:'', redirectTo:'personal-details', pathMatch: 'full'}
        ]},
        { path: 'rmg', children: [
            {path: 'dashboard', component: DashboardComponent},
            {path:'', redirectTo:'dashboard', pathMatch: 'full'}
        ]},
        {path:'', redirectTo:'employee', pathMatch: 'full'}
    ]}
];

export const RmgAppRoutes = RouterModule.forChild(routes);
