import { Route } from '@angular/router';
import { BoardListComponent } from './components/board-list/board-list.component';
import { BoardComponent } from './components/board/board.component';

export const rootRoutes: Route[] = [
  {
    path: '',
    component: BoardListComponent,
  },
  {
    path: 'boards/:boardId/:boardName',
    component: BoardComponent,
  }
];
