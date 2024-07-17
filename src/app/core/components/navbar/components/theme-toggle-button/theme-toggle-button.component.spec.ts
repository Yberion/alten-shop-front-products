import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { MockProvider } from 'ng-mocks';
import { ThemeService } from './services/theme.service';
import { ThemeToggleButtonComponent } from './theme-toggle-button.component';

describe('ThemeToggleButtonComponent', () => {
  let component: ThemeToggleButtonComponent;
  let fixture: ComponentFixture<ThemeToggleButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeToggleButtonComponent],
      providers: [MockProvider(ThemeService)]
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeToggleButtonComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});