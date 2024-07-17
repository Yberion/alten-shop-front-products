import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ThemeToggleButtonComponent } from './theme-toggle-button/theme-toggle-button.component';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    SidenavComponent,
    ThemeToggleButtonComponent,
    BreadcrumbComponent,
  ],
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  exports: [
    NavbarComponent,
    FooterComponent,
    SidenavComponent,
    BreadcrumbComponent,
  ],
})
export class BaseModule {}
