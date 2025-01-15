import { AsyncPipe, CommonModule, TitleCasePipe } from '@angular/common';
import { NgModule } from '@angular/core';

import { CharizardComponent } from './charizard/charizard.component';
import { CounterComponent } from './counter/counter.component';

@NgModule({
  declarations: [CounterComponent, CharizardComponent],
  imports: [CommonModule, TitleCasePipe, AsyncPipe],
})
export class BasicModule {}
