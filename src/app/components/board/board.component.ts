import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ListService } from '../../services/list/list.service';
import { Observable, Subject } from 'rxjs';
import { DragulaService } from 'ng2-dragula';
import { takeUntil, debounce, debounceTime, filter, switchMap } from 'rxjs/operators';
import { CardService } from '../../services/card/card.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnDestroy, OnInit {

  private destroy$ = new Subject<void>();
  public lists$: Observable<any>;
  public boardId: string;
  public boardName: string;

  constructor(
    private dragulaService: DragulaService,
    private listService: ListService,
    private cardService: CardService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.boardId = this.activatedRoute.snapshot.paramMap.get('boardId');
    this.boardName = this.activatedRoute.snapshot.paramMap.get('boardName');
  }

  ngOnInit() {
    this.lists$ = this.listService
      .getLists(this.boardId);

    this.dragulaService.drop
      .pipe(
        filter(([boardId]) => boardId === this.boardId),
        takeUntil(this.destroy$),
      )
      .subscribe(([_, droppedCard, targetList]) => {
        this.handleCardDrop(
          droppedCard.dataset.cardId,
          targetList.dataset.listId
        );
      });
  }

  private handleCardDrop(cardId: string, idList: string) {
    this.cardService.updateCardById(cardId, {
      idList,
    }).toPromise();
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

}
