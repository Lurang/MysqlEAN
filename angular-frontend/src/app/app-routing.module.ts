import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router';

import { BoardComponent } from './board/board.component';
import { UserComponent } from './user/user.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'user', component: UserComponent },
    { path: 'board/:id', component: BoardComponent },
    { path: 'home', component: HomeComponent },
]

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {
    
}