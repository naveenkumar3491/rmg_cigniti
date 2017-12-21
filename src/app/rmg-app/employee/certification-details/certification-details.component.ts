import { Component, OnInit, Input } from '@angular/core';
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
  @Input() certificationInstitues;
  public certificationNames: any;
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
    this.dataService.addUpdateCertification(certObj).subscribe((data) => {
      console.log(data);
      if (type === 'add') {
        delete certObj.empId;
        this.certificationDetails.unshift(Object.assign({}, certObj));
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Certification added successfully!!' });
      } else {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Certification updated successfully!!' });
      }
      this.certificationDetails = this.certificationDetails.slice();
      this.certificationModel = {
        certTech: {},
        certName: {},
        certFrom: {},
        certLevel: 'Beginner',
        comments: ''
      };
      this.certificationNames = [];
      this.showButton = true;
    });
  }

  onEdit(certification, index) {
    this.showButton = false;
    this.certificationModel = {
      certTech: this.dataService.getMatchedDomain(certification.technology, this.certificationTechnologies),
      certFrom: this.dataService.getMatchedDomain(certification.boardInstitute, this.certificationInstitues),
      certLevel: certification.levels,
      validFrom: (certification.validFrom).replace(/-/g, '/'),
      validTo: (certification.validTo).replace(/-/g, '/'),
      comments: certification.comments
    }
    this.dataService.getCertificationNames(this.certificationModel.certTech.certTechId).subscribe((data) => {
      this.certificationNames = data;
      this.certificationModel.certName = this.dataService.getMatchedDomain(certification.certification, this.certificationNames);
    })
  }

  onCertificationTechChange() {
    this.dataService.getCertificationNames(this.certificationModel.certTech.certTechId).subscribe((data) => {
      this.certificationNames = data;
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

  deleteCertification(cert, index){
    this.dataService.deleteCertification(cert).subscribe((data) => {
      console.log(data);
      this.certificationDetails.splice(index, 1);
      this.certificationModel = {
        certTech: {},
        certName: {},
        certFrom: {},
        certLevel: 'Beginner',
        comments: ''
      };
      this.certificationNames = [];
      this.certificationDetails = this.certificationDetails.slice();
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Certification deleted successfully!!' });
      this.showButton = true;
    });
  }

  validateFields() {
    let isValid = true;
    ['certificationName', 'certificationFrom', 'validFrom', 'validTo'].forEach((value) => {
      if (!this.certificationModel[value]) {
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
