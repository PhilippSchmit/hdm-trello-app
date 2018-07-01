import { Component, OnInit, Input } from '@angular/core';
import { CardService } from '../../services/card/card.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material';
import { CardComponent } from '../card/card.component';
import { ListService } from '../../services/list/list.service';
import { Card } from '../../models/card';
import { switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {

  @Input()
  public list;
  public cards: Card[];
  public editing$ = new BehaviorSubject<boolean>(false);
  public listName: string;
  public cardDialogRef: MatDialogRef<CardComponent>;

  constructor(
    public dialog: MatDialog,
    private cardService: CardService,
    private listService: ListService,
  ) { }

  ngOnInit() {
    this.fetchCards();
    this.listName = this.list.name;
  }

  private async fetchCards() {
    this.cards = await this.cardService
      .getCardsByListId(this.list.id)
      .toPromise();
  }

  showCardDetail(card: any) {
    this.cardDialogRef = this.dialog.open(
      CardComponent, {
        data: { card },
        panelClass: 'card-detail-container',
      }
    );

    this.cardDialogRef.componentInstance.delete
      .pipe(
        switchMap(cardId => this.cardService.deleteCardById(cardId)),
        take(1),
    ).subscribe(_ => {
      this.cardDialogRef.close({ changed: true });
      this.fetchCards();
    });
  }

  unshowCardDetail(card: any) {
    this.cardDialogRef.close();
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
      .subscribe(() => {
        this.editing$.next(false);
      });
  }

}
