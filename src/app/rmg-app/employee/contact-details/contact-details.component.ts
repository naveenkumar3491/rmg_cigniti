import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from "../../../services/DataService";
import { MessageService } from "primeng/components/common/messageservice";

@Component({
  selector: 'val-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {
  @Input() personalDetails;
  contactForm: FormGroup;
  private formSubmitAttempt: boolean;
  public editMode: boolean = true;
  constructor(private fb: FormBuilder, private dataService: DataService, private messageService: MessageService) { }

  ngOnInit() {
    if(!this.personalDetails.personalEmailId && !this.personalDetails.mobile){
      this.editMode = false;
    }
    this.contactForm = this.fb.group({
      pEmailId: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required]]
    })
  }

  onContactDetChange(type){
    this.formSubmitAttempt = true;
    if (this.contactForm.valid) {
    if(type === 'save'){
      this.editMode = true;
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Saved Successfully!!' });
      this.dataService.profilePercentage.emit(20);
    }else{
      this.editMode = false;
    }
    }else{
      Object.keys(this.contactForm.controls).forEach(field => {
        const control = this.contactForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }

}
