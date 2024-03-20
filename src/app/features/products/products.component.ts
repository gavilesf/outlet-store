import { Component, inject } from '@angular/core';
import { CardComponent } from './card/card.component';
import { ProductsService } from '@api/products.service';
import { Product } from '@shared/models/product.interface';
import { FormsModule } from '@angular/forms';
import { CartStore } from '@shared/store/shopping-cart.store';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CardComponent, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export default class ProductsComponent {
  private readonly productSvc = inject(ProductsService);
  products = this.productSvc.products;
  cartStore = inject(CartStore);

  onAddToCart(product: Product): void {
    this.cartStore.addToCart(product);
  }
}
