import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  seasonNo: number;
  episodeNo: number;
  characters: Array<string>;
  url: string;
  created: string;
}

export interface Paginator {
  count: number;
  pages: number;
  next: string;
  prev: string;
}

export interface RickAndMortyResponse {
  info: Paginator;
  results: any;
}

export interface RickAndMortyEpisodesResponse extends RickAndMortyResponse {
  results: Episode[];
}


@Injectable({
  providedIn: 'root'
})
export class RickAndMortyApi {
  private base = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) {
  }

  getEpisodes(page: number = 1) {
    return this.http.get(`${this.base}/episode/?page=${page}`) as Observable<RickAndMortyEpisodesResponse>;
  }

  filterEpisodes(params: {name: string, episode?: string}) {
    const query = Object.keys(params)
      .filter(k => params[k])
      .map(key => `${key}=${params[key]}`)
      .join('&');

    return this.http.get(`${this.base}/episode/?${query}`) as Observable<RickAndMortyEpisodesResponse>;
  }
}