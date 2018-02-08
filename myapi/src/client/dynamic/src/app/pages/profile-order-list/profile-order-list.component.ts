import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-order-list',
  templateUrl: './profile-order-list.component.html',
  styleUrls: ['./profile-order-list.component.less']
})
export class ProfileOrderListComponent implements OnInit {
  orderList: any[];
  constructor() { }

  ngOnInit() {
    this.orderList = [
      {
        id: 1,
        createAt: "2017/01/01",
        order: 0,
        orderLabel: ""
      },
      {
        id: 1,
        createAt: "2017/01/01",
        order: 0,
        orderLabel: ""
      },
      {
        id: 1,
        createAt: "2017/01/01",
        order: 0,
        orderLabel: ""
      },
      {
        id: 1,
        createAt: "2017/01/01",
        order: 0,
        orderLabel: ""
      },
      {
        id: 1,
        createAt: "2017/01/01",
        order: 0,
        orderLabel: ""
      }
    ].map(elem => {
      elem.orderLabel = elem.order == 1 ? "已开" : "未开";
      return elem;
    });
  }

  trackByOrderList(index: number, data: any){
    return data.id;
  }

}
