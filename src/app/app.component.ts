import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { BreadcrumbComponent } from './core/components/breadcrumb/breadcrumb.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { SidenavComponent } from './core/components/sidenav/sidenav.component';
import { SidenavService } from './core/services/sidenav/sidenav.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MessageModule, ToastModule, NavbarComponent, SidenavComponent, BreadcrumbComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.transparent]': 'this.transparent',
  },
})
export class AppComponent {
  transparent = false;

  private readonly sidenavService: SidenavService = inject(SidenavService);

  get getExpanded(): boolean {
    return this.sidenavService.getExpanded();
  }
  get getPinned(): boolean {
    return this.sidenavService.getPinned();
  }
}
