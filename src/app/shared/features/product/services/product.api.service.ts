import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { Products } from '../models/products.model';

@Injectable()
export class ProductApiService {
  private readonly httpClient: HttpClient = inject(HttpClient);

  getProducts(): Observable<Products> {
    return this.httpClient.get<Products>('/products.json');
  }

  getProduct(id: number): Observable<Product> {
    const httpParams: HttpParams = new HttpParams().set('id', id);

    return this.httpClient.get<Product>('', { params: httpParams });
  }

  createProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>('', product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.httpClient.patch<Product>('', product);
  }

  deleteProduct(id: number): Observable<void> {
    const httpParams: HttpParams = new HttpParams().set('id', id);

    return this.httpClient.delete<void>('', { params: httpParams });
  }
}
