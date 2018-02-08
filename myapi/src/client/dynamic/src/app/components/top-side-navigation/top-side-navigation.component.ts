import { Component, OnInit, AfterViewInit, AfterContentInit, AfterViewChecked, OnChanges, AfterContentChecked } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-top-side-navigation',
  templateUrl: './top-side-navigation.component.html',
  styleUrls: ['./top-side-navigation.component.less'],
  providers: []
})
export class TopSideNavigationComponent implements OnInit {

  constructor(){
  }

  ngOnInit() {
  }

  refreshMenus() {

  }
}
