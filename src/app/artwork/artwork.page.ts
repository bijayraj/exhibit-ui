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

  threedurl = "https://sketchfab.com/3d-models/huaca-lora-fbde22869d3146ca9af61816421a6d0d"
  idTemp = 1;
  descTemp = "Item 1";

  constructor(private artworkService: ArtworkService,
    private route: ActivatedRoute,
    private location: Location,
    private photoViewer: PhotoViewer,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params.id;
      this.idTemp = id;
      this.artworkService.get(id).subscribe(data => {
        this.artwork = data;
        console.log(data);
      });
    });

    this.route.queryParams
      .subscribe(params => {
        console.log(params); // { orderby: "price" }
        this.descTemp = params.desc;
      }
      );


    this.imageList = [
      { url: 'https://myweb.fsu.edu/sshamp/Overview.jpg', title: 'Beach Houses' },
      { url: 'https://myweb.fsu.edu/sshamp/CouncilHouse.jpg', title: 'Butterfly' },
      { url: 'https://raw.githubusercontent.com/siuctexr/siuctexr.github.io/master/peru/assets/Formal%20Gold%20Headdress_PAS-Y.png', title: 'Gold mask' },
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

    this.photoViewer.show(url);

    // this.router.navigate(
    //   ['/photoviewer'],
    //   { queryParams: { url, title } }
    // );

    console.log(url);

  }



}
