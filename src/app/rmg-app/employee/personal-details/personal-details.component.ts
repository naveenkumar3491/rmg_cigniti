import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import {Subscription} from 'rxjs';
import { DataService } from "../../../services/DataService";
import { Ng2Storage } from "../../../services/storage";

@Component({
  selector: 'val-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss']
})
export class PersonalDetailsComponent implements OnInit {
  http: any;

  url: any;
  public imageView = true;

  public emptyImage: boolean;
  public personalDetails: any;
  public busy: Subscription;

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
    let userData = this.storage.getSession('user_data');
    this.busy = this.dataService.getEmployeeDetails(userData.employeeId).subscribe((data) => {
      console.log(data);
      this.personalDetails = data.details;
    })
  }

  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }


  uploadFile(): void {
    let fi = this.fileInput.nativeElement;
    if (fi.files && fi.files[0]) {
      let fileToUpload = fi.files[0];
      this.upload(fileToUpload)
        .subscribe(res => {
          console.log(res);
        });
    }
  }
  upload(fileToUpload: any) {
    let input = new FormData();
    input.append("file", fileToUpload);

    return this.http
      .post("/api/uploadFile", input);
  }

  removeImg() {
    this.url = "";
    this.emptyImage = true;
  }

  readUrl(event: any) {
    let maxImgLSize = 102400;

    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].size > maxImgLSize) {
        alert("Selected image size is more than 100KB");
      } else {
        var reader = new FileReader();

        reader.onload = (event: any) => {
          this.url = event.target.result;
        }

        reader.readAsDataURL(event.target.files[0]);
        this.emptyImage = false;
      }

    }
  }




}
