import { Component, OnInit, Input } from '@angular/core';
import { ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  @Input() projectDetails;
  public projectModel: any = {};
  public minProjectDate: any;
  public showButton: boolean = true;
  public allocationStatusList: any = [
    { label: 'Billing', value: 'billing' },
    { label: 'Buffer', value: 'buffer' },
    { label: 'Blocked', value: 'blocked' },
    { label: 'Available', value: 'available' },
    { label: 'Training', value: 'training' },
    { label: 'Long Leave', value: 'longLeave' },
    { label: 'On Notice', value: 'onNotice' },
    { label: 'COE & Investment', value: 'coeInvestment' },
    { label: 'LOA', value: 'loa' },
    { label: 'NBM', value: 'nbm' }
  ];
  public projectHeader: any = [
    { field: 'accountName', header: 'Account Name' },
    { field: 'projectName', header: 'Project Name' },
    { field: 'allocationStartDate', header: 'Allocation Start Date' },
    { field: 'allocationEndDate', header: 'Allocation End Date' },
    { field: 'allocationStatus', header: 'Allocation Status' }
  ];

  constructor(private confirmationService: ConfirmationService) { }
  ngOnInit() {}

  onEdit(project) {
    this.projectModel = project;
    const splitDate = (this.projectModel.allocationStartDate).split('-');
    const disabledDate = `${splitDate[1]}-${splitDate[0]}-${splitDate[2]}`;
    this.minProjectDate = new Date(disabledDate);
  }

  onDelete(project) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete project?',
      accept: () => {
        this.deleteProject(project);
      }
    });
  }

  deleteProject(project){

  }

  disableBtn() {
    let isValid = true;
    ['accountName', 'projectName', 'allocationStartDate', 'allocationEndDate', 'allocationStatus'].forEach((obj) => {
      if (!this.projectModel[obj]) {
        isValid = false;
      }
    });
    if (!isValid) {
      return true;
    } else {
      return false;
    }
  }
}