import { Component, OnInit, ViewChild } from '@angular/core';
import { async } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonicSwiper, IonSlides, LoadingController } from '@ionic/angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { first } from 'rxjs/operators';
import { Artwork } from '../models/artwork';
import { Exhibit } from '../models/exhibit';
import { ArtworkService } from '../services/artwork.service';
import { AuthenticationService } from '../services/authentication.service';
import { ExhibitService } from '../services/exhibit.service';
import { SwiperComponent } from 'swiper/angular';
import { SwiperOptions } from 'swiper';

import { Camera, CameraResultType } from '@capacitor/camera';


@Component({
  selector: 'app-add-art',
  templateUrl: './add-art.page.html',
  styleUrls: ['./add-art.page.scss'],
})
export class AddArtPage implements OnInit {
  @ViewChild('mainSwiper') slides: SwiperComponent;
  @ViewChild('imageElement') imageElement: HTMLImageElement;
  imageSource: string;
  artForm: FormGroup;
  artWork: Artwork;

  exhibits: Exhibit[];
  exhibit: Exhibit;

  swiperConfig: SwiperOptions = {
    allowTouchMove: false
  };

  constructor(private exhibitService: ExhibitService,
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController,
    private artService: ArtworkService) {



  }

  get f() {
    return this.artForm.controls;
  }

  ngOnInit() {

    Camera.requestPermissions();
    this.exhibitService.getAll().subscribe(data => {
      this.exhibits = data;
      console.log(data);
    });

    this.artForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      moreInfo: [''],
      ExhibitId: ['']
    });
  }

  async createArt() {

    const loading = await this.loadingController.create();

    const currentUser = this.authService.userValue;

    if (this.artForm.invalid) {
      return;
    }
    await loading.present();

    const userData = this.artForm.value;
    userData.ExhibitId = this.exhibit.id;
    userData.UserId = currentUser.id;

    this.artService.create(userData)
      .pipe(first())
      .subscribe({
        next: async (response) => {
          await loading.dismiss();
          this.artWork = response;
          this.slides.swiperRef.slideNext();
        },

        error: async error => {
          await loading.dismiss();
          console.log(error);
          const alert = await this.alertController.create({
            header: 'User registration failed',
            message: error.error.message,
            buttons: ['OK'],
          });
          await alert.present();
        }
      });
  }


  portChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log('port:', event.value);
  }

  nextSlide() {
    this.slides.swiperRef.slideNext();
  }

  prevSlide() {
    this.slides.swiperRef.slidePrev();
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });

    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    const imageUrl = image.webPath;

    // Can be set to the src of an image now
    // this.imageElement.src = imageUrl;
    this.imageSource = imageUrl;
  }

}
