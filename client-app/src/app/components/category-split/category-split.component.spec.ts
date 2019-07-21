import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySplitComponent } from './category-split.component';

describe('CategorySplitComponent', () => {
  let component: CategorySplitComponent;
  let fixture: ComponentFixture<CategorySplitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorySplitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorySplitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
