import { AbstractControl } from '@angular/forms';
export class UtilsService {

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
}
