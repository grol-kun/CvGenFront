import { Pipe, PipeTransform } from '@angular/core';
import { get } from 'lodash';
import { Entity } from '../models/types/entity';

@Pipe({
  name: 'getField',
})
export class GetFieldPipe implements PipeTransform {
  transform(object: Entity, path = '') {
    return get(object, path);
  }
}
