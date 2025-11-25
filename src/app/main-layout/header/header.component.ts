import { Component } from '@angular/core';
import { HeaderNavLinks } from 'src/app/header-nav-links';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: false
})
export class HeaderComponent {
  links: HeaderNavLinks = new HeaderNavLinks()

  /**
   *
   */
  constructor() {
    console.log(this.links)
  }
}
