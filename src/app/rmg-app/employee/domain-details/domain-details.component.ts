import { Component, OnChanges, Input, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { DataService } from '../../../services/DataService';
import { MessageService } from 'primeng/components/common/messageservice';
import { Ng2Storage } from '../../../services/storage';
import { ConfirmationService } from 'primeng/primeng';
import { UtilsService } from "../../../services/utils.service";

@Component({
  selector: 'app-domain-details',
  templateUrl: './domain-details.component.html',
  styleUrls: ['./domain-details.component.scss']
})
export class DomainDetailsComponent implements OnChanges {
  @Input() domainDetails;
  @Input() masterDomains;
  @Output() callBackProfessionalDetails = new EventEmitter();
  @Output() callBackContactDetails = new EventEmitter();
  public subDomainDetails: any = [];
  public childDomainDetails: any = [];
  public domainList: any = [];
  public editedDomainObject: any;
  public masterDomainData: any;
  public showButton: boolean = true;
  public domainHeader: any = [
    { field: 'domain_name', header: 'Domain' },
    { field: 'sub_domain_name', header: 'Sub Domain' },
    { field: 'child_domain_name', header: 'Child Domain' },
    { field: 'domainExperience', header: 'Experience' },
    { field: 'comments', header: 'Comments' }
  ];
  public domainModel: any = {
    domain: {},
    subDomain: {},
    childDomain: {},
    years: 0,
    months: 1
  };
  public userData = this.storage.getSession('user_data');
  constructor(private dataService: DataService, private messageService: MessageService,
    private storage: Ng2Storage, private confirmationService: ConfirmationService,
    private utilsService: UtilsService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.masterDomains && changes.masterDomains.currentValue) {
      this.masterDomainData = changes.masterDomains.currentValue;
    }
    if (changes.domainDetails && changes.domainDetails.currentValue) {
      this.domainList = changes.domainDetails.currentValue;
    }
  }

  onDomainFocus(dR) {
    setTimeout(() => {
      dR.el.nativeElement.querySelector('.ui-dropdown-items-wrapper').scrollTop = 0;
    }, 10);
  }

  disableBtn() {
    let isValid = true;
    if (this.subDomainDetails.length === 0 || this.childDomainDetails.length === 0) {
      return isValid;
    }
    [{ name: 'domain', model: 'domainId' }, { name: 'subDomain', model: 'subDomainId' }, { name: 'childDomain', model: 'childDomainId' }].forEach((obj) => {
      if (!this.domainModel[obj.name][obj.model]) {
        isValid = false;
      }
    });
    if (!isValid) {
      return true;
    } else {
      return false;
    }
  }

  onDomainChange(type) {
    if (type === 'domain') {
      this.dataService.getSubDomainDetails(this.domainModel.domain.domainId).subscribe((data) => {
        this.subDomainDetails = data;
        this.childDomainDetails = [];
        this.domainModel.subDomain = {};
        this.domainModel.childDomain = {};
      });
    } else {
      this.dataService.getChildDomainDetails(this.domainModel.domain.domainId, this.domainModel.subDomain.subDomainId).subscribe((data) => {
        this.childDomainDetails = data;
        this.domainModel.childDomain = {};
      });
    }

  }

  callDomainService(type, progressValue) {
    const domainExp = `${this.domainModel.years}.${this.domainModel.months}`;
    const domainFilteredObj = {
      domain_name: this.domainModel.domain.domainName,
      sub_domain_name: this.domainModel.subDomain.subDomaineName,
      child_domain_name: this.domainModel.childDomain.childDomaineName,
      domainExperience: +domainExp,
      comments: this.domainModel.comments
    };

    const domainObj = {
      employeeId: this.userData.employeeId,
      domainId: this.domainModel.domain.domainId,
      subDomainId: this.domainModel.subDomain.subDomainId,
      childDomainId: this.domainModel.childDomain.childDomainId,
      domain_experience: +domainExp,
      comments: this.domainModel.comments
    };
    if (type !== 'add') {
      domainObj['rowid'] = this.editedDomainObject.rowid;
    }
    this.dataService.addUpdateDomain(domainObj, progressValue).subscribe((data) => {
      if (type === 'add') {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Domain added successfully!!' });
      } else {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Domain updated successfully!!' });
      }
      this.callBackProfessionalDetails.emit();
      this.callBackContactDetails.emit();
      this.showButton = true;
      this.domainModel = {
        domain: {},
        subDomain: {},
        childDomain: {},
        years: 0,
        months: 1
      };
      this.subDomainDetails = [];
      this.childDomainDetails = [];
    });
  }

  saveDomain(type: string) {
    let progressValue = 0;
    if (type === 'add') {
      if (this.domainDetails.length === 0) {
        progressValue = 20;
      }
    }
    this.callDomainService(type, progressValue);
  }

  editDomain(domain, index) {
    this.subDomainDetails = [];
    this.childDomainDetails = [];
    this.showButton = false;
    this.domainModel = {
      comments: domain.comments
    };
    const domainExp = domain.domainExperience.toString();
    if (domainExp.indexOf('.') !== -1) {
      this.domainModel.years = +domainExp.split('.')[0];
      this.domainModel.months = +domainExp.split('.')[1];
    } else {
      this.domainModel.years = domain.domainExperience;
      this.domainModel.months = 0;
    }
    this.domainModel.domain = this.utilsService.getMatchedDomain(domain.domain_name, this.masterDomains);
    this.editedDomainObject = domain;
    this.dataService.getSubDomainDetails(this.domainModel.domain.domainId).subscribe((subDomainData) => {
      this.subDomainDetails = subDomainData;
      this.domainModel.subDomain = this.utilsService.getMatchedDomain(domain.sub_domain_name, this.subDomainDetails);
      this.dataService.getChildDomainDetails(this.domainModel.domain.domainId, this.domainModel.subDomain.subDomainId).subscribe((childDomaindata) => {
        this.childDomainDetails = childDomaindata;
        this.domainModel.childDomain = this.utilsService.getMatchedDomain(domain.child_domain_name, this.childDomainDetails);
      });
    });
  }

  deleteConfirm(domain, index) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete domain?',
      accept: () => {
        this.deleteDomain(domain, index);
      }
    });
  }

  deleteDomain(domain, index) {
    let progressBarValue = 0;
    if (this.domainDetails.length === 1) {
      progressBarValue = 20;
    }
    const domainObj = {
      rowid: domain.rowid,
      employeeId: this.userData.employeeId
    };
    this.dataService.deleteDomain(domainObj, progressBarValue).subscribe((data) => {
      this.callBackProfessionalDetails.emit();
      this.callBackContactDetails.emit();
      this.domainModel = {
        domain: {},
        subDomain: {},
        childDomain: {},
        years: 0,
        months: 1
      };
      this.subDomainDetails = [];
      this.childDomainDetails = [];
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Domain deleted successfully!!' });
      this.showButton = true;
    });
  }

}
