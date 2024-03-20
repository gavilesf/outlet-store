import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Product } from '@shared/models/product.interface';

export interface CartStore {
  products: Product[];
  totalAmount: number;
  productsCount: number;
}

const initialState: CartStore = {
  products: [],
  totalAmount: 0,
  productsCount: 0,
};

export const CartStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ products }) => ({
    productsCount: computed(() => calculateProductsCount(products())),
    totalAmount: computed(() => calculateTotalAmount(products())),
  })),
  withMethods(({ products, ...store }) => ({
    addToCart(product: Product) {
      const isProductInCart = products().find(
        (item: Product) => item.id === product.id
      );

      if (isProductInCart) {
        isProductInCart.qty++;
        isProductInCart.subTotal = isProductInCart.qty * isProductInCart.price;
        patchState(store, { products: [...products()] });
      } else {
        patchState(store, { products: [...products(), product] });
      }
    },
    removeFromCart(id: number) {
      const updatedProducts = products().filter((product) => product.id !== id);
      patchState(store, { products: updatedProducts });
    },
    clearCart() {
      patchState(store, initialState);
    },
  }))
);

function calculateTotalAmount(products: Product[]): number {
  return products.reduce(
    (acc, product) => acc + product.price * product.qty,
    0
  );
}
function calculateProductsCount(products: Product[]): number {
  return products.reduce((acc, product) => acc + product.qty, 0);
}
