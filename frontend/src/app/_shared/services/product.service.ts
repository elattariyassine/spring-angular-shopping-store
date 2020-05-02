import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface GetResponse {
  _embedded: {
    products: Product[];
  }
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = "http://localhost:8080/api/products/";
  
  constructor(private http: HttpClient) { }

  findAll(): Observable<Product[]>{
    return this.http.get<GetResponse>(this.baseUrl)
            .pipe(
              map(product => product._embedded.products)
            );
  }

  findProductsByNameContaining(keyword: string): Observable<Product[]>{
    return this.http.get<GetResponse>(this.baseUrl + "search/findByNameContaining?name=" + keyword)
    .pipe(
      map(product => product._embedded.products)
    );
  }

  getProductById(id: number){
    return this.http.get<Product>(this.baseUrl + id);
  }
}
