import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MockComponent, MockModule, MockProvider } from 'ng-mocks';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { AppComponent } from './app.component';
import { BreadcrumbComponent } from './core/components/breadcrumb/breadcrumb.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { SidenavComponent } from './core/components/sidenav/sidenav.component';
import { SidenavService } from './core/services/sidenav/sidenav.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        MockModule(MessageModule),
        MockModule(ToastModule),
        MockComponent(NavbarComponent),
        MockComponent(SidenavComponent),
        MockComponent(BreadcrumbComponent),
      ],
      providers: [provideRouter([]), MockProvider(SidenavService)],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
