import { Component, OnInit } from '@angular/core';
import { ProductItemType } from 'src/app/core/enums/product-item-type';
import { Catalog } from 'src/app/core/interfaces/catalog';
import { ProductItem } from 'src/app/core/interfaces/product-item';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  catalogs: ProductItem[] = [];

  constructor() {

    this.catalogs = [];

    for (let i = 0; i < 4; i++) {
      this.catalogs.push({
        type: ProductItemType.Category,
        name: (Math.random() + 1).toString(36).substring(7),
        color: "text-blue-500",
        childs: Math.floor((Math.random()*100)+1),
        data: null
      });
    }

    for (let i = 0; i < 3; i++) {
      this.catalogs.push({
        type: ProductItemType.File,
        name: (Math.random() + 1).toString(36).substring(7) + ".pdf",
        color: "text-rose-500",
      });
    }
  }

  ngOnInit() {


  }

  isTableList: boolean = true;

  switchListMode( ){
    this.isTableList = !this.isTableList
  }
}
