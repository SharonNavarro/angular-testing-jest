import { Component, model, output } from '@angular/core';

import { Client } from '../../shared/interfaces/client.interface';

@Component({
  selector: 'app-father-son',
  templateUrl: './father-son.component.html',
  styleUrl: './father-son.component.scss',
})
export class FatherSonComponent {
  public client = model<Client>();
  public deleteClient = output();
  public clientUpdated = output<Client | undefined>();

  public onDelete(): void {
    this.client.update(() => undefined);
    this.deleteClient.emit();
  }

  public onChange(id: number): void {
    if (!this.client()) return;
    this.client.update(val => {
      if (val) {
        val = { ...val, id }; // use destructuration on the child, to break the reference
      }
      return val;
    });
    this.clientUpdated.emit(this.client());
  }
}
