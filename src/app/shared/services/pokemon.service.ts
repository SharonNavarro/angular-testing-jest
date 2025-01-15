import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Pokemon } from '../interfaces/pokemon.interface';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private _http = inject(HttpClient);
  private urlService = environment.POKEMON_URL;

  public getPokemon(id: number): Observable<Pokemon> {
    return this._http.get<Pokemon>(`${this.urlService}/${id}`);
  }
}
