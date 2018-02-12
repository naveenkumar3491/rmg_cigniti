import { Component, OnChanges, ViewChild, ElementRef, Input, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { DataService } from '../../../services/DataService';
import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmationService } from 'primeng/primeng';
import { Ng2Storage } from '../../../services/storage';
import * as moment from 'moment';
import { UtilsService } from '../../../services/utils.service';
import { DatePipe } from "@angular/common";

@Component({
  selector: 'app-experience-details',
  templateUrl: './experience-details.component.html',
  styleUrls: ['./experience-details.component.scss']
})
export class ExperienceDetailsComponent implements OnChanges {
  public resumeName;
  public emptyResume: boolean = true;
  public editMode: boolean = true;
  public showResumeUploading: boolean = false;
  public exp = {
    years: 0,
    months: 1
  };
  public cignitiYears: number;
  public cignitiMonths: number;
  public cignitiDays: number;
  public model = {};
  private userData = this.storage.getSession('user_data');
  @Output() callBackContactDetails = new EventEmitter();
  @Input() personalDetails;
  @ViewChild('getResumeFile') input: ElementRef;
  @ViewChild('getResumeFile') resumeInput: ElementRef;
  constructor(private dataService: DataService, private messageService: MessageService
    , private storage: Ng2Storage, private utilsService: UtilsService, private dPipe: DatePipe,
    private confirmationService: ConfirmationService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.personalDetails && changes.personalDetails.currentValue) {
      this.resumeName = this.personalDetails.employeeResume ? this.personalDetails.employeeResume : 'Not Yet Uploaded';
      const isResumeUploaded = this.personalDetails.employeeResume ? true : false;
      this.utilsService.isResumeUploded.next(isResumeUploaded);
      if (this.personalDetails.doj) {
        const todayDtSplit = moment(new Date());
        const dojSplit = moment(this.personalDetails.doj, "DD/MM/YYYY");
        this.cignitiYears = todayDtSplit.diff(dojSplit, 'year');
        dojSplit.add(this.cignitiYears, 'years');
        this.cignitiMonths = todayDtSplit.diff(dojSplit, 'months');
        dojSplit.add(this.cignitiMonths, 'months');
        this.cignitiDays = todayDtSplit.diff(dojSplit, 'days');
        this.model['cignitiExperience'] = this.cignitiYears + ' years ' + this.cignitiMonths + ' months ' + this.cignitiDays + ' days';
      }

      if (this.personalDetails.totalExperience === '0') {
        this.editMode = false;
        this.exp = {
          years: 0,
          months: 1
        };
      } else {
        const totExp = this.personalDetails.totalExperience;
        this.model['totalExperience'] = this.utilsService.convertToYearsMonths(totExp);
        const totExpArray = totExp.split('.');
        this.exp = {
          years: (totExpArray[0] === '0' || totExpArray[0] === undefined) ? '0' : totExpArray[0],
          months: (totExpArray[1] === '0' || totExpArray[1] === undefined) ? '0' : totExpArray[1]
        };
      }
    }
  }

  readResume(event: any) {
    if (event.target.files && event.target.files[0]) {
      const fileExtn = event.target.files[0].name.split('.');
      if (fileExtn[1].toLowerCase() === 'doc' || fileExtn[1].toLowerCase() === 'docx') {
        this.resumeName = event.target.files[0].name;
        this.emptyResume = false;
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `Only doc and docx files are allowed` });
      }

    }
  }

  uploadFile(): void {
    this.showResumeUploading = true;
    const fi = this.input.nativeElement;
    if (fi.files && fi.files[0]) {
      const fileToUpload = fi.files[0];
      this.upload(fileToUpload);
    }
  }
  upload(fileToUpload: any) {
    const input = new FormData();
    input.append('file', fileToUpload);
    input.append('empId', this.userData.employeeId);
    input.append('lastUpdate', this.dPipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss'));
    input.append('progressbar', !this.personalDetails.employeeResume ? '40' : '0');
    this.dataService.uploadProfileResume(input).subscribe((data) => {
      this.utilsService.isResumeUploded.next(true);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Resume uploaded Successfully!!' });
      this.callBackContactDetails.emit();
      this.emptyResume = true;
      this.showResumeUploading = false;
    });
  }
  removeResume() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to remove resume?',
      accept: () => {
        const obj = { 'employeeId': this.userData.employeeId };
        const lastUpdate = this.dPipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
        this.dataService.deleteResume(obj, '40', lastUpdate).subscribe(data => {
          this.callBackContactDetails.emit();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Resume deleted Successfully!!' });
          this.utilsService.isResumeUploded.next(false);
          this.emptyResume = true;
          this.resumeName = 'Not Yet Uploaded';
        });
      }
    });
  }

  downloadResume() {
    let resumeB64 = this.base64ToArrayBuffer(`${this.personalDetails.resumeFile}`);
    this.saveByteArray(resumeB64);
  }

  base64ToArrayBuffer(base64) {
    var binaryString = window.atob(base64);
    var binaryLen = binaryString.length;
    var bytes = new Uint8Array(binaryLen);
    for (var i = 0; i < binaryLen; i++) {
       var ascii = binaryString.charCodeAt(i);
       bytes[i] = ascii;
    }
    return bytes;
 }

 saveByteArray(byte) {
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(new Blob([byte] , {type:'text/doc'}));
    var fileName = `${this.personalDetails.employeeResume}.doc`;
    link.download = fileName;
    link.click();
};

validateExperience(){
  if(+this.exp.years < +this.cignitiYears){
    return false;
  }else if(+this.exp.years === +this.cignitiYears){
    if(+this.exp.months < +this.cignitiMonths){
      return false;
    }else if(+this.exp.months === +this.cignitiMonths){
      if(+this.cignitiDays > 0){
        return false;
      }
    }
  }
  return true;
}

  saveExp(type) {
        if (type === 'save') {
          if(this.validateExperience()){
        const paramObj = {
          empId: this.userData.employeeId,
          personalMailId: this.personalDetails.personalEmailId,
          phoneNo: this.personalDetails.mobile,
          employeeName: this.personalDetails.employeeName,
          totalExperience: this.exp.years + '.' + this.exp.months,
          progressbar: (this.personalDetails.totalExperience === '0') ? 5 : 0,
          lastUpdate: this.dPipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        };
        this.dataService.saveContactAndExpDetails(paramObj).subscribe((data) => {
          this.callBackContactDetails.emit();
          this.editMode = true;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Saved Successfully!!' });
        });
          }else{
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Total Experience should be greater than or equal to Cigniti Experience!!' });
          }
  
      } else {
        this.editMode = false;
        const tExp = this.personalDetails.totalExperience.split('.');
        this.exp = {
          years: (tExp[0] === '0' || tExp[0] === undefined) ? '0' : tExp[0],
          months: (tExp[1] === '0' || tExp[1] === undefined) ? '0' : tExp[1]
        };
      }

  }

}
