import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmgEmployeeViewComponent } from './rmg-employee-view.component';

describe('RmgEmployeeViewComponent', () => {
  let component: RmgEmployeeViewComponent;
  let fixture: ComponentFixture<RmgEmployeeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmgEmployeeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmgEmployeeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
