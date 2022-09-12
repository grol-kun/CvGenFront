import { Pipe, PipeTransform } from '@angular/core';
import { Cv } from '../models/interfaces/cv';

@Pipe({
  name: 'cvModalFilter',
})
export class CvModalFilterPipe implements PipeTransform {
  transform(data: readonly Cv[], currentCvList: Cv[]) {
    if (!data.length || !currentCvList.length) {
      return data;
    }

    const idxs = currentCvList.map((item) => item.id);

    return data.filter((item) => !idxs.includes(item.id));
  }
}
