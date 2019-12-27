import { Component, OnInit, Directive, Input, Output } from '@angular/core';
import { Session } from './home';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    private loginService: LoginService,
  ) { };

  ngOnInit() {
    this.loginService.reqSessionInfo();
  };
};