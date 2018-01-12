import { AbstractControl } from '@angular/forms';
import { Subject } from 'rxjs';
export class UtilsService {

    public isResumeUploded = new Subject();
    public highlightTab = new Subject();

    public getMatchedDomain(name, data) {
        const found = data.find(obj => obj.label === name);
        if (found) {
            return found.value;
        }
    }

    public validateWithRegex(name, regx) {
        return function (c: AbstractControl): { [key: string]: any } {
            let val = c.value;
            if (!val) {
                return null;
            }
            if (!val.match(regx)) {
                let obj = {};
                obj[name] = true;
                return obj;
            }
            return null;
        };
    }

    public convertToYearsMonths(value){
        const exp = value.toString().split('.');
        const yearExp = (parseInt(exp[0], 10) > 1) ? exp[0] + ' Years' : ((exp[0] === '0' || exp[0] === undefined) ? '' : exp[0] + ' Year');
        const monthExp = (parseInt(exp[1], 10) > 1) ? exp[1] + ' Months' : ((exp[1] === '0' || exp[1] === undefined) ? '' : exp[1] + ' Month');
        return `${yearExp} ${monthExp}`;
    }
}
