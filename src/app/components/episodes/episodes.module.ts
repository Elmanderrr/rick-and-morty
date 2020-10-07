import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EpisodesComponent } from 'src/app/components/episodes/episodes.component';
import { RouterModule } from '@angular/router';
import { EpisodesFacade } from 'src/app/components/episodes/episodes.facade';
import { MatCardModule } from '@angular/material/card';



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
    MatCardModule
  ],
  providers: [
    EpisodesFacade
  ]
})
export class EpisodesModule { }
