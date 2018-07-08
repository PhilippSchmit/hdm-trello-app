import { Component, OnInit, Input } from '@angular/core';
import { CardService } from '../../services/card/card.service';
import { BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material';
import { CardComponent } from '../card/card.component';
import { ListService } from '../../services/list/list.service';
import { Card } from '../../models/card';
import { switchMap, take, tap } from 'rxjs/operators';
import { List } from '../../models/list';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {

  @Input()
  public set list(value: List) {
    this._list = value;
  }
  public get list(): List {
    return this._list;
  }
  @Input()
  public dragulaBag: string;
  @Input()
  public editable = true;
  public editing$ = new BehaviorSubject<boolean>(false);
  public listName: string;
  private _list: List;

  constructor(
    public dialog: MatDialog,
    private cardService: CardService,
    private listService: ListService,
  ) { }

  ngOnInit() {
    this.listName = this.list.name;
  }

  showCardDetail(card: Card) {
    const cardDialogRef = this.dialog.open(
      CardComponent, {
        data: { card },
        panelClass: 'card-detail-container',
      }
    );

    cardDialogRef.componentInstance.delete
      .pipe(
        tap(deletedCard => {
          // remove the deleted card item
          const filteredCards = this._list.cards
            .filter(cardItem => cardItem.id !== deletedCard.id);
          this._list = {
            ...this._list,
            cards: filteredCards,
          };
        }),
        switchMap(deletedCard => this.cardService.deleteCardById(deletedCard.id)),
        take(1),
    ).subscribe(_ => {
      cardDialogRef.close();
    });

    cardDialogRef.componentInstance.update
      .pipe(
        tap(changedCard => {
          // update the changed card item
          const filteredCards = this._list.cards
            .filter(cardItem => cardItem.id !== changedCard.id);

          this._list = {
            ...this._list,
            cards: [...filteredCards, changedCard],
          };
        }),
        switchMap(changedCard => this.cardService.updateCardById(changedCard.id, changedCard)),
    ).subscribe();
  }

  async onSaveListName() {
    if (this.listName === this.list.name) {
      this.editing$.next(false);
      return;
    }
    this.listService
      .updateListById(
        this.list.id, {
        name: this.listName,
      })
      .pipe(
        take(1)
      )
      .subscribe(() => {
        this.editing$.next(false);
      });
  }

}
