import { Component, Input, OnInit, Signal, inject, input } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { Product } from '@shared/models/product.interface';
import { ProductsService } from '@api/products.service';
import { CurrencyPipe } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CartStore } from '@shared/store/shopping-cart.store';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CardComponent, CurrencyPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export default class DetailsComponent implements OnInit {
  rateArray: number[] = new Array(5).fill(0);
  product!: Signal<Product | undefined>;
  productId = input<number>(0, { alias: 'id' }); // New way with signals
  private readonly productsSvc = inject(ProductsService);
  private readonly _sanitizer = inject(DomSanitizer);
  cartStore = inject(CartStore);
  //@Input({ alias: 'id' }) productId!: number; // Old way

  ngOnInit(): void {
    this.product = this.productsSvc.getProductById(this.productId().toString());
  }

  onAddToCart(): void {
    let prod = this.product() as Product;
    prod.qty = 1;
    this.cartStore.addToCart(prod);
  }

  generateSVG(index: number): SafeHtml {
    let svgContent = null;

    const rate = this.product()?.rating.rate as number;

    if (index + 1 <= Math.floor(rate)) {
      svgContent = `<svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
              stroke-width="2" class="w-4 h-4 text-orange-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z">
              </path>
            </svg>`;
    } else if (index < rate) {
      svgContent = `<svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-orange-500" viewBox="0 0 24 24">
          <defs>
            <linearGradient id="partialFillGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="50%" style="stop-color:currentColor; stop-opacity:1" />
              <stop offset="50%" style="stop-color:currentColor; stop-opacity:0" />
            </linearGradient>
          </defs>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="url(#partialFillGradient)"></path>
        </svg>`;
    } else {
      svgContent = `<svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              class="w-4 h-4 text-orange-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z">
              </path>
            </svg>`;
    }
    return this._sanitizer.bypassSecurityTrustHtml(svgContent);
  }
}
