import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from "../../../services/DataService";
import { Ng2Storage } from "../../../services/storage";
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'val-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss'],
  providers: [MessageService]
})
export class PersonalDetailsComponent implements OnInit {
  http: any;
  msgs: any = [];
  url: any;
  
  public pbarColor:string;
  public imageView = true;
  public profileProgress: number;
  public emptyImage: boolean;
  public personalDetails: any;
  public projectDetails: any;
  public skillsMasterData: any;

  public personalBusy: Subscription;
  public skillBusy: Subscription;
  public projectBusy: Subscription;


  private userData = this.storage.getSession('user_data');

  @ViewChild('getFile') input: ElementRef;
  @ViewChild("fileInput") fileInput;

  public employeeInfoTabs: any = [
    {
      name: 'Contact Details',
      field: 'contact-details',
      icon: 'fa fa-address-book'
    },
    {
      name: 'Experience Details',
      field: 'experience-details',
      icon: 'fa fa-id-badge'
    },
    {
      name: 'Professional Details',
      field: 'skill-details',
      icon: 'fa fa-mortar-board'
    },
    {
      name: 'Project Details',
      field: 'project-details',
      icon: 'fa fa-user-circle'
    },
    {
      name: 'BU Details',
      field: 'bu-details',
      icon: 'fa fa-address-card'
    },
    {
      name: 'VISA Details',
      field: 'visa-details',
      icon: 'fa fa-plane'
    }
  ];
  constructor(public cdRef: ChangeDetectorRef, private messageService: MessageService,
    private dataService: DataService, private storage: Ng2Storage) {
    this.dataService.profilePercentage.subscribe((value) => {
      this.profileProgress += value;
      if(this.profileProgress > 100){
        this.profileProgress = 100;
      }
      this.changeProgressBarColor();
    });
  }

  ngOnInit() {
    this.emptyImage = true;
    this.getEmployeeDetails();

  }

  addValue(){
    this.profileProgress += 10;
    this.changeProgressBarColor();
  }

  changeProgressBarColor() {
    if (this.profileProgress <= 30) {
      this.pbarColor = 'pb-low';
    } else if (this.profileProgress > 30 && this.profileProgress <= 70) {
      this.pbarColor = 'pb-moderate';
    } else if (this.profileProgress > 70) {
      this.pbarColor = 'pb-good';
    }
  }

  getEmployeeDetails() {
    this.personalBusy = this.dataService.getEmployeeDetails(this.userData.employeeId).subscribe((data) => {
      this.personalDetails = data.details;
      this.profileProgress = this.personalDetails.progressbar;
      if(this.profileProgress > 100){
        this.profileProgress = 100;
      }
      this.changeProgressBarColor();
      this.url = this.personalDetails.employeeImage ? `data:image/png;base64,${this.personalDetails.employeeImage}` : null;
    });
  }

  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }

  onTabChange(e) {
    console.log(e);
    if (e.index === 2) {
      this.skillBusy = this.dataService.getAllSkillData(this.userData.employeeId).subscribe((data) => {
        console.log(data);
        this.skillsMasterData = data;
        console.log(this.skillsMasterData);
      });
    } else if (e.index === 3) {
      this.projectBusy = this.dataService.getProjectDetails(this.userData.employeeId).subscribe((data) => {
        this.projectDetails = data;
      });
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
    input.append('progressbar', !this.personalDetails.employeeImage ? '20' : '0');
    this.dataService.uploadProfileImage(input).subscribe((data) => {
      this.emptyImage = true;
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Uploaded Successfully!!' });
      this.getEmployeeDetails();
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
        //this.messageService.clear();
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Selected image size is more than 100KB' });
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
