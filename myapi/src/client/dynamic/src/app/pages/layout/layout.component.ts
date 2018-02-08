import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MissionService } from '../../providers/mission.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less']
})
export class LayoutComponent implements OnInit, AfterViewInit {
  // title = 'app';
  showPreloader: Boolean = true;

  constructor(private missionService: MissionService, private router: Router){

  }

  ngOnInit(){
    // this.router.navigate(['index.jsp']);
  }

  ngAfterViewInit(){
  }
}
