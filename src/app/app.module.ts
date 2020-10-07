import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { UsersModule } from 'src/app/components/users/users.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    UsersModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    RouterModule.forRoot([
      {
        path: 'episodes',
        loadChildren: () => import('src/app/components/episodes/episodes.module').then(m => m.EpisodesModule)
      }
    ])
  ],
  exports: [
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
