import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BoardService } from '../board/board.service';
import { PostDetail, Comment } from '../board/board';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { LoginService } from '../login.service';

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
  displayedColumns: string[] = ['body', 'author', 'date'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private boardService: BoardService,
    private loginService: LoginService,
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
        });
    });
  };
  modifyPost() {
    this.router.navigate([`/board/${this.boardId}/${this.postId}/modify`]);
  };
  deletePost() {
    this.boardService.deletePost(this.postId)
      .subscribe(() => {
        this.router.navigate([`/board/${this.boardId}`]);
      });
  };
  backToList() {
    this.router.navigate([`/board/${this.boardId}`]);
  };
};
