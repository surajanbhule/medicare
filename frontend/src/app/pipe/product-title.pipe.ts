import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productTitle'
})
export class ProductTitlePipe implements PipeTransform {

  transform(value: string): string {
    if(value.length>=40){
     return value.substring(0, 35);
    }else{
      return value;
    }
     
  }

}
