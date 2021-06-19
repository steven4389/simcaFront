import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEdicionComponent } from './modal-edicion.component';

describe('ModalEdicionComponent', () => {
  let component: ModalEdicionComponent;
  let fixture: ComponentFixture<ModalEdicionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEdicionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEdicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
