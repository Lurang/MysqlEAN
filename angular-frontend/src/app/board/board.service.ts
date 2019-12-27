import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { PostList, Index } from './board';

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
  //board: BoardList;
  private apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  reqBoardList() {
    return this.http.get<Index>(`${this.apiBaseUrl}`, header);
  }
  reqPostList(id) {
    return this.http.get<PostList>(`${this.apiBaseUrl}/board/${id}`, header);
  }
}
