import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestdashComponent } from './testdash.component';

describe('TestdashComponent', () => {
  let component: TestdashComponent;
  let fixture: ComponentFixture<TestdashComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestdashComponent]
    });
    fixture = TestBed.createComponent(TestdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
