import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortList'
})
export class SortListPipe implements PipeTransform {

  transform(value: any, propname:string): any {
    if(!value || value.length === 0) {
      return value;
    }

    return value.sort((a, b) => a[propname].localeCompare(b[propname]));
  }

}
