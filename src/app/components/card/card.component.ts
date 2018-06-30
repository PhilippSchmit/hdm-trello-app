import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { Card } from '../../models/card';
import { CardService } from '../../services/card/card.service';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { FormControl } from '@angular/forms';

import * as moment from 'moment';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ]
})
export class CardComponent implements OnInit {

  public card: Card;
  public cardDescription: string;
  public cardName: string;
  public editing$ = new BehaviorSubject<boolean>(false);
  public dueDate = new FormControl(moment([2017, 0, 1]));

  constructor(
    public cardService: CardService,
    public dialogRef: MatDialogRef<CardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dueDate.valueChanges
      .subscribe((date: moment.Moment) => {
        const formattedDate = date.format('DD.MM.YYYY');
        this.cardService.updateCardById(this.card.id, {
          due: formattedDate,
        }).subscribe(console.log);
      });
  }

  ngOnInit() {
    this.card = this.data.card;
    this.cardName = this.card.name;
    this.cardDescription = this.card.desc;
  }

  public updateCard() {
    this.cardService.updateCardById(this.card.id, {
      name: this.cardName,
      desc: this.cardDescription,
    }).subscribe(result => {
      this.card = result;
      this.editing$.next(false);
    });
  }

  public deleteCard() {
    this.cardService.deleteCardById(this.card.id, {
      name: this.cardName,
      desc: this.cardDescription,
    }).subscribe(_ => this.dialogRef.close());
  }

}
