import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/_shared/models/cart-item';
import { CartService } from 'src/app/_shared/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems: CartItem[]= [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.listCartDetails();
  }
  listCartDetails() {
    this.cartItems = this.cartService.cartItems;
    this.cartService.totalPrice.subscribe(data => {
      this.totalPrice = data;
    });
    this.cartService.totalQuantity.subscribe(data => {
      this.totalQuantity = data;
    });
    this.cartService.computeCartTotals();
  }

  incrementQuantity(item){
    this.cartService.addToCart(item);
  }
  decrementQuantity(item){
    this.cartService.decrementQuantity(item);
  }
  removeItem(product){
    this.cartService.remove(product);
  }
}
