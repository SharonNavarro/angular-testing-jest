import { Location } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideRouter } from '@angular/router';

import { AppComponent } from '../app.component';
import { routes } from '../app.routes';
import { PokemonService } from '../shared/services/pokemon.service';

describe('Router: App', () => {
  let router: Router;
  let location: Location;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        PokemonService,
        provideRouter(routes),
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(AppComponent);

    router.initialNavigation();
    fixture.detectChanges();
  });

  it('navigate to "" should redirect you to /basic/counter', fakeAsync(() => {
    router.navigate(['']);
    tick();
    expect(location.path()).toBe('/basic/counter');
  }));

  it('navigate to "/basic/counter" should go to /basic/counter', fakeAsync(() => {
    router.navigate(['/basic/counter']);
    tick();
    expect(location.path()).toBe('/basic/counter');
  }));

  it('navigate to "/basic/counter/10" should go to /basic/counter/10', fakeAsync(() => {
    router.navigate(['/basic/counter', 10]);
    tick();
    expect(location.path()).toBe('/basic/counter/10');
  }));

  it('navigate to "/basic/charizard" should go to /basic/charizard', fakeAsync(() => {
    router.navigate(['/basic/charizard']);
    tick();
    expect(location.path()).toBe('/basic/charizard');
  }));

  it('navigate to "/basic/father" should go to /basic/father', fakeAsync(() => {
    router.navigate(['/basic/father']);
    tick();
    expect(location.path()).toBe('/basic/father');
  }));

  it('navigate to "/basic/son" should go to /basic/son', fakeAsync(() => {
    router.navigate(['/basic/son']);
    tick();
    expect(location.path()).toBe('/basic/son');
  }));

  it('navigate to a non-existent path should match the wildcard and load the Counter component', fakeAsync(() => {
    router.navigate(['/this-route-does-not-exist']);
    tick();

    expect(location.path()).toBe('/this-route-does-not-exist');

    // verify that the `CounterComponent` component was loaded by looking for the component selector
    const counterWrapper = fixture.nativeElement.querySelector('app-counter');
    expect(counterWrapper).toBeTruthy();
  }));
});
