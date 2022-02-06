import { Component, OnInit } from '@angular/core';
import { Artwork } from '../models/artwork';
import { ArtworkService } from '../services/artwork.service';

@Component({
  selector: 'app-artist-art',
  templateUrl: './artist-art.page.html',
  styleUrls: ['./artist-art.page.scss'],
})
export class ArtistArtPage implements OnInit {
  artworks: Artwork[] = [];
  constructor(private artService: ArtworkService) { }

  ngOnInit() {
    this.artService.getAll().subscribe(data => {
      this.artworks = data;
      console.log(data);
    });
  }

}
