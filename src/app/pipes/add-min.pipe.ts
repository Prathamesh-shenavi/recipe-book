import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addMin',
  standalone: true
})
export class AddMinPipe implements PipeTransform {

  transform(value: number): string {
    return `${value} minutes`
  }

}
