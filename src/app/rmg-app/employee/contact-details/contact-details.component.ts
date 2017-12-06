import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'val-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {
  @Input() personalDetails;
  constructor() { }

  ngOnInit() {
  }

}
