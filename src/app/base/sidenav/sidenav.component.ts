import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SidenavItem } from './sidenav.model';
import { SidenavService } from './sidenav.service';
import { SIDENAV_ITEMS } from './SIDENAV_ITEMS';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  @Input() public lang = 'en';
  @Output() public hovered: EventEmitter<boolean> = new EventEmitter();

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
