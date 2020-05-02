import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/_shared/services/category.service';
import { Category } from 'src/app/_shared/models/category';

@Component({
  selector: 'categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: Category[];
  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.getAllCategories();
  }
  getAllCategories(){
    this.categoryService.findAll().subscribe(res => {
      this.categories = res;
    });
  }
}
