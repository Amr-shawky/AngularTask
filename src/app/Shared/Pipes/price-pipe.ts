import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceFormat'
})
export class PricePipe implements PipeTransform {

  transform(price: number, priceString?: string): string {
    if (price > 0) {
      return priceString || `$${price}`;
    }
    return 'Free';
  }

}
