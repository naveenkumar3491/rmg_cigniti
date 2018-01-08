import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { ConfirmationService } from 'primeng/primeng';
import { Ng2Storage } from "../../services/storage";
import { RmgAppComponent } from "../../rmg-app/rmg-app.component";
import { UtilsService } from '../../services/utils.service';

@Component({
    selector: 'app-topbar',
    template: `
        <div class="topbar clearfix">
            <div class="topbar-left">
                <div style="text-align: center;color: white;font-size: 40px;margin-top: 8px;">RMG</div>
            </div>
            <div class="topbar-right">
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
                                <a class="curosr-p" (click)="noResumePopup()">
                                    <i class="material-icons">power_settings_new</i>
                                    <span>Logout</span>
                                </a>
                            </li>
                        </ul>
                    </li>  
                </ul>
                <div class="last-login" *ngIf="lldate">
                        <span>Last Login :</span>
                        <strong>{{ lldate | date :'medium' }}</strong>
                    </div>
            </div>
        </div>
    `
})
export class AppTopbarComponent {
    public lldate = this.storage.getSession('user_data').last_login_date;
    private isResumeNotUploaded: any;
    constructor(public app: RmgAppComponent, private storage: Ng2Storage, private utilsService: UtilsService,
        private router: Router, private confirmationService: ConfirmationService) {
        this.utilsService.isResumeUploded.subscribe((isUploaded) => {
            this.isResumeNotUploaded = isUploaded;
        })
    }

    onLogout() {
        this.storage.clearAllSession();
        this.router.navigate(['./login'])
    }

    noResumePopup() {
        if (!this.isResumeNotUploaded) {
            this.confirmationService.confirm({
                message: `You haven't uploaded resume, Are you sure you want to logout?`,
                accept: () => {
                    this.onLogout();
                },
                reject: () => {
                    this.utilsService.highlightTab.next(1);
                }
            });
        }else{
            this.onLogout();
        }


    }

}
