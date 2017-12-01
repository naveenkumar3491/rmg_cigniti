import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmgAppComponent } from './rmg-app.component';

describe('RmgAppComponent', () => {
  let component: RmgAppComponent;
  let fixture: ComponentFixture<RmgAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmgAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmgAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
