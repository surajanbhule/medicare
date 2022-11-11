import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css'],
})
export class UpdateCategoryComponent implements OnInit {
  category = {
    category_name: '',
    category_description: '',
    popular: false,
  };

  cat_id = null;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private snack: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cat_id = this.route.snapshot.params['cat_id'];

    this.productService.getCategory(this.cat_id).subscribe(
      (data: any) => {
        this.category = data;
        console.log(this.category.popular);
      },
      (error) => {
        this.snack.open('Something Went Wrong', 'ok');
      }
    );
  }

  public updateCategory() {
    this.productService.updateCategory(this.category).subscribe(
      (data) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Category updated successfully!',
          showConfirmButton: true,
        });
        this.router.navigate(['/admin/view-categories']);
      },
      (error) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Unable To Update Category!',
          showConfirmButton: true,
        });
      }
    );
  }
}
