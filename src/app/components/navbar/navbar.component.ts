import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Location } from "@angular/common";
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input() navItems: any = [];
  @Output() clickMenu = new EventEmitter();

  menu_icon = faBars


  menuToggle = false
  visibilityMenuItem = false
  currentNavItem = null;
  // route: string = null;
  collapsed: boolean = true;

  // private firestore: AngularFirestore
  constructor(private location: Location, private router: Router, private activatedRoute: ActivatedRoute) {

    this.router.events.subscribe((val) => {
      console.log('Route path is: ' + this.location.path());   //  56
      // this.route = this.location.path();
      //this.navItems.forEach(item => {
      //   item.selected = false
      //   if (item.route == this.route) {
      //     item.selected = true
      //   }
      // })
    });

    // this.currentNavItem = this.navItems.find(element => {
    //   return element.route == this.route;
    // });

  }

  ngOnInit(): void {

  }

  // navigatoToRoute(route) {
  //   this.route = route
  // }

  menuon = false
  onClickMenu() {
    // this.menuon = !this.menuon;
    console.log('menu button pressed');

    // this.menuToggle = !this.menuToggle
    // this.visibilityMenuItem = this.menuToggle
    // this.clickMenu.emit();
  }

  // scrollToElement($element): void {
  //   console.log($element);
  //   $element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  // }

  // toggle(): void {
  //   this.collapsed = !this.collapsed;
  // }
}
