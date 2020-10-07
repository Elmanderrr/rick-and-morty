import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Episode, Paginator, RickAndMortyApi } from 'src/app/core/rick-and-morty.api';


@Injectable({
  providedIn: 'root'
})
export class EpisodesStore {
  constructor(private api: RickAndMortyApi) {
  }

  private readonly obs = new BehaviorSubject<Episode[]>(null);
  private readonly paginatorObs = new BehaviorSubject<Paginator>(null);
  public paginator$ = this.paginatorObs.asObservable();
  public episodes$ = this.obs.asObservable();

  get episodes() {
    return this.obs.getValue();
  }

  set episodes(episodes: Episode[]) {
    this.obs.next(episodes);
  }


  fetchEpisodes() {
    this.api.getEpisodes().subscribe((response) => {
      this.episodes = response.results;
      this.paginatorObs.next(response.info);
    });
  }

}