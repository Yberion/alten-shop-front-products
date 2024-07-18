import { AsyncPipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { provideTranslocoScope, Translation, TranslocoModule } from '@jsverse/transloco';
import { SelectItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DataView, DataViewModule } from 'primeng/dataview';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { Tag, TagModule } from 'primeng/tag';
import { map, Observable } from 'rxjs';
import { scopeLoader } from '../../../core/features/transloco/utils/transloco.utils';
import { SnackbarService } from '../../../core/services/snackbar/snackbar.service';
import { Product } from '../../../shared/features/product/models/product.model';
import { Products } from '../../../shared/features/product/models/products.model';
import { ProductApiService } from '../../../shared/features/product/services/product.api.service';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [
    DataViewModule,
    TagModule,
    RatingModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    InputIconModule,
    IconFieldModule,
    NgClass,
    AsyncPipe,
    TranslocoModule,
  ],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    ProductApiService,
    provideTranslocoScope({
      scope: 'products',
      loader: scopeLoader((lang: string, root: string): Promise<Translation> => import(`./${root}/${lang}.json`)),
    }),
  ],
})
export class ProductsPageComponent implements OnInit {
  layout: DataView['_layout'];
  sortOptions: SelectItem[];
  sortField?: string;
  sortOrder?: number;
  filterBy: (keyof Product)[];
  products$!: Observable<Product[]>;

  private readonly productApiService: ProductApiService = inject(ProductApiService);
  private readonly snackbarService: SnackbarService = inject(SnackbarService);

  constructor() {
    this.layout = 'grid';
    this.filterBy = ['name', 'description', 'code', 'category'];
    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' },
    ];
  }

  ngOnInit(): void {
    this.products$ = this.productApiService.getProducts().pipe(map((products: Products) => products.data));
  }

  addToCart(_productId: number): void {
    this.snackbarService.displaySuccess();
  }

  onSortChange(event: DropdownChangeEvent): void {
    const value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  getSeverity(product: Product): Tag['severity'] {
    switch (product.inventoryStatus) {
      case 'INSTOCK':
        return 'success';

      case 'LOWSTOCK':
        return 'warning';

      case 'OUTOFSTOCK':
        return 'danger';

      default:
        return undefined;
    }
  }
}
