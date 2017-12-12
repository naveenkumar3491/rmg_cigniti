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
  public editedDomainIndex: number;
  public showButton: boolean = true;
  public domainHeader: any = [
    { field: 'domain.domainName', header: 'Domain' },
    { field: 'subDomain.subDomaineName', header: 'Sub Domain' },
    { field: 'childDomain.childDomaineName', header: 'Child Domain' },
    { field: 'yearOfExperience', header: 'Experience' },
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
    console.log(this.domainModel);
    if (type === 'add') {
      if (this.domainDetails.length === 0) {
        this.dataService.profilePercentage.emit(25);
      }
      this.domainDetails.push(Object.assign({}, this.domainModel));
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Domain added successfully!!' });
    } else {
      this.domainDetails[this.editedDomainIndex] = this.domainModel;
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
    this.editedDomainIndex = index;
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
      this.dataService.profilePercentage.emit(-25);
    }
    this.showButton = true;
  }

}
