import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog , MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-product-images',
  templateUrl: './view-product-images.component.html',
  styleUrls: ['./view-product-images.component.css']
})
export class ViewProductImagesComponent implements OnInit {
 
  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
    
  }

}
