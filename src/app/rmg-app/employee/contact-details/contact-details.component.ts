import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { DataService } from '../../../services/DataService';
import { MessageService } from 'primeng/components/common/messageservice';
import { Ng2Storage } from '../../../services/storage';
import { UtilsService } from "../../../services/utils.service";
import { DatePipe } from "@angular/common";

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

  public formErrors: any = {
    pEmailId: '',
    mobile: '',
    alternateMobile: ''
  }

  public validationMessages: any = {
    pEmailId: {
      required: 'Email ID is required',
      emailValidation: 'Email ID is not valid',
      cignitiEmail: 'Email ID cannot be cigniti email'
    },
    mobile: {
      required: 'Mobile is required',
      minlength: 'Mobile No should be 10 digits'
    },
    alternateMobile: {
      minlength: 'Mobile No should be 10 digits'
    }
  }

  constructor(private fb: FormBuilder, private dataService: DataService, private dPipe: DatePipe,
    private messageService: MessageService, private storage: Ng2Storage, private utilsService: UtilsService) { }

  ngOnInit() {
    const emailFormat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.contactForm = this.fb.group({
      pEmailId: [this.personalDetails.personalEmailId, [Validators.required, this.uniqueValidation('cignitiEmail', 'emailValidation', this.personalDetails.officialEmailId, emailFormat)]],
      mobile: [this.personalDetails.mobile, [Validators.required, Validators.minLength(10)]],
      alternateMobile: [this.personalDetails.alternatePhoneNo, [Validators.minLength(10)]]
    });
    this.contactForm.valueChanges.subscribe(data => this.utilsService.onValuesChanged(this.contactForm, this.formErrors, this.validationMessages));
    this.utilsService.onValuesChanged(this.contactForm, this.formErrors, this.validationMessages);
    this.contactForm.patchValue({ pEmailId: this.personalDetails.personalEmailId, mobile: this.personalDetails.mobile, alternateMobile: this.personalDetails.alternate_phone_no });
  }

  uniqueValidation(name1, name2, oEmailId, eFormat) {
    return function (c: AbstractControl): { [key: string]: any } {
      let val = c.value;
      if (!val) {
        return null;
      }
      let obj = {};
      if(!val.match(eFormat)){
        obj[name2] = true;
        return obj;
      }else if(val.toLowerCase().indexOf('cigniti') > -1){
        obj[name1] = true;
        return obj;
      }
      return null;
    };
  }

  onContactDetChange(type) {
    if (type === 'save') {
      this.formSubmitAttempt = true;
      if (this.contactForm.valid) {
        const paramObj = {
          empId: this.userData.employeeId,
          personalMailId: this.contactForm.get('pEmailId').value,
          phoneNo: this.contactForm.get('mobile').value,
          alternate_phone_no: this.contactForm.get('alternateMobile').value,
          totalExperience: this.personalDetails.totalExperience,
          employeeName: this.personalDetails.employeeName,
          lastUpdate: this.dPipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss'),
          progressbar: (!this.personalDetails.personalEmailId && !this.personalDetails.mobile) ? 10 : 0
        };
        this.dataService.saveContactAndExpDetails(paramObj).subscribe((data) => {
          this.callBackContactDetails.emit();
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
      this.contactForm.patchValue({
        pEmailId: this.personalDetails.personalEmailId, mobile: this.personalDetails.mobile
        , alternateMobile: this.personalDetails.alternatePhoneNo
      });
      this.editMode = false;
    }
  }

}
