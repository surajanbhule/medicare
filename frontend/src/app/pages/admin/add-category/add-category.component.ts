import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnInit {
  category = {
    category_name: '',
    category_description: '',
    popular:false,
  };
  constructor(private productService: ProductService,
              private router:Router) {}

  ngOnInit(): void {}

  addCategory() {
    console.log(this.category)
    this.productService.addCategory(this.category).subscribe(
      (data) => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Category added successfully!',
        showConfirmButton: true,
      });
      this.router.navigate(['/admin/view-categories'])
    },
    (error)=>{
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Error !',
        });
    }
    );
  }
}
