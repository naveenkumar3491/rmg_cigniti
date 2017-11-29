import {Routes, RouterModule} from '@angular/router';
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { RmgComponent } from "./rmg.component";

export const routes: Routes = [
    {path: 'rmg', component: RmgComponent,children:[
        {path: '', component: DashboardComponent}
    ]}
];

export const RmgRoutes = RouterModule.forChild(routes);
