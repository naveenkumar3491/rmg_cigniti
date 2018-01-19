import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../../services/DataService';
import { Observable } from 'rxjs/Observable';
import { Ng2Storage } from "../../../services/storage";

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
  public visaData: any;
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
  constructor(private dataService: DataService, private storage: Ng2Storage) { }

  ngOnInit() {
    this.dataService.getCountriesList().subscribe((data) =>{
        this.visaData = data;
        console.log(this.visaData);
    })
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
        visa_type: this.visaModel.visaType,
        status: this.visaModel.status,
        validFrom: this.visaModel.validFrom,
        validTo: this.visaModel.validTo
      }
      this.visaDetails.push(obj);
      this.visaDetails = this.visaDetails.slice();
      this.visaModel = {};
  }
  disableBtn() {
    const modelArray = ['country', 'visa', 'visaType', 'status', 'validFrom', 'validTo'];
    let isValid = true;
    modelArray.forEach((obj) => {
      if (!this.visaModel[obj]) {
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
