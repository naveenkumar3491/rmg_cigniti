import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'val-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent implements OnInit {
  public employeeInfoTabs: any = [
    {
      name: 'Contact Details',
      field: 'contact-details',
      icon: 'ui-icon-contact-phone'
    },
    {
      name: 'Experience Details',
      field: 'experience-details',
      icon: 'ui-icon-format-align-justify'
    },
    {
      name: 'Skill Details',
      field: 'skill-details',
      icon: 'ui-icon-contact-phone'
    },
    {
      name: 'Certification Details',
      field: 'certification-details',
      icon: 'ui-icon-content-paste'
    },
    {
      name: 'Project Details',
      field: 'project-details',
      icon: 'ui-icon-call-to-action'
    },
    {
      name: 'BU Details',
      field: 'bu-details',
      icon: 'ui-icon-featured-play-list'
    }
  ];
  constructor(public cdRef:ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }

}
