import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(
    public loginService: LoginService,
    public socketService: SocketService,
  ) { };

  ngOnInit() {
    this.loginService.reqSessionInfo();
    this.socketService.connect();
  };
};