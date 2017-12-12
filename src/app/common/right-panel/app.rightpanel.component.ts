import { Component, OnDestroy, ViewChild, ElementRef, AfterViewInit, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { RmgAppComponent } from "../../rmg-app/rmg-app.component";
import { Ng2Storage } from "../../services/storage";
declare var jQuery: any;
@Component({
    selector: 'app-rightpanel',
    template: `
       <div class="layout-rightpanel" [ngClass]="{'layout-rightpanel-active': app.rightPanelActive}" (click)="app.onRightPanelClick()">
            <div #rightPanelMenuScroller class="nano">
                <div class="nano-content right-panel-scroll-content">
                    <div class="themeRightPanelHead">
                        <i class="material-icons ng-tns-c2-0">palette</i>
                        <span>Change Theme</span>
                    </div>
                    <div class="layout-rightpanel-content">
                        <ul class="weekly-weather">
                            <li class="layout-rightpanel-li" (click)="onThemeChange('dark-blue')" [ngClass]="{ 'active': rightPaneSeleTheme == 'dark-blue' }">
                                <div style="border: 1px solid black;background-color: #3E464C;display: inline-block;width: 15px;height: 15px;"></div>
                                <div style="border: 1px solid black;background-color: #5180ce;display: inline-block;width: 15px;height: 15px;"></div>
                                <span><a>Dark - Blue</a></span>        
                            </li>
                            <li class="layout-rightpanel-li" (click)="onThemeChange('cigniti')" [ngClass]="{ 'active': rightPaneSeleTheme == 'cigniti' }">
                                <div style=" border: 1px solid black;background-color: #225582;display: inline-block;width: 15px;height: 15px;"></div>
                                <div style="border: 1px solid black;background-color: #337ab7;display: inline-block;width: 15px;height: 15px;"></div>
                                <span><a>Cigniti - Blue</a></span>  
                            </li>
                             <li class="layout-rightpanel-li" (click)="onThemeChange('blue-grey')" [ngClass]="{ 'active': rightPaneSeleTheme == 'blue-grey' }">
                                <div style=" border: 1px solid black;background-color: #607D8B;display: inline-block;width: 15px;height: 15px;"></div>
                                <div style="border: 1px solid black;background-color: #8BC34A;display: inline-block;width: 15px;height: 15px;"></div>
                                <span><a>Blue grey - Green</a></span>  
                            </li>
                            <li class="layout-rightpanel-li" (click)="onThemeChange('grey')" [ngClass]="{ 'active': rightPaneSeleTheme == 'grey' }">
                                <div style=" border: 1px solid black;background-color: #757575;display: inline-block;width: 15px;height: 15px;"></div>
                                <div style="border: 1px solid black;background-color: #FF5722;display: inline-block;width: 15px;height: 15px;"></div>
                                <span><a>Grey - Deep Orange</a></span>  
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    `
})
export class AppRightpanelComponent implements OnDestroy, AfterViewInit, OnInit {
        public themeName: any;

     public rightPaneSeleTheme:any;
    rightPanelMenuScroller: HTMLDivElement;

    @ViewChild('rightPanelMenuScroller') rightPanelMenuScrollerViewChild: ElementRef;

    constructor(public app: RmgAppComponent,@Inject(DOCUMENT) private document,private storage: Ng2Storage) {}

    ngAfterViewInit() {
        this.rightPanelMenuScroller = <HTMLDivElement> this.rightPanelMenuScrollerViewChild.nativeElement;

        setTimeout(() => {
            jQuery(this.rightPanelMenuScroller).nanoScroller({flash: true});
        }, 10);
    }
     ngOnInit() {
        let userData = this.storage.getSession('user_data');
        
        this.onThemeChange(userData.themeCol);
        this.rightPaneSeleTheme=userData.themeCol;
     }

    ngOnDestroy() {
        jQuery(this.rightPanelMenuScroller).nanoScroller({flash: true});
    }
    onThemeChange(themeName: string){
            this.rightPaneSeleTheme=themeName;
           this.document.getElementById('theme-css').setAttribute('href', `assets/theme/theme-${themeName}.css`);
            this.document.getElementById('layout-css').setAttribute('href', `assets/layout/css/layout-${themeName}.css`);
       
    }
}
