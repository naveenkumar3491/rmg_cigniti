import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'val-bu-details',
  templateUrl: './bu-details.component.html',
  styleUrls: ['./bu-details.component.scss']
})
export class BUDetailsComponent implements OnInit {
  @Input() personalDetails;
  constructor() { }

  ngOnInit() {
  }

}
