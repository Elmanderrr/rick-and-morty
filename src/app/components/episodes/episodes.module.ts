import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EpisodesComponent } from 'src/app/components/episodes/episodes.component';
import { RouterModule } from '@angular/router';
import { EpisodesFacade } from 'src/app/components/episodes/episodes.facade';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [EpisodesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: EpisodesComponent
      }
    ]),
    MatCardModule,
    MatButtonModule
  ],
  providers: [
    EpisodesFacade
  ]
})
export class EpisodesModule { }
