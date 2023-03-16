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
      let r = (Math.random() + 1).toString(36).substring(7);
      this.catalogs.push({
        type: ProductItemType.Category,
        name: "Category " + r,
        childs: Math.floor((Math.random()*100)+1),
        data: null
      });
    }

    for (let i = 0; i < 3; i++) {
      let r = (Math.random() + 1).toString(36).substring(7);
      this.catalogs.push({
        type: ProductItemType.File,
        name: "File_" + r + ".pdf"
      });
    }
  }

  ngOnInit() {


  }


}
