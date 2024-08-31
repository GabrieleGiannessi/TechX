import { DatePipe } from '@angular/common';
import { inject, Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from 'firebase/firestore';

@Pipe({
  name: 'dateDisplay',
  standalone: true
})
export class DateDisplayPipe implements PipeTransform {

  datePipe = inject(DatePipe); 

  transform(value: Timestamp): string {
    return this.datePipe.transform(value.toMillis(), 'short') ?? '';
  }

}
