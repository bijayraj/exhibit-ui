import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Artwork } from '../models/artwork';
import { ArtworkService } from '../services/artwork.service';
import { Location } from '@angular/common';

import { PhotoViewer } from '@awesome-cordova-plugins/photo-viewer/ngx';

@Component({
  selector: 'app-artwork',
  templateUrl: './artwork.page.html',
  styleUrls: ['./artwork.page.scss'],
})
export class ArtworkPage implements OnInit {

  artwork?: Artwork;
  imageList: any[] = [];

  constructor(private artworkService: ArtworkService,
    private route: ActivatedRoute,
    private location: Location,
    private photoViewer: PhotoViewer,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params.id;
      this.artworkService.get(id).subscribe(data => {
        this.artwork = data;
        console.log(data);
      });
    });


    this.imageList = [
      { url: 'https://i.ibb.co/wBYDxLq/beach.jpg', title: 'Beach Houses' },
      { url: 'https://i.ibb.co/gM5NNJX/butterfly.jpg', title: 'Butterfly' },
      { url: 'https://i.ibb.co/10fFGkZ/car-race.jpg', title: 'Car Racing' },
      { url: 'https://i.ibb.co/ygqHsHV/coffee-milk.jpg', title: 'Coffee with Milk' },
      { url: 'https://i.ibb.co/7XqwsLw/fox.jpg', title: 'Fox' },
      { url: 'https://i.ibb.co/L1m1NxP/girl.jpg', title: 'Mountain Girl' },
      { url: 'https://i.ibb.co/wc9rSgw/desserts.jpg', title: 'Desserts Table' },
      { url: 'https://i.picsum.photos/id/1009/5000/7502.jpg?hmac=Uj6crVILzsKbyZreBjHuMiaq_-n30qoHjqP0i7r30r8', title: 'Surfer' },
      { url: 'https://i.picsum.photos/id/1011/5472/3648.jpg?hmac=Koo9845x2akkVzVFX3xxAc9BCkeGYA9VRVfLE4f0Zzk', title: 'On a Lac' },
      { url: 'https://i.ibb.co/wdrdpKC/kitten.jpg', title: 'Kitten' },
      { url: 'https://i.ibb.co/dBCHzXQ/paris.jpg', title: 'Paris Eiffel' },
      { url: 'https://i.ibb.co/JKB0KPk/pizza.jpg', title: 'Pizza Time' },
      { url: 'https://i.ibb.co/VYYPZGk/salmon.jpg', title: 'Salmon ' },
    ];

  }

  showPhoto(url: string, title: string) {

    this.photoViewer.show('https://i.ibb.co/wBYDxLq/beach.jpg');

    // this.router.navigate(
    //   ['/photoviewer'],
    //   { queryParams: { url, title } }
    // );

    console.log(url);

  }



}
