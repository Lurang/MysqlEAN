import { Component, OnInit } from '@angular/core';

import { LoginService } from '../login.service';
import { Chat } from '../user/user';
import { SocketService } from '../socket.service';

interface LastChat {
  chatId: string,
  author: string,
  body: string,
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    public loginService: LoginService,
    public socketService: SocketService,
  ) { };

  ngOnInit() {
    this.loginService.reqSessionInfo();
  };
};