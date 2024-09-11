import { Component } from '@angular/core';
import { KanbanBoardComponent } from "../kanban-board/kanban-board.component";
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../service/auth-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  items: MenuItem[];
  activeItem: MenuItem;
  constructor(private authenticService: AuthService)
  {
    this.items = [
      { label: 'Dashboard', icon: 'pi pi-home', routerLink: ['/home/dashboard'] },
      { label: 'Kanban Board', icon: 'pi pi-th-large', routerLink: ['/home/kanban-board'] },
      { label: 'Partners', icon: 'pi pi-users', routerLink: ['/home/partners'] },
      { label: 'Log Out', icon: 'pi pi-sign-out', command: () => this.logout(), routerLink: ['/sign-in'] }
    ];
    this.activeItem = this.items[0];
  }
  logout(){
      this.authenticService.logout();
  }
  onActiveItemChange(event: MenuItem) {
    this.activeItem = event;
  }

}
