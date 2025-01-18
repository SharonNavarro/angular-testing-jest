import { Routes } from '@angular/router';

import { CharizardComponent } from './basic/charizard/charizard.component';
import { CounterComponent } from './basic/counter/counter.component';
import { FatherComponent } from './basic/father/father.component';
import { FatherSonComponent } from './basic/father-son/father-son.component';

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
    path: 'basic/father',
    component: FatherComponent,
  },
  {
    path: 'basic/son',
    component: FatherSonComponent,
  },
  {
    path: '**',
    component: CounterComponent,
  },
];
