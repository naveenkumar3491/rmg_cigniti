import {Routes, RouterModule} from '@angular/router';
import { RmgAppComponent } from "./rmg-app.component";
import { PersonalDetailsComponent } from "./employee/personal-details/personal-details.component";
import { DashboardComponent } from "./rmg/components/dashboard/dashboard.component";
import { EmployeeComponent } from "./employee/employee.component";
import { AuthgaurdService } from "../services/authgaurd.service";
import { RmgComponent } from "./rmg/rmg.component";
export const routes: Routes = [
    {path: 'app', component: RmgAppComponent,children:[
        { path: 'employee', component: EmployeeComponent, canActivate:[AuthgaurdService], children: [
            {path:'personal-details', component: PersonalDetailsComponent},
            {path:'', redirectTo:'personal-details', pathMatch: 'full'}
        ]},
        { path: 'rmg', component: RmgComponent, canActivate:[AuthgaurdService], children: [
            {path: 'dashboard', component: DashboardComponent},
            {path:'', redirectTo:'dashboard', pathMatch: 'full'}
        ]},
        {path:'', redirectTo:'employee', pathMatch: 'full'}
    ]}
];

export const RmgAppRoutes = RouterModule.forChild(routes);
