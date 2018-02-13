import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Ng2Storage } from "../../../services/storage";
import { DataService } from '../../../services/DataService';
import { MessageService } from 'primeng/components/common/messageservice';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { UtilsService } from "../../../services/utils.service";

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
  public buForm: FormGroup;
  public userData = this.storage.getSession('user_data');
  constructor(private storage: Ng2Storage, private dataService: DataService, private messageService: MessageService,
    private fb: FormBuilder, private utilsService: UtilsService) { }

  public formErrors: any = {
    projectManger: '',
    reportingManager: '',
    buHead: '',
    hrSpoc: ''
  }

  public validationMessages: any = {
    projectManger: {
      required: 'Project Manager is required'
    },
    reportingManager: {
      required: 'Account Manager is required'
    },
    buHead: {
      required: 'BU Head is required'
    },
    hrSpoc: {
      required: 'BP HR is required'
    }
  }

  ngOnInit() {
    this.buForm = this.fb.group({
      projectManger: ['', [Validators.required]],
      reportingManager: ['', [Validators.required]],
      buHead: ['', [Validators.required]],
      hrSpoc: ['', [Validators.required]],
      bu_id: [null],
      du_id: [null]
    });
    this.buForm.valueChanges.subscribe(data => this.utilsService.onValuesChanged(this.buForm, this.formErrors, this.validationMessages));
    this.utilsService.onValuesChanged(this.buForm, this.formErrors, this.validationMessages);
  }

  onBuEdit() {
    this.editMode = true;
    const pd = this.personalDetails;
    let buObj = this.buMasterData.find(obj => obj.label === pd.bu);
    let duObj = this.duMasterData.find(obj => obj.label === pd.du);
    this.buForm.patchValue({
      projectManger: pd.project_manager, reportingManager: pd.accountManager,
      buHead: pd.bu_head, hrSpoc: pd.hr_spoc, du_id: duObj ? duObj.value : null, bu_id: buObj ? buObj.value : null
    });
  }

  onBuDtlsSave() {
    //const obj = Object.assign({}, this.buModel);
    if (this.buForm.valid) {
      const obj = { ...this.buForm.value };
      obj['emp_id'] = this.personalDetails.emp_id;
      obj['employeeName'] = this.personalDetails.employeeName;

      this.dataService.addUpdateBuDtls(obj).subscribe((data) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Saved Successfully!!' });
        this.editMode = false;
        this.callBackContactDetails.emit();
      });
    } else {
      Object.keys(this.buForm.controls).forEach(field => {
        const control = this.buForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }

}
