import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-counter-router',
  templateUrl: './counter-router.component.html',
  styleUrl: './counter-router.component.scss',
})
export class CounterRouterComponent implements OnInit {
  public counter = signal<number>(0);
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);

  ngOnInit(): void {
    const initialValue = Number(this._route.snapshot.paramMap.get('initial'));
    this.counter.update(() => (isNaN(initialValue) ? 10 : initialValue));
    if (initialValue === 0) {
      this.redirect();
    }
  }

  private redirect(): void {
    this._router.navigate(['/']);
  }

  public increaseBy(value: number): void {
    this.counter.update(current => current + value);
  }
}
