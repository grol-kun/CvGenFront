import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(data: any[], searchText: string) {
    if (data.length === 0 || searchText === '') {
      return data;
    }

    return data.filter((item) => item.attributes.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
  }
}
