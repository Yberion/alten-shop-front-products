import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SidenavService } from '../../services/sidenav/sidenav.service';
import { SIDENAV_ITEMS } from './data/sidenav-items.data';
import { SidenavItem } from './models/sidenav-item.model';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent {
  @Input() public lang = 'en';
  @Output() public hovered: EventEmitter<boolean> = new EventEmitter<boolean>();

  public sidenavItems: SidenavItem[] = SIDENAV_ITEMS.filter(
    (item) => !item.hidden,
  );

  public Object = Object;

  constructor(
    public readonly sidenavService: SidenavService,
    private readonly router: Router,
  ) {}

  public onMouseover(hovering: boolean): void {
    this.sidenavService.setExpanded(hovering);
  }

  public onSidenavItemClick(item: SidenavItem, event: Event): void {
    event.preventDefault();
    if (
      this.sidenavService.getMobileDisplay() &&
      !this.sidenavService.getExpanded()
    ) {
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
