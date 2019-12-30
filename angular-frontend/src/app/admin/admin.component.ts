import { Component, OnInit } from '@angular/core';

import { BoardService } from '../board/board.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  checkState = false;

  constructor(
    private boardService: BoardService,
  ) { };

  ngOnInit() {
    this.boardService.reqBoardList();
  };

  updateBoard(data, index) {
    this.boardService.updateBoard(this.boardService.boardList[index].board_id, data, this.boardService.boardList[index].admin)
      .subscribe((data) => {
        window.location.reload();
      });
  };
  newBoard(data) {
    if (!data) {

    } else {
      this.boardService.newBoard(data, this.checkState)
        .subscribe(() => {
          window.location.reload();
        })
    };
  };
  deleteBoard(index) {
    this.boardService.deleteBoard(this.boardService.boardList[index].board_id)
      .subscribe(() => {
        window.location.reload();
      });
  };
  
};
