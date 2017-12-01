import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactAndExperienceDetailsComponent } from './contact-and-experience-details.component';

describe('ContactAndExperienceDetailsComponent', () => {
  let component: ContactAndExperienceDetailsComponent;
  let fixture: ComponentFixture<ContactAndExperienceDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactAndExperienceDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactAndExperienceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
