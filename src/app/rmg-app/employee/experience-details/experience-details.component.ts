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
  public model = {};
  private userData = this.storage.getSession('user_data');
  @Output() callBackContactDetails = new EventEmitter();
  @Input() personalDetails;
    @ViewChild('getResumeFile') input: ElementRef;
  @ViewChild('getResumeFile') resumeInput: ElementRef;
  constructor(private dataService: DataService, private messageService: MessageService
    , private storage: Ng2Storage) { }

  ngOnInit() {
    this.resumeName = this.personalDetails.resume_filename?this.personalDetails.resume_filename:"Not Yet Upload";
    this.emptyResume = true;
    let doj = new Date(this.personalDetails.doj);
    let todayDate = new Date();
    let yearCode =todayDate.getFullYear() - doj.getFullYear();
    let monthCode = todayDate.getMonth() - doj.getMonth();
          let yearExp = ((yearCode) > 1) ? (yearCode) + ' Years' : (((yearCode)==0 || (yearCode)==undefined)?'': (yearCode) +' Year' );
          let monthExp = ((monthCode) > 1) ? (monthCode) + ' Months' : (((monthCode)==0 || (monthCode)==undefined)?'': (monthCode) +' Month' );
      // let monthExp = (parseInt(totExpArray[1]) > 1) ? totExpArray[1] + ' Months' : ((totExpArray[1]=='0' || totExpArray[1]==undefined)?'': totExpArray[1] +' Month' );
    // this.model['cignitiExperience'] = `${yearCode} years ${monthCode} months`;
      this.model['cignitiExperience'] =  `${yearExp} ${monthExp}`;

    if (this.personalDetails.totalExperience === "0") {
      this.editMode = false;
      this.exp = {
    years: 0,
    months: 0
  }
    } else {
      let totExp = this.personalDetails.totalExperience;
      var totExpArray = totExp.split('.');
      let yearExp = (parseInt(totExpArray[0]) > 1) ? totExpArray[0] + ' Years' : ((totExpArray[0]=='0' || totExpArray[0]==undefined)?'': totExpArray[0] +' Year' );
      let monthExp = (parseInt(totExpArray[1]) > 1) ? totExpArray[1] + ' Months' : ((totExpArray[1]=='0' || totExpArray[1]==undefined)?'': totExpArray[1] +' Month' );
      this.model['totalExperience'] = `${yearExp} ${monthExp}`;
            this.exp = {
        years: (totExpArray[0]=="0" || totExpArray[0]=== undefined)? "0": totExpArray[0],
        months: (totExpArray[1]=="0" || totExpArray[1]=== undefined)? "0": totExpArray[1]
      }
    }

  }

  readResume(event: any) {

    if (event.target.files && event.target.files[0]) {
      this.resumeName = event.target.files[0].name;
      this.emptyResume = false;
    }
  }

    uploadFile(): void {
    let fi = this.input.nativeElement;
    if (fi.files && fi.files[0]) {
      let fileToUpload = fi.files[0];
      this.upload(fileToUpload);
    }
  }
  upload(fileToUpload: any) {
    let input = new FormData();
    input.append('file', fileToUpload);
    input.append('empId', this.userData.employeeId);
    input.append('progressbar', !this.personalDetails.employeeImage ? '10' : '0');
    this.dataService.uploadProfileResume(input).subscribe((data) => {
      this.emptyResume = true;
    })
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
        let yearExp = ((this.exp.years) > 1) ? this.exp.years + ' Years' : ((this.exp.years==1) ? this.exp.years +' Year' : '' );
      let monthExp = ((this.exp.months) > 1) ? this.exp.months + ' months' : ((this.exp.months==1)? this.exp.months +' month':'');
      if(this.exp.years==0 && this.exp.months==0){
              this.model['totalExperience'] = `No experience`;
      }else{
      this.model['totalExperience'] = `${yearExp} ${monthExp}`;
      }
       // this.model['totalExperience'] = `${this.exp.years} years ${this.exp.months} months`;
      })

    } else {
      this.editMode = false;

      // let expSplit = this.personalDetails.totalExperience.split(' ');
      // this.exp.years = expSplit[0];
      // this.exp.months = expSplit[2]
    }
  }

}
