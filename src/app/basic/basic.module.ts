import { AsyncPipe, CommonModule, TitleCasePipe } from '@angular/common';
import { NgModule } from '@angular/core';

import { CharizardComponent } from './charizard/charizard.component';
import { CounterComponent } from './counter/counter.component';
import { FatherComponent } from './father/father.component';
import { FatherSonComponent } from './father-son/father-son.component';

@NgModule({
  declarations: [
    CounterComponent,
    CharizardComponent,
    FatherComponent,
    FatherSonComponent,
  ],
  exports: [
    CounterComponent,
    CharizardComponent,
    FatherComponent,
    FatherSonComponent,
  ],
  imports: [CommonModule, TitleCasePipe, AsyncPipe],
})
export class BasicModule {}
