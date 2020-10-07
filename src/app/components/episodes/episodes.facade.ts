import { Injectable } from '@angular/core';
import { EpisodesStore } from 'src/app/core/episodes.store';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { isEqual } from 'lodash';
import { Episode } from 'src/app/core/rick-and-morty.api';

@Injectable()
export class EpisodesFacade {
  constructor(private episodesStore: EpisodesStore) {
  }

  public posters = {
    1: 'https://images-na.ssl-images-amazon.com/images/I/613UlGuu8uL._SX342_.jpg',
    2: 'https://images-na.ssl-images-amazon.com/images/I/91bz4%2BadbbL._AC_SX342_.jpg',
    3: 'https://d32qys9a6wm9no.cloudfront.net/images/tvs/poster/7a/0b015a1c136b1f76fcdccb86be2410e9_300x442.jpg?t=1582846929'
  };

  loadEpisodes() {
    this.episodesStore.fetchEpisodes();
  }

  getPagination() {
    return this.episodesStore.paginator$.pipe(distinctUntilChanged(isEqual));
  }

  getEpisodes() {
    return this.episodesStore.episodes$
      .pipe(
        distinctUntilChanged(isEqual),
        map((result: Episode[] ) => {
          if (!result) {
            return result;
          }

          return result.map(episode => {
            return {
              ...episode,
              seasonNo: this.extractSeason(episode),
              episodeNo: this.extractEpisode(episode),
            } as Episode;
          });
        })
      );
  }

  private extractSeason(episode: Episode) {
    const season = episode.episode.match(/(\d{2})/g);
    return Number(season[0]);
  }

  private extractEpisode(episode: Episode) {
    const ep = episode.episode.match(/(\d{2})/g);
    return Number(ep[1]);
  }
}