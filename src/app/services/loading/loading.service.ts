import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loading$ = new BehaviorSubject<boolean>(false);

  constructor() { }

  public show(): void {
    this.loading$.next(true);
  }

  public hide(): void {
    this.loading$.next(false);
  }

  public getLoadingState() {
    return this.loading$.asObservable();
  }
}
