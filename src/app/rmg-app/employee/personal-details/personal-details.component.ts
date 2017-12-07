import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from "../../../services/DataService";
import { Ng2Storage } from "../../../services/storage";

@Component({
  selector: 'val-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss']
})
export class PersonalDetailsComponent implements OnInit {
  http: any;
  msgs: any = [];
  url: any;
  public imageView = true;
  public profileProgress: number;
  public emptyImage: boolean;
  public personalDetails: any;
  public personalBusy: Subscription;
  public skillBusy: Subscription;
  public masterDetails: any;

  private userData = this.storage.getSession('user_data');

  @ViewChild('getFile') input: ElementRef;
  @ViewChild("fileInput") fileInput;

  public employeeInfoTabs: any = [
    {
      name: 'Contact Details',
      field: 'contact-details',
      icon: 'ui-icon-contact-phone'
    },
    {
      name: 'Experience Details',
      field: 'experience-details',
      icon: 'ui-icon-format-align-justify'
    },
    {
      name: 'Skill Details',
      field: 'skill-details',
      icon: 'ui-icon-contact-phone'
    },
    // {
    //   name: 'Certification Details',
    //   field: 'certification-details',
    //   icon: 'ui-icon-content-paste'
    // },
    {
      name: 'Project Details',
      field: 'project-details',
      icon: 'ui-icon-call-to-action'
    },
    {
      name: 'BU Details',
      field: 'bu-details',
      icon: 'ui-icon-featured-play-list'
    },
    {
      name: 'VISA Details',
      field: 'visa-details',
      icon: 'ui-icon-featured-play-list'
    }
  ];
  constructor(public cdRef: ChangeDetectorRef, private dataService: DataService, private storage: Ng2Storage) { }

  ngOnInit() {
    this.emptyImage = true;
    this.personalBusy = this.dataService.getEmployeeDetails(this.userData.employeeId).subscribe((data) => {
      console.log(data);
      this.personalDetails = data.details;
      this.profileProgress = 40;
    })
  }

  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }

  onTabChange(e) {
    console.log(e);
    if (e.index === 2) {
      this.skillBusy = this.dataService.getSkillDetails(this.userData.employeeId).subscribe((data) => {
        this.masterDetails = data.details;
      })
    }
  }


  uploadFile(): void {
    let fi = this.input.nativeElement;
    if (fi.files && fi.files[0]) {
      let fileToUpload = fi.files[0];
      // let obj = {
      //   empid: this.userData.employeeId,
      //   File: fi.files[0]
      // }
      // this.dataService.uploadProfileImage(obj).subscribe((data) => {
      //   console.log(data);
      // })
      this.upload(fileToUpload);
        // .subscribe(res => {
        //   console.log(res);
        // });
    }
  }
  upload(fileToUpload: any) {
    let input = new FormData();
    let data = {
      empid: this.userData.employeeId,
    }
    input.append('file', fileToUpload);
    input.append('data', JSON.stringify(data));
    // return this.http
    //   .post("/api/uploadFile", input);
       this.dataService.uploadProfileImage(input).subscribe((data) => {
         console.log(data);
       })
  }

  removeImg() {
    this.url = "";
    this.emptyImage = true;
  }

  readUrl(event: any) {
    let maxImgLSize = 102400;
  console.log(event);
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].size > maxImgLSize) {
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: 'Error', detail: 'Selected image size is more than 100KB' });
      } else {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.url = event.target.result;
          console.log(this.url);
        }
        reader.readAsDataURL(event.target.files[0]);
        this.emptyImage = false;
      }

    }
  }




}
