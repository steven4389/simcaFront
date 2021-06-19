import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeveridadComponent } from './severidad.component';

describe('SeveridadComponent', () => {
  let component: SeveridadComponent;
  let fixture: ComponentFixture<SeveridadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeveridadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeveridadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
