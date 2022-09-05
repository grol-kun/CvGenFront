import { Pipe, PipeTransform } from '@angular/core';
import { SimpleObject } from '../models/interfaces/simple-object';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(data: readonly any[], searchText: string, params: string) {
    if (!data?.length || searchText === '') {
      return data;
    }

    if (params.indexOf('.') === -1) {
      return data.filter((item) => item[params as string].toLowerCase().indexOf(searchText?.toLowerCase()) !== -1);
    }

    return this.resolveDifficultParams(data, searchText, params);
  }

  private resolveDifficultParams(data: readonly any[], searchText: string, params: string) {
    let arrayOfParams = params.split('.');

    return data.filter((item) => {
      let value = this.deepClone(item);
      let result = arrayOfParams.reduce((previous, current) => previous[current], value);
      return result['toLowerCase']().indexOf(searchText?.toLowerCase()) !== -1;
    });
  }

  private deepClone(obj: SimpleObject) {
    const clObj: SimpleObject = new Object();
    for (let i in obj) {
      if (obj[i] instanceof Object) {
        clObj[i] = this.deepClone(obj[i]);
        continue;
      }
      clObj[i] = obj[i];
    }
    return clObj;
  }
}
