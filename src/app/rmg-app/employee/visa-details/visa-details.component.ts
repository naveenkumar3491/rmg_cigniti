import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'val-visa-details',
  templateUrl: './visa-details.component.html',
  styleUrls: ['./visa-details.component.scss']
})
export class VisaDetailsComponent implements OnInit {
  public visaList:any = [
    {country: 'India', visaType: 'Business', status: 'pending', validFrom: '06/12/2017', validTo: '05/04/2019'}
  ];
  public visaHeader:any = [
    {field: 'country', header: 'Country'},
      {field: 'visaType', header: 'Visa Type'},
      {field: 'status', header: 'Status'},
      {field: 'validFrom', header: 'Valid From'},
      {field: 'validTo', header: 'Valid To'}
  ];
  constructor() { }

  ngOnInit() {
  }

}
