import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  products:any=[]
  
  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (data:any)=>{
        this.products=data;
      },
      (error)=>{
        alert('unable to load products')
      }
    )
  }

  deleteProduct(id:any){

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
        this.productService.deleteProduct(id).subscribe(
          (data) => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Product deleted successfully!',
              showConfirmButton: true,
            });
            location.reload();
          },
          (error) => {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Unable to delete product!',
              showConfirmButton: true,
            });
          }
        );
      }
    });



  }

}
