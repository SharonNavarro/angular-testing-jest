import { Routes } from '@angular/router';

import { CharizardComponent } from './basic/charizard/charizard.component';
import { CounterComponent } from './basic/counter/counter.component';

export const routes: Routes = [
  {
    path: 'basic/counter',
    component: CounterComponent,
  },
  {
    path: 'basic/charizard',
    component: CharizardComponent,
  },
  {
    path: '**',
    component: CounterComponent,
  },
];
