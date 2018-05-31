import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  animations: [

    
  ]
})

export class AppComponent implements OnInit {
  title = 'app';

  boardCount: number;
  labelText = 'Amount of boards';
  goalText = 'Initial text';

  boards = [];

  constructor() {}

  ngOnInit() {
    this.boardCount = this.boards.length;
  }

  addItem() {
    this.boards.push(this.goalText);
    this.goalText = '';
    this.boardCount = this.boards.length;
  }

}
