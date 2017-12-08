import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'val-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  @Input() projectDetails;
  public projectHeader:any = [
    {field: 'projectName', header: 'Project Name'},
      {field: 'projectStartDate', header: 'Project Start Date'},
      {field: 'projectEndDate', header: 'Project End Date'},
      {field: 'allocationStartDate', header: 'Allocation Start Date'},
      {field: 'allocationEndDate', header: 'Allocation End Date'},
      {field: 'allocationStatus', header: 'Allocation Status'}
  ];
  constructor() { }

  ngOnInit() {
    console.log(this.projectDetails);
  }

}