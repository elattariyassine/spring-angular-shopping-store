import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/_shared/services/product.service';
import { Product } from 'src/app/_shared/models/product';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/_shared/services/category.service';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  categoryId: number = null;
  keyword: string = null;
  constructor(private productService: ProductService, private route: ActivatedRoute, private categoryService: CategoryService) { }

  ngOnInit() {
    this.route.params.subscribe(res => {
      this.categoryId = res['id'];
      this.keyword = res['keyword'];
      console.log(res['keyword']);
      this.getAllProducts();
    });
  }

  getAllProducts(){
    if(this.categoryId == null && this.keyword == null){
      this.productService.findAll().subscribe(res => {
        this.products = res;
      });
    }
    else if (this.categoryId != null && this.keyword == null){
      this.categoryService.findProductByCategory(this.categoryId).subscribe(res => {
        this.products = res;
        console.log(res);
      });
      this.categoryId = null;
    }
    if(this.keyword != null){
      this.productService.findProductsByNameContaining(this.keyword)
      .subscribe(res => {
        console.log(res);
        this.products = res;
      });
      this.keyword = null;
    }
  }
}
