import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserService } from '../user/user.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(
    private userService: UserService,
  ) { }

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
