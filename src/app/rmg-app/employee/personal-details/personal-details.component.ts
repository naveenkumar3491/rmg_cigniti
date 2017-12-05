import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'val-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent implements OnInit {
  public activeTab: string = 'contact-details'
  public employeeInfoTabs: any = [
    {
      name: 'Contact Details',
      field: 'contact-details'
    },
    {
      name: 'Experience Details',
      field: 'experience-details'
    },
    {
      name: 'Skill Details',
      field: 'skill-details'
    },
    {
      name: 'Certification Details',
      field: 'certification-details'
    },
    {
      name: 'Project Details',
      field: 'project-details'
    },
    {
      name: 'BU Details',
      field: 'bu-details'
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
