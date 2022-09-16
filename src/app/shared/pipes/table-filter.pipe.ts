import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

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
        return data.filter((item) => {
          const date = new Date(item);
          return searchData[0] <= date && date <= searchData[1];
        });
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
      let value = _.cloneDeep(item);

      let result = arrayOfParams.reduce((previous, current) => previous[current], value);

      if (typeof searchData === 'string') {
        return result.toLowerCase().indexOf(searchData?.toLowerCase()) !== -1;
      }

      const date = new Date(result);
      return searchData[0] <= date && date <= searchData[1];
    });
  }
}
