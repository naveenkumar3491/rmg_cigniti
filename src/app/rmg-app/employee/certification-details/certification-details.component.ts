import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'val-certification-details',
  templateUrl: './certification-details.component.html',
  styleUrls: ['./certification-details.component.scss']
})
export class CertificationDetailsComponent implements OnInit {
 
   @Input() certificationDetails;
 
   public certificationNames=[{label:'certification1', value:'certification1'},
                              {label:'certification2', value:'certification2'},
                              {label:'certification3', value:'certification3'}];

    public levelDetails = [{label:'level1', value:'levlel1'},
                           {label:'level1', value:'levlel1'},
                           {label:'level1', value:'levlel1'}];   

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
