import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ConfirmationService } from 'primeng/primeng';
import { Ng2Storage } from "../../../services/storage";
import { DataService } from "../../../services/DataService";
import { DateFormatPipe } from "../../../common/pipes/dateFormat.pipe";
import { MessageService } from "primeng/components/common/messageservice";

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  @Input() employeeId;
  @Input() projectDetails;
  @Output() callBackProjectDetails = new EventEmitter();
  public active: boolean = true;
  public projectModel: any = {
    last_working_day: null,
    allocation_start_date: null,
    allocation_end_date: null
  };
  public minProjectDate: any;
  public todayDate: any = new Date();
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

  constructor(private confirmationService: ConfirmationService, 
  private storage: Ng2Storage, private dataService: DataService, 
  private datePipe: DateFormatPipe,
  private messageService: MessageService) { }
  ngOnInit() { }

  onEdit(project) {
    this.showButton = false;
    //this.projectModel = Object.assign({}, project);
    this.projectModel = {
      ...project
    }
    if (this.projectModel.allocation_start_date) {
      const splitDate = (this.projectModel.allocation_start_date).split('-');
      const disabledDate = `${splitDate[1]}-${splitDate[0]}-${splitDate[2]}`;
      this.minProjectDate = new Date(disabledDate);
    }
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
    //const paramObj = Object.assign({}, this.projectModel);
    const paramObj = {
      ...this.projectModel
    };
    paramObj.emp_id = this.employeeId;
    paramObj.allocation_start_date = this.datePipe.transform(this.projectModel.allocation_start_date, 'dd-MM-yyyy');
    paramObj.allocation_end_date = this.datePipe.transform(this.projectModel.allocation_end_date, 'dd-MM-yyyy');
    paramObj.last_working_day = this.datePipe.transform(this.projectModel.last_working_day, 'dd-MM-yyyy');
    if (type === 'update') {
      paramObj.rowid = this.projectModel.rowid;
    }
    this.dataService.addUpdateProject(paramObj).subscribe((data) => {
      this.showButton = true;
      if (type === 'add') {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Project added successfully!!' });
      } else {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Project updated successfully!!' });
      }
      this.refreshGrid();
    })
  }

  refreshGrid() {
    this.callBackProjectDetails.emit();
    this.projectModel = {
      last_working_day: null,
      allocation_start_date: null,
      allocation_end_date: null
    };
  }

  onAllocStatusChange(status) {
    if (status === 'On Notice') {
      this.projectModel.allocation_start_date = null;
      this.projectModel.allocation_end_date = null;
    } else if (status === 'Available') {
      this.projectModel.allocation_start_date = null;
      this.projectModel.allocation_end_date = null;
      this.projectModel.last_working_day = null;
    } else {
      this.projectModel.last_working_day = null;
    }
  }

  deleteProject(project) {
    this.dataService.deleteProject({ rowid: project.rowid }).subscribe((data) => {
      this.showButton = true;
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Project deleted successfully!!' });
      this.refreshGrid();
    });
  }

  onAllocStartDtSelect() {
    this.projectModel.allocation_end_date = null;
    this.minProjectDate = this.projectModel.allocation_start_date;
    this.active = false;
    setTimeout(() => { this.active = true; }, 0);
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