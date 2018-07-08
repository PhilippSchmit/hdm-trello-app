import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { BoardService } from '../../services/board/board.service';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.css']
})
export class BoardListComponent implements OnInit {

  public boards$: Observable<any>;
  public newBoardName: string;

  constructor(
    private userService: UserService,
    private boardService: BoardService,
  ) {
    this.boards$ = this.userService
      .getUser()
      .pipe(
        filter(user => user),
        switchMap(user => this.boardService.getBoards()),
      );
  }

  public ngOnInit() {}

  public createBoard() {
    this.boardService
      .create(this.newBoardName)
      .subscribe(() => {
        this.boards$ = this.boardService.getBoards();
        this.newBoardName = '';
      });
  }

}
