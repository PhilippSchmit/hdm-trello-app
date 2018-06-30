import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user/user.service';
import { filter, switchMapTo } from 'rxjs/operators';
import { BoardService } from './services/board/board.service';
import { Observable } from 'rxjs';
import { Board } from './models/board';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  public boards$: Observable<Board[]>;
  public newBoardName: string;

  constructor(
    private userService: UserService,
    private boardService: BoardService,
  ) {
    this.boards$ = this.userService
      .getUser()
      .pipe(
        filter(user => user),
        switchMapTo(this.boardService.getBoards()),
    );
  }

  ngOnInit() {
    this.userService.authorize();
  }

  public createBoard() {
    this.boardService
      .create(this.newBoardName)
      .subscribe(() => {
        this.boards$ = this.boardService.getBoards();
        this.newBoardName = '';
      });
  }
}
