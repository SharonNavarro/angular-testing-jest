/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';

import { routes } from '../../app.routes';
import { SearchComponent } from '../search/search.component';

describe('SearchComponent (con Jest)', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  // simulate the ActivatedRoute with a BehaviorSubject
  // const activatedRouteStub = { queryParams: new BehaviorSubject<any>({}) };

  // in Jest, instead of jasmine.createSpyObj, we use an object with mock functions.
  // const routerStub = {
  //   navigate: jest
  //     .fn()
  //     .mockImplementation(
  //       (commands: any, navigationExtras: { queryParams: any }) => {
  //         activatedRouteStub.queryParams.next(navigationExtras.queryParams);
  //       }
  //     ),
  // };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchComponent],
      providers: [
        provideRouter(routes),
        // { provide: Router, useValue: routerStub },
        // { provide: ActivatedRoute, useValue: activatedRouteStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('it should be created properly', () => {
    expect(component).toBeTruthy();
  });

  describe('should display the text "search: books', () => {
    // This block (commented out) shows the classic approach for testing without RouterTestingHarness:
    // it('using the component instance directly ("NORMAL WAY")', async () => {
    //   await fixture.componentInstance.searchFor('books');
    //   fixture.detectChanges();
    //   expect(fixture.nativeElement.innerHTML).toContain('search: books');
    // });

    describe('Using RouterTestingHarness', () => {
      it('should display "search: books" when set via query params (ngOnInit)', async () => {
        // 1) Create the RouterTestingHarness, which handles the internal navigation for Angular
        const harness = await RouterTestingHarness.create();

        // 2) Navigate to /basic/search?search=books, so ngOnInit can capture that query param
        await harness.navigateByUrl(
          '/basic/search?search=books',
          SearchComponent
        );

        // 3) Trigger change detection so the template is updated
        harness.detectChanges();

        // 4) Verify that "search: books" is displayed in the rendered DOM
        expect(harness.routeNativeElement?.innerHTML).toContain(
          'search: books'
        );
      });

      it('should display "search: books" when calling the searchFor() method explicitly', async () => {
        const harness = await RouterTestingHarness.create();
        const activatedComponent = await harness.navigateByUrl(
          '/basic/search?search=books',
          SearchComponent
        );

        // Call searchFor() on the component instance to manually update the query params
        await activatedComponent.searchFor('books');

        harness.detectChanges();

        // Check that "search: books" is present in the rendered DOM
        expect(harness.routeNativeElement?.innerHTML).toContain(
          'search: books'
        );
      });
    });
  });
});
