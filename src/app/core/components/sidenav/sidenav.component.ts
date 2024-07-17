import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SidenavService } from '../../services/sidenav/sidenav.service';
import { SIDENAV_ITEMS } from './data/sidenav-items.data';
import { SidenavItem } from './models/sidenav-item.model';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgOptimizedImage],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent {
  lang: InputSignal<string> = input<string>('en');
  hovered: OutputEmitterRef<boolean> = output<boolean>();

  public sidenavItems: SidenavItem[] = SIDENAV_ITEMS.filter((item) => !item.hidden);

  public Object = Object;

  public readonly sidenavService: SidenavService = inject(SidenavService);
  private readonly router: Router = inject(Router);

  public onMouseover(hovering: boolean): void {
    this.sidenavService.setExpanded(hovering);
  }

  public onSidenavItemClick(item: SidenavItem, event: Event): void {
    event.preventDefault();
    if (this.sidenavService.getMobileDisplay() && !this.sidenavService.getExpanded()) {
      this.sidenavService.setExpanded(true);
    } else {
      this.navigate(item);
      this.sidenavService.setCurrentEntityName('');
    }
  }

  private navigate(item: SidenavItem): void {
    this.router.navigate([item.link]);
  }
}
