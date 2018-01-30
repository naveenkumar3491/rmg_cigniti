import { Component, OnInit, ViewChild, ElementRef, Input, EventEmitter, Output } from '@angular/core';
import { DataService } from '../../../services/DataService';
import { MessageService } from 'primeng/components/common/messageservice';
import { Ng2Storage } from '../../../services/storage';
import * as moment from 'moment';
import { UtilsService } from '../../../services/utils.service';
import { DatePipe } from "@angular/common";

@Component({
  selector: 'app-experience-details',
  templateUrl: './experience-details.component.html',
  styleUrls: ['./experience-details.component.scss']
})
export class ExperienceDetailsComponent implements OnInit {
  public resumeName;
  public emptyResume: boolean = true;
  public editMode: boolean = true;
  public showResumeUploading: boolean = false;
  public exp = {
    years: 0,
    months: 1
  };
  public model = {};
  private userData = this.storage.getSession('user_data');
  @Output() callBackContactDetails = new EventEmitter();
  @Input() personalDetails;
  @ViewChild('getResumeFile') input: ElementRef;
  @ViewChild('getResumeFile') resumeInput: ElementRef;
  constructor(private dataService: DataService, private messageService: MessageService
    , private storage: Ng2Storage, private utilsService: UtilsService, private dPipe: DatePipe) { }

  ngOnInit() {
    this.resumeName = this.personalDetails.employeeResume ? this.personalDetails.employeeResume : 'Not Yet Uploaded';
    const isResumeUploaded = this.personalDetails.employeeResume ? true : false;
    this.utilsService.isResumeUploded.next(isResumeUploaded);
    if (this.personalDetails.doj) {
      const todayDtSplit = moment(new Date());
      const dojSplit = moment(this.personalDetails.doj, "DD/MM/YYYY");
      const years = todayDtSplit.diff(dojSplit, 'year');
      dojSplit.add(years, 'years');
      let months = todayDtSplit.diff(dojSplit, 'months');
      dojSplit.add(months, 'months');
      const days = todayDtSplit.diff(dojSplit, 'days');
      this.model['cignitiExperience'] = years + ' years ' + months + ' months ' + days + ' days';
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

  readResume(event: any) {
    if (event.target.files && event.target.files[0]) {
      const fileExtn = event.target.files[0].name.split('.');
      if (fileExtn[1].toLowerCase() === 'doc' || fileExtn[1].toLowerCase() === 'docx') {
        this.resumeName = event.target.files[0].name;
        this.emptyResume = false;
      } else {
        this.messageService.add({ severity: 'danger', summary: 'Error', detail: `Only doc and docx files are allowed` });
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
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Uploaded Successfully!!' });
      this.callBackContactDetails.emit();
      this.emptyResume = true;
      this.showResumeUploading = false;
    });
  }
  removeResume() {
    this.utilsService.isResumeUploded.next(false);
    this.emptyResume = true;
    this.resumeName = 'Not Yet Uploaded';
  }

  saveExp(type) {
    if (type === 'save') {
      const paramObj = {
        empId: this.userData.employeeId,
        personalMailId: this.personalDetails.personalEmailId,
        phoneNo: this.personalDetails.mobile,
        employeeName: this.personalDetails.employeeName,
        totalExperience: parseFloat(this.exp.years + '.' + this.exp.months),
        progressbar: (this.personalDetails.totalExperience === '0') ? 5 : 0
      };
      this.dataService.saveContactAndExpDetails(paramObj).subscribe((data) => {
        this.callBackContactDetails.emit();
        this.editMode = true;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Saved Successfully!!' });
        const yearExp = ((this.exp.years) > 1) ? this.exp.years + ' Years' : ((this.exp.years === 1) ? this.exp.years + ' Year' : '');
        const monthExp = ((this.exp.months) > 1) ? this.exp.months + ' months' : ((this.exp.months === 1) ? this.exp.months + ' month' : '');
        if (this.exp.years === 0 && this.exp.months === 0) {
          this.model['totalExperience'] = `No experience`;
        } else {
          this.model['totalExperience'] = `${yearExp} ${monthExp}`;
        }
      });

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
