import { Component, OnInit, Input, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { DataService } from "../../../services/DataService";
import { MessageService } from "primeng/components/common/messageservice";
import { Ng2Storage } from "../../../services/storage";
import { ConfirmationService } from "primeng/primeng";

@Component({
  selector: 'val-domain-details',
  templateUrl: './domain-details.component.html',
  styleUrls: ['./domain-details.component.scss']
})
export class DomainDetailsComponent implements OnInit {
  @Input() domainDetails;
  @Input() masterDomains;
  @Output() callBackProfessionalDetails = new EventEmitter();
  public subDomainDetails: any = [];
  public childDomainDetails: any = [];
  public domainList:any = [];
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
    childDomain: {}
  };
  private userData = this.storage.getSession('user_data');
  constructor(private dataService: DataService, private messageService: MessageService,
    private storage: Ng2Storage, private confirmationService: ConfirmationService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.masterDomains && changes.masterDomains.currentValue){
      this.masterDomainData = changes.masterDomains.currentValue;
    }
    if(changes.domainDetails && changes.domainDetails.currentValue){
      this.domainList = changes.domainDetails.currentValue;
    }
  }

  onDomainFocus(dR) {
    setTimeout(() => {
      dR.el.nativeElement.querySelector('.ui-dropdown-items-wrapper').scrollTop = 0;
    }, 10)
  }

  disableBtn() {
    let isValid = true;
    if(this.subDomainDetails.length === 0 || this.childDomainDetails.length === 0){
      return isValid;
    }
    [{ name: 'domain', model: 'domainId' }, { name: 'subDomain', model: 'subDomainId' }, { name: 'childDomain', model: 'childDomainId' }].forEach((obj) => {
      if (!this.domainModel[obj.name][obj.model]) {
        isValid = false;
      }
    })
    if (!isValid) {
      return true
    } else {
      return false;
    }
  }

  onDomainChange(type) {
    if (type === "domain") {
      this.dataService.getSubDomainDetails(this.domainModel.domain.domainId).subscribe((data) => {
        this.subDomainDetails = data;
        this.childDomainDetails = [];
        this.domainModel.subDomain = {};
        this.domainModel.childDomain = {};
      })
    } else {
      this.dataService.getChildDomainDetails(this.domainModel.domain.domainId, this.domainModel.subDomain.subDomainId).subscribe((data) => {
        this.childDomainDetails = data;
        this.domainModel.childDomain = {};
      })
    }

  }

  callDomainService(type, progressValue) {
    const domainExp = `${this.domainModel.years}.${this.domainModel.months}`;
    let domainFilteredObj = {
      domain_name: this.domainModel.domain.domainName,
      sub_domain_name: this.domainModel.subDomain.subDomaineName,
      child_domain_name: this.domainModel.childDomain.childDomaineName,
      domainExperience: +domainExp,
      comments: this.domainModel.comments
    };

    let domainObj = {
      employeeId: this.userData.employeeId,
      domainId: this.domainModel.domain.domainId,
      subDomainId: this.domainModel.subDomain.subDomainId,
      childDomainId: this.domainModel.childDomain.childDomainId,
      domain_experience: +domainExp,
      comments: this.domainModel.comments
    }
    if (type !== 'add') {
      domainObj['rowid'] = this.editedDomainObject.rowid;
    }
    this.dataService.addUpdateDomain(domainObj, progressValue).subscribe((data) => {
      console.log(data);
      if (type === 'add') {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Domain added successfully!!' });
      } else {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Domain updated successfully!!' });
      }
      this.callBackProfessionalDetails.emit();
      this.showButton = true;
      this.domainModel = {};
      this.subDomainDetails = [];
      this.childDomainDetails = [];
    })
  }

  saveDomain(type: string) {
    console.log('domain model', this.domainModel)
    let progressValue = 0;
    if (type === 'add') {
      if (this.domainDetails.length === 0) {
        this.dataService.profilePercentage.emit(20);
        progressValue = 20;
      }
    }
    this.callDomainService(type, progressValue);
  }

  editDomain(domain, index) {
    this.subDomainDetails = [];
    this.childDomainDetails = [];
    console.log('each domain', domain);
    this.showButton = false;
    this.domainModel = {
      comments: domain.comments
    };
    let domainExp = domain.domainExperience.toString();
    if (domainExp.indexOf(".") !== -1) {
      this.domainModel.years = +domainExp.split(".")[0];
      this.domainModel.months = +domainExp.split(".")[1];
    } else {
      this.domainModel.years = domain.domainExperience;
      this.domainModel.months = 0;
    }
    this.domainModel.domain = this.dataService.getMatchedDomain(domain.domain_name, this.masterDomains);
    this.editedDomainObject = domain;
    // this.domainModel = Object.assign({}, domain);
    this.dataService.getSubDomainDetails(this.domainModel.domain.domainId).subscribe((data) => {
      this.subDomainDetails = data;
      this.domainModel.subDomain = this.dataService.getMatchedDomain(domain.sub_domain_name, this.subDomainDetails);
      this.dataService.getChildDomainDetails(this.domainModel.domain.domainId, this.domainModel.subDomain.subDomainId).subscribe((data) => {
        this.childDomainDetails = data;
        this.domainModel.childDomain = this.dataService.getMatchedDomain(domain.child_domain_name, this.childDomainDetails);
      })
    })
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
    let domainObj = {
      rowid: domain.rowid,
      employeeId: this.userData.employeeId
    }
    this.dataService.deleteDomain(domainObj, progressBarValue).subscribe((data) => {
      console.log(data);
      if (this.domainDetails.length === 1) {
        this.dataService.profilePercentage.emit(-20);
      }
      this.callBackProfessionalDetails.emit();
      this.domainModel = {};
      this.subDomainDetails = [];
      this.childDomainDetails = [];
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Domain deleted successfully!!' });
      this.showButton = true;
    });
  }

}
