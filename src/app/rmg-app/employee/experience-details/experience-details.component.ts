import { Component, OnInit, ViewChild, ElementRef, Input, EventEmitter, Output } from '@angular/core';
import { DataService } from "../../../services/DataService";
import { MessageService } from "primeng/components/common/messageservice";
import { Ng2Storage } from "../../../services/storage";

@Component({
  selector: 'val-experience-details',
  templateUrl: './experience-details.component.html',
  styleUrls: ['./experience-details.component.scss']
})
export class ExperienceDetailsComponent implements OnInit {
  public resumeName;
  public emptyResume: boolean;
  public editMode: boolean = true;
  public exp = {
    years: 1,
    months: 1
  }
  public model ={};
   private userData = this.storage.getSession('user_data');
   @Output() callBackContactDetails = new EventEmitter();
  @Input() personalDetails;
  @ViewChild('getResumeFile') resumeInput: ElementRef;
  constructor(private dataService: DataService, private messageService: MessageService
  , private storage: Ng2Storage) { }

  ngOnInit() {
    this.resumeName = "Not Yet Upload";
    this.emptyResume = true;
    let doj = new Date(this.personalDetails.doj);
    let todayDate = new Date();
    this.model['cignitiExperience'] = `${todayDate.getFullYear() - doj.getFullYear()} years ${todayDate.getMonth() - doj.getMonth()} months`;

    if (this.personalDetails.totalExperience === "0") {
      this.editMode = false;
    }else{
      this.model['totalExperience'] = this.personalDetails.totalExperience;
    }
  }

  readResume(event: any) {

    if (event.target.files && event.target.files[0]) {
      this.resumeName = event.target.files[0].name;
      this.emptyResume = false;
    }
  }
  removeResume() {
    this.emptyResume = true;
    this.resumeName = "Not Yet Uploaded"
  }

  saveExp(type) {
    if (type === 'save') {
      let paramObj = {
          empId: this.userData.employeeId,
          personalMailId: this.personalDetails.personalEmailId,
          phoneNo: this.personalDetails.mobile,
          totalExperience: parseFloat(this.exp.years + '.' + this.exp.months),
          progressbar: (this.personalDetails.totalExperience === "0") ? 10 : 0
        }
        this.dataService.saveContactAndExpDetails(paramObj).subscribe((data) => {
          this.callBackContactDetails.emit('save');
          this.editMode = true;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Saved Successfully!!' });
           this.model['totalExperience'] = `${this.exp.years} years ${this.exp.months} months`;
        })
     
    }else{
      this.editMode = false;
      // let expSplit = this.personalDetails.totalExperience.split(' ');
      // this.exp.years = expSplit[0];
      // this.exp.months = expSplit[2]
    }
  }

}
