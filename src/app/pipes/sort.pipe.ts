import { Pipe, PipeTransform } from '@angular/core';
import { config } from 'rxjs';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {
  transform(items: Array<{}>, args?: any): any {
    let auxItems = items.sort(function(a, b){
      if (args.property) {
        var a_aux = a[args.property];
        var b_aux = b[args.property];
        if (args.subproperty) {
          if(a_aux[args.subproperty] < b_aux[args.subproperty]){
            return -1 * args.direction;
          }
          else if( a_aux[args.subproperty] > b_aux[args.subproperty]){
              return 1 * args.direction;
          }
          else{
              return 0;
          }
        }
        else {
          if(a[args.property] < b[args.property]){
            return -1 * args.direction;
          }
          else if( a[args.subproperty] > b[args.subproperty]){
              return 1 * args.direction;
          }
          else{
              return 0;
          }
        }

      }
      else return 0;
    });

    if (!args.porteros){
      return auxItems;
    }
    return auxItems.filter( item => {
      return item['posicion'].toLowerCase().includes('porter');
    });
  };
}
