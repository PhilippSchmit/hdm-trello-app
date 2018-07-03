import { Injectable } from '@angular/core';
import { TrelloService } from '../trello/trello.service';
import { List } from '../../models/list';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(
    private trelloService: TrelloService,
  ) { }

  public getLists(boardId: string) {
    return this.trelloService
      .get<List[]>(`/boards/${boardId}/lists`);
  }

  public updateListById(listId: string, data: any) {
    return this.trelloService
      .put(`/lists/${listId}`, data);
  }


}
