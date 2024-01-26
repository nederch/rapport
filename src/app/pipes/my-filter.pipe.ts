import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myFilter'
})
export class MyFilterPipe implements PipeTransform {
  transform(objs:any,filter:any): any {
    if (filter===undefined) {
      return objs
    }
    return objs.filter((obj:any)=>{
      return obj.speciality.toLowerCase().includes(filter.toLowerCase())

    })
  }

}
