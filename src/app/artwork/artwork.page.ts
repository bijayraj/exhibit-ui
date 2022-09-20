import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Artwork } from '../models/artwork';
import { ArtworkService } from '../services/artwork.service';
import { Location } from '@angular/common';

import { PhotoViewer } from '@awesome-cordova-plugins/photo-viewer/ngx';
import { ArtworkAsset } from '../models/artworkAsset';
import { ModalController } from '@ionic/angular';
import { ModalpopupComponent } from './modalpopup/modalpopup.component';

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
  userQuestion: string = '';
  questionResponse: string = '';
  constructor(private artworkService: ArtworkService,
    private route: ActivatedRoute,
    private location: Location,
    private photoViewer: PhotoViewer,
    private router: Router,
    public modalController: ModalController) { }

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
      });


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

  async showDialog() {
  }


  modelData: any;
  async openIonModal() {
    const modal = await this.modalController.create({
      component: ModalpopupComponent,
      componentProps: {
        'model_title': "Nomadic model's reveberation"
      }
    });
    modal.onDidDismiss().then((modelData) => {
      if (modelData !== null) {
        this.modelData = modelData.data;
        console.log('Modal Data : ' + modelData.data);
      }
    });
    return await modal.present();
  }

  async closeModel() {
    const close: string = "Modal Removed";
    await this.modalController.dismiss(close);
  }

  someFunction() {
    console.log('Clicked here');
  }

  async askQuestion() {
    this.artworkService.askQuestion(this.artwork.id, this.userQuestion).subscribe(response => {
      this.questionResponse = response.message;
    })
    console.log('Asking question');
  }


}
