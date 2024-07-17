import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { SidenavService } from './base/sidenav/sidenav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  @HostBinding('class.transparent') transparent = false;

  constructor(private readonly sidenavService: SidenavService) {}

  get getExpanded(): boolean {
    return this.sidenavService.getExpanded();
  }
  get getPinned(): boolean {
    return this.sidenavService.getPinned();
  }
}
