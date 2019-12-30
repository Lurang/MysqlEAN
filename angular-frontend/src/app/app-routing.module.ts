import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router';

import { BoardComponent } from './board/board.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { BoardPostFormComponent } from './board-post-form/board-post-form.component';

import { BoardDetailComponent } from './board-detail/board-detail.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'user', component: UserComponent },
    { path: 'board/:boardId', component: BoardComponent },
    { path: 'board/:boardId/newPost', component:BoardPostFormComponent },
    { path: 'board/:boardId/:postId', component: BoardDetailComponent },
    { path: 'board/:boardId/:postId/modify', component: BoardPostFormComponent },
    { path: 'home', component: HomeComponent },
    { path: 'admin', component: AdminComponent },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {
    
};