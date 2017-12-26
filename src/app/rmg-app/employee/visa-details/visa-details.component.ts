import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'val-visa-details',
  templateUrl: './visa-details.component.html',
  styleUrls: ['./visa-details.component.scss']
})
export class VisaDetailsComponent implements OnInit {
  @Input() visaDetails;
  public visaModel = {};
  public visaHeader:any = [
    {field: 'country', header: 'Country'},
      {field: 'visa_type', header: 'Visa Type'},
      {field: 'status', header: 'Status'},
      {field: 'validFrom', header: 'Valid From'},
      {field: 'validTo', header: 'Valid To'}
  ];
  constructor() { }

  ngOnInit() {
    console.log('visa details', this.visaDetails);
  }

}
