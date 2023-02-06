import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterStatus'
})
export class FilterDatePipe implements PipeTransform {

  transform(permissionreq: any[], statusfilter: string) {
    if (!permissionreq) { return []; }
    if (statusfilter == "" || !statusfilter) { return permissionreq; }
    return permissionreq.filter((permissionreq)=>{
      return permissionreq.status === statusfilter
    })
  }

}
