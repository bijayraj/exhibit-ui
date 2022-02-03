import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddArtPageRoutingModule } from './add-art-routing.module';

import { AddArtPage } from './add-art.page';
import { IonicSelectableModule } from 'ionic-selectable';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddArtPageRoutingModule,
    ReactiveFormsModule,
    IonicSelectableModule,
    SwiperModule
  ],
  declarations: [AddArtPage]
})
export class AddArtPageModule { }
