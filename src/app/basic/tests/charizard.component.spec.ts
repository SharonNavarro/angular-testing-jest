import { AsyncPipe } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { environment } from '../../../environments/environment';
import { PokemonService } from '../../shared/services/pokemon.service';
import { CharizardComponent } from '../charizard/charizard.component';

describe('CharizardComponent', () => {
  let component: CharizardComponent;
  let fixture: ComponentFixture<CharizardComponent>;
  let compiled: HTMLElement;
  let httpMock: HttpTestingController;
  const urlService = environment.POKEMON_URL;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharizardComponent],
      imports: [AsyncPipe],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        PokemonService,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharizardComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);

    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should match to snapshot', () => {
    expect(compiled.innerHTML).toMatchSnapshot();
  });

  it('should display a loading at the beginning', () => {
    const h2 = compiled.querySelector('[data-test="h2-loading"]');
    expect(h2?.textContent).toEqual('Loading...');
  });

  it('should display Charizard data correctly', fakeAsync(() => {
    const dummyPokemon = {
      name: 'charixado!!',
      sprites: {
        front_default: 'https://charizard.com/sprite.png',
      },
    };

    const request = httpMock.expectOne(`${urlService}/6`);
    expect(request.request.method).toBe('GET');

    request.flush(dummyPokemon);

    tick();
    fixture.detectChanges();

    const h3 = compiled.querySelector('[data-test="h3-pokemon-name"]');
    const img = compiled.querySelector(
      '[data-test="h3-pokemon-img"]'
    ) as HTMLImageElement;

    expect(h3?.textContent?.toLowerCase()).toContain(
      dummyPokemon.name.toLowerCase()
    );
    expect(img?.src).toBe(dummyPokemon.sprites.front_default);
    expect(img?.alt).toBe(dummyPokemon.name);
  }));
});
