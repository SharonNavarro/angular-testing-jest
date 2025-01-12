import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterComponent } from '../counter/counter.component';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>; //it helps with detect changes, life cycles, dispatch effects...
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CounterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should match to snapshot', () => {
    expect(compiled).toMatchSnapshot();
  });

  it('increaseBy should increase based on argument (5)', () => {
    component.increaseBy(5);
    expect(component.counter).toBe(15);
  });

  it('click on buttons should increase or decrease in 1', () => {
    const increaseButton = compiled.querySelector(
      '#increase-button'
    ) as HTMLButtonElement;
    const decreaseButton = compiled.querySelector(
      '#decrease-button'
    ) as HTMLButtonElement;

    expect(increaseButton).toBeTruthy();
    expect(decreaseButton).toBeTruthy();

    increaseButton?.click();
    expect(component.counter).toBe(11);
    decreaseButton.click();
    decreaseButton.click();
    expect(component.counter).toBe(9);
  });

  it('update tag h1 when counter changes', () => {
    component.increaseBy(10);
    fixture.detectChanges();
    const h1 = compiled.querySelector('h1');
    expect(h1?.textContent).toContain('20');
  });
});
