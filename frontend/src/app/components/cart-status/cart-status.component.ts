import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/_shared/services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {

  totalPrice: number = 0.00;
  totalQuantity: number = 0;
  
  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.updateCartStatus();
  }
  updateCartStatus() {
    this.cartService.totalPrice.subscribe(updatedPrice => {
      this.totalPrice = updatedPrice;
    });
    this.cartService.totalQuantity.subscribe(qte => {
      this.totalQuantity = qte;
    });
  }

}
