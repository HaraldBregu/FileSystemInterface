import { Component, OnInit } from '@angular/core';
import { DataItemType } from 'src/app/core/enums/data-item-type';
import { DataItem } from 'src/app/core/interfaces/data-item';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  items: DataItem[] = [];
  isTableList: boolean = true;

  constructor() {

    this.items = [];

    for (let i = 0; i < 7; i++) {
      this.items.push({
        type: DataItemType.Category,
        title: (Math.random() + 1).toString(36).substring(7),
        childs: Math.floor((Math.random()*100)+1),
        data: null
      });
    }

    for (let i = 0; i < 67; i++) {
      this.items.push({
        type: DataItemType.File,
        title: (Math.random() + 1).toString(36).substring(7) + ".pdf",
      });
    }
  }

  ngOnInit() {


  }


}
