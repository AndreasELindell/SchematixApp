import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtertype'
})
export class FilterShiftTypePipe implements PipeTransform {
  transform(items: string[], searchText: string): any[] {
    if (!items || !searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();
    return items.filter(item => {
      return item.toLowerCase().includes(searchText);
    });
  }
}
