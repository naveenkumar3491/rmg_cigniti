import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from "../../../services/DataService";



@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {
  public disabledBtn:boolean = false;
  public csvBodyRow = '';
  public csvHeaderRow = '';
  private emptyCount: number;
  public employeeHeader: any = [
    { field: 'emp_id', header: 'Employee Id' },
    { field: 'emp_name', header: 'Employee Name' }
  ];
  public employeeList = [
    { emp_id: 'E001272', emp_name: 'Srikanth' },
    { emp_id: 'E003801', emp_name: 'Shanker' }
  ];
  private headerColumns = ['Emp Id', 'Employee Name', 'Designation', 'DOJ', 'Joining Location', 'Current Location',
    'Employeement Type', 'Reporting Manager', 'Account Manager', 'Visa', 'Progress Bar', 'Official Email Id', 'Personal Email Id',
    'Primary Phone No', 'Alternate Phone No', 'Project Manager', 'Business Unit', 'Delivery Unit', 'Rmg Spoc', 'Project Name',
    'Project Start Date', 'Project End Date', 'Total Experience', 'Image Name', 'Employee Resume', 'Business Unit Head',
    'HR Spoc', 'Passport No', 'Passport Valid From', 'Passport Valid To', 'Passport Issue Date',
    'Project Name', 'Account Name', 'Allocation Start Date', 'Allocation End Date', 'Last Working Day', 'Allocation Status',
    'Skill', 'Skill Rating', 'Skill Category',
    'Technology', 'Certification', 'Borad Institute', 'Valid From', 'Valid To', 'Comments',
    'Domain Name', 'Sub Domain Name', 'Child Domain Name', 'Domain Experience', 'Comments',
    'Visa', 'Visa Type', 'Country', 'Status', 'Valid To', 'Valid From'];
  private csvBodyData = [
    {
      "empBean": {
        "emp_id": "E001441",
        "employeeName": "Srikanth Reddy Kandula ",
        "designation": "Associate Architect, Delivery",
        "doj": "16-02-2015",
        "joinginLocation": "HYD",
        "currentLocation": "HYD",
        "employeementType": "India Regular",
        "reportingManager": "Goutham Pingle",
        "accountManager": "Goutham Pingle",
        "visa": "No Visa",
        "progressbar": 0,
        "officialEmailId": "srikanth.kandula@cigniti.com",
        "personalEmailId": null,
        "mobile": null,
        "alternatePhoneNo": null,
        "project_manager": "Venkatramana Reddy Kambalapalli",
        "bu": "NA-EAST",
        "du": "NA",
        "rmg_spoc": null,
        "project_name": "Option City",
        "proj_startdate": "02-03-2015",
        "proj_enddate": "30-03-2018",
        "totalExperience": "0",
        "image_name": null,
        "employeeImage": null,
        "employeeResume": null,
        "bu_head": null,
        "hr_spoc": null,
        "passport_no": null,
        "passport_Valid_From": null,
        "passport_Valid_To": null,
        "passport_Issue_Date": null,
        "passposrt_Scan": null,
        "resumeFile": null
      },
      "projects": [],
      "visaList": [],
      "domainList": [],
      "skill_list": [],
      "certification_List": []
    },
    {
      "empBean": {
        "emp_id": "E001441",
        "employeeName": "Srikanth Reddy Kandula ",
        "designation": "Associate Architect, Delivery",
        "doj": "16-02-2015",
        "joinginLocation": "HYD",
        "currentLocation": "HYD",
        "employeementType": "India Regular",
        "reportingManager": "Goutham Pingle",
        "accountManager": "Goutham Pingle",
        "visa": "No Visa",
        "progressbar": 0,
        "officialEmailId": "srikanth.kandula@cigniti.com",
        "personalEmailId": null,
        "mobile": null,
        "alternatePhoneNo": null,
        "project_manager": "Venkatramana Reddy Kambalapalli",
        "bu": "NA-EAST",
        "du": "NA",
        "rmg_spoc": null,
        "project_name": "Option City",
        "proj_startdate": "02-03-2015",
        "proj_enddate": "30-03-2018",
        "totalExperience": "0",
        "image_name": null,
        "employeeImage": null,
        "employeeResume": null,
        "bu_head": null,
        "hr_spoc": null,
        "passport_no": null,
        "passport_Valid_From": null,
        "passport_Valid_To": null,
        "passport_Issue_Date": null,
        "passposrt_Scan": null,
        "resumeFile": null
      },
      "projects": [
        {
          "rowid": 45,
          "emp_id": "E003801",
          "project_name": "dfdgfffffffffffffffffffffffffffnbxcvvvvvvvvvv",
          "account_name": "rwerddddddddddd33333ddddddddddddddddddddddddd",
          "allocation_start_date": "02-02-2018",
          "allocation_end_date": "28-02-2018",
          "last_working_day": null,
          "allocation_status": "Buffer"
        },
        {
          "rowid": 42,
          "emp_id": "E003801",
          "project_name": "sdfadasdsad",
          "account_name": "sdfa",
          "allocation_start_date": "17-01-2018",
          "allocation_end_date": "25-01-2018",
          "last_working_day": null,
          "allocation_status": "Billing"
        },
        {
          "rowid": 41,
          "emp_id": "E003801",
          "project_name": "sairam",
          "account_name": "sairam",
          "allocation_start_date": "30-01-2018",
          "allocation_end_date": "31-01-2018",
          "last_working_day": null,
          "allocation_status": "Long Leave"
        },
        {
          "rowid": 39,
          "emp_id": "E003801",
          "project_name": "sfa",
          "account_name": "asfad",
          "allocation_start_date": "30-01-2018",
          "allocation_end_date": "22-02-2018",
          "last_working_day": null,
          "allocation_status": "Buffer"
        }
      ],
      "visaList": [
        {
          "rowid": 10,
          "employeeId": "E003801",
          "visa": "Business Visa",
          "visa_type": "eVisa",
          "country": "Kuwait",
          "status": "active",
          "validTo": "17-01-2018",
          "validFrom": "16-01-2018"
        },
        {
          "rowid": 9,
          "employeeId": "E003801",
          "visa": "Business Visa",
          "visa_type": "eVisa",
          "country": "Kuwait",
          "status": "expired",
          "validTo": "23-01-2018",
          "validFrom": "21-01-2018"
        },
        {
          "rowid": 6,
          "employeeId": "E003801",
          "visa": "Work Permit",
          "visa_type": "Intra Company Transfer",
          "country": "UK",
          "status": "expired",
          "validTo": "30-01-2018",
          "validFrom": "23-01-2018"
        }
      ],
      "domainList": [
        {
          "rowid": "34",
          "employeeId": "E003801",
          "domain_name": "BFSI",
          "sub_domain_name": "Payments",
          "child_domain_name": "ACH/NEFT/RTGS",
          "domainExperience": 1.1,
          "comments": null
        }
      ],
      "skill_list": [
        {
          "skill_master_id": "1128",
          "employeeId": "E003801",
          "skill": "CSS",
          "skillRating": "5",
          "skillCategory": "Developer"
        }
      ],
      "certification_List": [
        {
          "rowid": 39,
          "empId": "E003801",
          "technology": "Software Testing",
          "certification": "ISTQB -Agile Tester",
          "boardInstitute": "Indian Testing Board/ International software testing qualification board",
          "validFrom": "01-02-2018",
          "validTo": "28-02-2018",
          "comments": "test"
        }
      ]
    }
  ]
  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {

  }

  exportCSV() {
    this.disabledBtn = true;
    this.csvHeaderRow = '';
    this.csvBodyRow = '';
    this.csvBodyRow = this.headerColumns.join(',');
    // this.dataService.getAllEmpDetails().subscribe(data => {
    //   this.parseJson(data.details);
    //   this.disabledBtn = false;
    // })
  }

  parseJson(data) {
    let array = typeof data != 'object' ? JSON.parse(data) : data;

    for (let i = 0; i < array.length; i++) {
      for (let index in array[i]) {
        this.prepareCSVBody(array[i][index], index);
      }
      this.csvBodyRow += '\r\n' + this.csvHeaderRow;
      this.csvHeaderRow = '';
    }

    let uri = 'data:text/csv;charset=utf-8,' + encodeURI(this.csvBodyRow);

    let link = document.createElement("a");
    link.href = uri;
    link.download = 'shanker.csv';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  prepareCSVHeader(data) {
    if (Array.isArray(data)) {
      for (var index in data[0]) {
        this.csvBodyRow += index + ',';
      }
    } else {
      for (var index in data) {
        this.csvBodyRow += index + ',';
      }
    }
  }

  prepareCSVBody(data, attr) {
    if (Array.isArray(data)) {
      if (data.length === 0) {
        if (attr === 'skill_List') {
          this.emptyCount = 3;
        } else if (attr === 'domainList') {
          this.emptyCount = 5;
        } else {
          this.emptyCount = 6;
        }
        let out = [];
        for (var i = 0; i < this.emptyCount; i++) {
          out.push(null);
        }
        this.csvHeaderRow += out.join(",") + ',';
      } else {
        for (var index in data[0]) {
          this.joinObj(data, index);
        }
      }

    } else {
      var line = '';
      for (var index in data) {
        if (line != '') line += ','
        if (data[index] === '') {
          data[index] = null;
        }
        if(typeof data[index] === 'string'){
   if (data[index].indexOf(',') > -1) {
          data[index] = data[index].replace(/[,]/g, "|");
        }
        if (data[index].indexOf('\n') > -1) {
          data[index] = data[index].replace(/[\n]/g, "|");
        }
        }
       
        line += data[index];
      }
      this.csvHeaderRow += (this.csvHeaderRow === '' ? line : '\r\n' + line) + ',';
    }
  }

  joinObj(data, attr) {
    var out = [];
    for (var i = 0; i < data.length; i++) {
      if (attr === 'rowid' || attr === 'emp_id') {
        delete data[i][attr];
        return;
      }
      if (typeof data[i][attr] === 'string' && data[i][attr].indexOf(',') > -1) {
        data[i][attr] = data[i][attr].replace(/[,]/g, "|");
      }
      out.push(data[i][attr]);
    }
    this.csvHeaderRow += out.join("| ") + ',';

  }
}
