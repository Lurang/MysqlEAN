import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoardService } from '../board/board.service';
import { PostDetail, Comment } from '../board/board';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-board-detail',
  templateUrl: './board-detail.component.html',
  styleUrls: ['./board-detail.component.css']
})
export class BoardDetailComponent implements OnInit {
  boardId: string;
  postId: string;
  postDetail: PostDetail;
  dataSource;
  pageSizeOptions;
  displayedColumns: string[] = ['index', 'body', 'author', 'date'];

  constructor(
    private route: ActivatedRoute,
    private boardService: BoardService,
  ) { };
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.boardId = params.get('boardId');
      this.postId = params.get('postId');
      this.boardService.reqPostDetail(this.boardId, this.postId)
        .subscribe((data) => {
          this.postDetail = data;
          this.dataSource = new MatTableDataSource<Comment>(this.postDetail.comment);
          this.dataSource.paginator = this.paginator;
          console.log(this.postDetail);
        })
    });
  };
/*
{
  "board":
  [
    {"board_id":1,"board_name":"공지사항"},
    {"board_id":2,"board_name":"자유게시판"},
    {"board_id":14,"board_name":"A-Board"}
  ],
  "boardInfo":
    {"board_id":1,"admin":1,"board_name":"공지사항"},
  "postInfo":
    {
      "post_id":5,
      "author":"admin",
      "post_title":"공지5",
      "post_body":"a테스트5",
      "board_id":1,
      "date":"2019-12-12 12:32:18"
    },
  "comment":
  [
    {
      "comment_id":49,
      "post_id":5,
      "comment_author":"1",
      "comment_body":"3",
      "date":"2019-12-18 17:16:57",
      "group_id":49,
      "pid":0,
      "author":""
    }
  ]
}
*/
};
