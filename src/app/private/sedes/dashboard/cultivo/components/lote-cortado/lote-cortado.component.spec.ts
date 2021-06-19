import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoteCortadoComponent } from './lote-cortado.component';

describe('LoteCortadoComponent', () => {
  let component: LoteCortadoComponent;
  let fixture: ComponentFixture<LoteCortadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoteCortadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoteCortadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
