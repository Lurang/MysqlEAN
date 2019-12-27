import { Component, OnInit } from '@angular/core';

import { Session, BoardList } from '../board/board';

import { BoardService} from '../board/board.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(
    private boardService: BoardService,
    public loginService: LoginService,
  ) { };

  ngOnInit() {
    this.boardService.reqBoardList();
  };

  logout(): void {
    this.loginService.reqLogout()
    .subscribe((data) => {
      if (data.message === 1) {
        window.location.reload();
      };
    });
  };
  
};

