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
  public visaModel: any = {};
  public minVisaDate: any;
  public countriesObservable: Observable<any>;
   public userData = this.storage.getSession('user_data');
  public visaStatusList: any = [
    {label: 'REF', value: 'ref'},
    {label: 'Expired', value: 'expired'},
    {label: 'Active', value: 'active'}
  ];
  public visaHeader: any = [
    {field: 'country', header: 'Country'},
      {field: 'visa_type', header: 'Visa Type'},
      {field: 'status', header: 'Status'},
      {field: 'validFrom', header: 'Valid From'},
      {field: 'validTo', header: 'Valid To'}
  ];
  constructor(private dataService: DataService, private storage: Ng2Storage) { }

  ngOnInit() {
    this.countriesObservable = this.dataService.getCountriesList();
  }

}
