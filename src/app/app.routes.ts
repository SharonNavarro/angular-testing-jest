import { Routes } from '@angular/router';

import { CharizardComponent } from './basic/charizard/charizard.component';
import { CounterComponent } from './basic/counter/counter.component';
import { CounterRouterComponent } from './basic/counter-router/counter-router.component';
import { FatherComponent } from './basic/father/father.component';
import { FatherSonComponent } from './basic/father-son/father-son.component';
import { SearchComponent } from './basic/search/search.component';

export const routes: Routes = [
  {
    path: 'basic/counter',
    component: CounterComponent,
  },
  {
    path: 'basic/counter/:initial',
    component: CounterRouterComponent,
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
    path: '',
    redirectTo: '/basic/counter',
    pathMatch: 'full',
  },
  {
    path: 'basic/search',
    component: SearchComponent,
  },
  {
    path: '**',
    component: CounterComponent,
  },
];
