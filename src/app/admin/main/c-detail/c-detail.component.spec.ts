import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CDetailComponent } from './c-detail.component';

describe('CDetailComponent', () => {
  let component: CDetailComponent;
  let fixture: ComponentFixture<CDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
