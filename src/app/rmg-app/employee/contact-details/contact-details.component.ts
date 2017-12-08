import { Component, OnInit, Input } from '@angular/core';
import { DataService } from "../../../services/DataService";

@Component({
  selector: 'val-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {
  @Input() personalDetails;
  public editMode: boolean = true;
  constructor(private dataService: DataService) { }

  ngOnInit() {
    if(!this.personalDetails.personalEmailId && !this.personalDetails.mobile){
      this.editMode = false;
    }
  }

  onContactDetChange(type){
    if(type === 'save'){
      this.editMode = true;
      this.dataService.profilePercentage.emit(20);
    }else{
      this.editMode = false;
    }
  }

}
