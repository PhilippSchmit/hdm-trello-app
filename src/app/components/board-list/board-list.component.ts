import { Component, OnInit, ViewChild, AfterContentInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { BoardService } from '../../services/board/board.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { filter, switchMap, take, map, tap } from 'rxjs/operators';
import { Board } from '../../models/board';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { MatGridList } from '@angular/material';
import { LoadingService } from '../../services';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
})
export class BoardListComponent implements AfterContentInit {

  public gridColumns$ = new BehaviorSubject(2);
  public boards$: Observable<Board[]>;
  public newBoardName: string;
  private gridColumnsByBreakpoint = {
    xl: 8,
    lg: 6,
    md: 4,
    sm: 2,
    xs: 1,
  };

  constructor(
    private userService: UserService,
    private boardService: BoardService,
    private observableMedia: ObservableMedia,
    private loadingService: LoadingService,
  ) {
    this.boards$ = this.userService
      .getUser()
      .pipe(
        filter(user => user),
        tap(_ => this.loadingService.show()),
        switchMap(user => this.boardService.getBoards()),
        tap(_ => this.loadingService.hide()),
    );

    this.observableMedia
      .asObservable()
      .subscribe(change =>
        this.gridColumns$.next(this.gridColumnsByBreakpoint[change.mqAlias])
      );
  }

  ngAfterContentInit() {

  }

  public createBoard() {
    this.boardService
      .create(this.newBoardName)
      .pipe(take(1))
      .subscribe(() => {
        this.boards$ = this.boardService.getBoards();
        this.newBoardName = '';
      });
  }

}
