import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Input,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { filter, map, startWith, tap } from 'rxjs';
import { SidenavItem } from '../sidenav/sidenav.model';
import { SidenavService } from '../sidenav/sidenav.service';
import { SIDENAV_ITEMS } from '../sidenav/SIDENAV_ITEMS';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbComponent implements OnInit {
  @Input() public lang = 'en';
  public items: MenuItem[] = [];
  private readonly sidenavItems: SidenavItem[] = SIDENAV_ITEMS;
  private homeItem: MenuItem = { label: 'Home', routerLink: '/' };

  constructor(
    private readonly sidenavService: SidenavService,
    private readonly router: Router,
    private readonly destroyRef: DestroyRef,
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
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
    const firstPath: SidenavItem | undefined = this.sidenavItems.find(
      (item) => '/' + item.id === path,
    );
    if (firstPath) {
      this.items.push({
        label: firstPath.labels[this.lang],
        routerLink: firstPath.link,
        command: () => this.sidenavService.setCurrentEntityName(''),
      });
    }
  }
}
