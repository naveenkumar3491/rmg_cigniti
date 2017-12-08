import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'val-certification-details',
  templateUrl: './certification-details.component.html',
  styleUrls: ['./certification-details.component.scss']
})
export class CertificationDetailsComponent implements OnInit {
  @Input() certificationDetails;
   public certificationHeader:any = [
    {field: 'certificationName', header: 'Certification Name'},
      {field: 'certificationForm', header: 'Certification From'},
      {field: 'validFrom', header: 'Valid From'},
      {field: 'validTo', header: 'Valid To'},
      {field: 'comments', header: 'Comments'}
  ];
  constructor() { }

  ngOnInit() {
    console.log(this.certificationDetails)
  }

}
