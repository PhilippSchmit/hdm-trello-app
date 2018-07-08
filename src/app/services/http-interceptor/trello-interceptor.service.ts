import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpParams } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { UserService } from '../user/user.service';

@Injectable()
export class TrelloInterceptorService implements HttpInterceptor {

  constructor(
    private userService: UserService,
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const params = new HttpParams()
      .set('key', environment.trelloApiKey)
      .set('token', this.userService.getToken());

    const duplicate = req.clone({ params });

    return next.handle(duplicate);
  }
}
