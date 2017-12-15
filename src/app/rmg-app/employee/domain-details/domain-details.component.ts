import { Component, OnInit, Input } from '@angular/core';
import { DataService } from "../../../services/DataService";
import { MessageService } from "primeng/components/common/messageservice";

@Component({
  selector: 'val-domain-details',
  templateUrl: './domain-details.component.html',
  styleUrls: ['./domain-details.component.scss']
})
export class DomainDetailsComponent implements OnInit {
  @Input() domainDetails;
  @Input() masterDomains;
  public subDomainDetails: any = [];
  public childDomainDetails: any = [];
  public editedDomainObject: any;
  public showButton: boolean = true;
  public domainHeader: any = [
    { field: 'domain_name', header: 'Domain' },
    { field: 'sub_domain_name', header: 'Sub Domain' },
    { field: 'child_domain_name', header: 'Child Domain' },
    { field: 'domainExperience', header: 'Experience' },
    { field: 'comments', header: 'Comments' }
  ];
  public domainModel: any = {};
  constructor(private dataService: DataService, private messageService: MessageService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log(this.domainDetails);
    console.log('domains', this.masterDomains);
  }

  onDomainChange(type) {
    if (type === "domain") {
      this.dataService.getSubDomainDetails(this.domainModel.domain.domainId).subscribe((data) => {
        this.subDomainDetails = data;
        this.childDomainDetails = [];
      })
    } else {
      this.dataService.getChildDomainDetails(this.domainModel.domain.domainId, this.domainModel.subDomain.subDomainId).subscribe((data) => {
        this.childDomainDetails = data;
      })
    }

  }

  saveDomain(type: string) {
    if (type === 'add') {
      if (this.domainDetails.length === 0) {
        this.dataService.profilePercentage.emit(20);
      }
      this.domainDetails.unshift(Object.assign({}, this.domainModel));
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Domain added successfully!!' });
    } else {
      this.domainDetails.forEach((domain, index) => {
        if(domain.domain_row_id === this.editedDomainObject.domain_row_id){
          this.domainDetails[index] = this.domainModel;
        }
      });
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Domain updated successfully!!' });
    }
    this.domainDetails = this.domainDetails.slice();
    this.showButton = true;
    this.domainModel = {};
    this.subDomainDetails = [];
    this.childDomainDetails = [];
  }

  editDomain(domain, index) {
    this.showButton = false;
    this.editedDomainObject = domain;
    this.domainModel = Object.assign({}, domain);
    this.dataService.getSubDomainDetails(this.domainModel.domain.domainId).subscribe((data) => {
      this.subDomainDetails = data;
      this.dataService.getChildDomainDetails(this.domainModel.domain.domainId, this.domainModel.subDomain.subDomainId).subscribe((data) => {
        this.childDomainDetails = data;
      })
    })
  }

  deleteDomain(index) {
    this.domainDetails.splice(index, 1);
     this.domainModel = {};
     this.subDomainDetails = [];
    this.childDomainDetails = [];
    this.domainDetails = this.domainDetails.slice();
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Domain deleted successfully!!' });
    if (this.domainDetails.length === 0) {
      this.dataService.profilePercentage.emit(20);
    }
    this.showButton = true;
  }

}
