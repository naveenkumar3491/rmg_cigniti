import {Routes, RouterModule} from '@angular/router';
export const routes: Routes = [
    {path: '', redirectTo:'/login', pathMatch: 'full'}
];

export const AppRoutes = RouterModule.forRoot(routes);
