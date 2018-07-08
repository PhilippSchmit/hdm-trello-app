import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
declare const Trello: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly trelloApiUrl = `https://api.trello.com/1`;
  private readonly currentUser = new BehaviorSubject<any>(null);

  constructor(
    private http: HttpClient,
  ) { }

  public authorize() {
    Trello.authorize({
      type: 'popup',
      name: 'Getting Started Application',
      scope: {
        read: 'true',
        write: 'true'
      },
      expiration: 'never',
      success: this.onAuthorizationSuccess.bind(this),
      error: this.onAuthorizationFailure,
    });
  }

  public async onAuthorizationSuccess() {
    const token = this.getToken();

    const userData = await this.http
      .get(`${this.trelloApiUrl}/tokens/${token}/member`)
      .toPromise();

    this.currentUser.next(userData);
  }

  public onAuthorizationFailure() {

  }

  public getToken() {
    return localStorage.getItem('trello_token');
  }

  public getUser() {
    return this.currentUser;
  }

}
