import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarTrabajadorComponent } from './modal-editar-trabajador.component';

describe('ModalEditarTrabajadorComponent', () => {
  let component: ModalEditarTrabajadorComponent;
  let fixture: ComponentFixture<ModalEditarTrabajadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEditarTrabajadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditarTrabajadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
