import { Component, ElementRef, computed, effect, signal, viewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ARTWORKS } from '../../core/data/artworks';
import { Artwork } from '../../core/models/artwork';

@Component({
  selector: 'app-art',
  imports: [DatePipe],
  templateUrl: './art.component.html',
  styleUrl: './art.component.scss',
  host: {
    '(document:keydown)': 'onKeydown($event)',
  },
})
export class ArtComponent {
  readonly artworks: Artwork[] = ARTWORKS;
  /** Index into `artworks` of the open artwork, or null when the lightbox is closed. */
  readonly selectedIndex = signal<number | null>(null);
  readonly selected = computed(() => {
    const index = this.selectedIndex();
    return index === null ? null : this.artworks[index];
  });

  private readonly closeButton = viewChild<ElementRef<HTMLButtonElement>>('closeButton');

  constructor() {
    // Move focus into the dialog when it opens, so the keyboard starts there.
    effect(() => this.closeButton()?.nativeElement.focus());
  }

  open(index: number): void {
    this.selectedIndex.set(index);
  }

  close(): void {
    this.selectedIndex.set(null);
  }

  /** Moves through the gallery and wraps around at either end. */
  step(delta: number): void {
    const index = this.selectedIndex();
    if (index !== null) {
      const count = this.artworks.length;
      this.selectedIndex.set((index + delta + count) % count);
    }
  }

  onKeydown(event: KeyboardEvent): void {
    if (this.selectedIndex() === null) {
      return;
    }
    if (event.key === 'Escape') {
      this.close();
    } else if (event.key === 'ArrowLeft') {
      this.step(-1);
    } else if (event.key === 'ArrowRight') {
      this.step(1);
    }
  }
}
