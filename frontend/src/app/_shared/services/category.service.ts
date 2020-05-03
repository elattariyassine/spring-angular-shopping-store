import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { map } from 'rxjs/operators';
import { Product } from '../models/product';

interface GetResponse {
  _embedded: {
    categories: Category[];
  }
}
interface GetResponseForProduct {
  _embedded: {
    products: Product[];
  }
}
interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = "http://localhost:8080/api/categories/";
  private baseUrl2 = "http://localhost:8080/api/products/";
  
  constructor(private http: HttpClient) { }

  findAll(): Observable<Category[]>{
    return this.http.get<GetResponse>(this.baseUrl)
            .pipe(
              map(category => category._embedded.categories)
            );
  }
  findProductByCategory(id: number){
    return this.http.get<GetResponseForProduct>(this.baseUrl + id + '/' + 'products')
    .pipe(
      map(product => product._embedded.products)
    );;
  }

  findProductByCategoryPaginate(page:number, pageSize:number, id: number){
    return this.http.get<GetResponseProducts>(`${this.baseUrl2}/search/findByCategoryId?id=${id}&page=${page}&size=${pageSize}`);
  }
}
