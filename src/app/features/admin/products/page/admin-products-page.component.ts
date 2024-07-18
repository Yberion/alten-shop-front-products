import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { provideTranslocoScope, Translation } from '@jsverse/transloco';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { Tag, TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { finalize, map } from 'rxjs';
import { scopeLoader } from '../../../../core/features/transloco/utils/transloco.utils';
import { Product } from '../../../../shared/features/product/models/product.model';
import { Products } from '../../../../shared/features/product/models/products.model';
import { ProductApiMockService } from '../../../../shared/features/product/services/product.api.mock.service';
import { ProductApiService } from '../../../../shared/features/product/services/product.api.service';

@Component({
  selector: 'app-admin-products-page',
  standalone: true,
  imports: [
    TableModule,
    DialogModule,
    RippleModule,
    ButtonModule,
    ToastModule,
    ToolbarModule,
    ConfirmDialogModule,
    InputTextModule,
    InputTextareaModule,
    CommonModule,
    FileUploadModule,
    DropdownModule,
    TagModule,
    RadioButtonModule,
    RatingModule,
    InputTextModule,
    FormsModule,
    InputNumberModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './admin-products-page.component.html',
  styleUrl: './admin-products-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: ProductApiService, useClass: ProductApiMockService },
    ConfirmationService,
    provideTranslocoScope({
      scope: 'adminProducts',
      loader: scopeLoader((lang: string, root: string): Promise<Translation> => import(`./${root}/${lang}.json`)),
    }),
  ],
})
export class AdminProductsPageComponent implements OnInit {
  productsSignal: WritableSignal<Product[]> = signal<Product[]>([]);

  product!: Product;

  selectedProducts: Product[] = [];

  submitted: WritableSignal<boolean> = signal<boolean>(false);
  productDialog: WritableSignal<boolean> = signal<boolean>(false);
  isLoadingSignal: WritableSignal<boolean> = signal<boolean>(true);

  private readonly productApiService: ProductApiService = inject(ProductApiService);
  private readonly messageService: MessageService = inject(MessageService);
  private readonly confirmationService: ConfirmationService = inject(ConfirmationService);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.productApiService
      .getProducts()
      .pipe(
        map((products: Products) => products.data),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((products: Product[]) => {
        this.productsSignal.set(products);
        this.isLoadingSignal.set(false);
      });
  }

  openNew(): void {
    this.product = {} as Product;
    this.submitted.set(false);
    this.productDialog.set(true);
  }

  deleteSelectedProducts(): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.isLoadingSignal.set(true);
        const selectedIds: number[] = this.selectedProducts.map((product: Product) => product.id);

        this.productApiService
          .deleteProducts(selectedIds)
          .pipe(
            finalize(() => this.isLoadingSignal.set(false)),
            takeUntilDestroyed(this.destroyRef),
          )
          .subscribe(() => {
            this.productsSignal.update((products: Product[]) => products.filter((val) => !selectedIds.includes(val.id)));
            this.selectedProducts = [];
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
          });
      },
    });
  }

  editProduct(product: Product): void {
    this.product = { ...product };
    this.productDialog.set(true);
  }

  deleteProduct(product: Product): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.isLoadingSignal.set(true);

        this.productApiService
          .deleteProduct(product.id)
          .pipe(
            finalize(() => this.isLoadingSignal.set(false)),
            takeUntilDestroyed(this.destroyRef),
          )
          .subscribe(() => {
            this.productsSignal.update((products: Product[]) => products.filter((val) => val.id !== product.id));
            this.product = {} as Product;
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
          });
      },
    });
  }

  hideDialog(): void {
    this.productDialog.set(false);
    this.submitted.set(false);
  }

  saveProduct(): void {
    this.submitted.set(true);

    if (!this.product.name?.trim() || !this.product.code?.trim()) {
      return;
    }

    this.isLoadingSignal.set(true);

    if (this.product.id) {
      this.productApiService
        .updateProduct(this.product)
        .pipe(
          finalize(() => {
            this.productsSignal.update((products: Product[]) => [...products]);
            this.productDialog.set(false);
            this.isLoadingSignal.set(false);
            this.product = {} as Product;
          }),
          takeUntilDestroyed(this.destroyRef),
        )
        .subscribe((product: Product) => {
          this.productsSignal()[this.findIndexById(this.product.id)] = product;
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
        });
    } else {
      this.productApiService
        .createProduct(this.product)
        .pipe(
          finalize(() => {
            this.productsSignal.update((products: Product[]) => [...products]);
            this.productDialog.set(false);
            this.isLoadingSignal.set(false);
            this.product = {} as Product;
          }),
          takeUntilDestroyed(this.destroyRef),
        )
        .subscribe((product: Product) => {
          this.product.image = 'product-placeholder.svg';
          this.productsSignal.update((products: Product[]) => [...products, product]);
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
        });
    }
  }

  findIndexById(id: number): number {
    let index = -1;

    for (let i = 0; i < this.productsSignal().length; i++) {
      if (this.productsSignal()[i]?.id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  getSeverity(status: string): Tag['severity'] {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
    }

    return undefined;
  }
}
