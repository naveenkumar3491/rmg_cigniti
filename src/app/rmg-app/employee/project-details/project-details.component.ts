import { Component, OnInit, Input } from '@angular/core';
import { ConfirmationService } from 'primeng/primeng';
import { Ng2Storage } from "../../../services/storage";
import { DataService } from "../../../services/DataService";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
  providers: [DatePipe]
})
export class ProjectDetailsComponent implements OnInit {
  @Input() projectDetails;
  public projectModel: any = {
    last_working_day: null,
    allocation_start_date: null,
    allocation_end_date: null
  };
  public minProjectDate: any;
  public showButton: boolean = true;
  public userData = this.storage.getSession('user_data');
  public allocationStatusList: any = [
    { label: 'Billing', value: 'Billing' },
    { label: 'Buffer', value: 'Buffer' },
    { label: 'Blocked', value: 'Blocked' },
    { label: 'Available', value: 'Available' },
    { label: 'Training', value: 'Training' },
    { label: 'Long Leave', value: 'Long Leave' },
    { label: 'On Notice', value: 'On Notice' },
    { label: 'COE & Investment', value: 'COE & Investment' },
    { label: 'LOA', value: 'LOA' },
    { label: 'NBM', value: 'NBM' }
  ];
  public projectHeader: any = [
    { field: 'account_name', header: 'Account Name' },
    { field: 'project_name', header: 'Project Name' },
    { field: 'allocation_start_date', header: 'Allocation Start Date' },
    { field: 'allocation_end_date', header: 'Allocation End Date' },
    { field: 'last_working_day', header: 'Last Working Day' },
    { field: 'allocation_status', header: 'Allocation Status' }
  ];

  constructor(private confirmationService: ConfirmationService, private storage: Ng2Storage, private dataService: DataService, private datePipe: DatePipe) { }
  ngOnInit() { }

  onEdit(project) {
    this.showButton = false;
    this.projectModel = Object.assign({}, project);
    const splitDate = (this.projectModel.allocation_start_date).split('-');
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

  onSaveProject(type) {
    const paramObj = Object.assign({}, this.projectModel);
    paramObj.emp_id = this.userData.employeeId;
    if (type === 'update') {
      paramObj.rowid = this.projectModel.rowid;
    } else {
      paramObj.allocation_start_date = this.datePipe.transform(this.projectModel.allocation_start_date, 'dd-MM-yyyy');
      paramObj.allocation_end_date = this.datePipe.transform(this.projectModel.allocation_end_date, 'dd-MM-yyyy');
    }
    this.dataService.addUpdateProject(paramObj).subscribe((data) => {
      console.log(data);
    })
  }

  deleteProject(project) {
    this.dataService.deleteProject({rowid: project.rowid}).subscribe((data) => {
      console.log(data);
    });
  }

  disableBtn() {
    const modelArray = ['account_name', 'project_name', 'allocation_status'];
    let isValid = true;
    if (this.projectModel.allocation_status !== 'On Notice') {
      modelArray.push(...['allocation_start_date', 'allocation_end_date']);
    } else {
      modelArray.push(...['last_working_day']);
    }
    modelArray.forEach((obj) => {
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