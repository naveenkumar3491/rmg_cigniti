import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({ selector: '[onlyAlphabets]' })
export class OnlyAlphabets {
    
    constructor(private el: ElementRef) { }

    @HostListener('keypress', ['$event']) keyPress(event) {
        const pattern = /^[a-zA-Z]*$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
}