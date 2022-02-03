import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private router: Router, private navController: NavController) { }

  navigateArtwork(id: number) {
    // this.router.navigate(['tabs', 'artwork', 1]);
    this.navController.navigateForward('tabs/artwork/1');
  }

}
