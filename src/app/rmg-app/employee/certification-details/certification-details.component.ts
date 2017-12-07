import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'val-certification-details',
  templateUrl: './certification-details.component.html',
  styleUrls: ['./certification-details.component.scss']
})
export class CertificationDetailsComponent implements OnInit {
  @Input() certificationDetails;
  constructor() { }

  ngOnInit() {
  }

}
