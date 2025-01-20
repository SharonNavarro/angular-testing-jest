import { ComponentFixture, TestBed } from '@angular/core/testing';
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

  it('should redirect to default route when initial value is 0', async () => {
    const mockActivatedRoute = createMockActivatedRoute('0');

    await TestBed.configureTestingModule({
      declarations: [CounterRouterComponent],
      imports: [RouterModule.forRoot(routes)],
      providers: [{ provide: ActivatedRoute, useValue: mockActivatedRoute }],
    }).compileComponents();

    fixture = TestBed.createComponent(CounterRouterComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();

    // Run the test within Angular's NgZone to handle asynchronous operations, including router.navigate
    fixture.ngZone?.run(() => {
      const routerSpy = jest.spyOn(router, 'navigate');
      component.ngOnInit();
      expect(routerSpy).toHaveBeenCalledWith(['/']);
    });
  });
});
