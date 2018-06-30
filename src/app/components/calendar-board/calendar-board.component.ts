import { Component, OnInit, OnDestroy } from '@angular/core';
import { CardService } from '../../services';
import { Observable, Subject } from 'rxjs';
import { Card } from '../../models/card';
import * as moment from 'moment';
import { DayGroupedList, buildDayGroupedList } from '../../utils';
import { MatDialog } from '@angular/material';
import { CardComponent } from '../card';
import { DragulaService } from 'ng2-dragula';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-calendar-board',
  templateUrl: './calendar-board.component.html',
  styleUrls: ['./calendar-board.component.css']
})

export class CalendarBoardComponent implements OnDestroy, OnInit {

  private readonly dayRange = 5;
  private readonly startDate = moment.utc().startOf('day').toDate();
  private readonly endDate = moment.utc().add(this.dayRange, 'days').toDate();
  private destroy$ = new Subject<void>();
  public cards$: Observable<Card[]>;
  public lists: DayGroupedList;

  constructor(
    private cardService: CardService,
    private dragulaService: DragulaService,
    public dialog: MatDialog,
  ) {
    this.cards$ = cardService.getAllCardsWithinDueDateRange(
      this.startDate,
      this.endDate,
    );

    this.dragulaService.drop.pipe(
      takeUntil(this.destroy$),
    )
      .subscribe(([_, droppedCard, targetList]) => {
        this.handleCardDrop(
          droppedCard.dataset.cardId,
          targetList.dataset.listId,
        );
      });
  }

  ngOnInit() {
    this.cards$.subscribe(cards => {

      this.lists = buildDayGroupedList(
        this.startDate,
        this.dayRange,
      );

      for (const card of cards) {
        const cardDueDate = moment.utc(card.due);
        const list = this.lists.find(listItem => {
          const start = moment.utc(listItem.start);
          const end = moment.utc(listItem.end);
          return cardDueDate.isSameOrAfter(start) && cardDueDate.isSameOrBefore(end);
        });
        if (list) {
          list.cards.push(card);
        }
      }
    });
  }

  showCardDetail(card: any) {
    this.dialog.open(
      CardComponent, {
        data: { card },
        panelClass: 'card-detail-container',
      }
    );
  }

  unshowCardDetail(card: any) {
    this.dialog.closeAll();
  }

  private handleCardDrop(cardId: string, idList: string) {
    const newDueDate = this.getDueDateFromListId(idList);
    this.cardService.updateCardById(cardId, {
      due: newDueDate.toISOString(),
    } as Partial<Card>).toPromise();
  }

  public ngOnDestroy() {
    this.destroy$.next();
  }

  private getDueDateFromListId(id: string): Date {
    const list = this.lists.find(listItem => listItem.id === id);
    return moment.utc(list.start).add(12, 'hours').toDate();
  }
}
