import { Injectable } from '@angular/core';
import { TrelloService } from '../trello/trello.service';
import { Card } from '../../models/card';
import * as moment from 'moment';
import { BoardService } from '../board';
import { switchMap, mergeAll, scan } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(
    private boardService: BoardService,
    private trelloService: TrelloService,
  ) { }

  public getAllCardsWithinDueDateRange(from: Date, to: Date) {
    const dueDateFilter = this.filterCardsByDueDate(from, to);
    return this.boardService.getBoards().pipe(
      switchMap(boards =>
        boards.map(board => this.getCardsByBoardId(board.id)),
      ),
      mergeAll<Card[]>(),
      scan((acc: Card[], curr: Card[]) => {
        const cardsWithinDueDateRange = curr.filter(dueDateFilter);
        return acc.concat(cardsWithinDueDateRange);
      }, []),
    );
  }

  public filterCardsByDueDate(from: Date, to: Date) {
    return (card: Card) =>
      !!card.due &&
      moment(card.due).isSameOrAfter(from) &&
      moment(card.due).isSameOrBefore(to);
  }

  public getCardsByBoardId(boardId: string) {
    return this.trelloService
      .get<Card[]>(`/boards/${boardId}/cards`);
  }

  public getCardsByListId(listId: string) {
    return this.trelloService
      .get<Card[]>(`/lists/${listId}/cards`);
  }

  public updateCardById(cardId: string, data: any) {
    return this.trelloService
      .put<Card>(`/cards/${cardId}`, data);
  }

  public deleteCardById(cardId: string) {
    return this.trelloService.delete(`/cards/${cardId}`);
  }
}
