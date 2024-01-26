import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchMember'
})
export class SearchMemberPipe implements PipeTransform {
  transform(objs:any,term:any): any {
    if (term===undefined) {
      return objs
    }
    return objs.filter((obj:any)=>{
      return obj.firstName.toLowerCase().includes(term.toLowerCase()) || 
      obj.tel.toLowerCase().includes(term.toLowerCase())||obj.lastName.toLowerCase().includes(term.toLowerCase())

    })
  }

}
