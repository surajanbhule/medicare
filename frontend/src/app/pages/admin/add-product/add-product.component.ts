import { Component, OnInit } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  categories: any = [];
  product = {
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
  constructor(
    private productService: ProductService,
    private snack: MatSnackBar,
    private router:Router
  ) {}

  ngOnInit(): void {
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
    this.productService.addProduct(this.product).subscribe(
      (data) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Category added successfully!',
          showConfirmButton: true,
        });
        this.router.navigate(['/admin/view-products']);
      },
      (error) => {
        this.snack.open('Unable to add product', 'ok');
      }
    );
  }

  valueChange(){
    
    alert(this.product.category.id);
  }
}
