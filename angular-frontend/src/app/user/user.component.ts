import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from '../login.service';

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
  idForm: FormGroup;
  passwordForm: FormGroup;
  nameForm: FormGroup;
  loginForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
  ) { };

  ngOnInit() {
    this.idForm = this._formBuilder.group({
      id: ['', Validators.required],
    });
    this.nameForm = this._formBuilder.group({
      name: ['', Validators.required],
    });
    this.passwordForm = this._formBuilder.group({
      password: ['', Validators.required],
    });
    this.loginForm = this._formBuilder.group({
      id: ['', Validators.required],
      password: ['', Validators.required],
    });
  };
  
  get f() { 
    return this.loginForm.controls; 
  }
  onLoginSubmit(loginForm) {
    this.user.id = loginForm.value.id;
    this.user.password = loginForm.value.password;
    this.loginService.login(this.user)
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  };
  signup() {
    this.loginService.signup(this.idForm.value.id, this.nameForm.value.name, this.passwordForm.value.password)
      .subscribe((data) => {
        if (data.code === 0) {
          alert('이미 존재하는아이디입니다.');
          window.location.reload();
        } else {
          this.router.navigate(['/']);
        };
      });
  };
};
