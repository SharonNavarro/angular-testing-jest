import { Component } from '@angular/core';

import { Client } from '../../shared/interfaces/client.interface';

@Component({
  selector: 'app-father',
  templateUrl: './father.component.html',
  styleUrl: './father.component.scss',
})
export class FatherComponent {
  public client?: Client;

  public onSetClient(name: string): void {
    this.client = { id: 1, name };
  }
}
