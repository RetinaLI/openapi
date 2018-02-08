import { Component, OnInit } from '@angular/core';
import { MissionService } from '../../providers/mission.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private missionService: MissionService) {

    this.missionService.confirmMission({
      action: "locationChanged", params: {
        menu: {
          name: 404
        }
      }
    });
  }

  ngOnInit() {
  }

}
