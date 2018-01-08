import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { DataService } from '../../../services/DataService';
import { MessageService } from 'primeng/components/common/messageservice';
import { Ng2Storage } from '../../../services/storage';
import { UtilsService } from "../../../services/utils.service";

@Component({
  selector: 'app-contact-details',
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
  public userData = this.storage.getSession('user_data');
  public formObject: any = {
    pEmailId: '',
    mobile: ''
  }

  public formErrors: any = {
    pEmailId: '',
    mobile: ''
  }

   public validationMessages: any = {
    pEmailId: {
      required: 'Emain ID is required',
      emailValidation: 'Email ID is not valid'
    },
    mobile: {
      required: 'Mobile is required'
    }
  }

  constructor(private fb: FormBuilder, private dataService: DataService,
   private messageService: MessageService, private storage: Ng2Storage, private utilsService: UtilsService) { }

  ngOnInit() {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 
    this.contactForm = this.fb.group({
      pEmailId: [this.personalDetails.personalEmailId, [Validators.required, this.utilsService.validateWithRegex('emailValidation', mailformat)]],
      mobile: [this.personalDetails.mobile, [Validators.required]]
    });
    this.contactForm.valueChanges.subscribe(data => this.onValuesChanged());
    this.onValuesChanged();
    this.contactForm.patchValue({pEmailId: this.personalDetails.personalEmailId, mobile: this.personalDetails.mobile});
  }
  public onValuesChanged(data?: any) {
    if (!this.contactForm) { return; }
    const form = this.contactForm;
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.invalid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

   onContactDetChange(type) {
    if (type === 'save') {
      this.formSubmitAttempt = true;
      if (this.contactForm.valid) {
        const paramObj = {
          empId: this.userData.employeeId,
          personalMailId: this.contactForm.get('pEmailId').value,
          phoneNo: this.contactForm.get('mobile').value,
          totalExperience: this.personalDetails.totalExperience,
          progressbar: (!this.personalDetails.personalEmailId && !this.personalDetails.mobile) ? 10 : 0
        };
        this.dataService.saveContactAndExpDetails(paramObj).subscribe((data) => {
          this.callBackContactDetails.emit('save');
          this.editMode = true;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Saved Successfully!!' });
        });
      } else {
        Object.keys(this.contactForm.controls).forEach(field => {
          const control = this.contactForm.get(field);
          control.markAsTouched({ onlySelf: true });
        });
      }
    } else {
      this.contactForm.patchValue({pEmailId: this.personalDetails.personalEmailId, mobile: this.personalDetails.mobile});
      this.editMode = false;
    }
  }

}
