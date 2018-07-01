import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService, LoadingService } from './services';
import { filter, switchMapTo, debounceTime, tap } from 'rxjs/operators';
import { BoardService } from './services/board/board.service';
import { Observable } from 'rxjs';
import { Board } from './models/board';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {

  public boards$: Observable<Board[]>;
  public newBoardName: string;
  public loading$: Observable<boolean>;

  constructor(
    private userService: UserService,
    private boardService: BoardService,
    private loadingService: LoadingService,
  ) {
    this.boards$ = this.userService
      .getUser()
      .pipe(
        filter(user => user),
        switchMapTo(this.boardService.getBoards()),
    );

    this.loading$ = this.loadingService
      .getLoadingState().pipe(
        debounceTime(200),
        tap(console.log),
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
