import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: any[]=[];

  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.productService.getCategories().subscribe(
      (data:any)=>{
        this.categories = data;
      }
    )
  }

  public deleteCategory(id:any){

    

  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  }).then((result) => {
    if (result.isConfirmed) {
      
this.productService.deleteCategory(id).subscribe(
  (data) => {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Category deleted successfully!',
      showConfirmButton: true,
    });
    location.reload();
  },
  (error) => {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Unable to delete category!',
      showConfirmButton: true,
    });
  }
);
      
    }
  });







    
  }

}
