import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TrelloService {

  private readonly trelloApiUrl = `https://api.trello.com/1`;

  constructor(
    private http: HttpClient,
  ) {}

  public get<T>(resource: string, params?: HttpParams) {
    return this.http
      .get<T>(
        `${this.trelloApiUrl}${resource}`,
        { params },
      );
  }

  public post<T>(resource: string, data: any) {
    return this.http
      .post<T>(`${this.trelloApiUrl}${resource}`, data);
  }

  public put<T>(resource: string, data: any) {
    return this.http
      .put<T>(`${this.trelloApiUrl}${resource}`, data);
  }

  public delete<T>(resource: string, data: any) {
    return this.http
      .delete<T>(`${this.trelloApiUrl}${resource}`, data);
  }
}
