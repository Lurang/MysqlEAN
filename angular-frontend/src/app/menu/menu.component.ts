import { Component, OnInit } from '@angular/core';

import { BoardService} from '../board/board.service';
import { LoginService } from '../login.service';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(
    private boardService: BoardService,
    private loginService: LoginService,
    private socketService: SocketService,
  ) { };

  ngOnInit() {
    this.boardService.reqBoardList();
    this.loginService.reqSessionInfo();
  };

  logout(): void {
    this.loginService.reqLogout()
    .subscribe((data) => {
      if (data.code === 1) {
        window.location.reload();
      };
    });
  };
  socket(): void {
    this.socketService.ws.close();
  };
};

