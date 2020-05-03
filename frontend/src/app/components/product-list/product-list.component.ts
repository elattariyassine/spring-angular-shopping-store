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
  previousCategoryId: number;
  keyword: string = null;

  pageNumber: number = 1;
  pageSize: number = 10;
  totalElements: number = 0;

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
    if(this.previousCategoryId != this.categoryId){
      this.pageNumber = 1;
    }
    this.previousCategoryId = this.categoryId;
    console.log('current category id' + this.categoryId + ' pageNumber '+this.pageNumber);

    if(this.categoryId == null && this.keyword == null){
      this.productService.findAll().subscribe(res => {
        this.products = res;
      });
    }
    else if (this.categoryId != null && this.keyword == null){
      // this.categoryService.findProductByCategory(this.categoryId).subscribe(res => {
      //   this.products = res;
      //   console.log(res);
      // });
      // this.categoryId = null;
      this.categoryService.findProductByCategoryPaginate(this.pageNumber - 1, this.pageSize, this.categoryId).subscribe(data => {
        this.products = data._embedded.products;
        this.pageNumber = data.page.number + 1;
        this.pageSize = data.page.size;
        this.totalElements = data.page.totalElements;
      });
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
