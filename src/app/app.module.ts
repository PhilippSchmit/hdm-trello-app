import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatInputModule, MatFormFieldModule, MatDatepickerModule} from '@angular/material';
import { MatMenuModule, MatIconModule, MatDialogModule, MatCardModule, MatListModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { BoardComponent } from './components/board/board.component';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TrelloService } from './services/trello/trello.service';
import { HttpInterceptorHandler } from '@angular/common/http/src/interceptor';
import { TrelloInterceptorService } from './services/http-interceptor/trello-interceptor.service';
import { CardComponent } from './components/card/card.component';
import { ListComponent } from './components/list/list.component';

import { DragulaModule } from 'ng2-dragula';
import { BoardListComponent } from './components/board-list/board-list.component';
import { rootRoutes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    BoardComponent,
    CardComponent,
    ListComponent,
    BoardListComponent,
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
      useClass: TrelloInterceptorService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
