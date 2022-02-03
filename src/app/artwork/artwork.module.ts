import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArtworkPageRoutingModule } from './artwork-routing.module';

import { ArtworkPage } from './artwork.page';
import { SafeHtmlPipe } from '../safe-html';
import { PhotoviewerComponent } from '../photoviewer/photoviewer.component';
import { PhotoViewer } from '@awesome-cordova-plugins/photo-viewer/ngx';

import { WavPlayerComponent } from '../wav-player/wav-player.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArtworkPageRoutingModule

  ],
  declarations: [ArtworkPage, SafeHtmlPipe, WavPlayerComponent, PhotoviewerComponent],
  providers: [PhotoViewer]
})
export class ArtworkPageModule { }
