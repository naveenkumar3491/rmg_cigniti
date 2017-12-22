import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ConfirmationService } from "primeng/primeng";
import { DataService } from "../../../services/DataService";
import { MessageService } from "primeng/components/common/messageservice";
import { Ng2Storage } from "../../../services/storage";

@Component({
  selector: 'val-certification-details',
  templateUrl: './certification-details.component.html',
  styleUrls: ['./certification-details.component.scss'],
  providers: [DatePipe]
})
export class CertificationDetailsComponent implements OnInit {
  @Input() certificationDetails;
  @Input() certificationTechnologies;
  @Output() callBackProfessionalDetails = new EventEmitter();
  public certificationTechList: any;
  public certificationNames: any = [];
  public certificationInstitutes: any = [];
  public certificationList:any = [];
  private editedCertObject: any;
  public showButton: boolean = true;
  public levelDetails = [{ label: 'Beginner', value: 'Beginner' },
  { label: 'Intermediate', value: 'Intermediate' },
  { label: 'Advanced', value: 'Advanced' }];

  public certificationHeader: any = [
    { field: 'technology', header: 'Certification Technology' },
    { field: 'certification', header: 'Certification Name' },
    { field: 'boardInstitute', header: 'Certification From' },
    { field: 'levels', header: 'Level' },
    { field: 'validFrom', header: 'Valid From' },
    { field: 'validTo', header: 'Valid To' },
    { field: 'comments', header: 'Comments' }
  ];
  public certificationModel: any = {
    certTech: {},
    certName: {},
    certFrom: {},
    certLevel: 'Beginner',
    comments: ''
  };;
  private userData = this.storage.getSession('user_data');
  constructor(private confirmationService: ConfirmationService, private dataService: DataService,
    private datePipe: DatePipe, private storage: Ng2Storage, private messageService: MessageService) { }

  ngOnInit() {
    console.log(this.certificationDetails)
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.certificationTechnologies && changes.certificationTechnologies.currentValue){
      this.certificationTechList = changes.certificationTechnologies.currentValue;
    }
    if(changes.certificationDetails && changes.certificationDetails.currentValue){
      this.certificationList = changes.certificationDetails.currentValue;
    }
    
  }

  onCertificationAdd(type) {
    let certObj = {
      empId: this.userData.employeeId,
      technology: this.certificationModel.certTech.name,
      certification: this.certificationModel.certName.name,
      boardInstitute: this.certificationModel.certFrom.name,
      levels: this.certificationModel.certLevel,
      validFrom: this.datePipe.transform(this.certificationModel.validFrom, 'MM-dd-yyyy'),
      validTo: this.datePipe.transform(this.certificationModel.validTo, 'MM-dd-yyyy'),
      comments: this.certificationModel.comments
    }
    if (type !== 'add') {
      certObj['rowid'] = this.editedCertObject.rowid;
    }
    this.dataService.addUpdateCertification(certObj).subscribe((data) => {
      console.log(data);
      if (type === 'add') {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Certification added successfully!!' });
      } else {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Certification updated successfully!!' });
      }
      this.callBackProfessionalDetails.emit();
      this.certificationModel = {
        certTech: {},
        certName: {},
        certFrom: {},
        certLevel: 'Beginner',
        comments: ''
      };
      this.certificationNames = [];
      this.certificationInstitutes = [];
      this.showButton = true;
    });
  }

  onEdit(certification, index) {
    this.certificationNames = [];
    this.showButton = false;
    this.editedCertObject = certification;
    this.certificationModel = {
      certTech: this.dataService.getMatchedDomain(certification.technology, this.certificationTechnologies),
      certLevel: certification.levels,
      validFrom: (certification.validFrom).replace(/-/g, '/'),
      validTo: (certification.validTo).replace(/-/g, '/'),
      comments: certification.comments
    }
    this.dataService.getCertificationNamesInstitutes(this.certificationModel.certTech.certTechId).subscribe((data) => {
      this.certificationNames = data[0];
      this.certificationInstitutes = data[1];
      this.certificationModel.certName = this.dataService.getMatchedDomain(certification.certification, this.certificationNames);
      this.certificationModel.certFrom = this.dataService.getMatchedDomain(certification.boardInstitute, this.certificationInstitutes);
    })
  }

  onCertificationTechChange() {
    this.certificationNames = [];
    this.certificationInstitutes = [];
    this.dataService.getCertificationNamesInstitutes(this.certificationModel.certTech.certTechId).subscribe((data) => {
      console.log(data);
      this.certificationNames = data[0];
      this.certificationInstitutes = data[1];
      this.certificationModel.certName = {};
      this.certificationModel.certFrom = {};
    })
  }

  deleteConfirm(cert, index) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete certification?',
      accept: () => {
        this.deleteCertification(cert, index);
      }
    });
  }

  deleteCertification(cert, index) {
    this.dataService.deleteCertification({rowid: cert.rowid}).subscribe((data) => {
      this.callBackProfessionalDetails.emit();
      this.certificationModel = {
        certTech: {},
        certName: {},
        certFrom: {},
        certLevel: 'Beginner',
        comments: ''
      };
      this.certificationNames = [];
      this.certificationInstitutes = [];
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Certification deleted successfully!!' });
      this.showButton = true;
    });
  }

  disableBtn() {
    let isValid = true;
    if (this.certificationNames.length === 0) {
      return isValid;
    }
    [{ name: 'certTech', model: 'certTechId' }, { name: 'certName', model: 'certNameId' }, { name: 'certFrom', model: 'name' }].forEach((obj) => {
      if (!this.certificationModel[obj.name][obj.model]) {
        isValid = false;
      }
    })
    if (!isValid) {
      return true
    } else {
      return false;
    }
  }

}
