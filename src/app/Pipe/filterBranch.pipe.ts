import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBranch'
})
export class filterBranchPipe implements PipeTransform {
  transform(array: any[], idToRemove: string | undefined): any[] {
    return array.filter(item => item.id !== idToRemove);
  }
}
