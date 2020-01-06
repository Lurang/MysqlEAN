import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';

import { LoginService } from '../login.service';
import { SocketService } from '../socket.service';

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
  mySubscription: any;

  constructor(
    private _formBuilder: FormBuilder,
    private loginService: LoginService,
    private socketService: SocketService,
    private router: Router,
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.router.navigated = false;
      };
    });
  };

  ngOnInit() {
    this.loginService.reqSessionInfo();
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
  };

  onLoginSubmit(loginForm) {
    this.user.id = loginForm.value.id;
    this.user.password = loginForm.value.password;
    if (!this.user.id || !this.user.password) {
      return;
    };
    this.loginService.login(this.user)
      .subscribe((msg) => {
        if (msg.message === 'fail') {
          loginForm.value.id = '';
          loginForm.value.password = '';
          alert('아이디와 비밀번호를 확인하세요');
          return this.router.navigate(['/user']);
        };
        this.socketService.ws.close();
        this.router.navigate(['/']);
      });
  };
  signup() {
    this.loginService.signup(this.idForm.value.id, this.nameForm.value.name, this.passwordForm.value.password)
      .subscribe((data) => {
        if (data.code === 0) {
          alert('이미 존재하는아이디입니다.');
          this.router.navigate(['/user']);
        } else {
          this.router.navigate(['/']);
        };
      });
  };
};
