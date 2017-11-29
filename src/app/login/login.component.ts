import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'val-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  private formSubmitAttempt: boolean;
  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }
  onSubmit() {
    this.formSubmitAttempt = true;
    if (this.loginForm.valid) {
      console.log('form submitted');
      this.router.navigate(['rmg']);
    } else {
      Object.keys(this.loginForm.controls).forEach(field => { 
        const control = this.loginForm.get(field);            
        control.markAsTouched({ onlySelf: true });       
      });
    }

  }

  isFieldValid(field: string) {
    return (!this.loginForm.get(field).valid && this.loginForm.get(field).touched) ||
    (this.loginForm.get(field).untouched && this.formSubmitAttempt);
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

}
