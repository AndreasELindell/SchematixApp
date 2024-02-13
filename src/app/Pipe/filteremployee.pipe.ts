import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from 'src/Models/Employee';

@Pipe({
  name: 'filteremployee'
})
export class FilterEmployeePipe implements PipeTransform {
  transform(items: Employee[], searchText: string): any[] {
    if (!items || !searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();
    return items.filter(item => {
      return item.userName.toLowerCase().includes(searchText);
    });
  }
}
