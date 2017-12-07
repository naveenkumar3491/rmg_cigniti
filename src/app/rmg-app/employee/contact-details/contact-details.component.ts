import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'val-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {
  @Input() personalDetails;
  public editMode: boolean = true;
  constructor() { }

  ngOnInit() {
    if(!this.personalDetails.personalEmailId && !this.personalDetails.mobile){
      this.editMode = false;
    }
  }

  onContactDetChange(type){
    if(type === 'save'){
      this.editMode = true;
    }else{
      this.editMode = false;
    }
  }

}
