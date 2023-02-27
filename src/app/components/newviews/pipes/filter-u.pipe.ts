import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterU'
})
export class FilterUPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 2) return value;
    const resultUsers = [];
    for (const user of value) {
      if (user.username.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultUsers.push(user);
      };
    };
    return resultUsers;
  }

}
