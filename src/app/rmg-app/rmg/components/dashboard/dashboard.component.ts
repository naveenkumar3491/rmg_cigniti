import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'val-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public cars = [
    {vin: 'naveen', year: 1996, brand: 'kumar', color: 'brown'},
    {vin: 'zaveen', year: 1998, brand: 'lumar', color: 'rrown'}
  ]
public headers = [
            {field: 'vin', header: 'Vin'},
            {field: 'year', header: 'Year'},
            {field: 'brand', header: 'Brand'},
            {field: 'color', header: 'Color'}
        ];
  constructor() { }

  ngOnInit() {

        
  }

}
