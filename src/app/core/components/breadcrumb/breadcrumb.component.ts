import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Event, EventType, NavigationEnd, Router } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { filter, map, startWith, tap } from 'rxjs';
import { SidenavService } from '../../services/sidenav/sidenav.service';
import { SIDENAV_ITEMS } from '../sidenav/data/sidenav-items.data';
import { SidenavItem } from '../sidenav/models/sidenav-item.model';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [BreadcrumbModule, TranslocoModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbComponent implements OnInit {
  public items: WritableSignal<MenuItem[]> = signal<MenuItem[]>([]);
  private readonly sidenavItems: SidenavItem[] = SIDENAV_ITEMS;
  private homeItem: MenuItem = { label: 'core.breadcrumb.pages.home', routerLink: '/' };

  private readonly sidenavService: SidenavService = inject(SidenavService);
  private readonly router: Router = inject(Router);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event: Event): event is NavigationEnd => event.type === EventType.NavigationEnd),
        map((event: NavigationEnd) => event.url),
        startWith(this.router.url),
        tap(() => this.items.set([this.homeItem])),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((url) => {
        this.buildBreadcrumb(url);
      });
  }

  private buildBreadcrumb(path: string): void {
    const firstPath: SidenavItem | undefined = this.sidenavItems.find((item) => '/' + item.id === path);
    if (!firstPath) {
      return;
    }

    this.items.update((currentItems: MenuItem[]) => {
      return [
        ...currentItems,
        {
          label: firstPath.label,
          routerLink: firstPath.link,
          command: (): void => this.sidenavService.setCurrentEntityName(''),
        },
      ];
    });
  }
}
