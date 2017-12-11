import { Component, Inject  } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Router } from "@angular/router";
import { Ng2Storage } from "../../services/storage";
import { RmgAppComponent } from "../../rmg-app/rmg-app.component";

@Component({
    selector: 'app-topbar',
    template: `
        <div class="topbar clearfix">
            <div class="topbar-left">
                <div style="text-align: center;color: white;font-size: 40px;margin-top: 8px;">RMG</div>
            </div>

            <div class="topbar-right">
            <a id="rightpanel-menu-button" href="#" (click)="app.onRightPanelButtonClick($event)">
                    <i class="material-icons">more_vert</i>
                </a>
                <a id="menu-button" href="#" (click)="app.onMenuButtonClick($event)">
                    <i></i>
                </a>
                <ul class="topbar-items animated fadeInDown" [ngClass]="{'topbar-items-visible': app.topbarMenuActive}">
                   
                    <li #settings [ngClass]="{'active-top-menu':app.activeTopbarItem === settings}">
                        <a class="curosr-p" (click)="app.onTopbarItemClick($event,settings)">
                            <i class="topbar-icon material-icons">settings</i>
                            <span class="topbar-item-name">Settings</span>
                        </a>
                        <ul class="ultima-menu animated fadeInDown">
                            <li role="menuitem">
                                <a class="curosr-p" (click)="onLogout()">
                                    <i class="material-icons">power_settings_new</i>
                                    <span>Logout</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    
                    
                </ul>
            </div>
        </div>
    `
})
export class AppTopbarComponent {

    constructor(public app: RmgAppComponent, private storage: Ng2Storage, 
    private router: Router, @Inject(DOCUMENT) private document) { }

    onLogout(){
        this.storage.clearAllSession();
        this.router.navigate(['./login'])
    }

    onThemeChange(){
        this.document.getElementById('cigniti-css').setAttribute('href', 'assets/theme/cigniti.css');
    }

}
