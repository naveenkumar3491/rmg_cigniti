import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'val-domain-details',
  templateUrl: './domain-details.component.html',
  styleUrls: ['./domain-details.component.scss']
})
export class DomainDetailsComponent implements OnInit {
  @Input() domainDetails;
  constructor() { }

  ngOnInit() {
  }

}
