import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Ng2Storage } from "../../../services/storage";
import { DataService } from '../../../services/DataService';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-bu-details',
  templateUrl: './bu-details.component.html',
  styleUrls: ['./bu-details.component.scss']
})
export class BUDetailsComponent implements OnInit {
  @Input() personalDetails;
  @Input() buMasterData;
  @Input() duMasterData;
  @Output() callBackContactDetails = new EventEmitter();
  public editMode: boolean = false;
  public buModel: any = {};
  public userData = this.storage.getSession('user_data');
  constructor(private storage: Ng2Storage, private dataService: DataService, private messageService:MessageService) { }

  ngOnInit() {
    
  }

  onBuEdit() {
    this.editMode = true;
    const pd = this.personalDetails;
    let buObj = this.buMasterData.find(obj => obj.label === pd.bu);
    let duObj = this.duMasterData.find(obj => obj.label === pd.du);
    this.buModel = {
      reportingManager: pd.accountManager,
      projectManger: pd.project_manager,
      hrSpoc: pd.hr_spoc,
      buHead: pd.bu_head,
      bu_id: buObj ? buObj.value : null,
      du_id: duObj ? duObj.value : null
    };
  }

  onBuDtlsSave(){
    //const obj = Object.assign({}, this.buModel);
    const obj = {
      ...this.buModel
    }
    obj.empId = this.personalDetails.emp_id;
    obj.employeeName = this.personalDetails.employeeName;
    this.dataService.addUpdateBuDtls(obj).subscribe((data) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Saved Successfully!!' });
      this.editMode = false;
      this.callBackContactDetails.emit();
      });
  }

}
