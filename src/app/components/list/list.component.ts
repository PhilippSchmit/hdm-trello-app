import { Component, OnInit, Input } from '@angular/core';
import { CardService } from '../../services/card/card.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material';
import { CardComponent } from '../card/card.component';
import { ListService } from '../../services/list/list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input()
  public list;
  public cards$: Observable<any>;
  public editing$ = new BehaviorSubject<boolean>(false);
  public listName: string;

  constructor(
    public dialog: MatDialog,
    private cardService: CardService,
    private listService: ListService,
  ) { }

  ngOnInit() {
    this.cards$ = this.cardService
      .getCardsByListId(this.list.id);

    this.listName = this.list.name;
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
