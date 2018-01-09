import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {
  public employeeHeader: any = [
    { field: 'emp_id', header: 'Employee Id' },
    { field: 'emp_name', header: 'Employee Name' }
  ];
  public employeeList = [
    {emp_id:'E001272', emp_name: 'Srikanth'},
    {emp_id:'E003801', emp_name: 'Shanker'}
  ];
  constructor(private router: Router) { }

  ngOnInit() {
  }

}
