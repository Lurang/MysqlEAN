import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  user = {
    id: '',
    password: '',
  };

  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  loginForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
  ) { };

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    this.loginForm = this._formBuilder.group({
      id: ['', Validators.required],
      password: ['', Validators.required],
    });
  };
  get f() { return this.loginForm.controls; }
  onLoginSubmit(loginForm) {
    this.user.id = loginForm.value.id;
    this.user.password = loginForm.value.password;
    this.loginService.login(this.user)
      .subscribe(() => {
        this.loginService.isLoggedIn = true;
        this.router.navigate(['/']);
      })
  };
};
