import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { KanbanBoardComponent } from './components/kanban-board/kanban-board.component';
import { PartnersComponent } from './components/partners/partners.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
    { path: 'sign-in', component: SignInComponent },
    { 
      path: 'home', 
      component: HomeComponent, 
      canActivate: [AuthGuard],
      children: [
          { path: 'kanban-board', component: KanbanBoardComponent },
          { path: 'partners', component: PartnersComponent },
          { path: 'dashboard', component: DashboardComponent },
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' } // Default route
      ]
  },
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect to home if logged in
    { path: '**', redirectTo: '/home' } // Redirect unknown paths to home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }