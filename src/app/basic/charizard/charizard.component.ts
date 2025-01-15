import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Pokemon } from '../../shared/interfaces/pokemon.interface';
import { PokemonService } from '../../shared/services/pokemon.service';

@Component({
  selector: 'app-charizard',
  templateUrl: './charizard.component.html',
  styleUrl: './charizard.component.scss',
})
export class CharizardComponent implements OnInit {
  private _pokemonService = inject(PokemonService);
  public pokemon$!: Observable<Pokemon>;

  ngOnInit(): void {
    this.getPokemon();
  }

  private getPokemon(): void {
    this.pokemon$ = this._pokemonService.getPokemon(6);
  }
}
