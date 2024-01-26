import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterCoursComponent } from './filter-cours.component';

describe('FilterCoursComponent', () => {
  let component: FilterCoursComponent;
  let fixture: ComponentFixture<FilterCoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterCoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
