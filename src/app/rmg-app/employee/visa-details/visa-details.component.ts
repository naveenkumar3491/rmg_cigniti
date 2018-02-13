import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DataService } from '../../../services/DataService';
import { Observable } from 'rxjs/Observable';
import { Ng2Storage } from "../../../services/storage";
import { DateFormatPipe } from "../../../common/pipes/dateFormat.pipe";
import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';

@Component({
  selector: 'app-visa-details',
  templateUrl: './visa-details.component.html',
  styleUrls: ['./visa-details.component.scss']
})
export class VisaDetailsComponent implements OnInit {
  @Input() employeeId;
  @Input() visaDetails;
  @Output() callbackVisaDetails = new EventEmitter();
  public editedIndex: any;
  public visaEditMode: boolean = true;
  public active: boolean = true;
  public visaModel: any = {};
  public minVisaDate: any;
  public modelData: any;
  public visaData: any = [];
  public visaTypeData: any = [];
  public countriesObservable: Observable<any>;
  public userData = this.storage.getSession('user_data');
  public visaStatusList: any = [
    { label: 'RFE', value: 'rfe' },
    { label: 'Expired', value: 'expired' },
    { label: 'Active', value: 'active' }
  ];
  public visaHeader: any = [
    { field: 'country', header: 'Country' },
    { field: 'visa', header: 'Visa' },
    { field: 'visa_type', header: 'Visa Type' },
    { field: 'status', header: 'Status' },
    { field: 'validFrom', header: 'Valid From' },
    { field: 'validTo', header: 'Valid To' }
  ];
  constructor(private dataService: DataService, private storage: Ng2Storage, private datePipe: DateFormatPipe,
    private messageService: MessageService, private confirmationService: ConfirmationService, ) { }

  ngOnInit() {
    this.dataService.getCountriesList().subscribe((data) => {
      this.modelData = data;
    })
  }

  onCountryChange(countryModel) {
    this.visaData = this.visaTypeData = [];
    this.visaModel.visa = null;
    this.visaModel.visa_type = '';
    this.visaData = countryModel.visa;
  }

  onVisaChange(visaValue) {
    this.visaTypeData = [];
    this.visaModel.visa_type = '';
    this.visaTypeData = visaValue.visaType;
  }

  onVisaStartDtSelect() {
    this.visaModel.validTo = null;
    this.minVisaDate = this.visaModel.validFrom;
    this.active = false;
    setTimeout(() => { this.active = true; }, 0);
  }

  onAddVisa(type) {
    let obj = {
      emp_id: this.employeeId,
      country: this.visaModel.country.name,
      visa: this.visaModel.visa.name,
      visa_type: this.visaModel.visa_type,
      status: this.visaModel.status,
      validFrom: this.datePipe.transform(this.visaModel.validFrom, 'dd-MM-yyyy'),
      validTo: this.datePipe.transform(this.visaModel.validTo, 'dd-MM-yyyy')
    }
    if (type === 'update') {
      obj['rowid'] = this.visaModel.rowid;
    }
    this.dataService.addUpdateVisa(obj).subscribe(data => {
      this.refreshGrid();
      if (type === 'add') {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Visa added successfully!!' });
      } else {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Visa updated successfully!!' });
      }
    })
  }

  refreshGrid(){
    this.visaModel = {};
    this.visaEditMode = true;
    this.visaData = [];
    this.visaTypeData = [];
    this.callbackVisaDetails.emit();
  }

  onEditVisa(visa) {
    this.visaEditMode = false;
    //this.visaModel = Object.assign({}, visa);
    this.visaModel = {
      ...visa
    };
    let obj = this.modelData.find(o => o.label === visa.country);
    this.visaModel.country = { name: obj.value.name, visa: obj.value.visa };
    this.visaData = obj.value.visa;
    this.visaModel.visa = { name: visa.visa, visaType: obj.value.visa.find(o => o.value.name === visa.visa).value.visaType };
    delete this.visaModel.visa.visaType._$visited;
    this.visaTypeData = this.visaModel.visa.visaType;
  }

  onDelete(visa) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete visa?',
      accept: () => {
        this.deleteVisa(visa);
      }
    });
  }

  deleteVisa(visa) {
    this.dataService.deleteVisa({ rowid: visa.rowid }).subscribe((data) => {
      this.refreshGrid();
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Visa deleted successfully!!' });
    });
  }

  disableBtn() {
    const modelArray = ['country', 'visa', 'visa_type', 'status', 'validFrom', 'validTo'];
    let isValid = false;
    modelArray.forEach((obj) => {
      if (!this.visaModel[obj]) {
        isValid = true;
      }
    });
    return isValid;
  }

}
