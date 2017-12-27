import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterScaleComponent } from './filter-scale.component';

describe('FilterScaleComponent', () => {
  let component: FilterScaleComponent;
  let fixture: ComponentFixture<FilterScaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterScaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterScaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
