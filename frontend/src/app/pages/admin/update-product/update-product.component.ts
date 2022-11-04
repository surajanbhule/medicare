import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
})
export class UpdateProductComponent implements OnInit {
  product_id=null;
  product = {
    id:null,
    product_name: '',
    product_description: '',
    product_price: 0,
    product_discount: 0,
    product_stock: 0,
    product_selling_price: 0,
    category: {
      id: null,
      category_name: '',
      category_description: '',
    },
  };

  categories:any=[]

  constructor(private productService:ProductService,
              private route:ActivatedRoute,
              private snack:MatSnackBar,
              private router:Router) {}

  ngOnInit(): void {
    this.product_id=this.route.snapshot.params['product_id'];

    this.productService.getCategories().subscribe(
      (data:any)=>{
        this.categories=data;
      },
      (error)=>{
        this.snack.open('Unable to load product data','Ok')
      }
    );

    this.productService.getProduct(this.product_id).subscribe(
      (data:any)=>{
        this.product=data;
      },
      (error)=>{
        this.snack.open('Unable to load categories data', 'Ok');
      }
    )
  }

  updateProduct() {
    this.productService.updateProduct(this.product).subscribe(
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
}
