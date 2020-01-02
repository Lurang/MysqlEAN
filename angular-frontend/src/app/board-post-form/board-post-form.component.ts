import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { BoardService } from '../board/board.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-board-post-form',
  templateUrl: './board-post-form.component.html',
  styleUrls: ['./board-post-form.component.css'],
})

export class BoardPostFormComponent implements OnInit {
  postForm;
  boardId;
  postId;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private boardService: BoardService,
    private router: Router,
    private location: Location,
  ) {
    this.route.paramMap.subscribe(params => {
      this.boardId = params.get('boardId');  
      this.postId = params.get('postId');  
      console.log(this.postId)  
    });
  };

  ngOnInit() {
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
    });

    if (this.postId) {
      this.getData(this.boardId, this.postId);
    };
  };
  
  getData(boardId, postId) {
    this.boardService.reqPostDetail(boardId, postId)
      .subscribe((data) => {
        this.postForm.title = data.postInfo.post_title;
        this.postForm.body = data.postInfo.post_body;
        this.postForm.get('title').setValue(data.postInfo.post_title);
        this.postForm.get('body').setValue(data.postInfo.post_body);
      });
  };
  onSubmit(data) {
    if (this.postId) {  //수정
      this.boardService.updatePost(this.postId, data.title, data.body)
        .subscribe(() => {
          this.location.back();
        });
    } else {            //newPost
      this.boardService.addPost(this.boardId, data.title, data.body)
      .subscribe(() => {
        this.router.navigate([`/board/${this.boardId}`]);
      });
    };    
  };
  goBack() {
    this.location.back();
  };
};
