import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
declare var jQuery: any;
@Component({
  selector: 'val-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.css']
})

export class EmployeeViewComponent implements OnInit, AfterViewInit, OnDestroy {
  [name: string]: any;
  resetMenu: boolean;
  menuClick: boolean;
  layoutMenuScroller: HTMLDivElement;
  @ViewChild('layoutMenuScroller') layoutMenuScrollerViewChild: ElementRef;
  constructor() { }

  ngOnInit() {
  }
  ngOnDestroy() {
    jQuery(this.layoutMenuScroller).nanoScroller({ flash: true });
  }
  ngAfterViewInit() {
    this.layoutMenuScroller = <HTMLDivElement>this.layoutMenuScrollerViewChild.nativeElement;
    setTimeout(() => {
      jQuery(this.layoutMenuScroller).nanoScroller({ flash: true });
    }, 10);
  }
  onMenuClick($event) {
    this.menuClick = true;
    this.resetMenu = false;

    if (!this.isHorizontal()) {
      setTimeout(() => {
        jQuery(this.layoutMenuScroller).nanoScroller();
      }, 500);
    }
  }

}
