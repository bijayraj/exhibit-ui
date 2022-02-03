import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  constructor(private authService: AuthenticationService,
    private router: Router,
    private menuCtrl: MenuController) {

  }

  async logout() {
    await this.authService.logout();
    console.log('logout');
    this.menuCtrl.close();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

}
