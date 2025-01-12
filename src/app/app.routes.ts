import { Routes } from '@angular/router';

import { CounterComponent } from './basic/counter/counter.component';

export const routes: Routes = [
  {
    path: 'basic/counter',
    component: CounterComponent,
  },
  {
    path: '**',
    component: CounterComponent,
  },
];
