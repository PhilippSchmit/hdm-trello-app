import { Injectable } from '@angular/core';
import { TrelloService } from '../trello/trello.service';
import { Card } from '../../models/card';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(
    private trelloService: TrelloService,
  ) { }

  public getCardsByListId(listId: string) {
    return this.trelloService
      .get(`/lists/${listId}/cards`);
  }

  public updateCardById(cardId: string, data: any) {
    return this.trelloService.put<Card>(`/cards/${cardId}`, data);
  }

  public deleteCardById(cardId: string, data: any) {
    return this.trelloService.delete<Card>(`/cards/${cardId}`, data);
  }
}
