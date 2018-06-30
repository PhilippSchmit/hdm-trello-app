import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatInputModule, MatFormFieldModule, MatDatepickerModule } from '@angular/material';
import { MatMenuModule, MatIconModule, MatDialogModule, MatCardModule, MatListModule } from '@angular/material';
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
  ListViewComponent,
  MenuComponent,
} from './components';

import {
  HttpInterceptorService,
  TrelloService,
} from './services';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    BoardComponent,
    CardComponent,
    ListComponent,
    BoardListComponent,
    ListViewComponent,
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
