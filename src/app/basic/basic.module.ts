import { AsyncPipe, CommonModule, TitleCasePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CharizardComponent } from './charizard/charizard.component';
import { CounterComponent } from './counter/counter.component';
import { CounterRouterComponent } from './counter-router/counter-router.component';
import { FatherComponent } from './father/father.component';
import { FatherSonComponent } from './father-son/father-son.component';

@NgModule({
  declarations: [
    CounterComponent,
    CharizardComponent,
    FatherComponent,
    FatherSonComponent,
    CounterRouterComponent,
  ],
  exports: [
    CounterComponent,
    CharizardComponent,
    FatherComponent,
    FatherSonComponent,
    CounterRouterComponent,
  ],
  imports: [CommonModule, RouterModule, TitleCasePipe, AsyncPipe],
})
export class BasicModule {}
