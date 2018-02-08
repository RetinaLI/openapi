import { Component, OnInit } from '@angular/core';
import { MissionService } from '../../providers/mission.service';

@Component({
  selector: 'app-page-no-access',
  templateUrl: './page-no-access.component.html',
  styleUrls: ['./page-no-access.component.css']
})
export class PageNoAccessComponent implements OnInit {

  constructor(private missionService: MissionService) {

    this.missionService.confirmMission({
      action: "locationChanged", params: {
        menu: {
          name: "NOT ACCESS"
        }
      }
    });
  }

  ngOnInit() {
  }
}
