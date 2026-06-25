import { Component } from '@angular/core';
import { Artwork } from '../../core/models/artwork';

@Component({
  selector: 'app-art',
  imports: [],
  templateUrl: './art.component.html',
  styleUrl: './art.component.scss',
})

export class ArtComponent {

  public artworks: Artwork[] = [
    {
      id: 1,
      title: "Apple",
      description: "",
      imageUrl: "/art/my_first_apple.png",
      createdAt: new Date('2026-06-25'),
      updatedAt: new Date('2026-06-25'),
      author: "BafflingBonk"
    },
    {
      id: 2,
      title: "Jug",
      description: "",
      imageUrl: "/art/first_jug.png",
      createdAt: new Date('2026-06-25'),
      updatedAt: new Date('2026-06-25'),
      author: "BafflingBonk"
    },
    {
      id: 3,
      title: "Dark Castle Background",
      description: "",
      imageUrl: "/art/dark_castle_background.png",
      createdAt: new Date('2026-06-25'),
      updatedAt: new Date('2026-06-25'),
      author: "BafflingBonk, WafflingWonk"
    },
    {
      id: 3,
      title: "Mansion",
      description: "",
      imageUrl: "/art/mansion.png",
      createdAt: new Date('2026-06-25'),
      updatedAt: new Date('2026-06-25'),
      author: "BafflingBonk, WafflingWonk"
    }
  ];
}
