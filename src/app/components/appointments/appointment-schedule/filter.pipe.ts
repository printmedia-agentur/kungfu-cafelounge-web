import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'filter' })
export class FilterPipe implements PipeTransform {
  transform(categories: any, searchText: any): any {
    const result = categories.filter(t => t.private === searchText);
    return result;
  }
}
