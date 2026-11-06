import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArtComponent } from './art.component';
import { ARTWORKS } from '../../core/data/artworks';

describe('ArtComponent', () => {
  let fixture: ComponentFixture<ArtComponent>;
  let element: HTMLElement;

  function press(key: string): void {
    document.dispatchEvent(new KeyboardEvent('keydown', { key }));
    fixture.detectChanges();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ArtComponent] }).compileComponents();
    fixture = TestBed.createComponent(ArtComponent);
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('shows every artwork', () => {
    expect(element.querySelectorAll('.gallery .artwork').length).toBe(ARTWORKS.length);
  });

  it('gives every artwork a unique id', () => {
    const ids = new Set(ARTWORKS.map((artwork) => artwork.id));
    expect(ids.size).toBe(ARTWORKS.length);
  });

  it('opens the lightbox, steps with the arrow keys and closes with Escape', () => {
    element.querySelector<HTMLButtonElement>('.gallery .artwork')!.click();
    fixture.detectChanges();
    expect(element.querySelector('.lightbox strong')?.textContent).toBe(ARTWORKS[0].title);

    press('ArrowRight');
    expect(element.querySelector('.lightbox strong')?.textContent).toBe(ARTWORKS[1].title);

    press('ArrowLeft');
    press('ArrowLeft');
    expect(element.querySelector('.lightbox strong')?.textContent).toBe(
      ARTWORKS[ARTWORKS.length - 1].title,
    );

    press('Escape');
    expect(element.querySelector('.lightbox')).toBeNull();
  });
});
