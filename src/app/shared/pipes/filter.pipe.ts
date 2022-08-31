import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(data: any[], searchText: string, params: string[] | string) {
    if (data.length === 0 || searchText === '') {
      return data;
    }

    if (typeof params === 'string') {
      return data.filter((item) => item[params as string].toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
    }

    for (let i = 0; i < params.length; i++) {}

    return data.filter((item) => {
      for (let i = 0; i < params.length; i++) {
        item = item[params[i]];
      }
      return item.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
    });
  }
}
