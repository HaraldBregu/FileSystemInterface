import { Component, OnInit } from '@angular/core';
import { Catalog } from 'src/app/core/interfaces/catalog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  catalogs: Catalog[] = [];

  constructor() {
    this.catalogs.push({id: 23, name: "cat 1", content: 23});
    this.catalogs.push({id: 23, name: "cat 1", content: 3});
    this.catalogs.push({id: 23, name: "cat 1", content: 123});
    this.catalogs.push({id: 23, name: "cat 1", content: 263});
    this.catalogs.push({id: 23, name: "cat 1", content: 86});
    this.catalogs.push({id: 23, name: "cat 1", content: 33});
    this.catalogs.push({id: 23, name: "cat 1", content: 65});
    this.catalogs.push({id: 23, name: "cat 1", content: 1});
  }

  ngOnInit() {


  }


}
