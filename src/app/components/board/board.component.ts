import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ListService } from '../../services/list/list.service';
import { Observable, Subject } from 'rxjs';
import { DragulaService } from 'ng2-dragula';
import { takeUntil, filter, switchMap } from 'rxjs/operators';
import { CardService } from '../../services/card/card.service';
import { ActivatedRoute } from '@angular/router';
import { List } from '../../models/list';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
})
export class BoardComponent implements OnDestroy, OnInit {

  private destroy$ = new Subject<void>();
  public lists: List[];
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

  async ngOnInit() {
    const lists = await this.listService
      .getLists(this.boardId).toPromise();

    for (const list of lists) {
      list.cards = await this.cardService.getCardsByListId(list.id).toPromise();
    }
    this.lists = lists;

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
