import { Component, OnChanges, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ConfirmationService } from 'primeng/primeng';
import { DataService } from '../../../services/DataService';
import { MessageService } from 'primeng/components/common/messageservice';
import { Ng2Storage } from '../../../services/storage';
import { DateFormatPipe } from "../../../common/pipes/dateFormat.pipe";
import { UtilsService } from "../../../services/utils.service";

@Component({
  selector: 'app-certification-details',
  templateUrl: './certification-details.component.html',
  styleUrls: ['./certification-details.component.scss']
})
export class CertificationDetailsComponent implements OnChanges {
  @Input() certificationDetails;
  @Input() certificationTechnologies;
  @Output() callBackProfessionalDetails = new EventEmitter();
  public active: boolean = true;
  public certificationTechList: any;
  public certificationNames: any = [];
  public certificationInstitutes: any = [];
  public certificationList: any = [];
  private editedCertObject: any;
  public minCertificationDate: any;
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
  };
  public userData = this.storage.getSession('user_data');
  constructor(private confirmationService: ConfirmationService, private dataService: DataService,
    private datePipe: DateFormatPipe, private storage: Ng2Storage, private messageService: MessageService,
    private utilsService: UtilsService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.certificationTechnologies && changes.certificationTechnologies.currentValue) {
      this.certificationTechList = changes.certificationTechnologies.currentValue;
    }
    if (changes.certificationDetails && changes.certificationDetails.currentValue) {
      this.certificationList = changes.certificationDetails.currentValue;
    }
  }

  onCertStartDtSelect() {
    this.certificationModel.validTo = null;
    this.minCertificationDate = this.certificationModel.validFrom;
    this.active = false;
    setTimeout(() => { this.active = true; }, 0);
  }

  onCertificationAdd(type) {
    const certObj = {
      empId: this.userData.employeeId,
      technology: this.certificationModel.certTech.name,
      certification: this.certificationModel.certName.name,
      boardInstitute: this.certificationModel.certFrom.name,
      levels: this.certificationModel.certLevel,
      validFrom: this.datePipe.transform(this.certificationModel.validFrom, 'dd-MM-yyyy'),
      validTo: this.datePipe.transform(this.certificationModel.validTo, 'dd-MM-yyyy'),
      comments: this.certificationModel.comments
    };
    if (type !== 'add') {
      certObj['rowid'] = this.editedCertObject.rowid;
    }
    this.dataService.addUpdateCertification(certObj).subscribe((data) => {
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
      certTech: this.utilsService.getMatchedDomain(certification.technology, this.certificationTechnologies),
      certLevel: certification.levels,
      validFrom: certification.validFrom,
      validTo: certification.validTo,
      comments: certification.comments
    };
    const splitDate = (this.certificationModel.validFrom).split('-');
    const disabledDate = `${splitDate[1]}-${splitDate[0]}-${splitDate[2]}`;
    this.minCertificationDate = new Date(disabledDate);
    this.dataService.getCertificationNamesInstitutes(this.certificationModel.certTech.certTechId).subscribe((data) => {
      this.certificationNames = data[0];
      this.certificationInstitutes = data[1];
      this.certificationModel.certName = this.utilsService.getMatchedDomain(certification.certification, this.certificationNames);
      this.certificationModel.certFrom = this.utilsService.getMatchedDomain(certification.boardInstitute, this.certificationInstitutes);
    });
  }

  onCertificationTechChange() {
    this.certificationNames = [];
    this.certificationInstitutes = [];
    this.dataService.getCertificationNamesInstitutes(this.certificationModel.certTech.certTechId).subscribe((data) => {
      this.certificationNames = data[0];
      this.certificationInstitutes = data[1];
      this.certificationModel.certName = {};
      this.certificationModel.certFrom = {};
    });
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
    this.dataService.deleteCertification({ rowid: cert.rowid }).subscribe((data) => {
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
    });
    if (!isValid) {
      return true;
    } else {
      return false;
    }
  }

}
