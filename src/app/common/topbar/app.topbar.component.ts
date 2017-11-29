import { Component } from '@angular/core';
import { RmgComponent } from "../../rmg/rmg.component";

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
            </div>
        </div>
    `
})
export class AppTopbarComponent {

    constructor(public app: RmgComponent) { }

}
