import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  @Input() projectDetails;
  public projectModel: any = {};
  public allocationStatusList: any = [
    {label: 'Billing', value: 'billing'},
    {label: 'Buffer', value: 'buffer'},
    {label: 'Blocked', value: 'blocked'},
    {label: 'Available', value: 'available'},
    {label: 'Training', value: 'training'},
    {label: 'Long Leave', value: 'longLeave'},
    {label: 'On Notice', value: 'onNotice'},
    {label: 'COE & Investment', value: 'coeInvestment'},
    {label: 'LOA', value: 'loa'},
    {label: 'NBM', value: 'nbm'}
  ];
  public projectHeader: any = [
    {field: 'accountName', header: 'Account Name'},
    {field: 'projectName', header: 'Project Name'},
      {field: 'allocationStartDate', header: 'Allocation Start Date'},
      {field: 'allocationEndDate', header: 'Allocation End Date'},
      {field: 'allocationStatus', header: 'Allocation Status'}
  ];
  constructor() { }
  ngOnInit() {
  }
}