import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from "../../../services/DataService";
import { Ng2Storage } from "../../../services/storage";
import { MessageService } from 'primeng/components/common/messageservice';
import { UtilsService } from '../../../services/utils.service';
import { ActivatedRoute, Params } from '@angular/router';
import { DateFormatPipe } from '../../../common/pipes/dateFormat.pipe';

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

  public editMode: boolean = false;
  public tabIndex: any = 0;
  public pdModel: any = {};
  public pbarColor: string;
  public imageView = true;
  public profileProgress: number;
  public emptyImage: boolean;
  public showUploading: boolean = false;
  public personalDetails: any;
  public projectDetails: any;
  public visaDetails: any;
  public professionalMasterData: any;
  public masterSkillsData: any;
  public masterDomainData: any;
  public masterCertificationData: any;
  public designationMasterData: any;
  public locationMasterData: any;
  public buMasterData: any;
  public duMasterData: any;

  public personalBusy: Subscription;
  public professionalBusy: Subscription;
  public skillBusy: Subscription;
  public domainBusy: Subscription;
  public certificationBusy: Subscription;
  public projectBusy: Subscription;
  public visaBusy: Subscription;


  public userData = this.storage.getSession('user_data');

  @ViewChild('getFile') input: ElementRef;
  @ViewChild("fileInput") fileInput;
  private employeeId: string;

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
    private dataService: DataService, private storage: Ng2Storage, private utilsService: UtilsService,
    private activatedRoute: ActivatedRoute, private datePipe: DateFormatPipe) {
      this.activatedRoute.queryParams.subscribe(params => {
        if(params && params.empId){
          this.employeeId = params.empId;
        }else{
          this.employeeId = this.userData.employeeId;
        }
      });

    this.dataService.profilePercentage.subscribe((value) => {
      this.profileProgress += value;
      if (this.profileProgress > 100) {
        this.profileProgress = 100;
      }
      this.changeProgressBarColor();
    });
    this.utilsService.highlightTab.subscribe((isHighligted) => {
      this.tabIndex = isHighligted;
    })

  }

  ngOnInit() {
    this.emptyImage = true;
    this.getEmployeeDetails();

  }

  onPdEdit() {
    this.editMode = true;
    let pd = this.personalDetails;
    let desigObj = this.designationMasterData.find(obj => obj.label === pd.designation);
    let jLObj = this.locationMasterData.find(obj => obj.label === pd.joinginLocation);
    let cLObj = this.locationMasterData.find(obj => obj.label === pd.currentLocation);
    this.pdModel = {
      empId: pd.emp_id,
      employeeName: pd.employeeName,
      designation: desigObj ? desigObj.value : null,
      doj: pd.doj,
      joiningLocation: jLObj ? jLObj.value : null,
      currentLocation: cLObj ? cLObj.value : null,
      emplType: pd.employeementType,
      reportingManager: pd.reportingManager,
      rmgSpoc: pd.rmg_spoc
    };
  }

  onPDSave() {
    this.pdModel.doj = this.datePipe.transform(this.pdModel.doj, 'dd-MM-yyyy');
    this.dataService.addUpdateEmployee(this.pdModel).subscribe((data) => {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Saved Successfully!!' });
     this.editMode = false;
     this.getEmployeeDetails();
    });
  }


  changeProgressBarColor() {
    // if (this.profileProgress <= 30) {
    //   this.pbarColor = 'pb-low';
    // } else 
    if (this.profileProgress > 0 && this.profileProgress <= 70) {
      // this.pbarColor = 'pb-moderate';
      this.pbarColor = 'pb-low';
    } else if (this.profileProgress > 70) {
      this.pbarColor = 'pb-good';
    }
  }

  onDesignationFocus(ds) {
    setTimeout(() => {
      ds.el.nativeElement.querySelector('.ui-dropdown-items-wrapper').scrollTop = 0;
    }, 10);
  }
  callBackContactDetails() {
    this.getEmployeeDetails();
  }
  getEmployeeDetails() {
    this.personalBusy = this.dataService.getEmployeeDetails(this.employeeId).subscribe((data) => {
      this.personalDetails = data[0].details;
      this.designationMasterData = data[1];
      this.locationMasterData = data[2];
      this.buMasterData = data[4];
      this.duMasterData = data[3];
      this.profileProgress = this.personalDetails.progressbar;
      if (this.profileProgress > 100) {
        this.profileProgress = 100;
      }
      this.changeProgressBarColor();
      this.url = this.personalDetails.employeeImage ? `data:image/png;base64,${this.personalDetails.employeeImage}` : null;
    });
  }

  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }

  callBackProfessionalDetails() {
    this.professionalBusy = this.dataService.getProfessionalDetails(this.employeeId).subscribe((data) => {
      this.professionalMasterData = data;
    });
  }

  onTabChange(e) {
    if (e.index === 2) {
      this.callBackProfessionalDetails();
    } else if (e.index === 3) {
      this.callBackProjectDetails();
    } else if (e.index === 5) {
      this.visaBusy = this.dataService.getVisaDetails(this.employeeId).subscribe((data) => {
        this.visaDetails = data.details;
      });
    }
  }

  callBackProjectDetails() {
    this.projectBusy = this.dataService.getProjectDetails(this.employeeId).subscribe((data) => {
      this.projectDetails = data;
    });
  }

  onAccOpen(e) {
    if (e.index === 0) {
      this.skillBusy = this.dataService.getSkillCategories().subscribe((data) => {
        this.masterSkillsData = data;
      })
    } else if (e.index === 1) {
      this.domainBusy = this.dataService.getMasterDomainDetails().subscribe((data) => {
        this.masterDomainData = data;
      })
    } else if (e.index === 2) {
      this.certificationBusy = this.dataService.getCertificationTechnologies().subscribe((data) => {
        this.masterCertificationData = data;
      })
    }
  }


  uploadFile(): void {
    this.showUploading = true;
    let fi = this.input.nativeElement;
    if (fi.files && fi.files[0]) {
      let fileToUpload = fi.files[0];
      this.upload(fileToUpload);
    }
  }
  upload(fileToUpload: any) {
    let input = new FormData();
    input.append('file', fileToUpload);
    input.append('empId', this.employeeId);
    input.append('progressbar', !this.personalDetails.employeeImage ? '5' : '0');
    this.dataService.uploadProfileImage(input).subscribe((data) => {
      this.showUploading = false;
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
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].size > maxImgLSize) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Selected image size is more than 100KB' });
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
