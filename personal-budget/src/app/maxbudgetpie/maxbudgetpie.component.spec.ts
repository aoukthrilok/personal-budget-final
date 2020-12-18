import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaxbudgetpieComponent } from './maxbudgetpie.component';

describe('MaxbudgetpieComponent', () => {
  let component: MaxbudgetpieComponent;
  let fixture: ComponentFixture<MaxbudgetpieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaxbudgetpieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaxbudgetpieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
