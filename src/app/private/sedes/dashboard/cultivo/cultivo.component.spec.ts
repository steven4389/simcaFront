import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CultivoComponent } from './cultivo.component';

describe('CultivoComponent', () => {
  let component: CultivoComponent;
  let fixture: ComponentFixture<CultivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CultivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CultivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
