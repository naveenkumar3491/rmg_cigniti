import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalAndDudetailsComponent } from './personal-and-dudetails.component';

describe('PersonalAndDudetailsComponent', () => {
  let component: PersonalAndDudetailsComponent;
  let fixture: ComponentFixture<PersonalAndDudetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalAndDudetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalAndDudetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
