import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HeaderComponent, NAV_LINKS } from './header.component';
import { ThemeService } from '../services/theme.service';

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    element = fixture.nativeElement;
    await fixture.whenStable();
  });

  it('links to every page', () => {
    const labels = Array.from(element.querySelectorAll('.nav a')).map((a) => a.textContent?.trim());
    expect(labels).toEqual(NAV_LINKS.map((link) => link.label));
  });

  it('switches the theme from the menu', async () => {
    element.querySelector<HTMLButtonElement>('.theme-picker > button')!.click();
    await fixture.whenStable();

    const lightButton = Array.from(
      element.querySelectorAll<HTMLButtonElement>('.theme-menu button'),
    ).find((button) => button.textContent?.includes('Light'))!;
    lightButton.click();
    await fixture.whenStable();

    expect(TestBed.inject(ThemeService).theme()).toBe('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(element.querySelector('.theme-menu')).toBeNull();
  });
});
