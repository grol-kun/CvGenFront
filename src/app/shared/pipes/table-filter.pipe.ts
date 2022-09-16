import { Pipe, PipeTransform } from '@angular/core';
import { SimpleObject } from '../models/interfaces/simple-object';

@Pipe({
  name: 'tableFilter',
})
export class TableFilterPipe implements PipeTransform {
  transform(data: readonly any[], searchData: string | Date[] = '', params = '') {
    if (Array.isArray(searchData)) {
      if (!data?.length || !searchData?.length) {
        return data;
      }

      if (params.indexOf('.') === -1) {
        return data.filter((item) => searchData[0] <= new Date(item) && new Date(item) <= searchData[1]);
      }

      return this.resolveDifficultParams(data, searchData, params);
    } else {
      if (!data?.length || searchData === '') {
        return data;
      }

      if (params.indexOf('.') === -1) {
        return data.filter((item) => item[params]?.toLowerCase().indexOf(searchData?.toLowerCase()) !== -1);
      }

      return this.resolveDifficultParams(data, searchData, params);
    }
  }

  private resolveDifficultParams(data: readonly any[], searchData: string | Date[], params: string) {
    let arrayOfParams = params.split('.');

    return data.filter((item) => {
      let value = this.deepClone(item);
      let result = arrayOfParams.reduce((previous, current) => previous[current], value);

      if (typeof searchData === 'string') {
        return result['toLowerCase']().indexOf(searchData?.toLowerCase()) !== -1;
      }
      if (typeof result === 'string') {
        return searchData[0] <= new Date(result) && new Date(result) <= searchData[1];
      }
      return item;
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
