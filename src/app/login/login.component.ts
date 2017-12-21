import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from "../services/DataService";
import { ILoginResponse } from "../app.interface";
import { Ng2Storage } from "../services/storage";

@Component({
  selector: 'val-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  disabledBtn:boolean = false;
  private formSubmitAttempt: boolean;
  constructor(private fb: FormBuilder, private router: Router,
    private dataService: DataService, private storage: Ng2Storage) { }

  ngOnInit() {
    let userData = this.storage.getSession('user_data');
    if (userData && userData.employeeRoleName === 'RMG') {
      this.router.navigate(['app/rmg']);
    } else {
      this.router.navigate(['app/employee']);
    }
    this.loginForm = this.fb.group({
      userId: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }
  onSubmit() {
    this.formSubmitAttempt = true;
    if (this.loginForm.valid) {
      this.disabledBtn = true;
      this.dataService.loginUser(this.loginForm.value).subscribe((data: ILoginResponse) => {
        if (data.employeeRoleName === 'RMG') {
          this.router.navigate(['app/rmg']);
        } else {
          this.router.navigate(['app/employee']);
        }
      }, (err) => {
        this.disabledBtn = false;
        console.log(err)
      })

    } else {
      Object.keys(this.loginForm.controls).forEach(field => {
        const control = this.loginForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }

  }

  isFieldValid(field: string) {
    return !this.loginForm.get(field).valid && this.formSubmitAttempt;
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field)
    };
  }

}
