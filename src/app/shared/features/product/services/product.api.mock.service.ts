import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { product1 } from '../models/product.mock';
import { Product } from '../models/product.model';
import { ProductApiService } from './product.api.service';

@Injectable()
export class ProductApiMockService extends ProductApiService {
  // `delay` to simulate long request

  override getProduct(_id: number): Observable<Product> {
    return of(product1).pipe(delay(500));
  }

  override createProduct(product: Product): Observable<Product> {
    return of(product).pipe(delay(500));
  }

  override updateProduct(product: Product): Observable<Product> {
    return of(product).pipe(delay(500));
  }

  override deleteProduct(_id: number): Observable<void> {
    return of(void 0).pipe(delay(500));
  }
}
