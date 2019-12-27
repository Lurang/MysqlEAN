import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { PostList, Index, PostDetail, BoardList } from './board';

const header = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Cache': 'no-cache'
  },
  credentials: 'include',  
}

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private apiBaseUrl = environment.apiBaseUrl;
  boardList: BoardList[];

  constructor(private http: HttpClient) { }

  reqBoardList() {
    this.http.get<Index>(`${this.apiBaseUrl}`, header)
      .subscribe((board) => {
        this.boardList = board.board;
      });
  };
  reqPostList(id) {
    return this.http.get<PostList>(`${this.apiBaseUrl}/board/${id}`, header);
  };
  reqPostDetail(boardId, postId) {
    return this.http.get<PostDetail>(`${this.apiBaseUrl}/board/${boardId}/${postId}`, header);
  };
}
