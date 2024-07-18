import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { getTranslocoTestingModule } from '../../../core/features/transloco/utils/transloco-testing.utils';
import { SnackbarService } from '../../../core/services/snackbar/snackbar.service';
import { ProductApiService } from '../../../shared/features/product/services/product.api.service';
import { ProductsPageComponent } from './products-page.component';

describe('ProductsComponent', () => {
  let component: ProductsPageComponent;
  let fixture: ComponentFixture<ProductsPageComponent>;
  let productApiService: ProductApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsPageComponent, getTranslocoTestingModule({ en: {} })],
      providers: [MockProvider(SnackbarService)],
    })
      // https://medium.com/ngconf/how-to-override-component-providers-in-angular-unit-tests-b73b47b582e3
      .overrideComponent(ProductsPageComponent, {
        set: {
          providers: [MockProvider(ProductApiService)],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(ProductsPageComponent);
    component = fixture.componentInstance;

    productApiService = fixture.debugElement.injector.get(ProductApiService);

    INITIALIZE();
  });

  function INITIALIZE(): void {
    vi.spyOn(productApiService, 'getProducts').mockReturnValue(of());
  }

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
