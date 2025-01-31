import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { routes } from '../../app.routes';
import { CounterRouterComponent } from '../counter-router/counter-router.component';

describe('CounterRouterComponent', () => {
  let component: CounterRouterComponent;
  let fixture: ComponentFixture<CounterRouterComponent>;
  let router: Router;

  // Helper function to generate mockActivatedRoute
  const createMockActivatedRoute = (paramValue: string) => ({
    snapshot: {
      paramMap: {
        get(param: string) {
          return param === 'initial' ? paramValue : undefined;
        },
      },
    },
  });

  it('should be 0 as initial value', async () => {
    await TestBed.configureTestingModule({
      declarations: [CounterRouterComponent],
      imports: [RouterModule.forRoot(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(CounterRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.counter()).toBe(0);
  });

  it('should be 100 as initial value in route /counter/100', async () => {
    const mockActivatedRoute = createMockActivatedRoute('100');

    await TestBed.configureTestingModule({
      declarations: [CounterRouterComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CounterRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.counter()).toBe(100);
  });

  it('should be 10 as initial value in route /counter/20abc', async () => {
    const mockActivatedRoute = createMockActivatedRoute('20abc');

    await TestBed.configureTestingModule({
      declarations: [CounterRouterComponent],
      providers: [{ provide: ActivatedRoute, useValue: mockActivatedRoute }],
    }).compileComponents();

    fixture = TestBed.createComponent(CounterRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.counter()).toBe(10);
  });

  describe('CounterRouterComponent (fakeAsync + tick)', () => {
    const mockActivatedRoute = createMockActivatedRoute('0');

    // It allows Angular to run everything in a simulated zone
    // where asynchronous time is controlled
    it('fakeAsync/tick() - should redirect to default route when initial value is 0', fakeAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CounterRouterComponent],
        imports: [RouterModule.forRoot(routes)],
        providers: [{ provide: ActivatedRoute, useValue: mockActivatedRoute }],
      }).compileComponents();

      fixture = TestBed.createComponent(CounterRouterComponent);
      component = fixture.componentInstance;
      router = TestBed.inject(Router);

      fixture.detectChanges();

      const routerSpy = jest.spyOn(router, 'navigate');

      // logic that triggers navigation
      component.ngOnInit();

      // simulates the passage of time and forces asynchronous tasks to complete.
      // ---
      // it ‘advances’ time within the fakeAsync zone,
      // so that if there are pending tasks (such as those triggered internally by the router), // they are completed before the test ends,
      // are completed before the end of the test.
      tick();

      expect(routerSpy).toHaveBeenCalledWith(['/']);
    }));

    // delegates to Angular the handling of pending tasks in a more automatic way.
    it('async/whenStable() - should redirect to default route when initial value is 0', async () => {
      await TestBed.configureTestingModule({
        declarations: [CounterRouterComponent],
        imports: [RouterModule.forRoot(routes)],
        providers: [{ provide: ActivatedRoute, useValue: mockActivatedRoute }],
      }).compileComponents();

      fixture = TestBed.createComponent(CounterRouterComponent);
      component = fixture.componentInstance;
      router = TestBed.inject(Router);
      fixture.detectChanges();

      const routerSpy = jest.spyOn(router, 'navigate');

      // logic that triggers navigation
      component.ngOnInit();

      // waits for all asynchronous Angular tasks to complete
      // ---
      // Returns a promise that is resolved when Angular completes all asynchronous processes
      // asynchronous processes in the sandbox (including router navigation,
      // change detection, etc.).
      await fixture.whenStable();

      expect(routerSpy).toHaveBeenCalledWith(['/']);
    });

    // ---------------

    // by wrapping the code block inside fixture.ngZone.run(...), we force everything
    //  that happens in that callback to run in the Angular zone,
    // and hence the change detection and navigation sequence to behave as in a real app.

    // fixture.ngZone?.run(() => {
    // const routerSpy = jest.spyOn(router, 'navigate');
    // component.ngOnInit();
    // expect(routerSpy).toHaveBeenCalledWith(['/']);
    // });

    // ---------------
  });
});
