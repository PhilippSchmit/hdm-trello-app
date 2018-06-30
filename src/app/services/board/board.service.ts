import { Injectable } from '@angular/core';
import { TrelloService } from '../trello/trello.service';
import { UserService } from '../user/user.service';
import { switchMap, skipWhile } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Board } from '../../models/board';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(
    private trelloService: TrelloService,
    private userService: UserService,
  ) { }

  public getBoards(): Observable<Board[]> {
    return this.userService
      .getUser()
      .pipe(
        skipWhile(user => !user),
        switchMap<any, Board[]>(user => this.trelloService.get<Board[]>(`/members/${user.id}/boards`))
      );
  }

  public getBoardById(boardId: string): Observable<Board> {
    return this.trelloService
      .get<Board>(`/boards/${boardId}`);
  }

  public create(name: string) {
    return this.trelloService
      .post(`/boards`, {
        name,
      });
  }
}
