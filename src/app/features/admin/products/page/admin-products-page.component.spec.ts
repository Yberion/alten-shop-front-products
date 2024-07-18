import { provideHttpClientTesting } from '@angular/common/http/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { MockProvider } from 'ng-mocks';
import { ConfirmationService, MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { getTranslocoTestingModule } from '../../../../core/features/transloco/utils/transloco-testing.utils';
import { ProductApiService } from '../../../../shared/features/product/services/product.api.service';
import { AdminProductsPageComponent } from './admin-products-page.component';

describe('AdminProductsPageComponent', () => {
  let component: AdminProductsPageComponent;
  let fixture: ComponentFixture<AdminProductsPageComponent>;
  let productApiService: ProductApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminProductsPageComponent, getTranslocoTestingModule({ en: {} })],
      providers: [provideHttpClientTesting(), MessageService],
    })
      // https://medium.com/ngconf/how-to-override-component-providers-in-angular-unit-tests-b73b47b582e3
      .overrideComponent(AdminProductsPageComponent, {
        set: {
          providers: [MockProvider(ProductApiService), ConfirmationService],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(AdminProductsPageComponent);
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
