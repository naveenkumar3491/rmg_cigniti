import { Component, OnInit, Input } from '@angular/core';
import { DataService } from "../../../services/DataService";

@Component({
  selector: 'val-visa-details',
  templateUrl: './visa-details.component.html',
  styleUrls: ['./visa-details.component.scss']
})
export class VisaDetailsComponent implements OnInit {
  @Input() visaDetails;
  public visaModel:any = {};
  public countriesList:any;
  public visaStatusList:any = [
    {label: 'REF', value: 'ref'},
    {label: 'Expired', value: 'expired'},
    {label: 'Active', value: 'active'}
  ];
  public visaHeader:any = [
    {field: 'country', header: 'Country'},
      {field: 'visa_type', header: 'Visa Type'},
      {field: 'status', header: 'Status'},
      {field: 'validFrom', header: 'Valid From'},
      {field: 'validTo', header: 'Valid To'}
  ];
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getCountriesList().subscribe((data) => {
      this.countriesList = data;
    });
    console.log('visa details', this.visaDetails);
  }

}
