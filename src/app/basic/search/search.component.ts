import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [AsyncPipe],
  template: `search: {{ (_route.queryParams | async)?.['search'] }}`,
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  public _route = inject(ActivatedRoute);
  public _router = inject(Router);

  public searchFor(searchText: string): Promise<boolean> {
    return this._router.navigate([], { queryParams: { search: searchText } });
  }
}
