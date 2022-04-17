import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PDetalComponent } from './p-detal.component';

describe('PDetalComponent', () => {
  let component: PDetalComponent;
  let fixture: ComponentFixture<PDetalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PDetalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PDetalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
