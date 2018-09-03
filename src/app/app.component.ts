import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'forms';

  public activeLink = -1;
  public links: any[];

  constructor(private router: Router) {
    this.links = [
      { name: 'Form',
        link: '/form'
      },
      { name: 'FormBootstrap',
        link: '/formbootstrap'
      }];
    this.router.events.subscribe(() => {
      if (this.router.url === this.links[0].link) {
        this.activeLink = this.links[0];
      } else {
        this.activeLink = this.links[1];
      }
    });

  }

}
