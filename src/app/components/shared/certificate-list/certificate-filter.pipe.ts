import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'certfilter' })
export class CertificateFilterPipe implements PipeTransform {
  transform(items: Array<any>, id: string): Array<any> {
    return items.filter(item => item.id === id);
  }
}
