import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ThemeToggleButtonComponent } from './components/theme-toggle-button/theme-toggle-button.component';

@NgModule({
  imports: [CommonModule, SharedModule, ReactiveFormsModule, BreadcrumbComponent, FooterComponent, NavbarComponent, SidenavComponent, ThemeToggleButtonComponent],
  exports: [
    NavbarComponent,
    FooterComponent,
    SidenavComponent,
    BreadcrumbComponent,
  ],
})
export class CoreModule {}
