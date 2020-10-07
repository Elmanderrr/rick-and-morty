import { Component, OnInit } from '@angular/core';
import { EpisodesFacade } from 'src/app/components/episodes/episodes.facade';
import { Observable } from 'rxjs';
import { Episode, Paginator } from 'src/app/core/rick-and-morty.api';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.scss']
})
export class EpisodesComponent implements OnInit {

  constructor(public episodesFacade: EpisodesFacade) { }

  public episodes$: Observable<Episode[]>;
  public pagination$: Observable<Paginator>;

  ngOnInit(): void {
    this.episodesFacade.loadEpisodes();

    this.pagination$ = this.episodesFacade.getPagination();
    this.episodes$ = this.episodesFacade.getEpisodes();
  }

}
