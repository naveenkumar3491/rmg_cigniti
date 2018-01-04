import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe extends DatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
      if(value && (typeof value) === 'object'){
        return super.transform(value, args);
      }else{
        return value;
      }
  }
}