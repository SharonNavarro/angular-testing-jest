import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FatherComponent } from '../father/father.component';
import { FatherSonComponent } from '../father-son/father-son.component';

describe('FatherComponent', () => {
  let component: FatherComponent;
  let fixture: ComponentFixture<FatherComponent>;
  let compiled: HTMLElement;
  let sonDebugElement: DebugElement;
  let sonComponent: FatherSonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FatherComponent, FatherSonComponent],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(FatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;

    sonDebugElement = fixture.debugElement.query(
      By.directive(FatherSonComponent)
    );
    sonComponent = sonDebugElement.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set client with correct name', () => {
    component.onSetClient('Alessa');
    fixture.detectChanges();

    const codeDiv = compiled.querySelector('[data-test="code-json"]');

    expect(codeDiv?.textContent).toContain('"name"');
    expect(codeDiv?.textContent).toContain('"Alessa"');
  });

  it('should be deleted client if deleteClient is issued', () => {
    component.client = { id: 1, name: 'Fav' };
    fixture.detectChanges();

    sonComponent.deleteClient.emit();
    expect(component.client).toBe(undefined);
  });

  it('should update client if clientUpdated is issued', () => {
    component.client = { id: 1, name: 'Mitch' };
    fixture.detectChanges();

    // Use toBe when value is a primitive
    // Use toEqual/toStrictEqual when value is a object/array

    sonComponent.clientUpdated.emit({ id: 10, name: 'Ares' });
    expect(component.client).toStrictEqual({ id: 10, name: 'Ares' });
  });
});
