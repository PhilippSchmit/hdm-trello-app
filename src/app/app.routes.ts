import { Route } from '@angular/router';
import { BoardListComponent, BoardComponent, CalendarBoardComponent } from './components';

export const rootRoutes: Route[] = [
  {
    path: '',
    component: BoardListComponent,
  },
  {
    path: 'boards/:boardId/:boardName',
    component: BoardComponent,
  },
  {
    path: 'calendar-board',
    component: CalendarBoardComponent,
  }
];
