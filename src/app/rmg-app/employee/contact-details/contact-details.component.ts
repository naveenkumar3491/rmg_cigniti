import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from "../../../services/DataService";
import { MessageService } from "primeng/components/common/messageservice";
import { Ng2Storage } from "../../../services/storage";

@Component({
  selector: 'val-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {
  @Input() personalDetails;
  @Output() callBackContactDetails = new EventEmitter();
  isNumber: boolean = true;
  contactForm: FormGroup;
  private formSubmitAttempt: boolean;
  public editMode: boolean = true;
  public model = {};
  private userData = this.storage.getSession('user_data');
  constructor(private fb: FormBuilder, private dataService: DataService,
   private messageService: MessageService, private storage: Ng2Storage) { }

  ngOnInit() {
    this.model['personalEmailId'] = this.personalDetails.personalEmailId;
    this.model['mobile'] = this.personalDetails.mobile;
    if (!this.personalDetails.personalEmailId && !this.personalDetails.mobile) {
      this.editMode = false;
    }
    this.contactForm = this.fb.group({
      pEmailId: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required]]
    })
  }
  
   onContactDetChange(type) {


    if (type === 'save') {
      this.formSubmitAttempt = true;
      if (this.contactForm.valid) {
        
        let paramObj = {
          empId: this.userData.employeeId,
          personalMailId: this.model['personalEmailId'],
          phoneNo: this.model['mobile'],
          totalExperience: this.personalDetails.totalExperience,
          progressbar: (!this.personalDetails.personalEmailId && !this.personalDetails.mobile) ? 20 : 0
        }
        this.dataService.saveContactAndExpDetails(paramObj).subscribe((data) => {
          this.callBackContactDetails.emit('save');
          this.editMode = true;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Saved Successfully!!' });

        })
      } else {
        Object.keys(this.contactForm.controls).forEach(field => {
          const control = this.contactForm.get(field);
          control.markAsTouched({ onlySelf: true });
        });
      }
    } else {
      this.editMode = false
    }
  }

}
