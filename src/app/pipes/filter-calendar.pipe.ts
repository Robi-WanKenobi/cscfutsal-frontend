import { Pipe, PipeTransform } from '@angular/core';
import { CalendarioModel } from '../models/calendario.model';

@Pipe({
  name: 'filterCalendar'
})
export class FilterCalendarPipe implements PipeTransform {

  transform(items: any[], month: string): any[] {
    if(!items) return [];
    if(!month) return items;

    return items.filter( (it:CalendarioModel) => {

      let date = it.fecha;
      let dateArray = date.split('-');
      let calendarMonth = dateArray[1];

      if (calendarMonth.startsWith('0')){
        calendarMonth = calendarMonth.substr(1);
      }

      return calendarMonth === month;
    });
  }

}
