import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageProcessingService } from 'src/app/services/image-processing.service';
import { ProductService } from 'src/app/services/product.service';
import { FileHandle } from 'src/model/file-handle.model';
import { Product } from 'src/model/product.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
})
export class UpdateProductComponent implements OnInit {
  categories: any = [];
  numberOfImages = 0;
  product_id = null;
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
    private route: ActivatedRoute,
    private snack: MatSnackBar,
    private router: Router,
    private imageProcessing:ImageProcessingService,
    private sanitizer:DomSanitizer
  ) {}

  ngOnInit(): void {
    this.product_id = this.route.snapshot.params['product_id'];

    this.productService.getCategories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (error) => {
        this.snack.open('Unable to load product data', 'Ok');
      }
    );

    this.productService.getProduct(this.product_id).subscribe(
      (data: any) => {
        this.product = data;
        this.product = this.imageProcessing.createProductImages(this.product);
      },
      (error) => {
        this.snack.open('Unable to load categories data', 'Ok');
      }
    );
  }

  updateProduct() {
    this.product.product_selling_price =
      this.product.product_price -
      (this.product.product_price / 100) * this.product.product_discount;
    const productFormData = this.prepareFormData(this.product);
    this.productService.updateProduct(productFormData).subscribe(
      (data) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Product updated successfully!',
          showConfirmButton: true,
        });
        this.router.navigate(['/admin/view-products']);
      },
      (error) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Unable To Update Product!',
          showConfirmButton: true,
        });
      }
    );
  }

  removeImage(i: any) {
    this.product.productImages.splice(i, 1);
  }

  onFileSelected(event: any) {
    this.numberOfImages++;

    console.log(event);
    if (event.target.files) {
      const file = event.target.files[0];

      const fileHandle: FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        ),
      };

      console.log(this.product.productImages);

      if (this.numberOfImages <= 4) {
        this.product.productImages.push(fileHandle);
      } else {
        this.snack.open('You can add 4 images only.', 'OK', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      }
    }
  }

  prepareFormData(product: Product): FormData {
    const formData = new FormData();
    formData.append(
      'product',
      new Blob([JSON.stringify(product)], { type: 'application/json' })
    );

    for (let i = 0; i < this.product.productImages.length; i++) {
      formData.append(
        'imageFile',
        this.product.productImages[i].file,
        this.product.productImages[i].file.name
      );
    }

    return formData;
  }
}
