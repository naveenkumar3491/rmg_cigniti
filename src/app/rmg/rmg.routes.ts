import {Routes, RouterModule} from '@angular/router';
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { RmgComponent } from "./rmg.component";
import { RmgEmployeeViewComponent } from "./rmg-employee-view/rmg-employee-view.component";
import { EmployeeViewComponent } from "./employee-view/employee-view.component";
import { AuthgaurdService } from "../services/authgaurd.service";

export const routes: Routes = [
    {path: 'rmg', component: RmgComponent,children:[
        {path: '', redirectTo:'rmgEmployee',pathMatch:'full'},
        {path: 'rmgEmployee', component: RmgEmployeeViewComponent,canActivate:[AuthgaurdService],children:[
            {path: '',  redirectTo:'dashboard',pathMatch:'full'},
            {path: 'dashboard', component: DashboardComponent}
        ]},
        {path: 'employee', component: EmployeeViewComponent,canActivate:[AuthgaurdService],children:[
            {path: '',  redirectTo:'dashboard',pathMatch:'full'},
            {path: 'dashboard', component: DashboardComponent}
        ]}
    ]}
];

export const RmgRoutes = RouterModule.forChild(routes);
