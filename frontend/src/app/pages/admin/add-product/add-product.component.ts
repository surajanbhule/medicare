import { Component, OnInit } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { FileHandle } from 'src/model/file-handle.model';
import { Product } from 'src/model/product.model';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  categories: any = [];
  numberOfImages=0;
  product:Product = {
    id:0,
    product_name: '',
    product_description: '',
    product_price: 0,
    product_discount: 0,
    product_stock: 0,
    product_selling_price: 0,
    productImages:[],
    category: {
      id: 0,
      category_name: '',
      category_description: '',
    },
  };
  constructor(
    private productService: ProductService,
    private snack: MatSnackBar,
    private router:Router,
    private sanitizer:DomSanitizer
  ) {}

  ngOnInit(): void {
    this.numberOfImages=0;
    this.productService.getCategories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (error) => {
        alert('unable to laod categories data');
        console.log(error);
      }
    );
  }

  addProduct() {
    
 this.product.product_selling_price =
   this.product.product_price -
   (this.product.product_price / 100) * this.product.product_discount;
    const productFormData= this.prepareFormData(this.product);

   
    this.productService.addProduct(productFormData).subscribe(
      (data) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Product added successfully!',
          showConfirmButton: true,
        });
        this.router.navigate(['/admin/view-products']);
      },
      (error) => {
        this.snack.open('Unable to add product', 'ok');
      }
    );
  }

  prepareFormData(product:Product):FormData{
    const formData= new FormData();
    formData.append(
      'product',
       new Blob([JSON.stringify(product)],{type:'application/json'})
    );

    for(let i=0;i<this.product.productImages.length;i++){
      formData.append(
        'imageFile',
        this.product.productImages[i].file,
        this.product.productImages[i].file.name
      )
    }

    return formData;
  }

 onFileSelected(event:any){

    this.numberOfImages++;

    console.log(event);
    if(event.target.files){
      const file = event.target.files[0];

      const fileHandle:FileHandle={
        file:file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      }

      if(this.numberOfImages<=4){
        this.product.productImages.push(fileHandle);
      }else{
        this.snack.open("You can add 4 images only.","OK",{
          horizontalPosition:'right',
          verticalPosition:'top'
        })
      }

      
    }
 }

 removeImage(i:any){
    this.product.productImages.splice(i,1)
 }
}
