import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FatherSonComponent } from '../father-son/father-son.component';

describe('FatherSonComponent', () => {
  let component: FatherSonComponent;
  let fixture: ComponentFixture<FatherSonComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FatherSonComponent],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(FatherSonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should match with snapshot', () => {
  //   expect(compiled).toMatchSnapshot();
  // });

  it('should not display button if there is no client', () => {
    const buttons = compiled.querySelectorAll('button');
    expect(buttons.length).toBe(0);
  });

  it('should display 2 buttons if there is a client', () => {
    component.client.set({
      id: 1,
      name: 'Juan',
    });
    fixture.detectChanges();
    const buttons = compiled.querySelectorAll('button');
    expect(buttons.length).toBe(2);
  });

  it('should emit deleteClient with "Borrar cliente" button', () => {
    component.client.set({
      id: 1,
      name: 'Juan',
    });
    fixture.detectChanges();

    jest.spyOn(component.deleteClient, 'emit');

    const btnDelete = compiled.querySelector(
      '[data-test=button-delete-client]'
    );
    btnDelete?.dispatchEvent(new Event('click'));

    expect(component.deleteClient.emit).toHaveBeenCalled();
  });

  it('should emit clientUpdated with "Cambiar ID" button', () => {
    component.client.set({
      id: 1,
      name: 'Juan',
    });
    fixture.detectChanges();

    jest.spyOn(component.clientUpdated, 'emit');

    const btnChangeID = compiled.querySelector(
      '[data-test=button-update-client]'
    );
    btnChangeID?.dispatchEvent(new Event('click'));

    expect(component.clientUpdated.emit).toHaveBeenCalledWith({
      id: 5,
      name: 'Juan',
    });
  });

  it('should emit clientUpdated with the specified ID IF there is a client', () => {
    jest.spyOn(component.clientUpdated, 'emit');
    component.onChange(10);
    expect(component.clientUpdated.emit).not.toHaveBeenCalled();

    component.client.set({
      id: 1,
      name: 'Juan',
    });
    fixture.detectChanges();
    component.onChange(10);

    expect(component.clientUpdated.emit).toHaveBeenCalledWith({
      id: 10,
      name: 'Juan',
    });
  });
});
