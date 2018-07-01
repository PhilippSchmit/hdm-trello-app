import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { NgModule, LOCALE_ID } from '@angular/core';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatGridListModule,
  MatMenuModule,
  MatIconModule,
  MatDialogModule,
  MatCardModule,
  MatListModule,
  MatProgressSpinnerModule,
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { DragulaModule } from 'ng2-dragula';
import { rootRoutes } from './app.routes';

import {
  BoardComponent,
  BoardListComponent,
  CalendarBoardComponent,
  CardComponent,
  ListComponent,
  MenuComponent,
} from './components';

import {
  HttpInterceptorService,
  TrelloService,
} from './services';
import { ObservableMediaProvider } from '@angular/flex-layout';

registerLocaleData(localeDe, 'de');

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    BoardComponent,
    CardComponent,
    ListComponent,
    BoardListComponent,
    CalendarBoardComponent,
  ],
  entryComponents: [
    CardComponent,
  ],
  imports: [
    BrowserModule,
    DragulaModule,
    MatCheckboxModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatListModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatCardModule,
    FormsModule,
    RouterModule.forRoot(rootRoutes),
  ],
  providers: [
    TrelloService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    {
      provide: LOCALE_ID,
      useValue: 'de',
    },
    ObservableMediaProvider,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
