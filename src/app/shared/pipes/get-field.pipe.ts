import { Pipe, PipeTransform } from '@angular/core';
import { get } from 'lodash';

@Pipe({
  name: 'getField',
})
export class GetFieldPipe implements PipeTransform {
  transform(object: any, path = '') {
    return get(object, path);
  }
}
