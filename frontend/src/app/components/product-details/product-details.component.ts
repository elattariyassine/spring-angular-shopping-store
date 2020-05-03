import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/_shared/services/product.service';
import { Product } from 'src/app/_shared/models/product';
import { CartService } from 'src/app/_shared/services/cart.service';
import { CartItem } from 'src/app/_shared/models/cart-item';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product = {
    id: null,
    active: null,
    created_at: null,
    description: null,
    imageUrl: null,
    name: null,
    sku: null,
    unitPrice: null,
    unitsInStock: null,
    updated_at: null
  };
  constructor(private route: ActivatedRoute, private productService: ProductService, private cartService: CartService) { }

  ngOnInit() {
    this.getProduct();
  }

  getProduct(){
    this.route.params.subscribe(res => {
      this.productService.getProductById(res['id'])
        .subscribe(product => {
          this.product = product;
        });
    });
  }

  addToCart(product){
    const TheCartItem = new CartItem(product);
    this.cartService.addToCart(TheCartItem);
  }
}
