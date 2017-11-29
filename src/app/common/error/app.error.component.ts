import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-error',
    template: `<div *ngIf="displayError" >
                  <span class="sr-only">(error)</span>
                  <div class="error-msg"> 
                  {{errorMsg}}
                  </div>
              </div>`,
    styles: [`
        .error-msg {
          color: #880300;
        }
    `]
})
export class ErrorComponent {
    @Input() errorMsg: string;
    @Input() displayError: boolean;
    constructor() { }

}
