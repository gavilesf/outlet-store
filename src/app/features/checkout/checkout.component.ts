import { CurrencyPipe, SlicePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CartStore } from '@shared/store/shopping-cart.store';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CurrencyPipe, SlicePipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export default class CheckoutComponent {
  cartStore = inject(CartStore);

  clearAll() {
    this.cartStore.clearCart();
  }
  removeItem(id: number) {
    this.cartStore.removeFromCart(id);
  }
  onProceedToPay() {}
}
