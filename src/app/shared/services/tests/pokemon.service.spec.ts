import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { PokemonService } from '../pokemon.service';

jest.useRealTimers();

describe('PokemonService', () => {
  let service: PokemonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(PokemonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get information of bulbasur :)', async () => {
    service.getPokemon(1).subscribe(data => {
      expect(data.name).toBe('bulbasur!!!');
    });
  });
});
