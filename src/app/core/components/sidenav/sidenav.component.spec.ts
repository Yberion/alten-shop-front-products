import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MockProvider } from 'ng-mocks';
import { getTranslocoTestingModule } from '../../features/transloco/utils/transloco-testing.utils';
import { SidenavService } from '../../services/sidenav/sidenav.service';
import { SidenavComponent } from './sidenav.component';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidenavComponent, getTranslocoTestingModule({ en: {} })],
      providers: [provideRouter([]), MockProvider(SidenavService)],
    }).compileComponents();

    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
