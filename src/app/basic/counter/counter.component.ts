import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
})
export class CounterComponent {
  public counter = signal<number>(10);

  public increaseBy(value: number): void {
    this.counter.update(current => current + value);
  }
}
