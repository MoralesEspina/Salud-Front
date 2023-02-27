import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterB'
})
export class FilterBPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 2) return value;
    const resultUsers = [];
    for (const user of value) {
      if (user.fullname.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultUsers.push(user);
      };
    };
    return resultUsers;
  }

}

