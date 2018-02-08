import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MissionService } from './providers/mission.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit, AfterViewInit {
  // title = 'app';
  showPreloader: Boolean = true;

  constructor(private missionService: MissionService){
    $("body>.preloader").remove();
  }

  ngOnInit(){
  }

  ngAfterViewInit(){
  }
}
