import { Injectable } from '@angular/core';
import { TrelloService } from '../trello/trello.service';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(
    private trelloService: TrelloService,
  ) { }

  public getLists(boardId: string) {
    return this.trelloService
      .get(`/boards/${boardId}/lists`);
  }

  public updateListById(listId: string, data: any) {
    return this.trelloService
      .put(`/lists/${listId}`, data);
  }


}
