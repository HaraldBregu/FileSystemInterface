import { Component } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule, Location } from "@angular/common";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  routerUrl: string = ""

  constructor(private location: Location, private router: Router, private activatedRoute: ActivatedRoute) {
    
    this.router.events.subscribe((val) => {
      this.routerUrl = this.location.path()
      console.log('Route path is: ' + this.routerUrl);   //  56
    })
  }
}
