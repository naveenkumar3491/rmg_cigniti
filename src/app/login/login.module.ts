import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { ErrorComponent } from "../common/error/app.error.component";
export const routes: Routes = [
    {path: 'login', component:LoginComponent}
];
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoginComponent, ErrorComponent]
})
export class LoginModule { }
