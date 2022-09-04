import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Artwork } from '../models/artwork';
import { ArtworkService } from '../services/artwork.service';
import { Location } from '@angular/common';

import { PhotoViewer } from '@awesome-cordova-plugins/photo-viewer/ngx';
import { ArtworkAsset } from '../models/artworkAsset';

@Component({
  selector: 'app-artwork',
  templateUrl: './artwork.page.html',
  styleUrls: ['./artwork.page.scss'],
})
export class ArtworkPage implements OnInit {
  artwork?: Artwork;
  artworkAssets: ArtworkAsset[];
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

      this.artworkService.getAssets(id).subscribe(data => {
        this.artworkAssets = data;
        console.log('Loaded assets');
        console.log(data)
      })


    });

    this.route.queryParams
      .subscribe(params => {
        console.log(params);
        this.descTemp = params.desc;
      }
      );



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
