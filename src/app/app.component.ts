import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root', templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'app';

  boardCount: number;
  labelText = 'Amount of boards';
  goalText = 'Initial text';

  boards = [];

  constructor() {
  }

  ngOnInit() {
    this.boardCount = this.boards.length;
  }

  addItem() {
    this.boards.push(this.goalText);
    this.goalText = '';
    this.boardCount = this.boards.length;
  }

}
