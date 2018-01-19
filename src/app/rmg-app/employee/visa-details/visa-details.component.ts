import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../../services/DataService';
import { Observable } from 'rxjs/Observable';
import { Ng2Storage } from "../../../services/storage";
import { DateFormatPipe } from "../../../common/pipes/dateFormat.pipe";

@Component({
  selector: 'app-visa-details',
  templateUrl: './visa-details.component.html',
  styleUrls: ['./visa-details.component.scss']
})
export class VisaDetailsComponent implements OnInit {
  @Input() visaDetails;
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
    {label: 'RFE', value: 'rfe'},
    {label: 'Expired', value: 'expired'},
    {label: 'Active', value: 'active'}
  ];
  public visaHeader: any = [
    {field: 'country', header: 'Country'},
    {field: 'visa', header: 'Visa'},
    {field: 'visa_type', header: 'Visa Type'},
    {field: 'status', header: 'Status'},
    {field: 'validFrom', header: 'Valid From'},
    {field: 'validTo', header: 'Valid To'}
  ];
  constructor(private dataService: DataService, private storage: Ng2Storage, private datePipe: DateFormatPipe) { }

  ngOnInit() {
    this.dataService.getCountriesList().subscribe((data) =>{
        this.modelData = data;
    })
  }

  onCountryChange(countryModel){
    this.visaData = this.visaTypeData = [];
    this.visaModel.visa = null;
    this.visaModel.visa_type = '';
    this.visaData = countryModel.visa;
  }

  onVisaChange(visaValue){
    this.visaTypeData = [];
    this.visaModel.visa_type = '';
    this.visaTypeData = visaValue.visaType;
  }

  onVisaStartDtSelect(){
    this.visaModel.validTo = null;
    this.minVisaDate = this.visaModel.validFrom;
    this.active = false;
    setTimeout(() => { this.active = true;}, 0);
  }

  onAddVisa(){
      let obj = {
        country:this.visaModel.country.name,
        visa: this.visaModel.visa.name,
        visa_type: this.visaModel.visa_type,
        status: this.visaModel.status,
        validFrom: this.datePipe.transform(this.visaModel.validFrom, 'dd-MM-yyyy'),
        validTo: this.datePipe.transform(this.visaModel.validTo, 'dd-MM-yyyy')
      }
      this.visaDetails.push(obj);
      this.visaDetails = this.visaDetails.slice();
      this.visaModel = {};
  }

  onEditVisa(visa){
    this.visaEditMode = false;
    this.visaModel = Object.assign({}, visa);
    let obj = this.modelData.find( o => o.label === visa.country);
    this.visaModel.country = {name: obj.value.name, visa: obj.value.visa};
    this.visaModel.visa = {name: visa.visa, visaType: obj.value.visa.find( o => o.value.name === visa.visa).value.visaType};
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
