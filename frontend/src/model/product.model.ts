import { Category } from "./category.model";
import { FileHandle } from "./file-handle.model";

export interface Product {
  id:0;
  product_name: string;
  product_description: string;
  product_price: number;
  product_discount: number;
  product_stock: number;
  product_selling_price: number;
  productImages:FileHandle[];
  category:Category;
}