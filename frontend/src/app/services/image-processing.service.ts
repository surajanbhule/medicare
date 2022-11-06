import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from 'src/model/file-handle.model';
import { Product } from 'src/model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessingService {

  constructor(private sanitizer:DomSanitizer) { }

public createProductImages(product:any){
    const productImages:any[] = product.product_images;
    const productImagesToFileHandle:FileHandle[]= [];

    for(let i=0;i<productImages.length;i++){
      const imageData = productImages[i];
      const imageBlob =  this.dataURItoBLOB(imageData.imageByte,imageData.type);
      const file = new File([imageBlob],imageData.name,{type:imageData.type});

      const fileHandle : FileHandle={
        file:file,
        url:this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file))
      };

      productImagesToFileHandle.push(fileHandle);

    }

    product.productImages=productImagesToFileHandle;
    return product;
  }

  public dataURItoBLOB(picBytes:any,imageType:any){
    const byteString = window.atob(picBytes);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8array = new Int8Array(arrayBuffer);

    for(let i=0;i<byteString.length;i++){
      int8array[i]=byteString.charCodeAt(i);
    }

    const blob = new Blob([int8array],{type:imageType});
    return blob;
  }
}
