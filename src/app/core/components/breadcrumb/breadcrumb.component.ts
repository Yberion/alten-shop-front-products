import { ChangeDetectionStrategy, Component, DestroyRef, inject, input, InputSignal, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Event, EventType, NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { filter, map, startWith, tap } from 'rxjs';
import { SidenavService } from '../../services/sidenav/sidenav.service';
import { SIDENAV_ITEMS } from '../sidenav/data/sidenav-items.data';
import { SidenavItem } from '../sidenav/models/sidenav-item.model';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [BreadcrumbModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbComponent implements OnInit {
  lang: InputSignal<string> = input<string>('en');
  public items: MenuItem[] = [];
  private readonly sidenavItems: SidenavItem[] = SIDENAV_ITEMS;
  private homeItem: MenuItem = { label: 'Home', routerLink: '/' };

  private readonly sidenavService: SidenavService = inject(SidenavService);
  private readonly router: Router = inject(Router);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event: Event): event is NavigationEnd => event.type === EventType.NavigationEnd),
        map((event: NavigationEnd) => event.url),
        startWith(this.router.url),
        tap(() => (this.items = [this.homeItem])),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((url) => {
        this.buildBreadcrumb(url);
      });
  }

  private buildBreadcrumb(path: string): void {
    const firstPath: SidenavItem | undefined = this.sidenavItems.find((item) => '/' + item.id === path);
    if (firstPath) {
      this.items.push({
        label: firstPath.labels[this.lang()],
        routerLink: firstPath.link,
        command: () => this.sidenavService.setCurrentEntityName(''),
      });
    }
  }
}
