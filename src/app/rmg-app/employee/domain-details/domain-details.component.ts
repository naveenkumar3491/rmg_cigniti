import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'val-domain-details',
  templateUrl: './domain-details.component.html',
  styleUrls: ['./domain-details.component.scss']
})
export class DomainDetailsComponent implements OnInit {
  @Input() domainDetails;
  public domainHeader:any = [
    {field: 'domain', header: 'Domain'},
      {field: 'subDomain', header: 'Sub Domain'},
      {field: 'yearOfExperience', header: 'Experience'},
      {field: 'comments', header: 'Comments'}
  ];
  public domainModel: any = {};
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log(this.domainDetails);
  }

}
